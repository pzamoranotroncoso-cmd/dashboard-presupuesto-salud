import React, { useState } from 'react';
import { X, Search, FileSpreadsheet, ExternalLink, Link2, Check, RefreshCw } from 'lucide-react';
import { GoogleDriveFile } from '../types';

interface FileSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: GoogleDriveFile[];
  selectedFileId: string | null;
  onSelectFile: (fileId: string, fileName?: string) => void;
  isLoading: boolean;
  onRefreshDrive: () => void;
}

export const FileSelectorModal: React.FC<FileSelectorModalProps> = ({
  isOpen,
  onClose,
  files,
  selectedFileId,
  onSelectFile,
  isLoading,
  onRefreshDrive
}) => {
  const [search, setSearch] = useState('');
  const [customInput, setCustomInput] = useState('');

  if (!isOpen) return null;

  const filteredFiles = files.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    // Extract ID if full URL was pasted
    let id = customInput.trim();
    const match = id.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      id = match[1];
    }
    onSelectFile(id, 'Planilla seleccionada por URL');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Seleccionar Planilla de Google Drive
              </h2>
              <p className="text-xs text-slate-500">
                Planillas de cálculo disponibles en tu cuenta de Google Drive
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Custom URL / ID input */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="O pega el enlace de Google Sheets o ID del archivo..."
                value={customInput}
                onChange={e => setCustomInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <button
              type="submit"
              disabled={!customInput.trim()}
              className="bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Conectar
            </button>
          </form>
        </div>

        {/* Search & Refresh */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre de archivo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <button
            onClick={onRefreshDrive}
            disabled={isLoading}
            className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refrescar Drive</span>
          </button>
        </div>

        {/* Files list */}
        <div className="overflow-y-auto flex-grow p-4 space-y-2">
          {isLoading ? (
            <div className="py-12 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-sky-500 mb-2" />
              <p className="text-sm font-medium">Buscando archivos en Google Drive...</p>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <FileSpreadsheet className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-semibold text-sm">No se encontraron planillas con ese nombre</p>
              <p className="text-xs text-slate-400">
                Puedes ingresar el enlace directo o ID de la planilla en el campo de arriba.
              </p>
            </div>
          ) : (
            filteredFiles.map(file => {
              const isSelected = file.id === selectedFileId;
              const isTarget = file.name.toLowerCase().includes('obstetricia');

              return (
                <div
                  key={file.id}
                  onClick={() => {
                    onSelectFile(file.id, file.name);
                    onClose();
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50/70'
                      : isTarget
                      ? 'border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-emerald-100/70 text-emerald-700 rounded-lg shrink-0">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {file.name}
                        </p>
                        {isTarget && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                            Recomendada
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        Modificado: {new Date(file.modifiedTime).toLocaleString('es-CL')}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 bg-sky-100 px-2.5 py-1 rounded-lg">
                        <Check className="w-3.5 h-3.5" /> Activa
                      </span>
                    )}
                    {file.webViewLink && (
                      <a
                        href={file.webViewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100"
                        title="Abrir en pestaña nueva"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
