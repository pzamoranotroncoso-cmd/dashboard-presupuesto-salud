import React, { useState } from 'react';
import { X, Receipt, Search, Calendar, Tag, Building2, Download, CheckCircle2, TrendingUp } from 'lucide-react';
import { formatCLP, formatPct } from '../lib/formatters';
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

  const filteredTransactions = (account.transactions || []).filter(t => {
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
    const rows = (account.transactions || []).map(t => [
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

  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-800 to-sky-700 text-white p-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="bg-sky-900/60 border border-sky-400/40 text-xs font-mono font-bold px-2 py-0.5 rounded">
                Cuenta: {account.id}
              </span>
              {account.tipoPresupuesto && (
                <span className="bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                  {account.tipoPresupuesto}
                </span>
              )}
              {account.descripCeco && (
                <span className="text-xs text-sky-200 font-semibold">
                  {account.descripCeco}
                </span>
              )}
            </div>
            <h2 className="text-xl font-black">{account.name}</h2>
            <div className="flex items-center gap-4 text-xs text-sky-100 mt-2 flex-wrap">
              <span>Presupuesto Plan: <strong>{formatCLP(account.presupuesto, useShortFormat)}</strong></span>
              <span>Ejecutado Real: <strong>{formatCLP(account.ejecutado, useShortFormat)}</strong></span>
              <span>
                Disponible: <strong className={account.disponible < 0 ? 'text-red-300' : 'text-emerald-300'}>
                  {formatCLP(account.disponible, useShortFormat)}
                </strong>
              </span>
              <span>Avance: <strong>{formatPct(account.pct)}</strong></span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-grow p-4 space-y-4">
          {/* Desglose por Escuela si es Consolidado */}
          {account.cecoBreakdown && account.cecoBreakdown.length > 1 && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <Building2 className="w-4 h-4 text-sky-600" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Desglose por Escuela / Unidad Académica
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="py-1.5 px-2">Escuela</th>
                      <th className="py-1.5 px-2 text-right">Presupuesto</th>
                      <th className="py-1.5 px-2 text-right">Ejecutado</th>
                      <th className="py-1.5 px-2 text-right">Disponible</th>
                      <th className="py-1.5 px-2 text-right">% Avance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {account.cecoBreakdown.map((cb, idx) => (
                      <tr key={idx} className="hover:bg-white/70">
                        <td className="py-1.5 px-2 font-semibold text-slate-800">
                          {cb.descripCeco || cb.ceco}
                        </td>
                        <td className="py-1.5 px-2 text-right font-medium text-slate-600">
                          {formatCLP(cb.presupuesto, useShortFormat)}
                        </td>
                        <td className="py-1.5 px-2 text-right font-bold text-sky-700">
                          {formatCLP(cb.ejecutado, useShortFormat)}
                        </td>
                        <td className={`py-1.5 px-2 text-right font-bold ${cb.disponible < 0 ? 'text-red-600' : 'text-emerald-700'}`}>
                          {formatCLP(cb.disponible, useShortFormat)}
                        </td>
                        <td className="py-1.5 px-2 text-right font-bold text-slate-700">
                          {formatPct(cb.pct)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Distribución Mensual Planificada vs Ejecutada */}
          <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-3.5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
              <h3 className="text-xs font-bold text-sky-950 uppercase tracking-wide">
                Distribución Mensual (Ene - Dic)
              </h3>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 text-center">
              {months.map(m => {
                const planVal = account.monthlyPlan?.[m] || 0;
                const ejecVal = account.monthlyExec?.[m] || 0;
                return (
                  <div key={m} className="bg-white rounded border border-slate-200 p-1.5 text-[10px]">
                    <span className="font-bold text-slate-600 block">{m}</span>
                    <span className="text-slate-500 block text-[9px] truncate" title={`Plan: ${formatCLP(planVal, false)}`}>
                      P: {formatCLP(planVal, true)}
                    </span>
                    <span className={`block font-bold text-[9px] truncate ${ejecVal > 0 ? 'text-sky-700' : 'text-slate-300'}`} title={`Ejec: ${formatCLP(ejecVal, false)}`}>
                      E: {formatCLP(ejecVal, true)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Toolbar de búsqueda y exportación de transacciones */}
          <div className="p-3 border border-slate-200 bg-slate-50 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
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
              {account.transactions && account.transactions.length > 0 && (
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

          {/* Listado de Transacciones */}
          {filteredTransactions.length === 0 ? (
            <div className="py-8 text-center text-slate-500 space-y-2 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
              <Receipt className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-semibold text-xs text-slate-700">
                {account.ejecutado === 0
                  ? "Esta cuenta no presenta transacciones ejecutadas en el período."
                  : "No se encontraron transacciones coincidentes con la búsqueda."}
              </p>
              <p className="text-[11px] text-slate-400 max-w-md mx-auto">
                {account.ejecutado === 0
                  ? `Cuenta planificada con ${formatCLP(account.presupuesto, useShortFormat)}. Su saldo se encuentra 100% disponible.`
                  : "Prueba modificando el texto del filtro de búsqueda superior."}
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredTransactions.map((tx, idx) => (
                <div
                  key={tx.id || idx}
                  className="bg-white border border-slate-200 rounded-xl p-3 hover:border-sky-300 transition-colors shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3"
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
                          CECO: {tx.ceco} {tx.descripCeco ? `— ${tx.descripCeco}` : ''}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
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
                    <span className="text-[11px] text-slate-400 block font-medium">Valor Registrado</span>
                    <span className="text-sm sm:text-base font-black text-sky-900 tabular-nums">
                      {formatCLP(tx.valor, useShortFormat)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
