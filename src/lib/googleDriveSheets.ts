import {
  AppUser,
  BudgetAccount,
  GoogleDriveFile,
  MonthlyEvolutionItem,
  SchoolCecoInfo,
  Transaction
} from '../types';
import { DEFAULT_USERS, DEMO_CECO, DEMO_CECO_NAME } from './demoData';

export const TARGET_SHEET_DEFAULT_NAME = "Ejecución Presupuestaria Obstetricia Agosto 2026";

export const MONTH_NAMES_SHORT = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
export const MONTH_NAMES_FULL = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

/**
 * Searches user's Google Drive for spreadsheets
 */
export async function searchSpreadsheets(
  accessToken: string,
  searchQuery: string = "Obstetricia"
): Promise<GoogleDriveFile[]> {
  const query = `mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    query
  )}&fields=files(id,name,modifiedTime,webViewLink,version)&orderBy=modifiedTime desc&pageSize=30`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Error buscando archivos en Google Drive (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const allFiles: GoogleDriveFile[] = data.files || [];

  if (!searchQuery) return allFiles;

  // Filter or sort so the target or query matches first
  const lowerQuery = searchQuery.toLowerCase().trim();
  const sorted = [...allFiles].sort((a, b) => {
    const aMatch = a.name.toLowerCase().includes(lowerQuery) ? 1 : 0;
    const bMatch = b.name.toLowerCase().includes(lowerQuery) ? 1 : 0;
    return bMatch - aMatch;
  });

  return sorted;
}

/**
 * Lightweight check on file modifiedTime and version to detect updates in Drive
 */
export async function getFileMetadata(
  accessToken: string,
  fileId: string
): Promise<GoogleDriveFile> {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?fields=id,name,modifiedTime,version,webViewLink`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Error obteniendo metadatos del archivo (${res.status}): ${errText}`);
  }

  return await res.json();
}

/**
 * Helper to clean and parse number values from Google Sheets cells
 * Handles formats like: "$1.500.000", "1500000", "1,500,000", " -1500 ", etc.
 */
export function parseFinancialNumber(val: any): number {
  if (val === null || val === undefined) return 0;
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  
  let str = String(val).trim();
  if (!str) return 0;

  // Remove currency symbol, spaces
  str = str.replace(/[$CLP\s]/gi, '');
  if (!str) return 0;

  const isNegative = str.startsWith('-') || (str.startsWith('(') && str.endsWith(')'));
  str = str.replace(/[()\-]/g, '');

  // If contains both '.' and ',', check position
  if (str.includes('.') && str.includes(',')) {
    // Chilean/European: 1.234.567,89 -> remove dots, change comma to dot
    if (str.lastIndexOf(',') > str.lastIndexOf('.')) {
      str = str.replace(/\./g, '').replace(',', '.');
    } else {
      // US format: 1,234,567.89 -> remove commas
      str = str.replace(/,/g, '');
    }
  } else if (str.includes('.')) {
    // Check if dot is thousands separator (e.g. 1.500.000 or 98.000)
    const parts = str.split('.');
    if (parts.length > 1 && parts[parts.length - 1].length === 3) {
      str = str.replace(/\./g, '');
    }
  } else if (str.includes(',')) {
    // Comma could be thousands separator or decimal
    const parts = str.split(',');
    if (parts.length > 1 && parts[parts.length - 1].length === 3) {
      str = str.replace(/,/g, '');
    } else {
      str = str.replace(',', '.');
    }
  }

  const num = parseFloat(str);
  if (isNaN(num)) return 0;
  return isNegative ? -num : num;
}

/**
 * Parses date string or Excel serial number and returns { dateStr, monthName, monthIndex }
 */
export function parseDateAndMonth(rawDate: any): { dateStr: string; mes: string; monthIndex: number } {
  if (!rawDate) {
    return { dateStr: '', mes: 'Desconocido', monthIndex: -1 };
  }

  // Handle Excel serial date number
  if (typeof rawDate === 'number' && rawDate > 30000 && rawDate < 70000) {
    const utcDays = Math.floor(rawDate - 25569);
    const dateObj = new Date(utcDays * 86400 * 1000);
    const mIdx = dateObj.getUTCMonth();
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const month = String(mIdx + 1).padStart(2, '0');
    const year = dateObj.getUTCFullYear();
    return {
      dateStr: `${day}/${month}/${year}`,
      mes: MONTH_NAMES_SHORT[mIdx] || 'Ene',
      monthIndex: mIdx
    };
  }

  const str = String(rawDate).trim();

  // Try parsing dd/mm/yyyy or dd-mm-yyyy
  const dmyMatch = str.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/);
  if (dmyMatch) {
    const day = dmyMatch[1].padStart(2, '0');
    const monthNum = parseInt(dmyMatch[2], 10);
    const year = dmyMatch[3].length === 2 ? `20${dmyMatch[3]}` : dmyMatch[3];
    const mIdx = Math.max(0, Math.min(11, monthNum - 1));
    return {
      dateStr: `${day}/${String(monthNum).padStart(2, '0')}/${year}`,
      mes: MONTH_NAMES_SHORT[mIdx],
      monthIndex: mIdx
    };
  }

  // Try parsing yyyy-mm-dd
  const ymdMatch = str.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})/);
  if (ymdMatch) {
    const year = ymdMatch[1];
    const monthNum = parseInt(ymdMatch[2], 10);
    const day = ymdMatch[3].padStart(2, '0');
    const mIdx = Math.max(0, Math.min(11, monthNum - 1));
    return {
      dateStr: `${day}/${String(monthNum).padStart(2, '0')}/${year}`,
      mes: MONTH_NAMES_SHORT[mIdx],
      monthIndex: mIdx
    };
  }

  // Check month words in text: "enero", "marzo", "agosto", etc.
  const lower = str.toLowerCase();
  for (let i = 0; i < MONTH_NAMES_FULL.length; i++) {
    if (lower.includes(MONTH_NAMES_FULL[i].toLowerCase()) || lower.includes(MONTH_NAMES_SHORT[i].toLowerCase())) {
      return {
        dateStr: str,
        mes: MONTH_NAMES_SHORT[i],
        monthIndex: i
      };
    }
  }

  return { dateStr: str, mes: 'Ene', monthIndex: 0 };
}

/**
 * Normalize header text to lowercase without accents or special chars
 */
function cleanHeader(header: any): string {
  if (!header) return '';
  return String(header)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Fetches Google Sheet structure and values for 'Ejecución' and 'Plan'
 */
export async function fetchSpreadsheetData(accessToken: string, spreadsheetId: string) {
  // 1. Get spreadsheet metadata to locate sheet tabs
  const metaUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets(properties(sheetId,title))`;
  const metaRes = await fetch(metaUrl, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!metaRes.ok) {
    const errText = await metaRes.text();
    throw new Error(`Error al leer estructura de Google Sheets (${metaRes.status}): ${errText}`);
  }

  const metaData = await metaRes.json();
  const sheets: Array<{ properties: { sheetId: number; title: string } }> = metaData.sheets || [];

  let ejecucionSheetTitle = sheets.find(s => cleanHeader(s.properties.title).includes('ejecucion'))?.properties.title;
  let planSheetTitle = sheets.find(s => cleanHeader(s.properties.title).includes('plan'))?.properties.title;
  let usuariosSheetTitle = sheets.find(s => cleanHeader(s.properties.title).includes('usuario') || cleanHeader(s.properties.title).includes('permiso') || cleanHeader(s.properties.title).includes('user'))?.properties.title;

  // Fallbacks if not named identically
  if (!ejecucionSheetTitle && sheets.length > 0) {
    ejecucionSheetTitle = sheets[0].properties.title;
  }
  if (!planSheetTitle && sheets.length > 1) {
    planSheetTitle = sheets[1].properties.title;
  }

  // 2. Fetch data from sheets
  const rangesToFetch: string[] = [];
  if (ejecucionSheetTitle) rangesToFetch.push(`'${ejecucionSheetTitle}'!A1:Z5000`);
  if (planSheetTitle) rangesToFetch.push(`'${planSheetTitle}'!A1:Z5000`);
  if (usuariosSheetTitle) rangesToFetch.push(`'${usuariosSheetTitle}'!A1:Z500`);

  const valuesUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?${rangesToFetch
    .map(r => `ranges=${encodeURIComponent(r)}`)
    .join('&')}`;

  const valuesRes = await fetch(valuesUrl, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!valuesRes.ok) {
    const errText = await valuesRes.text();
    throw new Error(`Error al leer datos de celdas (${valuesRes.status}): ${errText}`);
  }

  const valuesData = await valuesRes.json();
  const valueRanges = valuesData.valueRanges || [];

  const ejecucionRows = valueRanges[0]?.values || [];
  const planRows = valueRanges[1]?.values || [];
  const usuariosRows = usuariosSheetTitle ? (valueRanges[2]?.values || []) : [];

  return {
    ejecucionSheetTitle: ejecucionSheetTitle || 'Ejecución',
    planSheetTitle: planSheetTitle || 'Plan',
    usuariosSheetTitle,
    ejecucionRows,
    planRows,
    usuariosRows
  };
}

/**
 * Parses user directory from 'Usuarios' or 'Permisos' sheet
 */
export function parseUsersSheet(usuariosRows?: any[][]): AppUser[] {
  if (!usuariosRows || usuariosRows.length < 2) {
    return DEFAULT_USERS;
  }

  // Find header row
  let headerIdx = -1;
  for (let r = 0; r < Math.min(usuariosRows.length, 5); r++) {
    const rowClean = usuariosRows[r].map(cleanHeader);
    if (rowClean.some(h => h.includes('correo') || h.includes('email') || h.includes('cargo') || h.includes('rol'))) {
      headerIdx = r;
      break;
    }
  }
  if (headerIdx === -1) headerIdx = 0;

  const headers = usuariosRows[headerIdx].map(cleanHeader);
  const colCorreo = headers.findIndex(h => h.includes('correo') || h.includes('email') || h.includes('mail'));
  const colNombre = headers.findIndex(h => h.includes('nombre') || h.includes('name'));
  const colCargo = headers.findIndex(h => h.includes('cargo') || h.includes('puesto') || h.includes('posicion'));
  const colRol = headers.findIndex(h => h.includes('rol') || h.includes('role') || h.includes('perfil'));
  const colCeco = headers.findIndex(h => h.includes('ceco') || h.includes('centro'));
  const colEscuela = headers.findIndex(h => h.includes('escuela') || h.includes('carrera') || h.includes('departamento'));

  if (colCorreo === -1) {
    return DEFAULT_USERS;
  }

  const parsedUsers: AppUser[] = [];
  for (let r = headerIdx + 1; r < usuariosRows.length; r++) {
    const row = usuariosRows[r];
    if (!row || row.length === 0) continue;

    const correo = String(row[colCorreo] || '').trim().toLowerCase();
    if (!correo || !correo.includes('@')) continue;

    const nombre = colNombre !== -1 && row[colNombre] ? String(row[colNombre]).trim() : correo.split('@')[0];
    const cargo = colCargo !== -1 && row[colCargo] ? String(row[colCargo]).trim() : 'Director(a) de Escuela';
    const rawRol = colRol !== -1 && row[colRol] ? String(row[colRol]).trim().toUpperCase() : 'DIRECTOR';
    const rol: 'ADMIN' | 'DIRECTOR' = rawRol.includes('ADMIN') || rawRol.includes('DECAN') || rawRol.includes('FINANZ') ? 'ADMIN' : 'DIRECTOR';
    const rawCeco = colCeco !== -1 && row[colCeco] ? String(row[colCeco]).trim() : (rol === 'ADMIN' ? 'TODOS' : '1180454001');
    const escuela = colEscuela !== -1 && row[colEscuela] ? String(row[colEscuela]).trim() : undefined;

    parsedUsers.push({
      correo,
      nombre,
      cargo,
      rol,
      ceco: rawCeco,
      escuela
    });
  }

  // Ensure Patricio Zamorano and Decanato are always present as Admin fail-safes
  if (!parsedUsers.some(u => u.correo === 'patricio.zamorano@mail.udp.cl')) {
    parsedUsers.push(DEFAULT_USERS[0]);
  }
  if (!parsedUsers.some(u => u.correo === 'decano.salud@mail.udp.cl')) {
    parsedUsers.push(DEFAULT_USERS[1]);
  }

  return parsedUsers.length > 0 ? parsedUsers : DEFAULT_USERS;
}

/**
 * Normalizes account ID / code key so that Plan and Ejecución match seamlessly
 * e.g. "51010101", 51010101, "51.01.01.01" all become "51010101"
 */
export function normalizeAccountKey(val: any): string {
  if (val === null || val === undefined) return '';
  return String(val).trim().replace(/[^0-9A-Za-z]/g, '');
}

/**
 * Identify column for N° de Cuenta / Clase de Coste
 * Strictly excludes description/name headers to prevent mixing.
 */
function findAccountCodeCol(headers: string[]): number {
  // 1. Exact priority matches
  let idx = headers.findIndex(h =>
    h === 'ndecuenta' || h === 'numcuenta' || h === 'numerocuenta' || h === 'ncuenta' ||
    h === 'clasedecoste' || h === 'clasecoste' || h === 'clasedecosto' || h === 'codigocuenta' ||
    h === 'codigo' || h === 'cuenta'
  );
  if (idx !== -1) return idx;

  // 2. Contains cuenta/clase/codigo but NOT descrip/denomin/nombre/ceco/glosa
  idx = headers.findIndex(h =>
    (h.includes('cuenta') || h.includes('clase') || h.includes('codigo')) &&
    !h.includes('desc') && !h.includes('denomin') && !h.includes('nom') && !h.includes('glosa') && !h.includes('ceco')
  );
  if (idx !== -1) return idx;

  return headers.findIndex(h => h.includes('cuenta') && !h.includes('desc'));
}

/**
 * Identify column for Descripción Cuenta / Denominación Clase de Coste
 */
function findAccountDescCol(headers: string[]): number {
  // 1. Exact priority matches
  let idx = headers.findIndex(h =>
    h === 'descripcioncuenta' || h === 'denominacionclasedecoste' || h === 'denominacion' ||
    h === 'descripcion' || h === 'descripcuenta' || h === 'nombrecuenta'
  );
  if (idx !== -1) return idx;

  // 2. Contains descrip/denomin/nombre but NOT ceco/centro/glosa
  idx = headers.findIndex(h =>
    (h.includes('desc') || h.includes('denomin') || h.includes('nombre')) &&
    !h.includes('ceco') && !h.includes('centro') && !h.includes('glosa')
  );
  return idx;
}

/**
 * Helper to ensure account number and description are not inverted in row data
 */
function sanitizeAccountFields(rawCuenta: string, rawDesc: string): { cuenta: string; descripcion: string } {
  let c = String(rawCuenta || '').trim();
  let d = String(rawDesc || '').trim();

  // If cuenta has letters/spaces and desc is purely numeric code, they are inverted!
  const cuentaHasAlpha = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(c);
  const descHasAlpha = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(d);
  const cuentaIsCode = /^\d[\d\.\-\s]{3,14}$/.test(c);
  const descIsCode = /^\d[\d\.\-\s]{3,14}$/.test(d);

  if (cuentaHasAlpha && !descHasAlpha && descIsCode) {
    const temp = c;
    c = d;
    d = temp;
  }

  return { cuenta: c, descripcion: d };
}

/**
 * Extracts CECO code and CECO description from a row.
 * By university ERP standard and user specification:
 * In sheet 'Ejecución', Column H (index 7) and Column I (index 8) contain the Centro de Costo and its Denominación.
 */
export function extractCecoFromRow(
  row: any[],
  colCecoIdx: number = 7,
  colDescCecoIdx: number = 8
): { ceco: string; descripCeco: string } {
  if (!row || row.length === 0) return { ceco: '', descripCeco: '' };

  // 1. Check specified columns (default Col H=7, Col I=8)
  let rawH = row.length > colCecoIdx && row[colCecoIdx] !== undefined && row[colCecoIdx] !== null ? String(row[colCecoIdx]).trim() : '';
  let rawI = row.length > colDescCecoIdx && row[colDescCecoIdx] !== undefined && row[colDescCecoIdx] !== null ? String(row[colDescCecoIdx]).trim() : '';

  if (!rawH && !rawI) {
    return { ceco: '', descripCeco: '' };
  }

  // Detect which is numeric code (CECO) and which is name/description
  const hHasAlpha = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(rawH);
  const iHasAlpha = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(rawI);
  const hIsCode = /^\d[\d\.\-\s]{3,15}$/.test(rawH);
  const iIsCode = /^\d[\d\.\-\s]{3,15}$/.test(rawI);

  let ceco = rawH;
  let descripCeco = rawI;

  if (iIsCode && !hIsCode) {
    // Inverted: Col I is code, Col H is description
    ceco = rawI;
    descripCeco = rawH;
  } else if (hHasAlpha && !iHasAlpha && iIsCode) {
    ceco = rawI;
    descripCeco = rawH;
  }

  // Sanitize: clean extraneous symbols but preserve digits and core code
  ceco = ceco.trim();
  descripCeco = descripCeco.trim();

  // If one is empty, complement it
  if (ceco && !descripCeco) {
    descripCeco = `CECO ${ceco}`;
  } else if (!ceco && descripCeco) {
    ceco = descripCeco;
  }

  return { ceco, descripCeco };
}

/**
 * Parses raw 2D arrays from 'Ejecución', 'Plan' and 'Usuarios' sheets into structured BudgetAccount and MonthlyEvolution items
 */
export function parseSheetData(
  ejecucionRows: any[][],
  planRows: any[][],
  usuariosRows?: any[][]
): {
  accounts: BudgetAccount[];
  monthlyEvolution: MonthlyEvolutionItem[];
  transactions: Transaction[];
  users: AppUser[];
  discoveredSchools: SchoolCecoInfo[];
  detectedCeco: string;
  detectedCecoName: string;
} {
  const users = parseUsersSheet(usuariosRows);

  // 1. Process Ejecución Sheet first to discover ALL transactions and ALL official Centros de Costos from Col H & Col I
  const transactions: Transaction[] = [];
  const discoveredSchoolsMap = new Map<string, { ceco: string; name: string; shortName: string }>();

  let detectedCeco = "1180454001";
  let detectedCecoName = "ESCUELA DE OBSTETRICIA";

  if (ejecucionRows && ejecucionRows.length > 0) {
    let headerIdx = -1;
    for (let r = 0; r < Math.min(ejecucionRows.length, 6); r++) {
      const rowClean = ejecucionRows[r].map(cleanHeader);
      if (rowClean.some(h => (h.includes('cuenta') || h.includes('clase')) && !h.includes('desc'))) {
        headerIdx = r;
        break;
      }
    }
    if (headerIdx === -1) headerIdx = 0;

    const headers = ejecucionRows[headerIdx].map(cleanHeader);
    const colCuenta = findAccountCodeCol(headers);
    const colDesc = findAccountDescCol(headers);
    const colFecha = headers.findIndex(h => h.includes('fecha'));
    const colValor = headers.findIndex(h => h.includes('valor') || h.includes('importe') || h.includes('monto') || h.includes('total'));
    const colGlosa = headers.findIndex(h => h.includes('glosa') && !h.includes('2'));
    const colGlosa2 = headers.findIndex(h => h.includes('glosa2') || h.includes('glosados'));

    // Header fallbacks if present
    const colCecoHeader = headers.findIndex(h => (h.includes('centro') && h.includes('coste') && !h.includes('desc')) || h === 'ceco');
    const colDescCecoHeader = headers.findIndex(h => (h.includes('desc') && (h.includes('ceco') || h.includes('cost'))));

    const colCecoIdx = colCecoHeader !== -1 ? colCecoHeader : 7; // Col H default is index 7
    const colDescCecoIdx = colDescCecoHeader !== -1 ? colDescCecoHeader : 8; // Col I default is index 8

    for (let r = headerIdx + 1; r < ejecucionRows.length; r++) {
      const row = ejecucionRows[r];
      if (!row || row.length === 0) continue;

      let rawCuenta = colCuenta !== -1 ? String(row[colCuenta] || '').trim() : '';
      let rawDesc = colDesc !== -1 ? String(row[colDesc] || '').trim() : '';

      if (!rawCuenta && !rawDesc) continue;
      if (cleanHeader(rawCuenta).includes('total') || cleanHeader(rawDesc).includes('total')) continue;

      const { cuenta, descripcion } = sanitizeAccountFields(rawCuenta, rawDesc);
      const finalCuenta = cuenta || descripcion;
      const cleanKey = normalizeAccountKey(finalCuenta);

      // Extract CECO code & name from Col H (7) and Col I (8)
      const { ceco: rowCeco, descripCeco: rowDescCeco } = extractCecoFromRow(row, colCecoIdx, colDescCecoIdx);

      const finalCeco = rowCeco || detectedCeco;
      const finalDescCeco = rowDescCeco || detectedCecoName;

      if (rowCeco) detectedCeco = rowCeco;
      if (rowDescCeco) detectedCecoName = rowDescCeco;

      // Register unique school from Col H and Col I of Ejecución
      const normCeco = normalizeAccountKey(finalCeco) || finalCeco;
      if (normCeco && !normCeco.toLowerCase().includes('total') && !normCeco.toLowerCase().includes('centro')) {
        const rawName = finalDescCeco || `CECO ${finalCeco}`;
        const shortClean = rawName.replace(/^ESCUELA DE /i, '').replace(/^CENTRO DE /i, '').trim() || rawName;

        if (!discoveredSchoolsMap.has(normCeco)) {
          discoveredSchoolsMap.set(normCeco, {
            ceco: finalCeco,
            name: rawName,
            shortName: shortClean
          });
        } else {
          // If name in current row is longer or more descriptive, update it
          const existing = discoveredSchoolsMap.get(normCeco)!;
          if (rawName.length > existing.name.length && !existing.name.includes(' - ')) {
            existing.name = rawName;
            existing.shortName = shortClean;
          }
        }
      }

      const rawFecha = colFecha !== -1 ? row[colFecha] : '';
      const { dateStr, mes, monthIndex } = parseDateAndMonth(rawFecha);
      const valor = colValor !== -1 ? parseFinancialNumber(row[colValor]) : 0;
      const glosa = colGlosa !== -1 ? String(row[colGlosa] || '').trim() : '';
      const glosa2 = colGlosa2 !== -1 ? String(row[colGlosa2] || '').trim() : '';

      transactions.push({
        id: `tx-${r}`,
        cuenta: finalCuenta,
        descripcion: descripcion || finalCuenta,
        fecha: dateStr,
        valor,
        glosa,
        glosa2,
        ceco: finalCeco,
        descripCeco: finalDescCeco,
        mes,
        monthIndex
      });
    }
  }

  // Convert discoveredSchoolsMap into SchoolCecoInfo[]
  // Disambiguate if multiple distinct CECO codes have the same base name
  const discoveredSchools: SchoolCecoInfo[] = Array.from(discoveredSchoolsMap.values()).map(s => ({
    ceco: s.ceco,
    name: s.name,
    shortName: s.shortName,
    director: 'Director(a) de Escuela'
  }));

  const nameCounts: Record<string, number> = {};
  discoveredSchools.forEach(s => {
    nameCounts[s.name] = (nameCounts[s.name] || 0) + 1;
  });
  discoveredSchools.forEach(s => {
    if (nameCounts[s.name] > 1) {
      s.shortName = `${s.shortName} (${s.ceco})`;
    }
  });

  // Sort schools alphabetically by name
  discoveredSchools.sort((a, b) => a.name.localeCompare(b.name));

  // 2. Process Plan Sheet using CECO and Cuenta as the compound key
  interface PlanEntry {
    rawId: string;
    name: string;
    totalPlan: number;
    monthly: Record<string, number>;
    ceco?: string;
    descripCeco?: string;
  }

  const planCompoundMap: Record<string, PlanEntry> = {};
  const planAccountOnlyMap: Record<string, PlanEntry> = {};

  if (planRows && planRows.length > 0) {
    let headerIdx = -1;
    for (let r = 0; r < Math.min(planRows.length, 5); r++) {
      const rowClean = planRows[r].map(cleanHeader);
      if (rowClean.some(h => (h.includes('cuenta') || h.includes('clase') || h.includes('codigo')) && !h.includes('desc'))) {
        headerIdx = r;
        break;
      }
    }
    if (headerIdx === -1) headerIdx = 0;

    const headers = planRows[headerIdx].map(cleanHeader);
    const colCuenta = findAccountCodeCol(headers);
    const colName = findAccountDescCol(headers);
    const colTotal = headers.findIndex(h => h.includes('total') || h.includes('presupuesto') || h.includes('anual') || h.includes('plan'));

    // Check CECO in Plan: either via header or Col H (7) / Col I (8)
    let planColCeco = headers.findIndex(h => (h.includes('ceco') || h.includes('centro')) && !h.includes('desc'));
    let planColDescCeco = headers.findIndex(h => h.includes('desc') && (h.includes('ceco') || h.includes('cost')));

    if (planColCeco === -1 && planRows.length > headerIdx + 1) {
      // Check if Col H (7) matches any known CECO
      const sampleRow = planRows[headerIdx + 1];
      if (sampleRow && sampleRow.length > 7) {
        const potentialCeco = normalizeAccountKey(sampleRow[7]);
        if (potentialCeco && discoveredSchoolsMap.has(potentialCeco)) {
          planColCeco = 7;
          planColDescCeco = 8;
        }
      }
    }

    // Map month columns if present in Plan
    const monthColIndices: { mes: string; idx: number }[] = [];
    headers.forEach((h, idx) => {
      MONTH_NAMES_SHORT.forEach(m => {
        if (h.startsWith(m.toLowerCase()) || h === m.toLowerCase()) {
          monthColIndices.push({ mes: m, idx });
        }
      });
    });

    for (let r = headerIdx + 1; r < planRows.length; r++) {
      const row = planRows[r];
      if (!row || row.length === 0) continue;

      let rawId = colCuenta !== -1 ? String(row[colCuenta] || '').trim() : '';
      let rawName = colName !== -1 ? String(row[colName] || '').trim() : '';

      if (!rawId && !rawName) continue;
      if (cleanHeader(rawId).includes('total') || cleanHeader(rawName).includes('total')) continue;

      const { cuenta, descripcion } = sanitizeAccountFields(rawId, rawName);
      if (!cuenta && !descripcion) continue;

      const finalId = cuenta || descripcion;
      const finalName = descripcion || cuenta;
      const cleanKey = normalizeAccountKey(finalId);
      if (!cleanKey) continue;

      let ceco = planColCeco !== -1 ? String(row[planColCeco] || '').trim() : undefined;
      let descripCeco = planColDescCeco !== -1 ? String(row[planColDescCeco] || '').trim() : undefined;

      if (!ceco && row.length > 7) {
        const cecoInfo = extractCecoFromRow(row, 7, 8);
        if (cecoInfo.ceco && discoveredSchoolsMap.has(normalizeAccountKey(cecoInfo.ceco))) {
          ceco = cecoInfo.ceco;
          descripCeco = cecoInfo.descripCeco;
        }
      }

      let totalPlan = 0;
      const monthly: Record<string, number> = {};

      if (monthColIndices.length > 0) {
        monthColIndices.forEach(({ mes, idx }) => {
          const val = parseFinancialNumber(row[idx]);
          monthly[mes] = val;
          totalPlan += val;
        });
      }

      if (colTotal !== -1 && row[colTotal]) {
        const directTotal = parseFinancialNumber(row[colTotal]);
        if (directTotal > 0 || totalPlan === 0) {
          totalPlan = directTotal;
        }
      }

      const planEntry: PlanEntry = {
        rawId: finalId,
        name: finalName,
        totalPlan,
        monthly,
        ceco,
        descripCeco
      };

      if (ceco) {
        const normCeco = normalizeAccountKey(ceco);
        const compoundKey = `${normCeco}_${cleanKey}`;
        planCompoundMap[compoundKey] = planEntry;
      }

      // Fallback account-only map
      if (!planAccountOnlyMap[cleanKey]) {
        planAccountOnlyMap[cleanKey] = planEntry;
      }
    }
  }

  // 3. Consolidate into BudgetAccount[] using [CECO + Cuenta] compound key
  const accountsMap: Record<string, BudgetAccount> = {};

  // First populate with Plan data
  Object.entries(planCompoundMap).forEach(([compoundKey, p]) => {
    const ceco = p.ceco || detectedCeco;
    const descripCeco = p.descripCeco || (discoveredSchoolsMap.get(normalizeAccountKey(ceco))?.name) || detectedCecoName;

    accountsMap[compoundKey] = {
      id: p.rawId,
      name: p.name,
      presupuesto: p.totalPlan,
      ejecutado: 0,
      disponible: p.totalPlan,
      pct: 0,
      monthlyPlan: { ...p.monthly },
      monthlyExec: {},
      transactions: [],
      ceco,
      descripCeco
    };
  });

  // If planCompoundMap was empty (Plan didn't have CECO column, single CECO file), populate with accountOnly
  if (Object.keys(planCompoundMap).length === 0) {
    Object.entries(planAccountOnlyMap).forEach(([cleanKey, p]) => {
      const compoundKey = `${normalizeAccountKey(detectedCeco)}_${cleanKey}`;
      accountsMap[compoundKey] = {
        id: p.rawId,
        name: p.name,
        presupuesto: p.totalPlan,
        ejecutado: 0,
        disponible: p.totalPlan,
        pct: 0,
        monthlyPlan: { ...p.monthly },
        monthlyExec: {},
        transactions: [],
        ceco: detectedCeco,
        descripCeco: detectedCecoName
      };
    });
  }

  // Then link and accumulate transactions from Ejecución
  transactions.forEach(tx => {
    const cleanCuenta = normalizeAccountKey(tx.cuenta);
    const cleanCeco = normalizeAccountKey(tx.ceco);
    const compoundKey = `${cleanCeco}_${cleanCuenta}`;

    if (!accountsMap[compoundKey]) {
      // Check if we can inherit name and plan from planCompoundMap or planAccountOnlyMap
      const matchedPlan = planCompoundMap[compoundKey] || planAccountOnlyMap[cleanCuenta];

      accountsMap[compoundKey] = {
        id: tx.cuenta,
        name: tx.descripcion || matchedPlan?.name || tx.cuenta,
        presupuesto: matchedPlan?.totalPlan || 0,
        ejecutado: 0,
        disponible: matchedPlan?.totalPlan || 0,
        pct: 0,
        monthlyPlan: matchedPlan ? { ...matchedPlan.monthly } : {},
        monthlyExec: {},
        transactions: [],
        ceco: tx.ceco,
        descripCeco: tx.descripCeco
      };
    }

    const acc = accountsMap[compoundKey];
    acc.ejecutado += tx.valor;
    acc.transactions.push(tx);

    if (tx.mes) {
      acc.monthlyExec[tx.mes] = (acc.monthlyExec[tx.mes] || 0) + tx.valor;
    }
  });

  // Finalize balances and percentages
  const accountsList: BudgetAccount[] = Object.values(accountsMap).map(acc => {
    const disp = acc.presupuesto - acc.ejecutado;
    let pct = 0;
    if (acc.presupuesto > 0) {
      pct = (acc.ejecutado / acc.presupuesto) * 100;
    } else if (acc.ejecutado > 0) {
      pct = 100;
    }

    return {
      ...acc,
      disponible: disp,
      pct: Math.round(pct * 10) / 10
    };
  });

  // Sort accounts by Presupuesto descending, then by Ejecutado
  accountsList.sort((a, b) => b.presupuesto - a.presupuesto || b.ejecutado - a.ejecutado);

  // 4. Build Monthly Evolution (Ene - Dic)
  let planAcum = 0;
  let ejecAcum = 0;

  const monthlyEvolution: MonthlyEvolutionItem[] = MONTH_NAMES_SHORT.map((mes, idx) => {
    let mesPlan = 0;
    let mesEjec = 0;

    accountsList.forEach(acc => {
      mesPlan += acc.monthlyPlan[mes] || 0;
      mesEjec += acc.monthlyExec[mes] || 0;
    });

    planAcum += mesPlan;
    ejecAcum += mesEjec;

    return {
      mes,
      mesNombre: MONTH_NAMES_FULL[idx],
      plan: mesPlan,
      ejec: mesEjec,
      planAcum,
      ejecAcum
    };
  });

  return {
    accounts: accountsList,
    monthlyEvolution,
    transactions,
    users,
    discoveredSchools,
    detectedCeco,
    detectedCecoName
  };
}

/**
 * Filter accounts, transactions, and recalculate monthly evolution for a given CECO or TODOS.
 * In 'TODOS' mode, accounts with the same Account Number are consolidated across all CECOs.
 */
export function filterDataByCeco(
  accounts: BudgetAccount[],
  transactions: Transaction[],
  targetCeco: string
): {
  filteredAccounts: BudgetAccount[];
  filteredTransactions: Transaction[];
  monthlyEvolution: MonthlyEvolutionItem[];
} {
  const isAll = !targetCeco || targetCeco === 'TODOS' || targetCeco === 'ALL';

  let filteredTx: Transaction[];
  let filteredAcc: BudgetAccount[];

  if (isAll) {
    filteredTx = transactions;
    // Consolidate accounts across all CECOs by account ID
    const consolidatedMap = new Map<string, BudgetAccount>();

    accounts.forEach(acc => {
      const key = normalizeAccountKey(acc.id);
      if (!consolidatedMap.has(key)) {
        consolidatedMap.set(key, {
          ...acc,
          ceco: 'TODOS',
          descripCeco: 'Consolidado Facultad',
          monthlyPlan: { ...acc.monthlyPlan },
          monthlyExec: { ...acc.monthlyExec },
          transactions: [...acc.transactions]
        });
      } else {
        const exist = consolidatedMap.get(key)!;
        exist.presupuesto += acc.presupuesto;
        exist.ejecutado += acc.ejecutado;
        exist.disponible = exist.presupuesto - exist.ejecutado;
        exist.pct = exist.presupuesto > 0 ? (exist.ejecutado / exist.presupuesto) * 100 : (exist.ejecutado > 0 ? 100 : 0);
        exist.transactions.push(...acc.transactions);

        Object.entries(acc.monthlyPlan).forEach(([m, val]) => {
          exist.monthlyPlan[m] = (exist.monthlyPlan[m] || 0) + val;
        });
        Object.entries(acc.monthlyExec).forEach(([m, val]) => {
          exist.monthlyExec[m] = (exist.monthlyExec[m] || 0) + val;
        });
      }
    });

    filteredAcc = Array.from(consolidatedMap.values());
    filteredAcc.sort((a, b) => b.presupuesto - a.presupuesto || b.ejecutado - a.ejecutado);
  } else {
    const normTarget = normalizeAccountKey(targetCeco);
    filteredTx = transactions.filter(t => normalizeAccountKey(t.ceco) === normTarget || t.ceco === targetCeco);
    filteredAcc = accounts.filter(a => normalizeAccountKey(a.ceco) === normTarget || a.ceco === targetCeco);
  }

  // Recalculate monthly evolution for this filtered set
  let planAcum = 0;
  let ejecAcum = 0;

  const monthlyEvolution: MonthlyEvolutionItem[] = MONTH_NAMES_SHORT.map((mes, idx) => {
    let mesPlan = 0;
    let mesEjec = 0;

    filteredAcc.forEach(acc => {
      mesPlan += acc.monthlyPlan[mes] || 0;
      mesEjec += acc.monthlyExec[mes] || 0;
    });

    planAcum += mesPlan;
    ejecAcum += mesEjec;

    return {
      mes,
      mesNombre: MONTH_NAMES_FULL[idx],
      plan: mesPlan,
      ejec: mesEjec,
      planAcum,
      ejecAcum
    };
  });

  return {
    filteredAccounts: filteredAcc,
    filteredTransactions: filteredTx,
    monthlyEvolution
  };
}
