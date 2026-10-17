import React, { useEffect, useRef } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { formatCLP, formatPct } from '../lib/formatters';
import { BudgetAccount, MonthlyEvolutionItem } from '../types';

// Register Chart.js components
Chart.register(
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartsSectionProps {
  accounts: BudgetAccount[];
  monthlyEvolution: MonthlyEvolutionItem[];
  useShortFormat: boolean;
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({
  accounts,
  monthlyEvolution,
  useShortFormat
}) => {
  const chartComparativoRef = useRef<HTMLCanvasElement | null>(null);
  const chartEvolucionRef = useRef<HTMLCanvasElement | null>(null);
  const chartParticipacionRef = useRef<HTMLCanvasElement | null>(null);
  const chartPorcentajeRef = useRef<HTMLCanvasElement | null>(null);

  const chartComparativoInst = useRef<Chart | null>(null);
  const chartEvolucionInst = useRef<Chart | null>(null);
  const chartParticipacionInst = useRef<Chart | null>(null);
  const chartPorcentajeInst = useRef<Chart | null>(null);

  const totalPresupuesto = accounts.reduce((sum, a) => sum + a.presupuesto, 0);

  useEffect(() => {
    // 1. Chart Comparativo (Presupuesto vs Ejecutado)
    if (chartComparativoRef.current) {
      if (chartComparativoInst.current) {
        chartComparativoInst.current.destroy();
      }

      // Take top 8 accounts for clean presentation
      const displayAccounts = accounts.slice(0, 8);
      const labels = displayAccounts.map(c => c.name.length > 22 ? c.name.slice(0, 20) + '...' : c.name);

      chartComparativoInst.current = new Chart(chartComparativoRef.current, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Presupuesto',
              data: displayAccounts.map(c => c.presupuesto),
              backgroundColor: '#cbd5e1',
              borderRadius: 4
            },
            {
              label: 'Ejecutado',
              data: displayAccounts.map(c => c.ejecutado),
              backgroundColor: '#0284c7',
              borderRadius: 4
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: context => {
                  return `${context.dataset.label}: ${formatCLP(context.raw as number, useShortFormat)}`;
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                callback: val => {
                  return formatCLP(Number(val), true);
                }
              }
            }
          }
        }
      });
    }

    // 2. Chart Evolución Mensual
    if (chartEvolucionRef.current) {
      if (chartEvolucionInst.current) {
        chartEvolucionInst.current.destroy();
      }

      // Filter months to display only up to October (idx <= 9) as November and December are not yet executed
      const activeMonths = monthlyEvolution.filter((_, idx) => idx <= 9);

      chartEvolucionInst.current = new Chart(chartEvolucionRef.current, {
        type: 'line',
        data: {
          labels: activeMonths.map(m => m.mes),
          datasets: [
            {
              label: 'Consumo Real Acumulado',
              data: activeMonths.map(m => m.ejecAcum),
              borderColor: '#0284c7',
              backgroundColor: 'rgba(2, 132, 199, 0.12)',
              fill: true,
              tension: 0.35,
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: '#0369a1',
              spanGaps: false
            },
            {
              label: 'Plan Presupuestario Acumulado',
              data: activeMonths.map(m => m.planAcum),
              borderColor: '#94a3b8',
              borderDash: [5, 5],
              backgroundColor: 'transparent',
              fill: false,
              tension: 0.2,
              borderWidth: 2,
              pointRadius: 3,
              pointBackgroundColor: '#64748b'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: context => {
                  if (context.raw === null || context.raw === undefined) {
                    return `${context.dataset.label} (${context.label}): Sin datos registrados`;
                  }
                  return `${context.dataset.label} (${context.label}): ${formatCLP(context.raw as number, useShortFormat)}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: val => {
                  return formatCLP(Number(val), true);
                }
              }
            }
          }
        }
      });
    }

    // 3. Chart Participación del Gasto (Doughnut)
    if (chartParticipacionRef.current) {
      if (chartParticipacionInst.current) {
        chartParticipacionInst.current.destroy();
      }

      // Group executed expenses by account name so categories are unified and clean
      const nameMap = new Map<string, number>();
      accounts.forEach(c => {
        if (c.ejecutado > 0 && c.name && !c.name.toLowerCase().startsWith('total')) {
          const cleanName = c.name.trim();
          nameMap.set(cleanName, (nameMap.get(cleanName) || 0) + c.ejecutado);
        }
      });

      // Sort by executed amount descending so largest expenses are rendered first
      const sortedEntries = Array.from(nameMap.entries())
        .sort((a, b) => b[1] - a[1]);

      const palette = [
        '#0284c7', '#059669', '#d97706', '#dc2626', '#8b5cf6',
        '#0d9488', '#e11d48', '#4f46e5', '#ca8a04', '#0891b2',
        '#9333ea', '#16a34a', '#ea580c', '#2563eb', '#db2777',
        '#047857', '#7c3aed', '#b45309', '#3b82f6', '#65a30d',
        '#be185d', '#0f766e', '#1d4ed8', '#c2410c', '#6366f1',
        '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#14b8a6'
      ];
      const totalEjec = sortedEntries.reduce((sum, [, val]) => sum + val, 0);

      chartParticipacionInst.current = new Chart(chartParticipacionRef.current, {
        type: 'doughnut',
        data: {
          labels: sortedEntries.map(([name]) => name),
          datasets: [
            {
              data: sortedEntries.map(([, val]) => val),
              backgroundColor: sortedEntries.map((_, idx) => palette[idx % palette.length]),
              borderColor: '#ffffff',
              borderWidth: 1.5
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 12,
                font: { size: 11 },
                padding: 8
              }
            },
            tooltip: {
              callbacks: {
                label: context => {
                  const val = (context.raw as number) || 0;
                  const pct = totalEjec > 0 ? ((val / totalEjec) * 100).toFixed(1) : '0';
                  return `${context.label}: ${formatCLP(val, useShortFormat)} (${pct}%)`;
                }
              }
            }
          }
        }
      });
    }

    // 4. Chart Porcentaje de Ejecución por Cuenta
    if (chartPorcentajeRef.current) {
      if (chartPorcentajeInst.current) {
        chartPorcentajeInst.current.destroy();
      }

      const displayAccounts = accounts.slice(0, 10);
      const labels = displayAccounts.map(c => c.name.length > 20 ? c.name.slice(0, 18) + '...' : c.name);

      chartPorcentajeInst.current = new Chart(chartPorcentajeRef.current, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: '% Avance Presupuestario',
              data: displayAccounts.map(c => c.pct),
              backgroundColor: displayAccounts.map(c =>
                (c.ejecutado > c.presupuesto || (c.presupuesto === 0 && c.ejecutado > 0)) ? '#dc2626' : '#059669'
              ),
              borderRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: context => `% Ejecución: ${Number(context.raw).toFixed(1)}%`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: val => `${val}%` }
            }
          }
        }
      });
    }

    // Cleanup on unmount or before next render
    return () => {
      chartComparativoInst.current?.destroy();
      chartEvolucionInst.current?.destroy();
      chartParticipacionInst.current?.destroy();
      chartPorcentajeInst.current?.destroy();
    };
  }, [accounts, monthlyEvolution, useShortFormat]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Chart 1: Presupuesto vs Ejecutado */}
      <div className="chart-card bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h2 className="text-sm sm:text-base font-bold text-slate-800">
            Presupuesto vs. Ejecutado por Clase de Coste
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            (Expresado en {useShortFormat ? '$M y $MM' : '$ CLP'})
          </span>
        </div>
        <div className="relative flex-grow min-h-[300px]">
          <canvas ref={chartComparativoRef} />
        </div>
      </div>

      {/* Chart 2: Evolución Mensual */}
      <div className="chart-card bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h2 className="text-sm sm:text-base font-bold text-slate-800">
            Evolución Mensual del Consumo Real vs Plan
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            (Ene - Oct 2026)
          </span>
        </div>
        <div className="relative flex-grow min-h-[300px]">
          <canvas ref={chartEvolucionRef} />
        </div>
      </div>

      {/* Chart 3: Participación del Gasto */}
      <div className="chart-card bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h2 className="text-sm sm:text-base font-bold text-slate-800">
            Distribución del Gasto Ejecutado
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            (Participación % por Cuenta)
          </span>
        </div>
        <div className="relative flex-grow min-h-[300px]">
          <canvas ref={chartParticipacionRef} />
        </div>
      </div>

      {/* Chart 4: Porcentaje de Ejecución por Cuenta */}
      <div className="chart-card bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h2 className="text-sm sm:text-base font-bold text-slate-800">
            % Avance Presupuestario por Cuenta
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            (Meta / Límite 100%)
          </span>
        </div>
        <div className="relative flex-grow min-h-[300px]">
          <canvas ref={chartPorcentajeRef} />
        </div>
      </div>
    </div>
  );
};
