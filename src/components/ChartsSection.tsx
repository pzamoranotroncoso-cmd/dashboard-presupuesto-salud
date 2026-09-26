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
  usePercentOnlyMode?: boolean;
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({
  accounts,
  monthlyEvolution,
  useShortFormat,
  usePercentOnlyMode = false
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
                  if (usePercentOnlyMode && totalPresupuesto > 0) {
                    const pct = ((Number(context.raw) / totalPresupuesto) * 100).toFixed(1);
                    return `${context.dataset.label}: ${pct.replace('.', ',')}% del PPTO Total`;
                  }
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
                  if (usePercentOnlyMode && totalPresupuesto > 0) {
                    return `${((Number(val) / totalPresupuesto) * 100).toFixed(0)}%`;
                  }
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

      // Filter months that have plan or execution up to August
      const activeMonths = monthlyEvolution.filter((_, idx) => idx <= 7);

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
              pointBackgroundColor: '#0369a1'
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
                  if (usePercentOnlyMode && totalPresupuesto > 0) {
                    const pct = ((Number(context.raw) / totalPresupuesto) * 100).toFixed(1);
                    return `${context.dataset.label} (${context.label}): ${pct.replace('.', ',')}% del PPTO Total`;
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
                  if (usePercentOnlyMode && totalPresupuesto > 0) {
                    return `${((Number(val) / totalPresupuesto) * 100).toFixed(0)}%`;
                  }
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

      const executedOnly = accounts.filter(c => c.ejecutado > 0);
      const palette = [
        '#0284c7', '#059669', '#d97706', '#dc2626', '#8b5cf6',
        '#0d9488', '#e11d48', '#4f46e5', '#ca8a04', '#0891b2'
      ];
      const totalEjec = executedOnly.reduce((a, b) => a + b.ejecutado, 0);

      chartParticipacionInst.current = new Chart(chartParticipacionRef.current, {
        type: 'doughnut',
        data: {
          labels: executedOnly.map(c => c.name),
          datasets: [
            {
              data: executedOnly.map(c => c.ejecutado),
              backgroundColor: palette.slice(0, executedOnly.length)
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
                font: { size: 11 }
              }
            },
            tooltip: {
              callbacks: {
                label: context => {
                  const val = (context.raw as number) || 0;
                  const pct = totalEjec > 0 ? ((val / totalEjec) * 100).toFixed(1) : '0';
                  if (usePercentOnlyMode) {
                    return `${context.label}: ${pct.replace('.', ',')}% de participación`;
                  }
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
  }, [accounts, monthlyEvolution, useShortFormat, usePercentOnlyMode]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Chart 1: Presupuesto vs Ejecutado */}
      <div className="chart-card bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h2 className="text-sm sm:text-base font-bold text-slate-800">
            Presupuesto vs. Ejecutado por Clase de Coste
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            {usePercentOnlyMode ? '(Expresado en % del Presupuesto)' : `(Expresado en ${useShortFormat ? '$M y $MM' : '$ CLP'})`}
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
            (Ene - Ago 2026)
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
