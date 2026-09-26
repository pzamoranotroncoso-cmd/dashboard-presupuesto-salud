import React, { useState } from 'react';
import { X, Receipt, Search, Calendar, Tag, Building2, Download } from 'lucide-react';
import { formatCLP } from '../lib/formatters';
import { BudgetAccount, Transaction } from '../types';

interface TransactionModalProps {
  account: BudgetAccount | null;
  onClose: () => void;
  useShortFormat: boolean;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  account,
  onClose,
  useShortFormat
}) => {
  const [filterText, setFilterText] = useState('');

  if (!account) return null;

  const filteredTransactions = account.transactions.filter(t => {
    const q = filterText.toLowerCase();
    return (
      t.glosa.toLowerCase().includes(q) ||
      t.glosa2.toLowerCase().includes(q) ||
      t.fecha.toLowerCase().includes(q) ||
      String(t.valor).includes(q)
    );
  });

  const totalFiltered = filteredTransactions.reduce((sum, t) => sum + t.valor, 0);

  const exportCSV = () => {
    const headers = ["ID", "Cuenta", "Descripcion", "Fecha", "Valor", "Glosa", "Glosa 2", "CECO", "Descrip CECO"];
    const rows = account.transactions.map(t => [
      t.id,
      t.cuenta,
      `"${t.descripcion.replace(/"/g, '""')}"`,
      t.fecha,
      t.valor,
      `"${t.glosa.replace(/"/g, '""')}"`,
      `"${t.glosa2.replace(/"/g, '""')}"`,
      t.ceco,
      `"${t.descripCeco.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Transacciones_${account.id}_${account.name.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-800 to-sky-700 text-white p-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="bg-sky-900/60 border border-sky-400/40 text-xs font-mono font-bold px-2 py-0.5 rounded">
                {account.id}
              </span>
              <span className="text-xs text-sky-200 font-semibold">
                Detalle Transaccional de la Pestaña "Ejecución"
              </span>
            </div>
            <h2 className="text-xl font-black">{account.name}</h2>
            <div className="flex items-center gap-4 text-xs text-sky-100 mt-2 flex-wrap">
              <span>Presupuesto Plan: <strong>{formatCLP(account.presupuesto, useShortFormat)}</strong></span>
              <span>Ejecutado Real: <strong>{formatCLP(account.ejecutado, useShortFormat)}</strong></span>
              <span>Disponible: <strong className={account.disponible < 0 ? 'text-red-300' : 'text-emerald-300'}>{formatCLP(account.disponible, useShortFormat)}</strong></span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar en glosas, facturas o fecha..."
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-slate-500 font-medium">
              {filteredTransactions.length} registros ({formatCLP(totalFiltered, useShortFormat)})
            </span>
            {account.transactions.length > 0 && (
              <button
                onClick={exportCSV}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar CSV</span>
              </button>
            )}
          </div>
        </div>

        {/* Body table */}
        <div className="overflow-y-auto flex-grow p-4">
          {filteredTransactions.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <Receipt className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-semibold text-sm">No hay registros transaccionales registrados para esta cuenta.</p>
              <p className="text-xs text-slate-400">
                Esta cuenta puede estar planificada pero aún no presenta consumos en la pestaña "Ejecución".
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTransactions.map((tx, idx) => (
                <div
                  key={tx.id || idx}
                  className="bg-white border border-slate-200 rounded-xl p-3.5 hover:border-sky-300 transition-colors shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {tx.fecha || 'Sin fecha'}
                      </span>
                      {tx.ceco && (
                        <span className="flex items-center gap-1 bg-sky-50 text-sky-800 px-2 py-0.5 rounded border border-sky-200">
                          <Building2 className="w-3 h-3" />
                          CECO: {tx.ceco}
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-bold text-slate-900 mt-1">
                      {tx.glosa || 'Sin glosa principal registrada'}
                    </p>

                    {tx.glosa2 && (
                      <p className="text-xs text-slate-600 flex items-center gap-1.5">
                        <Tag className="w-3 h-3 text-slate-400 shrink-0" />
                        {tx.glosa2}
                      </p>
                    )}
                  </div>

                  <div className="text-left md:text-right border-t md:border-t-0 pt-2 md:pt-0 border-slate-100 shrink-0">
                    <span className="text-xs text-slate-400 block font-medium">Valor Registrado</span>
                    <span className="text-base font-extrabold text-sky-900 tabular-nums">
                      {formatCLP(tx.valor, false)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Fuente oficial: Pestaña <strong>Ejecución</strong> de Google Sheets
          </span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Cerrar Detalle
          </button>
        </div>
      </div>
    </div>
  );
};
