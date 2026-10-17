import React, { useState } from 'react';
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileText
} from 'lucide-react';
import { BudgetAccount } from '../types';
import { formatCLP, formatPct, getAccountStatus } from '../lib/formatters';

interface BudgetTableProps {
  accounts: BudgetAccount[];
  allAccounts: BudgetAccount[];
  useShortFormat: boolean;
  ceco: string;
  cecoName?: string;
  onSelectAccount: (account: BudgetAccount) => void;
}

type SortField = 'id' | 'name' | 'presupuesto' | 'ejecutado' | 'disponible' | 'pct';

export const BudgetTable: React.FC<BudgetTableProps> = ({
  accounts,
  allAccounts,
  useShortFormat,
  ceco,
  cecoName,
  onSelectAccount
}) => {
  const [sortField, setSortField] = useState<SortField>('presupuesto');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(field === 'id' || field === 'name');
    }
  };

  const sortedAccounts = [...accounts].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (typeof aVal === 'string') {
      return sortAsc
        ? (aVal as string).localeCompare(bVal as string)
        : (bVal as string).localeCompare(aVal as string);
    }

    return sortAsc
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  });

  const totalPresupuesto = accounts.reduce((sum, a) => sum + a.presupuesto, 0);
  const totalEjecutado = accounts.reduce((sum, a) => sum + a.ejecutado, 0);
  const totalDisponible = totalPresupuesto - totalEjecutado;
  const totalPct = totalPresupuesto > 0 ? (totalEjecutado / totalPresupuesto) * 100 : (totalEjecutado > 0 ? 100 : 0);

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-60 ml-1 inline" />;
    }
    return sortAsc ? (
      <ChevronUp className="w-3.5 h-3.5 text-sky-600 ml-1 inline" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-sky-600 ml-1 inline" />
    );
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs mb-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
            Detalle Oficial por Clase de Coste {ceco !== 'TODOS' && cecoName ? `— ${cecoName}` : ''}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            N° de Cuenta vinculado a la Descripción de Cuenta entre Plan y Ejecución. Haz clic sobre cualquier cuenta para ver su desglose detallado.
          </p>
        </div>
        <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-semibold self-start sm:self-auto">
          {sortedAccounts.length} {sortedAccounts.length === 1 ? 'cuenta' : 'cuentas'}
        </span>
      </div>

      <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
        <table className="w-full border-collapse text-xs sm:text-sm text-left">
          <thead>
            <tr className="bg-slate-100/80 text-slate-600 border-b-2 border-slate-200 text-xs uppercase font-bold tracking-wider">
              {/* Columna 1: N° de Cuenta */}
              <th
                onClick={() => handleSort('id')}
                className="py-3 px-3.5 cursor-pointer hover:bg-slate-200/70 transition-colors whitespace-nowrap"
              >
                N° de Cuenta {renderSortIcon('id')}
              </th>

              {/* Columna 2: Descripción Cuenta */}
              <th
                onClick={() => handleSort('name')}
                className="py-3 px-3.5 cursor-pointer hover:bg-slate-200/70 transition-colors min-w-[200px]"
              >
                Descripción Cuenta {renderSortIcon('name')}
              </th>

              {/* Columna 3: Presupuesto */}
              <th
                onClick={() => handleSort('presupuesto')}
                className="py-3 px-3.5 text-right cursor-pointer hover:bg-slate-200/70 transition-colors whitespace-nowrap"
              >
                Presupuesto {renderSortIcon('presupuesto')}
              </th>

              {/* Columna 4: Ejecutado */}
              <th
                onClick={() => handleSort('ejecutado')}
                className="py-3 px-3.5 text-right cursor-pointer hover:bg-slate-200/70 transition-colors whitespace-nowrap"
              >
                Ejecutado {renderSortIcon('ejecutado')}
              </th>

              {/* Columna 5: % Avance de Ejecución */}
              <th
                onClick={() => handleSort('pct')}
                className="py-3 px-3.5 cursor-pointer hover:bg-slate-200/70 transition-colors min-w-[140px]"
              >
                % Avance Ejecución {renderSortIcon('pct')}
              </th>

              {/* Columna 6: Saldo Disponible */}
              <th
                onClick={() => handleSort('disponible')}
                className="py-3 px-3.5 text-right cursor-pointer hover:bg-slate-200/70 transition-colors whitespace-nowrap"
              >
                Disponible {renderSortIcon('disponible')}
              </th>

              {/* Columna 7: Estado */}
              <th className="py-3 px-3.5 text-center whitespace-nowrap">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedAccounts.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <AlertCircle className="w-8 h-8 text-slate-300" />
                    <p>No se encontraron cuentas contables coincidentes con los filtros aplicados.</p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedAccounts.map(account => {
                const status = getAccountStatus(account);
                const isOver = account.disponible < 0 || (account.presupuesto === 0 && account.ejecutado > 0);
                const progressWidth = Math.min(Math.max(account.pct, 0), 100);

                let progressColorClass = 'bg-emerald-500';
                if (isOver) {
                  progressColorClass = 'bg-red-500';
                } else if (account.pct > 80) {
                  progressColorClass = 'bg-amber-500';
                } else if (account.pct < 20) {
                  progressColorClass = 'bg-sky-500';
                }

                return (
                  <tr
                    key={`${account.ceco || ''}_${account.id}`}
                    onClick={() => onSelectAccount(account)}
                    className="hover:bg-sky-50/60 transition-colors cursor-pointer group"
                    title="Clic para ver detalle de la cuenta, plan y transacciones"
                  >
                    {/* N° de Cuenta con icono interactivo visible siempre */}
                    <td className="py-3 px-3.5 font-bold text-slate-900 group-hover:text-sky-700 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{account.id}</span>
                        <span
                          className="inline-flex items-center justify-center w-5 h-5 rounded bg-sky-100/70 text-sky-700 group-hover:bg-sky-600 group-hover:text-white transition-colors shrink-0"
                          title="Ver detalle oficial de la cuenta"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </td>

                    {/* Descripción Cuenta */}
                    <td className="py-3 px-3.5 font-semibold text-slate-800">
                      <span>{account.name}</span>
                    </td>

                    {/* Presupuesto */}
                    <td className="py-3 px-3.5 text-right font-medium text-slate-600 whitespace-nowrap tabular-nums">
                      {formatCLP(account.presupuesto, useShortFormat)}
                    </td>

                    {/* Ejecutado */}
                    <td className="py-3 px-3.5 text-right font-bold text-sky-800 whitespace-nowrap tabular-nums">
                      {formatCLP(account.ejecutado, useShortFormat)}
                    </td>

                    {/* % Avance Ejecución con barra */}
                    <td className="py-3 px-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden shrink-0">
                          <div
                            className={`h-full rounded-full ${progressColorClass}`}
                            style={{ width: `${progressWidth}%` }}
                          />
                        </div>
                        <span className="font-bold text-xs tabular-nums text-slate-700">
                          {isOver && account.presupuesto === 0
                            ? 'Sobregiro ($0 ppto)'
                            : formatPct(account.pct)}
                        </span>
                      </div>
                    </td>

                    {/* Saldo Disponible */}
                    <td
                      className={`py-3 px-3.5 text-right font-bold whitespace-nowrap tabular-nums ${
                        account.disponible < 0 ? 'text-red-600' : 'text-emerald-700'
                      }`}
                    >
                      {formatCLP(account.disponible, useShortFormat)}
                    </td>

                    {/* Estado */}
                    <td className="py-3 px-3.5 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${status.bgClass} ${status.textClass} ${status.borderClass}`}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

          {/* Fila de Totales */}
          {sortedAccounts.length > 0 && (
            <tfoot>
              <tr className="bg-slate-50 font-bold text-slate-900 border-t-2 border-slate-300">
                <td className="py-3.5 px-3.5">TOTALES</td>
                <td className="py-3.5 px-3.5 text-xs text-slate-500 font-semibold">
                  {sortedAccounts.length} cuentas listadas
                </td>
                <td className="py-3.5 px-3.5 text-right whitespace-nowrap tabular-nums font-black">
                  {formatCLP(totalPresupuesto, useShortFormat)}
                </td>
                <td className="py-3.5 px-3.5 text-right text-sky-800 whitespace-nowrap tabular-nums font-black">
                  {formatCLP(totalEjecutado, useShortFormat)}
                </td>
                <td className="py-3.5 px-3.5 whitespace-nowrap">
                  <span className="font-extrabold text-xs text-slate-800">
                    {formatPct(totalPct)}
                  </span>
                </td>
                <td
                  className={`py-3.5 px-3.5 text-right whitespace-nowrap tabular-nums font-black ${
                    totalDisponible < 0 ? 'text-red-600' : 'text-emerald-700'
                  }`}
                >
                  {formatCLP(totalDisponible, useShortFormat)}
                </td>
                <td className="py-3.5 px-3.5 text-center text-xs font-semibold text-slate-500">
                  Resumen
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};
