import React, { useState, useRef, useEffect } from 'react';
import { Search, RotateCw, Filter, Calendar, Percent, Layers, Printer, ChevronDown, Check, X } from 'lucide-react';
import { StatusFilterType } from '../types';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  statusFilter: StatusFilterType;
  onStatusFilterChange: (val: StatusFilterType) => void;
  selectedAccounts: string[];
  onSelectedAccountsChange: (val: string[]) => void;
  accountOptions: { id: string; name: string }[];
  selectedMonth: string;
  onSelectedMonthChange: (val: string) => void;
  availableMonths: string[];
  useShortFormat: boolean;
  onToggleFormat: () => void;
  usePercentOnlyMode: boolean;
  onTogglePercentMode: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  selectedAccounts,
  onSelectedAccountsChange,
  accountOptions,
  selectedMonth,
  onSelectedMonthChange,
  availableMonths,
  useShortFormat,
  onToggleFormat,
  usePercentOnlyMode,
  onTogglePercentMode
}) => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [accountSearchQuery, setAccountSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAllSelected = selectedAccounts.length === 0;
  const isNoneSelected = selectedAccounts.length === 1 && selectedAccounts[0] === '__NONE__';

  const isAccountChecked = (id: string) => {
    if (isNoneSelected) return false;
    if (isAllSelected) return true;
    return selectedAccounts.includes(id);
  };

  const handleToggleAccount = (id: string) => {
    if (isAllSelected) {
      // Transition from all selected to all EXCEPT this one
      const remaining = accountOptions.map(a => a.id).filter(accId => accId !== id);
      onSelectedAccountsChange(remaining.length > 0 ? remaining : ['__NONE__']);
    } else if (isNoneSelected) {
      // Start selection with only this one
      onSelectedAccountsChange([id]);
    } else {
      if (selectedAccounts.includes(id)) {
        const next = selectedAccounts.filter(accId => accId !== id);
        onSelectedAccountsChange(next.length > 0 ? next : ['__NONE__']);
      } else {
        const next = [...selectedAccounts, id];
        if (next.length === accountOptions.length) {
          onSelectedAccountsChange([]); // Back to all
        } else {
          onSelectedAccountsChange(next);
        }
      }
    }
  };

  const handleIsolateAccount = (id: string) => {
    onSelectedAccountsChange([id]);
  };

  const handleSelectAll = () => {
    onSelectedAccountsChange([]);
  };

  const handleDeselectAll = () => {
    onSelectedAccountsChange(['__NONE__']);
  };

  // Filter accounts inside the popover
  const filteredOptions = accountOptions.filter(acc => {
    if (!accountSearchQuery.trim()) return true;
    const q = accountSearchQuery.toLowerCase();
    return acc.id.toLowerCase().includes(q) || acc.name.toLowerCase().includes(q);
  });

  // Determine button trigger label & count
  let buttonLabel = `Todas las Cuentas (${accountOptions.length})`;
  let isFiltered = false;
  let selectedCount = accountOptions.length;

  if (isNoneSelected) {
    buttonLabel = 'Ninguna Cuenta (0)';
    isFiltered = true;
    selectedCount = 0;
  } else if (!isAllSelected) {
    isFiltered = true;
    selectedCount = selectedAccounts.length;
    if (selectedAccounts.length === 1) {
      const matched = accountOptions.find(a => a.id === selectedAccounts[0]);
      buttonLabel = matched ? `${matched.id} — ${matched.name}` : `Cuenta ${selectedAccounts[0]}`;
    } else {
      buttonLabel = `${selectedAccounts.length} Cuentas Seleccionadas`;
    }
  }

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 mb-6 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 no-print">
      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search account */}
        <div className="relative min-w-[220px] flex-1 sm:flex-initial">
          <label htmlFor="searchInput" className="sr-only">Buscar cuenta</label>
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="searchInput"
            type="text"
            placeholder="Buscar por código o nombre..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
          <label htmlFor="statusFilter" className="sr-only">Estado Presupuestario</label>
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:block" />
          <select
            id="statusFilter"
            aria-label="Estado Presupuestario"
            value={statusFilter}
            onChange={e => onStatusFilterChange(e.target.value as StatusFilterType)}
            className="w-full sm:w-auto px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all cursor-pointer"
          >
            <option value="ALL">-- Todos los Estados --</option>
            <option value="OVER">Sobregirados / Sin Presupuesto Inicial</option>
            <option value="EXEC">Con Ejecución</option>
            <option value="ZERO">Sin Ejecución ($0)</option>
            <option value="HIGH">Alta Ejecución (&gt;80%)</option>
          </select>
        </div>

        {/* Multi-Select Account filter (Cuentas) */}
        <div className="relative flex items-center gap-1.5 flex-1 sm:flex-initial" ref={dropdownRef}>
          <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:block" />
          <button
            type="button"
            id="accountFilterBtn"
            onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
            aria-label="Filtrar por Cuentas"
            className={`w-full sm:w-auto max-w-[280px] flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-xs sm:text-sm font-semibold transition-all cursor-pointer truncate ${
              isFiltered
                ? 'bg-sky-50 text-sky-900 border-sky-300 ring-1 ring-sky-200'
                : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-white'
            }`}
          >
            <span className="truncate text-left">{buttonLabel}</span>
            <div className="flex items-center gap-1.5 shrink-0">
              {isFiltered && (
                <span className="bg-sky-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                  {selectedCount}
                </span>
              )}
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isAccountDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {/* Quick Clear Filter Button */}
          {isFiltered && (
            <button
              type="button"
              onClick={handleSelectAll}
              title="Restablecer a todas las cuentas"
              className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Multi-select Dropdown Popover */}
          {isAccountDropdownOpen && (
            <div className="absolute left-0 top-full mt-1.5 z-50 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 flex flex-col gap-2.5 animate-in fade-in zoom-in-95 duration-100">
              {/* Popover Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-600" />
                  Filtrar por Cuentas
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  {selectedCount} de {accountOptions.length} seleccionadas
                </span>
              </div>

              {/* Search inside account list */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar código o nombre de cuenta..."
                  value={accountSearchQuery}
                  onChange={e => setAccountSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-200 outline-none"
                />
              </div>

              {/* Quick action buttons */}
              <div className="flex items-center justify-between text-xs px-1">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-xs font-bold text-sky-600 hover:text-sky-800 hover:underline cursor-pointer"
                >
                  ✓ Seleccionar Todas
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={handleDeselectAll}
                  className="text-xs font-medium text-slate-500 hover:text-rose-600 hover:underline cursor-pointer"
                >
                  ✕ Deseleccionar Todas
                </button>
              </div>

              {/* Scrollable list of accounts with checkboxes */}
              <div className="max-h-60 overflow-y-auto space-y-0.5 divide-y divide-slate-100/70 pr-1">
                {filteredOptions.map(acc => {
                  const checked = isAccountChecked(acc.id);
                  return (
                    <div
                      key={acc.id}
                      onClick={() => handleToggleAccount(acc.id)}
                      className={`flex items-center justify-between p-2 rounded-lg text-xs hover:bg-sky-50/50 transition-colors group cursor-pointer ${
                        checked ? 'bg-sky-50/40 font-medium' : 'text-slate-600 opacity-80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                            checked
                              ? 'bg-sky-600 border-sky-600 text-white'
                              : 'border-slate-300 bg-white group-hover:border-slate-400'
                          }`}
                        >
                          {checked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-bold text-slate-800 font-mono shrink-0">{acc.id}</span>
                        <span className="truncate text-slate-700" title={acc.name}>{acc.name}</span>
                      </div>

                      {/* Isolate single account button */}
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          handleIsolateAccount(acc.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-[10px] text-sky-700 bg-sky-100 hover:bg-sky-200 px-2 py-0.5 rounded font-bold transition-opacity shrink-0 ml-2 cursor-pointer"
                        title="Seleccionar exclusivamente esta cuenta"
                      >
                        Solo esta
                      </button>
                    </div>
                  );
                })}

                {filteredOptions.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-4 italic">
                    No hay cuentas coincidentes.
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Selección múltiple</span>
                <button
                  type="button"
                  onClick={() => setIsAccountDropdownOpen(false)}
                  className="px-3 py-1 text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 rounded-md transition-colors cursor-pointer shadow-xs"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Month selector filter */}
        <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
          <label htmlFor="monthFilter" className="sr-only">Periodo / Mes</label>
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:block" />
          <select
            id="monthFilter"
            aria-label="Periodo / Mes"
            value={selectedMonth}
            onChange={e => onSelectedMonthChange(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all cursor-pointer"
          >
            <option value="ALL">Acumulado Total (A Agosto)</option>
            {availableMonths.map(m => (
              <option key={m} value={m}>
                Solo Mes: {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions: Toggle format, Toggle % mode, and Print */}
      <div className="flex items-center gap-2.5 self-end md:self-auto flex-wrap">
        {/* Toggle currency format: only visible when NOT in % mode */}
        {!usePercentOnlyMode && (
          <button
            id="btn-toggle-format"
            onClick={onToggleFormat}
            className="inline-flex items-center gap-1.5 border px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
            title="Alternar entre notación resumida en millones y montos completos en CLP"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{useShortFormat ? 'Notación: $M / $MM' : 'Notación: $ CLP Completo'}</span>
          </button>
        )}

        {/* Botón Solicitado: Cambiar todos los valores a ejecución de % */}
        <button
          id="btn-toggle-percent-mode"
          onClick={onTogglePercentMode}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border shadow-2xs ${
            usePercentOnlyMode
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700 ring-2 ring-indigo-200'
              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
          }`}
          title="Cambiar todos los valores y tarjetas a % (Modo Presentación: oculta cifras en pesos para audiencias)"
        >
          <Percent className="w-3.5 h-3.5" />
          <span>{usePercentOnlyMode ? '🔒 Modo % Activo (Cifras Ocultas)' : '📊 Ver en % (Modo Presentación)'}</span>
        </button>

        <button
          id="btn-print"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer"
          title="Imprimir informe oficial o guardar en PDF"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Imprimir / PDF</span>
        </button>
      </div>
    </div>
  );
};
