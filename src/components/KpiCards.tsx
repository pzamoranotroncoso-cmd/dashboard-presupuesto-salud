import React from 'react';
import { formatCLP, formatPct } from '../lib/formatters';
import { BudgetAccount } from '../types';

interface KpiCardsProps {
  accounts: BudgetAccount[];
  filteredAccounts: BudgetAccount[];
  useShortFormat: boolean;
  usePercentOnlyMode?: boolean;
  ceco: string;
}

export const KpiCards: React.FC<KpiCardsProps> = ({
  accounts,
  filteredAccounts,
  useShortFormat,
  usePercentOnlyMode = false,
  ceco
}) => {
  const isFiltered = filteredAccounts.length !== accounts.length;

  // Interactive calculations based on filtered/selected accounts
  const totalPresupuesto = filteredAccounts.reduce((acc, c) => acc + c.presupuesto, 0);
  const totalEjecutado = filteredAccounts.reduce((acc, c) => acc + c.ejecutado, 0);
  const totalDisponible = totalPresupuesto - totalEjecutado;

  const pctEjecutado = totalPresupuesto > 0 ? (totalEjecutado / totalPresupuesto) * 100 : (totalEjecutado > 0 ? 100 : 0);
  const pctDisponible = totalPresupuesto > 0 ? (totalDisponible / totalPresupuesto) * 100 : 0;

  const overbudgetAccounts = filteredAccounts.filter(
    c => (c.presupuesto === 0 && c.ejecutado > 0) || c.ejecutado > c.presupuesto
  );
  const overbudgetCount = overbudgetAccounts.length;

  const overbudgetNames = overbudgetAccounts
    .map(a => a.name)
    .slice(0, 2)
    .join(' e ');

  // Percentage of accounts overbudget among currently viewed accounts
  const pctCuentasSobregiro = filteredAccounts.length > 0 ? (overbudgetCount / filteredAccounts.length) * 100 : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      {/* 1. Presupuesto Asignado */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0284c7]" />
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Presupuesto Asignado
            </p>
            {isFiltered && !usePercentOnlyMode && (
              <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full">
                {filteredAccounts.length} {filteredAccounts.length === 1 ? 'cuenta' : 'cuentas'}
              </span>
            )}
            {usePercentOnlyMode && (
              <span className="text-[10px] bg-sky-100 text-sky-800 font-semibold px-2 py-0.5 rounded-full">
                Base 100%
              </span>
            )}
          </div>
          <p className="text-2xl font-black text-slate-900 leading-tight mb-1">
            {usePercentOnlyMode ? '100,0%' : formatCLP(totalPresupuesto, useShortFormat)}
          </p>
        </div>
        <p className="text-xs text-slate-500 font-medium mt-2">
          {usePercentOnlyMode
            ? 'Marco presupuestario total (100,0%)'
            : isFiltered
            ? `Total ${filteredAccounts.length} cuenta${filteredAccounts.length === 1 ? '' : 's'} seleccionada${filteredAccounts.length === 1 ? '' : 's'}`
            : `Total planificado CECO ${ceco}`}
        </p>
      </div>

      {/* 2. Ejecutado Acumulado */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#059669]" />
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Ejecutado Acumulado
            </p>
            {isFiltered && !usePercentOnlyMode && (
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                {formatPct(pctEjecutado)}
              </span>
            )}
            {usePercentOnlyMode && (
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                Avance Real
              </span>
            )}
          </div>
          <p className="text-2xl font-black text-emerald-700 leading-tight mb-1">
            {usePercentOnlyMode ? formatPct(pctEjecutado) : formatCLP(totalEjecutado, useShortFormat)}
          </p>
        </div>
        <p className="text-xs text-emerald-700 font-semibold mt-2">
          {formatPct(pctEjecutado)} de avance {isFiltered ? 'en cuentas seleccionadas' : 'sobre el presupuesto'}
        </p>
      </div>

      {/* 3. Saldo Disponible */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0284c7]" />
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Saldo Disponible
            </p>
            {usePercentOnlyMode && (
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${pctDisponible < 0 ? 'bg-red-100 text-red-800' : 'bg-sky-100 text-sky-800'}`}>
                Margen
              </span>
            )}
          </div>
          <p className={`text-2xl font-black leading-tight mb-1 ${totalDisponible < 0 ? 'text-red-600' : 'text-slate-900'}`}>
            {usePercentOnlyMode ? formatPct(pctDisponible) : formatCLP(totalDisponible, useShortFormat)}
          </p>
        </div>
        <p className="text-xs text-slate-500 font-medium mt-2">
          {formatPct(pctDisponible)} remanente {isFiltered ? 'en cuentas seleccionadas' : 'por ejecutar'}
        </p>
      </div>

      {/* 4. Cuentas con Sobregiro / Tasa de Desvío */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#dc2626]" />
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              {usePercentOnlyMode ? 'Tasa Cuentas con Sobregiro' : 'Cuentas con Sobregiro'}
            </p>
          </div>
          <p className="text-2xl font-black text-red-600 leading-tight mb-1">
            {usePercentOnlyMode
              ? formatPct(pctCuentasSobregiro)
              : `${overbudgetCount} ${overbudgetCount === 1 ? 'Cuenta' : 'Cuentas'}`}
          </p>
        </div>
        <p className="text-xs text-slate-500 font-medium truncate mt-2" title={overbudgetAccounts.map(a => a.name).join(', ')}>
          {usePercentOnlyMode
            ? (overbudgetCount > 0 ? `${formatPct(pctCuentasSobregiro)} del catálogo (${overbudgetNames})` : '0,0% sin sobregiros')
            : (overbudgetCount > 0 ? (overbudgetNames || 'Gastos sin presupuesto') : 'Sin sobregiros detectados')}
        </p>
      </div>
    </div>
  );
};
