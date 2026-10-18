import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logout } from './lib/auth';
import {
  fetchSpreadsheetData,
  getFileMetadata,
  searchSpreadsheets,
  parseSheetData,
  filterDataByCeco,
  TARGET_SHEET_DEFAULT_NAME,
  extractSpreadsheetId
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
import { FilterBar } from './components/FilterBar';
import { KpiCards } from './components/KpiCards';
import { ChartsSection } from './components/ChartsSection';
import { BudgetTable } from './components/BudgetTable';
import { TransactionModal } from './components/TransactionModal';
import { FileSelectorModal } from './components/FileSelectorModal';
import { AccessDeniedScreen } from './components/AccessDeniedScreen';
import { LoginScreen } from './components/LoginScreen';
import {
  AppUser,
  BudgetAccount,
  MonthlyEvolutionItem,
  Transaction,
  SchoolCecoInfo,
  SyncStatus,
  StatusFilterType,
  GoogleDriveFile
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
  const [rawAccounts, setRawAccounts] = useState<BudgetAccount[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('last_budget_sheet_data');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.accounts?.length > 0) return parsed.accounts;
        }
      }
    } catch {}
    return DEMO_ACCOUNTS;
  });

  const [rawTransactions, setRawTransactions] = useState<Transaction[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('last_budget_sheet_data');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.transactions?.length > 0) return parsed.transactions;
        }
      }
    } catch {}
    return DEMO_TRANSACTIONS;
  });

  const [schoolsList, setSchoolsList] = useState<SchoolCecoInfo[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('last_budget_sheet_data');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.schools?.length > 0) return parsed.schools;
        }
      }
    } catch {}
    return DEMO_SCHOOLS;
  });

  // Active CECO filter: MUST default to 'TODOS' (Consolidado General Facultad)
  const [selectedCeco, setSelectedCeco] = useState<string>('TODOS');

  // Tipo de Presupuesto filter (strictly 2 types: Presupuesto Operacional and Presupuesto de Malla, or TODOS)
  const [selectedTipoPresupuesto, setSelectedTipoPresupuesto] = useState<string>('TODOS');

  // Number format toggle ($M vs $ CLP completo)
  const [useShortFormat, setUseShortFormat] = useState<boolean>(true);

  // Filter Bar state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>('ALL');
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('ALL');

  // Reset account filter when CECO or Tipo de Presupuesto changes
  useEffect(() => {
    setSelectedAccounts([]);
  }, [selectedCeco, selectedTipoPresupuesto]);

  // Modal for account transactions drilldown
  const [selectedAccountForTx, setSelectedAccountForTx] = useState<BudgetAccount | null>(null);
  
  // File selection modal
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [availableFiles, setAvailableFiles] = useState<GoogleDriveFile[]>([]);
  const [isRefreshingFiles, setIsRefreshingFiles] = useState(false);

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
  const hasDiscoveredFileRef = useRef<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // 1. RBAC User Resolution
  const resolveUserProfile = useCallback((email: string | null | undefined, currentUsers: AppUser[]) => {
    if (!email) {
      setCurrentUserProfile(null);
      setIsAccessDenied(false);
      return;
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user is in authorized users list
    let matched = currentUsers.find(u => u.correo.toLowerCase().trim() === cleanEmail);

    // Fail-safe: Patricio Zamorano is always granted ADMIN access
    if (!matched && (
      cleanEmail === 'patricio.zamorano@mail.udp.cl' ||
      cleanEmail.startsWith('patricio.zamorano') ||
      cleanEmail === 'pzamorano.troncoso@gmail.com' ||
      cleanEmail.includes('zamorano')
    )) {
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

    // If UDP institutional email not in list, grant access to General Faculty or Director
    if (!matched && (cleanEmail.endsWith('@mail.udp.cl') || cleanEmail.endsWith('@udp.cl'))) {
      const namePart = cleanEmail.split('@')[0].replace('.', ' ');
      const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      matched = {
        correo: cleanEmail,
        nombre: capitalized,
        cargo: 'Autoridad / Directivo UDP',
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
        if (accessToken && !hasDiscoveredFileRef.current) {
          hasDiscoveredFileRef.current = true;
          discoverAndConnectFile(accessToken);
        }
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
      const sanitizedId = extractSpreadsheetId(fileId) || fileId;
      const fileMeta = await getFileMetadata(currentToken, sanitizedId);
      
      const { ejecucionRows, planRows, usuariosRows } = await fetchSpreadsheetData(currentToken, sanitizedId);

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

      if (typeof window !== 'undefined') {
        localStorage.setItem('last_budget_sheet_id', fileMeta.id);
        localStorage.setItem('last_budget_sheet_name', knownName || fileMeta.name);
        localStorage.setItem('last_budget_sheet_data', JSON.stringify({
          accounts: parsed.accounts,
          transactions: parsed.transactions,
          schools: parsed.discoveredSchools || [],
          users: parsed.users || []
        }));
      }

      showToast(`Sincronización silenciosa completada: ${fileMeta.name}`);
    } catch (err: any) {
      console.warn('Error al sincronizar Google Sheets:', err);
      const isAuthError =
        err.message?.includes('401') ||
        err.message?.includes('invalid authentication credentials') ||
        err.message?.includes('Invalid Credentials');

      if (isAuthError) {
        setToken(null);
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('google_access_token');
          localStorage.removeItem('google_access_token');
          localStorage.removeItem('google_access_token_exp');
        }
        setSyncStatus(prev => ({
          ...prev,
          state: 'error',
          error: 'La sesión de Google ha caducado. Vuelve a iniciar sesión para sincronizar la planilla.'
        }));
        showToast('Sesión de Google expirada. Vuelve a iniciar sesión.');
      } else {
        setSyncStatus(prev => ({
          ...prev,
          state: 'error',
          error: err.message || 'Error al conectar con la planilla'
        }));
      }
      throw err;
    } finally {
      isSyncingRef.current = false;
    }
  }, [resolveUserProfile, user?.email]);

  const loadSpreadsheetRef = useRef(loadSpreadsheet);
  loadSpreadsheetRef.current = loadSpreadsheet;

  const discoverAndConnectFile = useCallback(async (currentToken: string) => {
    if (!currentToken || currentToken === 'token_valido') return;
    if (isSyncingRef.current) return;
    try {
      // 0. Check optional environment variable for direct sheet ID linking
      const rawEnvSheetId = (import.meta as any).env?.VITE_TARGET_SPREADSHEET_ID;
      const envSheetId = extractSpreadsheetId(rawEnvSheetId);
      if (envSheetId) {
        try {
          await loadSpreadsheetRef.current(envSheetId, currentToken, 'Planilla Institucional 2026');
          return;
        } catch (envErr) {
          console.warn('No se pudo cargar planilla por variable VITE_TARGET_SPREADSHEET_ID, buscando en Drive...', envErr);
        }
      }

      // 1. If user previously connected to a file ID, load it directly
      const rawLastFileId = localStorage.getItem('last_budget_sheet_id');
      const lastFileId = extractSpreadsheetId(rawLastFileId);
      const lastFileName = localStorage.getItem('last_budget_sheet_name');
      if (lastFileId) {
        try {
          await loadSpreadsheetRef.current(lastFileId, currentToken, lastFileName || 'Presupuesto Conectado');
          return;
        } catch (prevLoadErr) {
          console.warn('No se pudo cargar el archivo previamente seleccionado, buscando en Drive...', prevLoadErr);
          if (typeof window !== 'undefined') {
            localStorage.removeItem('last_budget_sheet_id');
            localStorage.removeItem('last_budget_sheet_name');
          }
        }
      }

      // 2. Search for spreadsheets in Drive
      const files = await searchSpreadsheets(currentToken, '');
      
      const normalize = (text: string) =>
        (text || '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

      // Tier 1: Contains 'ejecucion' AND '2026'
      let targetFile = files.find(f => {
        const n = normalize(f.name);
        return n.includes('ejecucion') && n.includes('2026');
      });

      // Tier 2: Contains 'presupuest' AND '2026'
      if (!targetFile) {
        targetFile = files.find(f => {
          const n = normalize(f.name);
          return (n.includes('presupuest') || n.includes('presupuesto')) && n.includes('2026');
        });
      }

      // Tier 3: Contains 'ejecucion'
      if (!targetFile) {
        targetFile = files.find(f => normalize(f.name).includes('ejecucion'));
      }

      // Tier 4: Contains 'presupuest'
      if (!targetFile) {
        targetFile = files.find(f => normalize(f.name).includes('presupuest'));
      }

      // Tier 5: Contains 'facsyo' or 'salud' or 'udp'
      if (!targetFile) {
        targetFile = files.find(f => {
          const n = normalize(f.name);
          return n.includes('facsyo') || n.includes('salud') || n.includes('udp');
        });
      }

      // Tier 6: Contains 'copia'
      if (!targetFile) {
        targetFile = files.find(f => normalize(f.name).includes('copia'));
      }

      // Tier 7: First spreadsheet found
      if (!targetFile && files.length > 0) {
        targetFile = files[0];
      }

      if (targetFile) {
        console.log('Cargando planilla de Drive:', targetFile.name, targetFile.id);
        await loadSpreadsheetRef.current(targetFile.id, currentToken, targetFile.name);
      } else {
        console.warn('No se encontró archivo en Drive que coincida.');
      }
    } catch (err: any) {
      console.warn('Búsqueda inicial de archivo en Google Drive:', err);
    }
  }, []);

  useEffect(() => {
    if (token && !hasDiscoveredFileRef.current) {
      hasDiscoveredFileRef.current = true;
      discoverAndConnectFile(token);
    }
  }, [token, discoverAndConnectFile]);

  const refreshFiles = useCallback(async (currentToken: string) => {
    setIsRefreshingFiles(true);
    try {
      const files = await searchSpreadsheets(currentToken, ''); // Search all
      setAvailableFiles(files);
    } catch (err: any) {
      console.error('Error refreshing files:', err);
      showToast('Error al buscar archivos en Drive');
    } finally {
      setIsRefreshingFiles(false);
    }
  }, []);

  // 5. Silent Automatic Polling Engine (every 120s, background visibility check)
  useEffect(() => {
    const intervalMs = Math.max(syncStatus.autoSyncInterval || 120000, 120000);
    if (intervalMs <= 0) return;

    let isPolling = false;

    const intervalId = setInterval(async () => {
      if (typeof document !== 'undefined' && document.hidden) return;
      const activeToken = tokenRef.current;
      const activeFileId = fileIdRef.current;

      if (!activeToken || !activeFileId || isSyncingRef.current || isPolling) return;
      isPolling = true;

      try {
        const meta = await getFileMetadata(activeToken, activeFileId);
        const lastMod = lastModifiedRef.current;

        if (meta.modifiedTime && lastMod && meta.modifiedTime !== lastMod) {
          // Spreadsheet was modified in Google Sheets: reload silently!
          console.log('Actualización detectada en Google Sheets. Sincronizando en línea...');
          showToast('Actualización detectada en Google Sheets. Datos refrescados automáticamente.');
          await loadSpreadsheetRef.current(activeFileId, activeToken, meta.name);
        } else {
          setSyncStatus(prev => ({ ...prev, lastSyncTime: new Date() }));
        }
      } catch (err: any) {
        if (err.message?.includes('401') || err.message?.includes('expirada')) {
          console.warn('Sesión de Google expirada durante chequeo de metadatos.');
        } else {
          console.warn('Chequeo de actualización silenciosa:', err);
        }
      } finally {
        isPolling = false;
      }
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [syncStatus.autoSyncInterval]);

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
        if (res.accessToken && !hasDiscoveredFileRef.current) {
          hasDiscoveredFileRef.current = true;
          await discoverAndConnectFile(res.accessToken);
        }
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
    hasDiscoveredFileRef.current = false;
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

  // Available budget types across current accounts: STRICTLY TWO TYPES
  const availableTiposPresupuesto = useMemo(() => {
    const tipos = new Set<string>();
    currentAccounts.forEach(a => {
      if (a.tipoPresupuesto) tipos.add(a.tipoPresupuesto.trim());
    });
    if (tipos.size === 0) {
      return ['Presupuesto Operacional', 'Presupuesto de Malla'];
    }
    const list = Array.from(tipos);
    const op = list.find(t => t.toLowerCase().includes('operac')) || 'Presupuesto Operacional';
    const ma = list.find(t => t.toLowerCase().includes('malla') || t.toLowerCase().includes('curricul') || t.toLowerCase().includes('docen')) || 'Presupuesto de Malla';
    return [op, ma];
  }, [currentAccounts]);

  // Accounts filtered by selected Tipo de Presupuesto (prior to choosing account)
  const budgetTypeAccounts = useMemo(() => {
    if (selectedTipoPresupuesto === 'TODOS') {
      return currentAccounts;
    }
    const sel = selectedTipoPresupuesto.toLowerCase().trim();
    const isSelOperac = sel.includes('operac');
    const isSelMalla = sel.includes('malla') || sel.includes('curricul') || sel.includes('docen');

    return currentAccounts.filter(a => {
      const tipo = (a.tipoPresupuesto || 'Presupuesto Operacional').toLowerCase().trim();
      if (tipo === sel) return true;
      if (isSelOperac && tipo.includes('operac')) return true;
      if (isSelMalla && (tipo.includes('malla') || tipo.includes('curricul') || tipo.includes('docen'))) return true;
      return false;
    });
  }, [currentAccounts, selectedTipoPresupuesto]);

  // Available unique accounts strictly for the current active school and selected Tipo de Presupuesto
  const accountOptions = useMemo(() => {
    const map = new Map<string, string>();
    budgetTypeAccounts.forEach(acc => {
      if (acc.id && !map.has(acc.id)) {
        map.set(acc.id, acc.name);
      }
    });
    return Array.from(map.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.id.localeCompare(b.id));
  }, [budgetTypeAccounts]);

  // Monthly Evolution adapted to the selected budget type so charts are not distorted
  const activeMonthlyEvolution = useMemo(() => {
    if (selectedTipoPresupuesto === 'TODOS') {
      return currentMonthlyEvolution;
    }
    let lastExecutedMonthIdx = -1;
    DEMO_MONTHS.forEach((mes, idx) => {
      if (idx <= 9) {
        const hasAnyExec = budgetTypeAccounts.some(acc => (acc.monthlyExec[mes] || 0) > 0);
        if (hasAnyExec) {
          lastExecutedMonthIdx = Math.max(lastExecutedMonthIdx, idx);
        }
      }
    });
    if (lastExecutedMonthIdx > 9) lastExecutedMonthIdx = 9;

    let planAcum = 0;
    let ejecAcum = 0;
    return DEMO_MONTHS.map((mes, idx) => {
      let mesPlan = 0;
      let mesEjec = 0;
      budgetTypeAccounts.forEach(acc => {
        mesPlan += acc.monthlyPlan[mes] || 0;
        mesEjec += acc.monthlyExec[mes] || 0;
      });
      planAcum += mesPlan;

      const hasExecutionRecorded = lastExecutedMonthIdx !== -1 && idx <= lastExecutedMonthIdx;
      if (hasExecutionRecorded) {
        ejecAcum += mesEjec;
      }
      const matchedItem = currentMonthlyEvolution.find(m => m.mes === mes);
      return {
        mes,
        mesNombre: matchedItem?.mesNombre || mes,
        plan: mesPlan,
        ejec: mesEjec,
        planAcum,
        ejecAcum: hasExecutionRecorded ? ejecAcum : null
      };
    });
  }, [budgetTypeAccounts, currentMonthlyEvolution, selectedTipoPresupuesto]);

  // Step 5: Filter Bar adjustments (search, status, account, month)
  const filteredAccounts = useMemo(() => {
    return budgetTypeAccounts
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
  }, [budgetTypeAccounts, searchTerm, statusFilter, selectedAccounts, selectedMonth]);

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
        periodLabel=""
        schools={schoolsList}
        onSelectCeco={setSelectedCeco}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isLoggingIn={isLoggingIn}
        onShowToast={showToast}
        onOpenSelector={() => {
            setIsFileModalOpen(true);
            refreshFiles(token!);
        }}
      />

      {/* Filter and View Options (includes Tipo de Presupuesto filter and Account selector) */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        selectedTipoPresupuesto={selectedTipoPresupuesto}
        onSelectedTipoPresupuestoChange={setSelectedTipoPresupuesto}
        availableTiposPresupuesto={availableTiposPresupuesto}
        selectedAccounts={selectedAccounts}
        onSelectedAccountsChange={setSelectedAccounts}
        accountOptions={accountOptions}
        selectedMonth={selectedMonth}
        onSelectedMonthChange={setSelectedMonth}
        availableMonths={DEMO_MONTHS}
        useShortFormat={useShortFormat}
        onToggleFormat={() => setUseShortFormat(prev => !prev)}
      />

      {/* KPI Cards */}
      <KpiCards
        accounts={budgetTypeAccounts}
        filteredAccounts={filteredAccounts}
        useShortFormat={useShortFormat}
        ceco={selectedCeco}
      />

      {/* Charts Section */}
      <ChartsSection
        accounts={filteredAccounts}
        monthlyEvolution={activeMonthlyEvolution}
        useShortFormat={useShortFormat}
      />

      {/* Budget Table with Drilldown */}
      <BudgetTable
        accounts={filteredAccounts}
        allAccounts={budgetTypeAccounts}
        useShortFormat={useShortFormat}
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

      {/* File Selector Modal */}
      <FileSelectorModal
        isOpen={isFileModalOpen}
        onClose={() => setIsFileModalOpen(false)}
        files={availableFiles}
        selectedFileId={syncStatus.fileId}
        onSelectFile={(id, name) => {
            loadSpreadsheet(id, token!, name);
        }}
        isLoading={isRefreshingFiles}
        onRefreshDrive={() => refreshFiles(token!)}
      />
    </main>
  );
}
