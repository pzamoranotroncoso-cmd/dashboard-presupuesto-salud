import React from 'react';
import { User } from 'firebase/auth';
import { LogOut, ShieldCheck, Building2, FileSpreadsheet } from 'lucide-react';
import { AppUser, SchoolCecoInfo, SyncStatus } from '../types';

interface HeaderProps {
  user: User | null;
  currentUserProfile: AppUser | null;
  syncStatus: SyncStatus;
  ceco: string;
  cecoName: string;
  periodLabel: string;
  schools: SchoolCecoInfo[];
  onSelectCeco: (ceco: string) => void;
  onLogin: () => void;
  onLogout: () => void;
  isLoggingIn: boolean;
  onOpenSelector: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  currentUserProfile,
  syncStatus,
  ceco,
  cecoName,
  periodLabel,
  schools,
  onSelectCeco,
  onLogin,
  onLogout,
  isLoggingIn,
  onOpenSelector
}) => {
  const isAdmin = currentUserProfile?.rol === 'ADMIN';
  const isSyncing = syncStatus.state === 'syncing';

  // Determine school title
  let displayTitle = "Escuela de Obstetricia";
  if (ceco === 'TODOS') {
    displayTitle = "Consolidado Facultad de Salud y Odontología";
  } else {
    const matched = schools.find(s => s.ceco === ceco);
    if (matched) {
      displayTitle = matched.name;
    } else if (cecoName) {
      displayTitle = cecoName;
    }
  }

  const formatLastSync = (date: Date | null) => {
    if (!date) return 'Sincronizado';
    return date.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <header className="bg-gradient-to-r from-[#0369a1] via-[#0284c7] to-[#0369a1] text-white p-6 sm:p-7 rounded-2xl mb-6 shadow-lg shadow-sky-950/20">
      {/* Top row: Title, badges, and user controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {displayTitle}
            </h1>

            {ceco !== 'TODOS' && (
              <span className="bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                CECO: {ceco}
              </span>
            )}
          </div>
        </div>

        {/* User Auth or Sign in button */}
        {user ? (
          <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl p-1.5 pl-3">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Usuario'}
                className="w-7 h-7 rounded-full border border-white/50 object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-sky-300 text-sky-950 font-bold text-xs flex items-center justify-center">
                {(currentUserProfile?.nombre || user.displayName || user.email || 'U').charAt(0).toUpperCase()}
              </div>
            )}
            <div className="text-left max-w-[150px] truncate hidden sm:block">
              <p className="text-xs font-bold text-white truncate leading-tight">
                {currentUserProfile?.nombre || user.displayName || user.email}
              </p>
              <div className="flex items-center gap-1">
                <span className={`text-[10px] font-extrabold uppercase px-1 rounded ${isAdmin ? 'bg-amber-400 text-amber-950' : 'bg-sky-200 text-sky-900'}`}>
                  {currentUserProfile?.rol || 'USUARIO'}
                </span>
                <p className="text-[10px] text-sky-200 truncate">{currentUserProfile?.cargo || 'Conectado'}</p>
              </div>
            </div>

            <button
              id="btn-logout"
              onClick={onLogout}
              title="Cerrar sesión"
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-sky-100 hover:text-white cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            id="btn-google-signin"
            onClick={onLogin}
            disabled={isLoggingIn}
            className="inline-flex items-center gap-2 bg-white text-slate-800 hover:bg-slate-50 active:bg-slate-100 px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all hover:shadow-lg disabled:opacity-75 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            </svg>
            <span>{isLoggingIn ? 'Conectando...' : 'Iniciar Sesión Google'}</span>
          </button>
        )}
      </div>

      {/* Selector Multiescuela exclusivo para Dirección de Gestión y Finanzas y Decanato */}
      {isAdmin && (
        <div className="mt-4 pt-3 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-200">
              Vista Administrador (Decanato / Gestión y Finanzas):
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="school-selector" className="text-xs text-sky-100 font-semibold whitespace-nowrap">
              Seleccionar Escuela / CECO:
            </label>
            <select
              id="school-selector"
              aria-label="Seleccionar Escuela o CECO a visualizar"
              value={ceco}
              onChange={e => onSelectCeco(e.target.value)}
              className="bg-white text-slate-800 font-bold text-xs py-1.5 px-3 rounded-lg border border-white/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300 cursor-pointer"
            >
              <option value="TODOS">🏫 Consolidado General Facultad</option>
              {schools.map(s => (
                <option key={s.ceco} value={s.ceco}>
                  {s.ceco} — {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Notice for Director user that data is strictly filtered to their school */}
      {!isAdmin && currentUserProfile && (
        <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs text-sky-100">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>
              Vista restringida activa: visualizando únicamente los registros contables correspondientes a su Centro de Costo (<strong>{ceco}</strong>).
            </span>
          </div>
          <span className="bg-emerald-500/20 border border-emerald-300/30 text-[10px] px-2 py-0.5 rounded-md font-bold text-emerald-200">
            Aislamiento Seguro CECO
          </span>
        </div>
      )}
    </header>
  );
};
