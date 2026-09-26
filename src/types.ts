export interface AppUser {
  correo: string;
  nombre: string;
  cargo: string;
  rol: 'ADMIN' | 'DIRECTOR';
  ceco: string; // e.g. "1180454001", or "TODOS"
  escuela?: string;
}

export interface SchoolCecoInfo {
  ceco: string;
  name: string;
  shortName: string;
  director?: string;
}

export interface Transaction {
  id: string;
  cuenta: string;
  descripcion: string;
  fecha: string;
  valor: number;
  glosa: string;
  glosa2: string;
  ceco: string;
  descripCeco: string;
  mes: string;
  monthIndex: number;
}

export interface BudgetAccount {
  id: string;
  name: string;
  presupuesto: number;
  ejecutado: number;
  disponible: number;
  pct: number;
  monthlyPlan: Record<string, number>;
  monthlyExec: Record<string, number>;
  transactions: Transaction[];
  ceco?: string;
  descripCeco?: string;
}

export interface MonthlyEvolutionItem {
  mes: string;
  mesNombre: string;
  plan: number;
  ejec: number;
  planAcum: number;
  ejecAcum: number;
}

export interface GoogleDriveFile {
  id: string;
  name: string;
  modifiedTime: string;
  mimeType?: string;
  webViewLink?: string;
  version?: string;
}

export type AutoSyncFrequency = 0 | 15000 | 30000 | 60000 | 300000;

export interface SyncStatus {
  state: 'idle' | 'syncing' | 'synced' | 'error' | 'not_connected';
  lastSyncTime: Date | null;
  lastModifiedInDrive: string | null;
  fileName: string | null;
  fileId: string | null;
  webViewLink?: string;
  error: string | null;
  autoSyncInterval: AutoSyncFrequency;
  dataSource: 'google_sheets' | 'demo_model';
}

export type StatusFilterType = 'ALL' | 'OVER' | 'EXEC' | 'ZERO' | 'HIGH';
