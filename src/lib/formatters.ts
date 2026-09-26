import { BudgetAccount } from '../types';

export function formatCLP(amount: number, shortFormat: boolean = true): string {
  if (!shortFormat) {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(amount);
  }

  const absAmount = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (absAmount >= 1000000) {
    // Millones de pesos ($MM)
    const valInMM = absAmount / 1000000;
    const formatted = valInMM.toFixed(valInMM % 1 === 0 ? 0 : 2).replace('.', ',');
    return `${sign}$${formatted} MM`;
  } else if (absAmount >= 1000) {
    // Miles de pesos ($M)
    const valInM = absAmount / 1000;
    const formatted = valInM.toFixed(valInM % 1 === 0 ? 0 : 1).replace('.', ',');
    return `${sign}$${formatted} M`;
  } else {
    return `${sign}$${Math.round(absAmount)}`;
  }
}

export function formatPct(num: number): string {
  if (isNaN(num)) return '0%';
  return `${num.toFixed(1).replace('.', ',')}%`;
}

export interface StatusBadge {
  label: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  type: 'danger' | 'warning' | 'normal' | 'info' | 'zero';
}

export function getAccountStatus(account: BudgetAccount): StatusBadge {
  if (account.disponible < 0 || (account.presupuesto === 0 && account.ejecutado > 0)) {
    return {
      label: 'SOBREGIRADA',
      bgClass: 'bg-red-50',
      textClass: 'text-red-700',
      borderClass: 'border-red-200',
      type: 'danger'
    };
  }

  if (account.ejecutado === 0) {
    return {
      label: 'SIN EJECUCIÓN',
      bgClass: 'bg-slate-100',
      textClass: 'text-slate-600',
      borderClass: 'border-slate-200',
      type: 'zero'
    };
  }

  if (account.pct > 80) {
    return {
      label: 'ALTA EJEC.',
      bgClass: 'bg-amber-50',
      textClass: 'text-amber-700',
      borderClass: 'border-amber-200',
      type: 'warning'
    };
  }

  if (account.pct < 20) {
    return {
      label: 'BAJA EJECUCIÓN',
      bgClass: 'bg-sky-50',
      textClass: 'text-sky-700',
      borderClass: 'border-sky-200',
      type: 'info'
    };
  }

  return {
    label: 'EJECUCIÓN NORMAL',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-700',
    borderClass: 'border-emerald-200',
    type: 'normal'
  };
}
