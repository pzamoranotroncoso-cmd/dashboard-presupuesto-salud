import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { LogOut, ShieldCheck, Building2, Share2, Copy, Check, X, ExternalLink, Download, Github, HelpCircle } from 'lucide-react';
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
  onShowToast?: (msg: string) => void;
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
  onShowToast
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareTab, setShareTab] = useState<'link' | 'github'>('link');
  const [copiedLink, setCopiedLink] = useState(false);

  const isAdmin = currentUserProfile?.rol === 'ADMIN';

  // Get reliable public shareable URL for colleagues & directors
  const shareUrl = (() => {
    if (typeof window !== 'undefined') {
      const href = window.location.href;
      if (href && !href.includes('about:') && !href.includes('localhost') && !href.includes('127.0.0.1')) {
        // If currently in development URL, point to public pre-prod app
        if (href.includes('ais-dev-')) {
          return href.replace('ais-dev-', 'ais-pre-');
        }
        return href;
      }
    }
    return 'https://ais-pre-axy4mfpcs4gvv6cn5sdxfu-685840977660.us-west2.run.app';
  })();

  const handleCopyLink = async () => {
    let copied = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        copied = true;
      }
    } catch (e) {
      console.warn('Clipboard writeText failed, using fallback', e);
    }

    if (!copied) {
      try {
        const tempInput = document.createElement('textarea');
        tempInput.value = shareUrl;
        tempInput.style.position = 'fixed';
        tempInput.style.left = '-9999px';
        tempInput.style.top = '0';
        document.body.appendChild(tempInput);
        tempInput.focus();
        tempInput.select();
        copied = document.execCommand('copy');
        document.body.removeChild(tempInput);
      } catch (err) {
        console.error('Fallback execCommand failed', err);
      }
    }

    setCopiedLink(true);
    if (onShowToast) {
      onShowToast('¡Enlace institucional copiado al portapapeles!');
    }
    setTimeout(() => setCopiedLink(false), 3000);
  };
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

            <span className="bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {ceco === 'TODOS' ? 'TODOS LOS CECOS' : `CECO: ${ceco}`}
            </span>

            {/* Silent automatic sync indicator (no manual buttons) */}
            {syncStatus.dataSource === 'google_sheets' && (
              <span
                className="inline-flex items-center gap-1.5 bg-emerald-500/25 text-emerald-100 border border-emerald-300/40 text-xs font-medium px-2.5 py-0.5 rounded-full"
                title={`Última actualización automática silenciosa: ${formatLastSync(syncStatus.lastSyncTime)}`}
              >
                <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-300 animate-spin' : 'bg-emerald-300 animate-pulse'}`} />
                {isSyncing ? 'Actualizando en línea...' : 'Google Sheets En Vivo'}
              </span>
            )}
          </div>

          <p className="text-sky-100 text-xs sm:text-sm font-medium">
            Ejecución Presupuestaria Oficial — Facultad de Salud y Odontología
            {currentUserProfile && (
              <span className="ml-2 font-normal text-sky-200">
                | Usuario: <strong>{currentUserProfile.nombre}</strong> ({currentUserProfile.cargo})
              </span>
            )}
          </p>
        </div>

        {/* Right side: Actions, Period, User badge */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Share App Button */}
          <button
            id="btn-share-app"
            onClick={() => setIsShareModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white border border-white/35 px-3 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
            title="Compartir enlace de la aplicación y verificar permisos de acceso"
          >
            <Share2 className="w-3.5 h-3.5 text-sky-100" />
            <span>Compartir</span>
          </button>

          {/* Period badge */}
          <div className="bg-white/15 backdrop-blur-md border border-white/25 px-3.5 py-2 rounded-xl text-xs font-semibold text-white shadow-inner">
            {periodLabel}
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
      </div>

      {/* Paso 3: Selector Multiescuela exclusivo para Dirección de Gestión y Finanzas y Decanato */}
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
              <option value="TODOS">🏫 Consolidado Facultad (Todos los CECOs)</option>
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

      {/* Modal: Compartir y Control de Acceso por Google/Sheets */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 text-slate-800 relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  Compartir y Exportar Aplicación
                </h3>
                <p className="text-xs text-slate-500">
                  Enlace de acceso institucional o exportación a repositorio GitHub
                </p>
              </div>
            </div>

            {/* Tabs selector */}
            <div className="flex border-b border-slate-200 mb-4 gap-2">
              <button
                type="button"
                onClick={() => setShareTab('link')}
                className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                  shareTab === 'link'
                    ? 'border-sky-600 text-sky-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Enlace Web (Para Usuarios)</span>
              </button>
              <button
                type="button"
                onClick={() => setShareTab('github')}
                className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                  shareTab === 'github'
                    ? 'border-slate-800 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>Exportar a GitHub / Descargar Código</span>
              </button>
            </div>

            {shareTab === 'link' ? (
              <>
                {/* Link Copy Box */}
                <div className="mb-5 bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">
                      Enlace institucional de la aplicación:
                    </label>
                    <a
                      href={shareUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700 hover:text-sky-800 hover:underline"
                    >
                      <span>Abrir en pestaña nueva</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={shareUrl}
                      onClick={e => (e.target as HTMLInputElement).select()}
                      className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 select-all focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                      title="Haz clic para seleccionar todo"
                    />
                    <button
                      type="button"
                      id="btn-copy-share-link"
                      onClick={handleCopyLink}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 shadow-xs active:scale-95 ${
                        copiedLink
                          ? 'bg-emerald-600 text-white'
                          : 'bg-sky-600 hover:bg-sky-700 text-white'
                      }`}
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                      <span>{copiedLink ? '¡Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>

                  {copiedLink && (
                    <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5 animate-in fade-in duration-150">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>¡Enlace copiado al portapapeles! Listo para pegar (Ctrl+V) en un correo o mensaje.</span>
                    </div>
                  )}
                </div>

                {/* Step-by-Step Security & Access Rules */}
                <div className="space-y-3 mb-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    ¿Cómo funciona el acceso seguro por Gmail / Google Sheets?
                  </h4>

                  <div className="flex gap-3 items-start p-3 rounded-xl bg-sky-50/60 border border-sky-100 text-xs">
                    <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <strong className="text-slate-800">Autenticación Obligatoria con Google:</strong>
                      <p className="text-slate-600 mt-0.5">
                        Cualquier persona que reciba el enlace debe presionar "Iniciar Sesión con Google" usando su cuenta de Gmail o correo institucional (@mail.udp.cl).
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start p-3 rounded-xl bg-amber-50/60 border border-amber-100 text-xs">
                    <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <strong className="text-slate-800">Validación Automática en pestaña "Usuarios":</strong>
                      <p className="text-slate-600 mt-0.5">
                        Al iniciar sesión, la aplicación busca el correo en la hoja <strong>Usuarios</strong> de tu Google Sheet. Si el correo <em>NO</em> está en la lista, el sistema le <strong>bloquea el paso automáticamente</strong> con pantalla de "Acceso Denegado".
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <strong className="text-slate-800">Permiso de Lectura en Google Drive:</strong>
                      <p className="text-slate-600 mt-0.5">
                        Debes compartir la planilla Google Sheet en Google Drive con esa persona (como "Lector" o "Editor") para que la API de Drive autorice la descarga de las cifras a su pantalla.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-xs">
                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <strong className="text-slate-800">Aislamiento por Rol y CECO:</strong>
                      <p className="text-slate-600 mt-0.5">
                        Si el usuario tiene rol <strong>DIRECTOR</strong> o <strong>SECRETARIA</strong>, la aplicación solo le permite ver el Centro de Costo asignado a su cargo. Los usuarios <strong>ADMIN</strong> pueden ver todas las escuelas.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4 mb-5">
                {/* Direct Download Button */}
                <div className="p-4 bg-slate-900 text-white rounded-xl shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-sm flex items-center gap-2">
                        <Download className="w-4 h-4 text-emerald-400" />
                        <span>Descargar Código Completo (.ZIP)</span>
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Descarga todo el proyecto listo con React, Vite, Tailwind y configuración completa.
                      </p>
                    </div>
                    <a
                      href="/codigo-proyecto-udp.zip"
                      download="codigo-proyecto-udp.zip"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-xs active:scale-95 shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      <span>Descargar .ZIP</span>
                    </a>
                  </div>
                </div>

                {/* Subir a GitHub en 3 pasos */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Github className="w-4 h-4" />
                    <span>Cómo subirlo a tu GitHub (Paso a Paso):</span>
                  </h4>

                  <ol className="list-decimal list-inside text-xs text-slate-600 space-y-2">
                    <li>
                      <strong>Crea un repositorio en GitHub:</strong> Entra a{' '}
                      <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-sky-600 font-bold hover:underline">
                        github.com/new
                      </a>{' '}
                      y crea un repositorio (ej. <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px]">dashboard-presupuesto</code>).
                    </li>
                    <li>
                      <strong>Descomprime el ZIP:</strong> Extrae la carpeta descargada en tu computadora.
                    </li>
                    <li>
                      <strong>Sube los archivos:</strong> En la página de tu repositorio en GitHub, presiona el botón <strong>"uploading an existing file"</strong> (subir archivos existentes) y arrastra los archivos extraídos, o usa la terminal:
                      <div className="mt-1.5 bg-slate-900 text-slate-100 p-2.5 rounded-lg font-mono text-[11px] overflow-x-auto">
                        <code>git init && git add . && git commit -m "Versión Inicial" && git branch -M main && git remote add origin &lt;TU_URL_DE_GITHUB&gt; && git push -u origin main</code>
                      </div>
                    </li>
                  </ol>
                </div>

                {/* Tip about Google AI Studio export button */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">¿Por qué puede fallar el botón "Export to GitHub" de AI Studio?</strong>
                    <p className="mt-0.5 text-amber-800">
                      Google AI Studio requiere que autorices la aplicación OAuth de GitHub en tu navegador y que el repositorio destino no tenga conflictos. Descargando el archivo <strong>.ZIP</strong> de arriba tienes el código 100% garantizado en tu poder sin depender de conexiones externas.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsShareModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
