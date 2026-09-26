import React from 'react';
import {
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { SyncStatus } from '../types';

interface SyncBannerProps {
  syncStatus: SyncStatus;
  isAdmin: boolean;
  onLogin: () => void;
}

export const SyncBanner: React.FC<SyncBannerProps> = ({
  syncStatus,
  isAdmin,
  onLogin
}) => {
  const isSyncing = syncStatus.state === 'syncing';
  const isLive = syncStatus.dataSource === 'google_sheets';

  const formatTime = (date: Date | null) => {
    if (!date) return 'En espera';
    return date.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDriveDate = (isoStr: string | null) => {
    if (!isoStr) return '';
    try {
      const d = new Date(isoStr);
      return d.toLocaleString('es-CL', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 mb-6 shadow-xs no-print">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Source, File Name, and Silent Live Sync Indicator */}
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg shrink-0 ${
              isLive
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                : 'bg-amber-50 text-amber-600 border border-amber-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-800">
                {syncStatus.fileName || 'Ejecución Presupuestaria Obstetricia Agosto 2026'}
              </span>

              {isLive ? (
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2 py-0.5 rounded-md">
                  <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-500 animate-spin' : 'bg-emerald-500 animate-pulse'}`} />
                  {isSyncing ? 'Sincronizando en vivo...' : 'Conectado a Google Sheets'}
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                  Modelo Inicial (Conéctate para datos en vivo)
                </span>
              )}

              {isAdmin && syncStatus.webViewLink && (
                <a
                  href={syncStatus.webViewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-sky-600 hover:text-sky-800 hover:underline font-semibold ml-1"
                >
                  Abrir Planilla <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500 flex-wrap mt-0.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                Sincronización silenciosa activa | Último chequeo: <strong>{formatTime(syncStatus.lastSyncTime)}</strong>
              </span>

              {syncStatus.lastModifiedInDrive && (
                <span className="flex items-center gap-1 text-slate-600">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  Último cambio en planilla: <strong>{formatDriveDate(syncStatus.lastModifiedInDrive)}</strong>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Security Badge & Status */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="text-[11px] font-medium">Actualización automática en línea</span>
          </div>
        </div>
      </div>

      {/* Error alert if any */}
      {syncStatus.error && (
        <div className="mt-2.5 p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{syncStatus.error}</span>
          </div>
          <button
            onClick={onLogin}
            className="font-bold underline text-red-700 hover:text-red-900 shrink-0 cursor-pointer"
          >
            Reconectar
          </button>
        </div>
      )}
    </div>
  );
};
