import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logout } from './lib/auth';
import {
  fetchSpreadsheetData,
  getFileMetadata,
  searchSpreadsheets,
  parseSheetData,
  filterDataByCeco,
  TARGET_SHEET_DEFAULT_NAME
} from './lib/googleDriveSheets';
import {
  DEMO_ACCOUNTS,
  DEMO_MONTHLY_EVOLUTION,
  DEMO_TRANSACTIONS,
  DEMO_CECO,
  DEMO_CECO_NAME,
  DEMO_SCHOOLS,
  DEMO_USERS,
  DEMO_MONTHS
} from './lib/demoData';
import { Header } from './components/Header';
import { SyncBanner } from './components/SyncBanner';
import { FilterBar } from './components/FilterBar';
import { KpiCards } from './components/KpiCards';
import { ChartsSection } from './components/ChartsSection';
import { BudgetTable } from './components/BudgetTable';
import { TransactionModal } from './components/TransactionModal';
import { AccessDeniedScreen } from './components/AccessDeniedScreen';
import { LoginScreen } from './components/LoginScreen';
import {
  AppUser,
  BudgetAccount,
  MonthlyEvolutionItem,
  Transaction,
  SchoolCecoInfo,
  SyncStatus,
  StatusFilterType
} from './types';
import { CheckCircle2, AlertTriangle, ShieldCheck, Lock } from 'lucide-react';

export default function App() {
  // Authentication state
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isAuthInitializing, setIsAuthInitializing] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  // RBAC & User Profile state: Defaults to null on start to display Portada
  const [usersList, setUsersList] = useState<AppUser[]>(DEMO_USERS);
  const [currentUserProfile, setCurrentUserProfile] = useState<AppUser | null>(null);
  const [isAccessDenied, setIsAccessDenied] = useState(false);

  // Raw Budget Data (across all schools in the active spreadsheet or model)
  const [rawAccounts, setRawAccounts] = useState<BudgetAccount[]>(DEMO_ACCOUNTS);
  const [rawTransactions, setRawTransactions] = useState<Transaction[]>(DEMO_TRANSACTIONS);
  const [schoolsList, setSchoolsList] = useState<SchoolCecoInfo[]>(DEMO_SCHOOLS);

  // Active CECO filter: MUST default to 'TODOS' (Consolidado General Facultad)
  const [selectedCeco, setSelectedCeco] = useState<string>('TODOS');

  // View presentation mode: Percentage-only mode (Requisito solicitado)
  const [usePercentOnlyMode, setUsePercentOnlyMode] = useState<boolean>(false);
  const [useShortFormat, setUseShortFormat] = useState<boolean>(true);

  // Filter Bar state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>('ALL');
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('ALL');

  // Reset account filter when CECO changes
  useEffect(() => {
    setSelectedAccounts([]);
  }, [selectedCeco]);

  // Modal for account transactions drilldown
  const [selectedAccountForTx, setSelectedAccountForTx] = useState<BudgetAccount | null>(null);

  // Sync state (100% silent & automatic)
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    state: 'not_connected',
    lastSyncTime: null,
    lastModifiedInDrive: null,
    fileName: TARGET_SHEET_DEFAULT_NAME,
    fileId: null,
    error: null,
    autoSyncInterval: 25000, // Silently check Drive metadata every 25s
    dataSource: 'demo_model'
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Stable references for auto-sync polling
  const tokenRef = useRef<string | null>(token);
  tokenRef.current = token;

  const fileIdRef = useRef<string | null>(syncStatus.fileId);
  fileIdRef.current = syncStatus.fileId;

  const lastModifiedRef = useRef<string | null>(syncStatus.lastModifiedInDrive);
  lastModifiedRef.current = syncStatus.lastModifiedInDrive;

  const isSyncingRef = useRef<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // 1. RBAC User Resolution
  const resolveUserProfile = useCallback((email: string | null | undefined, currentUsers: AppUser[]) => {
    if (!email) {
      setCurrentUserProfile(DEMO_USERS[0]);
      setIsAccessDenied(false);
      return;
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user is in authorized users list
    let matched = currentUsers.find(u => u.correo.toLowerCase().trim() === cleanEmail);

    // Fail-safe: Patricio Zamorano is always granted ADMIN access
    if (!matched && (cleanEmail === 'patricio.zamorano@mail.udp.cl' || cleanEmail.startsWith('patricio.zamorano'))) {
      matched = {
        correo: cleanEmail,
        nombre: 'Patricio Zamorano',
        cargo: 'Director de Gestión y Finanzas',
        rol: 'ADMIN',
        ceco: 'TODOS',
        escuela: 'Facultad de Salud y Odontología'
      };
    }

    // Fail-safe: Decano / Decanatura always granted ADMIN access
    if (!matched && (cleanEmail.includes('decano') || cleanEmail.includes('decanatura'))) {
      matched = {
        correo: cleanEmail,
        nombre: 'Dr. Decano de Facultad',
        cargo: 'Decano',
        rol: 'ADMIN',
        ceco: 'TODOS',
        escuela: 'Facultad de Salud y Odontología'
      };
    }

    if (matched) {
      setCurrentUserProfile(matched);
      setIsAccessDenied(false);

      // If Director, strictly enforce their school's CECO
      if (matched.rol === 'DIRECTOR') {
        setSelectedCeco(matched.ceco);
      } else if (matched.rol === 'ADMIN') {
        // Admin defaults to Consolidado (TODOS) or keeps current selection
        setSelectedCeco(prev => prev || 'TODOS');
      }
    } else {
      // User is logged into Google, but not registered in the Faculty's Users sheet
      setCurrentUserProfile(null);
      setIsAccessDenied(true);
    }
  }, []);

  // 2. Initialize Firebase Auth
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setSyncStatus(prev => ({
          ...prev,
          state: 'idle',
          error: null
        }));
        resolveUserProfile(currentUser.email, usersList);
        setIsAuthInitializing(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setCurrentUserProfile(null);
        setIsAccessDenied(false);
        setSyncStatus(prev => ({
          ...prev,
          state: 'not_connected',
          dataSource: 'demo_model'
        }));
        setIsAuthInitializing(false);
      }
    );

    return () => unsubscribe();
  }, [resolveUserProfile, usersList]);

  // 3. Load & Parse Spreadsheet data from Google Drive
  const loadSpreadsheet = useCallback(async (fileId: string, currentToken: string, knownName?: string) => {
    if (isSyncingRef.current) return;
    isSyncingRef.current = true;

    setSyncStatus(prev => ({ ...prev, state: 'syncing', error: null }));

    try {
      const fileMeta = await getFileMetadata(currentToken, fileId);
      const { ejecucionRows, planRows, usuariosRows } = await fetchSpreadsheetData(currentToken, fileId);

      const parsed = parseSheetData(ejecucionRows, planRows, usuariosRows);

      if (parsed.accounts.length === 0) {
        throw new Error('No se encontraron datos válidos en las pestañas "Ejecución" o "Plan".');
      }

      setRawAccounts(parsed.accounts);
      setRawTransactions(parsed.transactions);

      // If users sheet was present, update users list & re-evaluate RBAC
      if (parsed.users && parsed.users.length > 0) {
        setUsersList(parsed.users);
        if (user?.email) {
          resolveUserProfile(user.email, parsed.users);
        }
      }

      // Discover schools directly from Ejecución (Col H and Col I) via parseSheetData
      if (parsed.discoveredSchools && parsed.discoveredSchools.length > 0) {
        setSchoolsList(parsed.discoveredSchools);
      } else {
        const uniqueCecos = Array.from(new Set(parsed.accounts.map(a => a.ceco).filter(Boolean)));
        if (uniqueCecos.length > 0) {
          const discoveredSchools: SchoolCecoInfo[] = uniqueCecos.map(c => {
            const accWithCeco = parsed.accounts.find(a => a.ceco === c);
            const name = accWithCeco?.descripCeco || `CECO ${c}`;
            return {
              ceco: c!,
              name,
              shortName: name.replace(/^ESCUELA DE /i, '').replace(/^CENTRO DE /i, '').trim() || name,
              director: 'Director(a) de Escuela'
            };
          });
          setSchoolsList(discoveredSchools);
        }
      }

      setSyncStatus(prev => ({
        ...prev,
        state: 'synced',
        lastSyncTime: new Date(),
        lastModifiedInDrive: fileMeta.modifiedTime,
        fileName: knownName || fileMeta.name,
        fileId: fileMeta.id,
        webViewLink: fileMeta.webViewLink,
        error: null,
        dataSource: 'google_sheets'
      }));

      showToast(`Sincronización silenciosa completada: ${fileMeta.name}`);
    } catch (err: any) {
      console.error('Error al sincronizar Google Sheets:', err);
      setSyncStatus(prev => ({
        ...prev,
        state: 'error',
        error: err.message || 'Error al conectar con la planilla'
      }));
    } finally {
      isSyncingRef.current = false;
    }
  }, [resolveUserProfile, user?.email]);

  // 4. Auto-discover target spreadsheet on login
  const discoverAndConnectFile = useCallback(async (currentToken: string) => {
    try {
      const files = await searchSpreadsheets(currentToken, 'Obstetricia');

      let targetFile = files.find(
        f => f.name.toLowerCase().trim() === TARGET_SHEET_DEFAULT_NAME.toLowerCase().trim()
      );

      if (!targetFile) {
        targetFile = files.find(f => f.name.toLowerCase().includes('obstetricia'));
      }

      if (!targetFile && files.length > 0) {
        targetFile = files[0];
      }

      if (targetFile) {
        await loadSpreadsheet(targetFile.id, currentToken, targetFile.name);
      }
    } catch (err: any) {
      console.warn('Búsqueda inicial de archivo:', err);
    }
  }, [loadSpreadsheet]);

  useEffect(() => {
    if (token) {
      discoverAndConnectFile(token);
    }
  }, [token, discoverAndConnectFile]);

  // 5. Silent Automatic Polling Engine (Requisito: Sincronización 100% silenciosa)
  useEffect(() => {
    const intervalMs = syncStatus.autoSyncInterval;
    if (intervalMs <= 0) return;

    const intervalId = setInterval(async () => {
      const activeToken = tokenRef.current;
      const activeFileId = fileIdRef.current;

      if (!activeToken || !activeFileId || isSyncingRef.current) return;

      try {
        const meta = await getFileMetadata(activeToken, activeFileId);
        const lastMod = lastModifiedRef.current;

        if (meta.modifiedTime && lastMod && meta.modifiedTime !== lastMod) {
          // Spreadsheet was modified in Google Sheets: reload silently!
          console.log('Actualización detectada en Google Sheets. Sincronizando en línea...');
          showToast('Actualización detectada en Google Sheets. Datos refrescados automáticamente.');
          await loadSpreadsheet(activeFileId, activeToken, meta.name);
        } else {
          setSyncStatus(prev => ({ ...prev, lastSyncTime: new Date() }));
        }
      } catch (err) {
        console.warn('Chequeo de actualización silenciosa:', err);
      }
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [syncStatus.autoSyncInterval, loadSpreadsheet]);

  // Login handler
  const handleLogin = async () => {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        resolveUserProfile(res.user.email, usersList);
        showToast(`Bienvenido/a, ${res.user.displayName || 'Usuario'}`);
      }
    } catch (err: any) {
      console.error('Error al iniciar sesión:', err);
      setLoginError(err.message || 'No se pudo iniciar sesión con Google.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setCurrentUserProfile(null);
    setIsAccessDenied(false);
    setLoginError(null);
    setRawAccounts(DEMO_ACCOUNTS);
    setRawTransactions(DEMO_TRANSACTIONS);
    setSelectedCeco(DEMO_CECO);
    setSyncStatus({
      state: 'not_connected',
      lastSyncTime: null,
      lastModifiedInDrive: null,
      fileName: TARGET_SHEET_DEFAULT_NAME,
      fileId: null,
      error: null,
      autoSyncInterval: 25000,
      dataSource: 'demo_model'
    });
    showToast('Sesión cerrada.');
  };

  // Step 2 & 3: RBAC CECO Filtering & Recalculation
  const { currentAccounts, currentTransactions, currentMonthlyEvolution, activeSchoolName } = useMemo(() => {
    // If Director, force their own CECO
    const effectiveCeco = currentUserProfile?.rol === 'DIRECTOR'
      ? currentUserProfile.ceco
      : selectedCeco;

    const { filteredAccounts, filteredTransactions, monthlyEvolution } = filterDataByCeco(
      rawAccounts,
      rawTransactions,
      effectiveCeco
    );

    let schoolName = 'Facultad de Salud y Odontología';
    if (effectiveCeco === 'TODOS') {
      schoolName = 'Consolidado General Facultad';
    } else {
      const matched = schoolsList.find(s => s.ceco === effectiveCeco);
      if (matched) {
        schoolName = matched.name;
      } else if (filteredAccounts.length > 0 && filteredAccounts[0].descripCeco) {
        schoolName = filteredAccounts[0].descripCeco;
      }
    }

    return {
      currentAccounts: filteredAccounts,
      currentTransactions: filteredTransactions,
      currentMonthlyEvolution: monthlyEvolution,
      activeSchoolName: schoolName
    };
  }, [rawAccounts, rawTransactions, selectedCeco, currentUserProfile, schoolsList]);

  // Available unique accounts for the current active school/CECO
  const accountOptions = useMemo(() => {
    const map = new Map<string, string>();
    currentAccounts.forEach(acc => {
      if (acc.id && !map.has(acc.id)) {
        map.set(acc.id, acc.name);
      }
    });
    return Array.from(map.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.id.localeCompare(b.id));
  }, [currentAccounts]);

  // Step 5: Filter Bar adjustments (search, status, account, month)
  const filteredAccounts = useMemo(() => {
    return currentAccounts
      .map(acc => {
        if (selectedMonth !== 'ALL') {
          const mPlan = acc.monthlyPlan[selectedMonth] || 0;
          const mExec = acc.monthlyExec[selectedMonth] || 0;
          const mDisp = mPlan - mExec;
          const mPct = mPlan > 0 ? (mExec / mPlan) * 100 : (mExec > 0 ? 100 : 0);
          return {
            ...acc,
            presupuesto: mPlan,
            ejecutado: mExec,
            disponible: mDisp,
            pct: Math.round(mPct * 10) / 10
          };
        }
        return acc;
      })
      .filter(item => {
        const query = searchTerm.toLowerCase().trim();
        const matchSearch =
          !query ||
          item.id.toLowerCase().includes(query) ||
          item.name.toLowerCase().includes(query);

        let matchStatus = true;
        if (statusFilter === 'OVER') {
          matchStatus =
            (item.presupuesto === 0 && item.ejecutado > 0) || item.ejecutado > item.presupuesto;
        } else if (statusFilter === 'EXEC') {
          matchStatus = item.ejecutado > 0;
        } else if (statusFilter === 'ZERO') {
          matchStatus = item.ejecutado === 0;
        } else if (statusFilter === 'HIGH') {
          matchStatus = item.pct > 80;
        }

        const isNone = selectedAccounts.length === 1 && selectedAccounts[0] === '__NONE__';
        if (isNone) return false;

        const matchAccount =
          selectedAccounts.length === 0 ||
          selectedAccounts.includes(item.id);

        return matchSearch && matchStatus && matchAccount;
      });
  }, [currentAccounts, searchTerm, statusFilter, selectedAccounts, selectedMonth]);

  // 1. If verifying Firebase auth session on startup
  if (isAuthInitializing) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#0369a1] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-600">
            Cargando portal institucional...
          </p>
        </div>
      </div>
    );
  }

  // 2. If user is logged into Google with an unauthorized email
  if (isAccessDenied && user) {
    return (
      <main className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
        <AccessDeniedScreen
          user={user}
          onLogout={handleLogout}
          onRetry={() => resolveUserProfile(user.email, usersList)}
        />
      </main>
    );
  }

  // 3. If no active user session, render the official Login Screen
  if (!currentUserProfile) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        isLoggingIn={isLoggingIn}
        loginError={loginError}
      />
    );
  }

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto print-page">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-4 duration-200 no-print">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Role, Multi-School Selector for Admin */}
      <Header
        user={user}
        currentUserProfile={currentUserProfile}
        syncStatus={syncStatus}
        ceco={selectedCeco}
        cecoName={activeSchoolName}
        periodLabel="Cierre a Agosto 2026"
        schools={schoolsList}
        onSelectCeco={setSelectedCeco}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isLoggingIn={isLoggingIn}
        onShowToast={showToast}
      />

      {/* Real-time Google Sheets Silent Sync Banner (without confusing buttons) */}
      <SyncBanner
        syncStatus={syncStatus}
        isAdmin={currentUserProfile?.rol === 'ADMIN'}
        onLogin={handleLogin}
      />

      {/* Filter and View Options (includes the new % Mode button and Account filter) */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        selectedAccounts={selectedAccounts}
        onSelectedAccountsChange={setSelectedAccounts}
        accountOptions={accountOptions}
        selectedMonth={selectedMonth}
        onSelectedMonthChange={setSelectedMonth}
        availableMonths={DEMO_MONTHS.slice(0, 8)}
        useShortFormat={useShortFormat}
        onToggleFormat={() => setUseShortFormat(prev => !prev)}
        usePercentOnlyMode={usePercentOnlyMode}
        onTogglePercentMode={() => setUsePercentOnlyMode(prev => !prev)}
      />

      {/* KPI Cards (respects %-only mode) */}
      <KpiCards
        accounts={currentAccounts}
        filteredAccounts={filteredAccounts}
        useShortFormat={useShortFormat}
        usePercentOnlyMode={usePercentOnlyMode}
        ceco={selectedCeco}
      />

      {/* Charts Section (respects %-only mode) */}
      <ChartsSection
        accounts={filteredAccounts}
        monthlyEvolution={currentMonthlyEvolution}
        useShortFormat={useShortFormat}
        usePercentOnlyMode={usePercentOnlyMode}
      />

      {/* Budget Table with Drilldown and Percent Mode */}
      <BudgetTable
        accounts={filteredAccounts}
        allAccounts={currentAccounts}
        useShortFormat={useShortFormat}
        usePercentOnlyMode={usePercentOnlyMode}
        ceco={selectedCeco}
        cecoName={activeSchoolName}
        onSelectAccount={account => setSelectedAccountForTx(account)}
      />

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
        <p>Facultad de Salud y Odontología — Dirección de Gestión y Finanzas 2026</p>
        <p className="text-[11px] text-slate-400 mt-1">
          Seguridad RBAC por Centro de Costo (CECO) | Sincronización continua y silenciosa con Google Sheets
        </p>
      </footer>

      {/* Transaction Breakdown Modal */}
      <TransactionModal
        account={selectedAccountForTx}
        onClose={() => setSelectedAccountForTx(null)}
        useShortFormat={useShortFormat}
      />
    </main>
  );
}
