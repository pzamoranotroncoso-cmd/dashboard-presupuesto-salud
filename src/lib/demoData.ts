import { AppUser, BudgetAccount, MonthlyEvolutionItem, SchoolCecoInfo, Transaction } from '../types';

export const DEMO_CECO = "TODOS";
export const DEMO_CECO_NAME = "Consolidado General Facultad";
export const DEFAULT_DIRECTOR_CECO = "1180454001";

export const DEMO_MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export const FACULTY_SCHOOLS: SchoolCecoInfo[] = [
  { ceco: "1180454001", name: "ESCUELA DE OBSTETRICIA", shortName: "Obstetricia", director: "Marcela Paz" },
  { ceco: "1180454002", name: "ESCUELA DE ODONTOLOGÍA", shortName: "Odontología", director: "Dr. Rodrigo Fuentes" },
  { ceco: "1180454003", name: "ESCUELA DE ENFERMERÍA", shortName: "Enfermería", director: "Dra. Carmen Gloria" },
  { ceco: "1180454004", name: "ESCUELA DE KINESIOLOGÍA", shortName: "Kinesiología", director: "Klgo. Alejandro Soto" },
  { ceco: "1180454005", name: "ESCUELA DE TECNOLOGÍA MÉDICA", shortName: "Tecnología Médica", director: "TM. Felipe Valdés" }
];

export const DEMO_SCHOOLS = FACULTY_SCHOOLS;

export const DEFAULT_USERS: AppUser[] = [
  {
    correo: "patricio.zamorano@mail.udp.cl",
    nombre: "Patricio Zamorano",
    cargo: "Director de Gestión y Finanzas",
    rol: "ADMIN",
    ceco: "TODOS",
    escuela: "Facultad de Salud y Odontología"
  },
  {
    correo: "decano.salud@mail.udp.cl",
    nombre: "Dr. Decano de Facultad",
    cargo: "Decano",
    rol: "ADMIN",
    ceco: "TODOS",
    escuela: "Facultad de Salud y Odontología"
  },
  {
    correo: "decanatura.salud@mail.udp.cl",
    nombre: "Decanatura Facultad",
    cargo: "Decanatura",
    rol: "ADMIN",
    ceco: "TODOS",
    escuela: "Facultad de Salud y Odontología"
  },
  {
    correo: "directora.obstetricia@mail.udp.cl",
    nombre: "Marcela Paz",
    cargo: "Directora Escuela de Obstetricia",
    rol: "DIRECTOR",
    ceco: "1180454001",
    escuela: "Escuela de Obstetricia"
  },
  {
    correo: "director.odontologia@mail.udp.cl",
    nombre: "Dr. Rodrigo Fuentes",
    cargo: "Director Escuela de Odontología",
    rol: "DIRECTOR",
    ceco: "1180454002",
    escuela: "Escuela de Odontología"
  },
  {
    correo: "directora.enfermeria@mail.udp.cl",
    nombre: "Dra. Carmen Gloria",
    cargo: "Directora Escuela de Enfermería",
    rol: "DIRECTOR",
    ceco: "1180454003",
    escuela: "Escuela de Enfermería"
  },
  {
    correo: "director.kinesiologia@mail.udp.cl",
    nombre: "Klgo. Alejandro Soto",
    cargo: "Director Escuela de Kinesiología",
    rol: "DIRECTOR",
    ceco: "1180454004",
    escuela: "Escuela de Kinesiología"
  },
  {
    correo: "director.tecmedica@mail.udp.cl",
    nombre: "TM. Felipe Valdés",
    cargo: "Director Escuela de Tecnología Médica",
    rol: "DIRECTOR",
    ceco: "1180454005",
    escuela: "Escuela de Tecnología Médica"
  }
];

export const DEMO_USERS = DEFAULT_USERS;

export const DEMO_TRANSACTIONS: Transaction[] = [
  // --- OBSTETRICIA (1180454001) ---
  {
    id: "tx-obs-1",
    cuenta: "4201020207",
    descripcion: "SERVICIOS EXTERNOS",
    fecha: "15/03/2026",
    valor: 450000,
    glosa: "Servicio soporte técnico equipos clínicos",
    glosa2: "Factura 18239 - Proveedor MedTech SpA",
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA",
    mes: "Mar",
    monthIndex: 2
  },
  {
    id: "tx-obs-2",
    cuenta: "4201020207",
    descripcion: "SERVICIOS EXTERNOS",
    fecha: "20/05/2026",
    valor: 520000,
    glosa: "Mantención preventiva autoclave y monitores fetales",
    glosa2: "Factura 19044 - Biomedica Chile",
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA",
    mes: "May",
    monthIndex: 4
  },
  {
    id: "tx-obs-3",
    cuenta: "4201020207",
    descripcion: "SERVICIOS EXTERNOS",
    fecha: "12/07/2026",
    valor: 401718,
    glosa: "Servicio calibración instrumental de simulación",
    glosa2: "Factura 20115 - Certisalud",
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA",
    mes: "Jul",
    monthIndex: 6
  },
  {
    id: "tx-obs-4",
    cuenta: "4202010101",
    descripcion: "MATERIALES E INSUMOS",
    fecha: "05/02/2026",
    valor: 180000,
    glosa: "Guantes estériles y mascarillas quirúrgicas laboratorio",
    glosa2: "O/C 45001298 - Farmacias del Centro",
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA",
    mes: "Feb",
    monthIndex: 1
  },
  {
    id: "tx-obs-5",
    cuenta: "4202010101",
    descripcion: "MATERIALES E INSUMOS",
    fecha: "24/04/2026",
    valor: 233829,
    glosa: "Papel toalla, alcohol desnaturalizado, antisépticos",
    glosa2: "O/C 45001402 - Distribuidora Hospitalaria",
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA",
    mes: "Abr",
    monthIndex: 3
  },
  {
    id: "tx-obs-6",
    cuenta: "4202010106",
    descripcion: "INSUMOS TECNICOS",
    fecha: "18/03/2026",
    valor: 1200000,
    glosa: "Kit simulador de parto y apósitos especializados",
    glosa2: "Factura 8821 - Gaumard Medical Latam",
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA",
    mes: "Mar",
    monthIndex: 2
  },
  {
    id: "tx-obs-7",
    cuenta: "4202010106",
    descripcion: "INSUMOS TECNICOS",
    fecha: "28/05/2026",
    valor: 950000,
    glosa: "Sondas ecográficas y gel conductor ecografía obstétrica",
    glosa2: "Factura 9410 - Philips Healthcare",
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA",
    mes: "May",
    monthIndex: 4
  },
  {
    id: "tx-obs-8",
    cuenta: "4202010106",
    descripcion: "INSUMOS TECNICOS",
    fecha: "15/07/2026",
    valor: 852561,
    glosa: "Reposición espéculos desechables y fórceps de docencia",
    glosa2: "Factura 10102 - Instrumental Quirúrgico Andino",
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA",
    mes: "Jul",
    monthIndex: 6
  },
  {
    id: "tx-obs-9",
    cuenta: "4202050507",
    descripcion: "ATENCION A TERCEROS",
    fecha: "14/06/2026",
    valor: 64260,
    glosa: "Coffee break seminario salud materna y neonatal",
    glosa2: "Boleta 3391 - Banquetería Central",
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA",
    mes: "Jun",
    monthIndex: 5
  },
  {
    id: "tx-obs-10",
    cuenta: "4202060603",
    descripcion: "ALIMENTOS PERSONAL",
    fecha: "22/04/2026",
    valor: 75000,
    glosa: "Almuerzo de trabajo equipo docente proceso acreditación",
    glosa2: "Boleta 4402 - Casino Central",
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA",
    mes: "Abr",
    monthIndex: 3
  },
  {
    id: "tx-obs-11",
    cuenta: "4202060603",
    descripcion: "ALIMENTOS PERSONAL",
    fecha: "10/06/2026",
    valor: 65029,
    glosa: "Reunión claustro docente término primer semestre",
    glosa2: "Factura 1102 - Servicios Gastronómicos",
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA",
    mes: "Jun",
    monthIndex: 5
  },
  {
    id: "tx-obs-12",
    cuenta: "4202070705",
    descripcion: "ALIMENTOS ALUMNOS",
    fecha: "18/05/2026",
    valor: 58013,
    glosa: "Colaciones jornada de bienvenida internado clínico",
    glosa2: "Boleta 5590 - Alimentos Express",
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA",
    mes: "May",
    monthIndex: 4
  },

  // --- ODONTOLOGÍA (1180454002) ---
  {
    id: "tx-odo-1",
    cuenta: "4201020207",
    descripcion: "SERVICIOS EXTERNOS",
    fecha: "14/02/2026",
    valor: 1850000,
    glosa: "Mantención y calibración sillones dentales y compresores",
    glosa2: "Factura 4402 - Dental Tech Chile",
    ceco: "1180454002",
    descripCeco: "ESCUELA DE ODONTOLOGÍA",
    mes: "Feb",
    monthIndex: 1
  },
  {
    id: "tx-odo-2",
    cuenta: "4202010106",
    descripcion: "INSUMOS TECNICOS",
    fecha: "20/04/2026",
    valor: 3400000,
    glosa: "Resinas compuestas, fresas de diamante, anestésicos y biomateriales",
    glosa2: "Factura 9811 - Dentsply Sirona",
    ceco: "1180454002",
    descripCeco: "ESCUELA DE ODONTOLOGÍA",
    mes: "Abr",
    monthIndex: 3
  },
  {
    id: "tx-odo-3",
    cuenta: "4202010101",
    descripcion: "MATERIALES E INSUMOS",
    fecha: "11/06/2026",
    valor: 620000,
    glosa: "Guantes de nitrilo, baberos desechables y eyectores saliva",
    glosa2: "Factura 3099 - Prodent Ltda",
    ceco: "1180454002",
    descripCeco: "ESCUELA DE ODONTOLOGÍA",
    mes: "Jun",
    monthIndex: 5
  },

  // --- ENFERMERÍA (1180454003) ---
  {
    id: "tx-enf-1",
    cuenta: "4202010106",
    descripcion: "INSUMOS TECNICOS",
    fecha: "10/03/2026",
    valor: 1950000,
    glosa: "Brazo punción venosa, apósitos hidrocoloides, insumos curaciones",
    glosa2: "Factura 7701 - BSN Medical",
    ceco: "1180454003",
    descripCeco: "ESCUELA DE ENFERMERÍA",
    mes: "Mar",
    monthIndex: 2
  },
  {
    id: "tx-enf-2",
    cuenta: "4201020207",
    descripcion: "SERVICIOS EXTERNOS",
    fecha: "15/06/2026",
    valor: 820000,
    glosa: "Mantención de bombas de infusión y monitores multiparámetro",
    glosa2: "Factura 8120 - BioService Ltda",
    ceco: "1180454003",
    descripCeco: "ESCUELA DE ENFERMERÍA",
    mes: "Jun",
    monthIndex: 5
  },

  // --- KINESIOLOGÍA (1180454004) ---
  {
    id: "tx-kin-1",
    cuenta: "4202010106",
    descripcion: "INSUMOS TECNICOS",
    fecha: "25/04/2026",
    valor: 1450000,
    glosa: "Electrodos autoadhesivos, bandas elásticas thera-band, goniómetros",
    glosa2: "Factura 5520 - KineSupply Chile",
    ceco: "1180454004",
    descripCeco: "ESCUELA DE KINESIOLOGÍA",
    mes: "Abr",
    monthIndex: 3
  },

  // --- TECNOLOGÍA MÉDICA (1180454005) ---
  {
    id: "tx-tec-1",
    cuenta: "4202010106",
    descripcion: "INSUMOS TECNICOS",
    fecha: "19/05/2026",
    valor: 2100000,
    glosa: "Reactivos bioquímicos, portaobjetos y pipetas automatizadas",
    glosa2: "Factura 7611 - LabSupply Andina",
    ceco: "1180454005",
    descripCeco: "ESCUELA DE TECNOLOGÍA MÉDICA",
    mes: "May",
    monthIndex: 4
  }
];

export const DEMO_ACCOUNTS: BudgetAccount[] = [
  // --- OBSTETRICIA (1180454001) ---
  {
    id: "4201020202-obs",
    name: "MOVILIZACIÓN Y FTES",
    presupuesto: 98000,
    ejecutado: 0,
    disponible: 98000,
    pct: 0,
    monthlyPlan: { "Ene": 10000, "Feb": 10000, "Mar": 20000, "Abr": 20000, "May": 20000, "Jun": 10000, "Jul": 8000 },
    monthlyExec: {},
    transactions: [],
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA"
  },
  {
    id: "4201020207-obs",
    name: "SERVICIOS EXTERNOS",
    presupuesto: 9016000,
    ejecutado: 1371718,
    disponible: 7644282,
    pct: 15.2,
    monthlyPlan: { "Ene": 700000, "Feb": 800000, "Mar": 1500000, "Abr": 1500000, "May": 1500000, "Jun": 1500000, "Jul": 1516000 },
    monthlyExec: { "Mar": 450000, "May": 520000, "Jul": 401718 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.cuenta === "4201020207" && t.ceco === "1180454001"),
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA"
  },
  {
    id: "4202010101-obs",
    name: "MATERIALES E INSUMOS",
    presupuesto: 450800,
    ejecutado: 413829,
    disponible: 36971,
    pct: 91.8,
    monthlyPlan: { "Ene": 50000, "Feb": 70000, "Mar": 80000, "Abr": 80000, "May": 80000, "Jun": 50000, "Jul": 40800 },
    monthlyExec: { "Feb": 180000, "Abr": 233829 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.cuenta === "4202010101" && t.ceco === "1180454001"),
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA"
  },
  {
    id: "4202010106-obs",
    name: "INSUMOS TECNICOS",
    presupuesto: 7644000,
    ejecutado: 3002561,
    disponible: 4641439,
    pct: 39.3,
    monthlyPlan: { "Ene": 600000, "Feb": 800000, "Mar": 1400000, "Abr": 1400000, "May": 1400000, "Jun": 1044000, "Jul": 1000000 },
    monthlyExec: { "Mar": 1200000, "May": 950000, "Jul": 852561 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.cuenta === "4202010106" && t.ceco === "1180454001"),
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA"
  },
  {
    id: "4202050507-obs",
    name: "ATENCION A TERCEROS",
    presupuesto: 147000,
    ejecutado: 64260,
    disponible: 82740,
    pct: 43.7,
    monthlyPlan: { "Ene": 0, "Feb": 0, "Mar": 30000, "Abr": 30000, "May": 40000, "Jun": 47000, "Jul": 0 },
    monthlyExec: { "Jun": 64260 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.cuenta === "4202050507" && t.ceco === "1180454001"),
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA"
  },
  {
    id: "4202060602-obs",
    name: "ALOJA Y PASAJES",
    presupuesto: 196000,
    ejecutado: 0,
    disponible: 196000,
    pct: 0,
    monthlyPlan: { "Mar": 98000, "Jun": 98000 },
    monthlyExec: {},
    transactions: [],
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA"
  },
  {
    id: "4202060603-obs",
    name: "ALIMENTOS PERSONAL",
    presupuesto: 382200,
    ejecutado: 140029,
    disponible: 242171,
    pct: 36.6,
    monthlyPlan: { "Ene": 30000, "Feb": 30000, "Mar": 70000, "Abr": 80000, "May": 80000, "Jun": 50000, "Jul": 42200 },
    monthlyExec: { "Abr": 75000, "Jun": 65029 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.cuenta === "4202060603" && t.ceco === "1180454001"),
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA"
  },
  {
    id: "4202070705-obs",
    name: "ALIMENTOS ALUMNOS",
    presupuesto: 250000,
    ejecutado: 58013,
    disponible: 191987,
    pct: 23.2,
    monthlyPlan: { "Abr": 50000, "May": 100000, "Jun": 100000 },
    monthlyExec: { "May": 58013 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.cuenta === "4202070705" && t.ceco === "1180454001"),
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA"
  },
  {
    id: "4202090902-obs",
    name: "GASTOS DE INVERSION",
    presupuesto: 102900,
    ejecutado: 0,
    disponible: 102900,
    pct: 0,
    monthlyPlan: { "May": 50000, "Jul": 52900 },
    monthlyExec: {},
    transactions: [],
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA"
  },

  // --- ODONTOLOGÍA (1180454002) ---
  {
    id: "4201020202-odo",
    name: "MOVILIZACIÓN Y FTES",
    presupuesto: 350000,
    ejecutado: 45000,
    disponible: 305000,
    pct: 12.9,
    monthlyPlan: { "Mar": 100000, "May": 100000, "Jul": 150000 },
    monthlyExec: { "May": 45000 },
    transactions: [],
    ceco: "1180454002",
    descripCeco: "ESCUELA DE ODONTOLOGÍA"
  },
  {
    id: "4201020207-odo",
    name: "SERVICIOS EXTERNOS",
    presupuesto: 18500000,
    ejecutado: 1850000,
    disponible: 16650000,
    pct: 10.0,
    monthlyPlan: { "Feb": 5000000, "Abr": 5000000, "Jun": 8500000 },
    monthlyExec: { "Feb": 1850000 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.ceco === "1180454002" && t.cuenta === "4201020207"),
    ceco: "1180454002",
    descripCeco: "ESCUELA DE ODONTOLOGÍA"
  },
  {
    id: "4202010101-odo",
    name: "MATERIALES E INSUMOS",
    presupuesto: 3500000,
    ejecutado: 620000,
    disponible: 2880000,
    pct: 17.7,
    monthlyPlan: { "Ene": 500000, "Mar": 1000000, "Jun": 2000000 },
    monthlyExec: { "Jun": 620000 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.ceco === "1180454002" && t.cuenta === "4202010101"),
    ceco: "1180454002",
    descripCeco: "ESCUELA DE ODONTOLOGÍA"
  },
  {
    id: "4202010106-odo",
    name: "INSUMOS TECNICOS",
    presupuesto: 24000000,
    ejecutado: 3400000,
    disponible: 20600000,
    pct: 14.2,
    monthlyPlan: { "Mar": 8000000, "Abr": 8000000, "May": 8000000 },
    monthlyExec: { "Abr": 3400000 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.ceco === "1180454002" && t.cuenta === "4202010106"),
    ceco: "1180454002",
    descripCeco: "ESCUELA DE ODONTOLOGÍA"
  },
  {
    id: "4202040401-odo",
    name: "MANTENCION Y REPARACION EQUIPOS",
    presupuesto: 8500000,
    ejecutado: 1250000,
    disponible: 7250000,
    pct: 14.7,
    monthlyPlan: { "Feb": 2000000, "Abr": 2500000, "Jun": 4000000 },
    monthlyExec: { "Abr": 1250000 },
    transactions: [],
    ceco: "1180454002",
    descripCeco: "ESCUELA DE ODONTOLOGÍA"
  },
  {
    id: "4202050507-odo",
    name: "ATENCION A TERCEROS",
    presupuesto: 450000,
    ejecutado: 120000,
    disponible: 330000,
    pct: 26.7,
    monthlyPlan: { "Mar": 150000, "Jun": 300000 },
    monthlyExec: { "Jun": 120000 },
    transactions: [],
    ceco: "1180454002",
    descripCeco: "ESCUELA DE ODONTOLOGÍA"
  },
  {
    id: "4202060602-odo",
    name: "ALOJA Y PASAJES",
    presupuesto: 600000,
    ejecutado: 0,
    disponible: 600000,
    pct: 0,
    monthlyPlan: { "May": 300000, "Jul": 300000 },
    monthlyExec: {},
    transactions: [],
    ceco: "1180454002",
    descripCeco: "ESCUELA DE ODONTOLOGÍA"
  },
  {
    id: "4202060603-odo",
    name: "ALIMENTOS PERSONAL",
    presupuesto: 850000,
    ejecutado: 310000,
    disponible: 540000,
    pct: 36.5,
    monthlyPlan: { "Mar": 250000, "May": 300000, "Jun": 300000 },
    monthlyExec: { "May": 310000 },
    transactions: [],
    ceco: "1180454002",
    descripCeco: "ESCUELA DE ODONTOLOGÍA"
  },
  {
    id: "4202070705-odo",
    name: "ALIMENTOS ALUMNOS",
    presupuesto: 400000,
    ejecutado: 85000,
    disponible: 315000,
    pct: 21.3,
    monthlyPlan: { "Abr": 200000, "Jun": 200000 },
    monthlyExec: { "Abr": 85000 },
    transactions: [],
    ceco: "1180454002",
    descripCeco: "ESCUELA DE ODONTOLOGÍA"
  },
  {
    id: "4202090902-odo",
    name: "GASTOS DE INVERSION",
    presupuesto: 3500000,
    ejecutado: 0,
    disponible: 3500000,
    pct: 0,
    monthlyPlan: { "Jun": 3500000 },
    monthlyExec: {},
    transactions: [],
    ceco: "1180454002",
    descripCeco: "ESCUELA DE ODONTOLOGÍA"
  },

  // --- ENFERMERÍA (1180454003) ---
  {
    id: "4201020202-enf",
    name: "MOVILIZACIÓN Y FTES",
    presupuesto: 250000,
    ejecutado: 32000,
    disponible: 218000,
    pct: 12.8,
    monthlyPlan: { "Mar": 80000, "May": 90000, "Jun": 80000 },
    monthlyExec: { "May": 32000 },
    transactions: [],
    ceco: "1180454003",
    descripCeco: "ESCUELA DE ENFERMERÍA"
  },
  {
    id: "4201020207-enf",
    name: "SERVICIOS EXTERNOS",
    presupuesto: 4500000,
    ejecutado: 820000,
    disponible: 3680000,
    pct: 18.2,
    monthlyPlan: { "Abr": 2000000, "Jun": 2500000 },
    monthlyExec: { "Jun": 820000 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.ceco === "1180454003" && t.cuenta === "4201020207"),
    ceco: "1180454003",
    descripCeco: "ESCUELA DE ENFERMERÍA"
  },
  {
    id: "4202010101-enf",
    name: "MATERIALES E INSUMOS",
    presupuesto: 2200000,
    ejecutado: 480000,
    disponible: 1720000,
    pct: 21.8,
    monthlyPlan: { "Mar": 600000, "Abr": 800000, "May": 800000 },
    monthlyExec: { "Abr": 480000 },
    transactions: [],
    ceco: "1180454003",
    descripCeco: "ESCUELA DE ENFERMERÍA"
  },
  {
    id: "4202010106-enf",
    name: "INSUMOS TECNICOS",
    presupuesto: 12000000,
    ejecutado: 1950000,
    disponible: 10050000,
    pct: 16.3,
    monthlyPlan: { "Feb": 4000000, "Mar": 4000000, "May": 4000000 },
    monthlyExec: { "Mar": 1950000 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.ceco === "1180454003" && t.cuenta === "4202010106"),
    ceco: "1180454003",
    descripCeco: "ESCUELA DE ENFERMERÍA"
  },
  {
    id: "4202040401-enf",
    name: "MANTENCION Y REPARACION EQUIPOS",
    presupuesto: 3200000,
    ejecutado: 450000,
    disponible: 2750000,
    pct: 14.1,
    monthlyPlan: { "Mar": 1200000, "Jun": 2000000 },
    monthlyExec: { "Jun": 450000 },
    transactions: [],
    ceco: "1180454003",
    descripCeco: "ESCUELA DE ENFERMERÍA"
  },
  {
    id: "4202050507-enf",
    name: "ATENCION A TERCEROS",
    presupuesto: 350000,
    ejecutado: 95000,
    disponible: 255000,
    pct: 27.1,
    monthlyPlan: { "Mar": 150000, "May": 200000 },
    monthlyExec: { "May": 95000 },
    transactions: [],
    ceco: "1180454003",
    descripCeco: "ESCUELA DE ENFERMERÍA"
  },
  {
    id: "4202060602-enf",
    name: "ALOJA Y PASAJES",
    presupuesto: 500000,
    ejecutado: 0,
    disponible: 500000,
    pct: 0,
    monthlyPlan: { "Jun": 500000 },
    monthlyExec: {},
    transactions: [],
    ceco: "1180454003",
    descripCeco: "ESCUELA DE ENFERMERÍA"
  },
  {
    id: "4202060603-enf",
    name: "ALIMENTOS PERSONAL",
    presupuesto: 650000,
    ejecutado: 185000,
    disponible: 465000,
    pct: 28.5,
    monthlyPlan: { "Abr": 300000, "Jun": 350000 },
    monthlyExec: { "Jun": 185000 },
    transactions: [],
    ceco: "1180454003",
    descripCeco: "ESCUELA DE ENFERMERÍA"
  },
  {
    id: "4202070705-enf",
    name: "ALIMENTOS ALUMNOS",
    presupuesto: 300000,
    ejecutado: 45000,
    disponible: 255000,
    pct: 15.0,
    monthlyPlan: { "May": 300000 },
    monthlyExec: { "May": 45000 },
    transactions: [],
    ceco: "1180454003",
    descripCeco: "ESCUELA DE ENFERMERÍA"
  },
  {
    id: "4202090902-enf",
    name: "GASTOS DE INVERSION",
    presupuesto: 1800000,
    ejecutado: 0,
    disponible: 1800000,
    pct: 0,
    monthlyPlan: { "Jun": 1800000 },
    monthlyExec: {},
    transactions: [],
    ceco: "1180454003",
    descripCeco: "ESCUELA DE ENFERMERÍA"
  },

  // --- KINESIOLOGÍA (1180454004) ---
  {
    id: "4201020202-kin",
    name: "MOVILIZACIÓN Y FTES",
    presupuesto: 200000,
    ejecutado: 18000,
    disponible: 182000,
    pct: 9.0,
    monthlyPlan: { "Feb": 60000, "Abr": 70000, "Jun": 70000 },
    monthlyExec: { "Abr": 18000 },
    transactions: [],
    ceco: "1180454004",
    descripCeco: "ESCUELA DE KINESIOLOGÍA"
  },
  {
    id: "4201020207-kin",
    name: "SERVICIOS EXTERNOS",
    presupuesto: 5200000,
    ejecutado: 940000,
    disponible: 4260000,
    pct: 18.1,
    monthlyPlan: { "Mar": 2000000, "May": 3200000 },
    monthlyExec: { "May": 940000 },
    transactions: [],
    ceco: "1180454004",
    descripCeco: "ESCUELA DE KINESIOLOGÍA"
  },
  {
    id: "4202010101-kin",
    name: "MATERIALES E INSUMOS",
    presupuesto: 1800000,
    ejecutado: 380000,
    disponible: 1420000,
    pct: 21.1,
    monthlyPlan: { "Feb": 500000, "Mar": 600000, "Jun": 700000 },
    monthlyExec: { "Mar": 380000 },
    transactions: [],
    ceco: "1180454004",
    descripCeco: "ESCUELA DE KINESIOLOGÍA"
  },
  {
    id: "4202010106-kin",
    name: "INSUMOS TECNICOS",
    presupuesto: 9500000,
    ejecutado: 1450000,
    disponible: 8050000,
    pct: 15.3,
    monthlyPlan: { "Mar": 3000000, "Abr": 3500000, "Jun": 3000000 },
    monthlyExec: { "Abr": 1450000 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.ceco === "1180454004" && t.cuenta === "4202010106"),
    ceco: "1180454004",
    descripCeco: "ESCUELA DE KINESIOLOGÍA"
  },
  {
    id: "4202040401-kin",
    name: "MANTENCION Y REPARACION EQUIPOS",
    presupuesto: 2800000,
    ejecutado: 510000,
    disponible: 2290000,
    pct: 18.2,
    monthlyPlan: { "Mar": 1000000, "Jun": 1800000 },
    monthlyExec: { "Jun": 510000 },
    transactions: [],
    ceco: "1180454004",
    descripCeco: "ESCUELA DE KINESIOLOGÍA"
  },
  {
    id: "4202050507-kin",
    name: "ATENCION A TERCEROS",
    presupuesto: 300000,
    ejecutado: 75000,
    disponible: 225000,
    pct: 25.0,
    monthlyPlan: { "Abr": 150000, "Jun": 150000 },
    monthlyExec: { "Jun": 75000 },
    transactions: [],
    ceco: "1180454004",
    descripCeco: "ESCUELA DE KINESIOLOGÍA"
  },
  {
    id: "4202060602-kin",
    name: "ALOJA Y PASAJES",
    presupuesto: 450000,
    ejecutado: 0,
    disponible: 450000,
    pct: 0,
    monthlyPlan: { "Jun": 450000 },
    monthlyExec: {},
    transactions: [],
    ceco: "1180454004",
    descripCeco: "ESCUELA DE KINESIOLOGÍA"
  },
  {
    id: "4202060603-kin",
    name: "ALIMENTOS PERSONAL",
    presupuesto: 550000,
    ejecutado: 160000,
    disponible: 390000,
    pct: 29.1,
    monthlyPlan: { "Mar": 250000, "Jun": 300000 },
    monthlyExec: { "Jun": 160000 },
    transactions: [],
    ceco: "1180454004",
    descripCeco: "ESCUELA DE KINESIOLOGÍA"
  },
  {
    id: "4202070705-kin",
    name: "ALIMENTOS ALUMNOS",
    presupuesto: 250000,
    ejecutado: 40000,
    disponible: 210000,
    pct: 16.0,
    monthlyPlan: { "May": 250000 },
    monthlyExec: { "May": 40000 },
    transactions: [],
    ceco: "1180454004",
    descripCeco: "ESCUELA DE KINESIOLOGÍA"
  },
  {
    id: "4202090902-kin",
    name: "GASTOS DE INVERSION",
    presupuesto: 1500000,
    ejecutado: 0,
    disponible: 1500000,
    pct: 0,
    monthlyPlan: { "Jun": 1500000 },
    monthlyExec: {},
    transactions: [],
    ceco: "1180454004",
    descripCeco: "ESCUELA DE KINESIOLOGÍA"
  },

  // --- TECNOLOGÍA MÉDICA (1180454005) ---
  {
    id: "4201020202-tec",
    name: "MOVILIZACIÓN Y FTES",
    presupuesto: 220000,
    ejecutado: 25000,
    disponible: 195000,
    pct: 11.4,
    monthlyPlan: { "Feb": 70000, "Abr": 80000, "Jun": 70000 },
    monthlyExec: { "Abr": 25000 },
    transactions: [],
    ceco: "1180454005",
    descripCeco: "ESCUELA DE TECNOLOGÍA MÉDICA"
  },
  {
    id: "4201020207-tec",
    name: "SERVICIOS EXTERNOS",
    presupuesto: 6000000,
    ejecutado: 1100000,
    disponible: 4900000,
    pct: 18.3,
    monthlyPlan: { "Mar": 2500000, "Jun": 3500000 },
    monthlyExec: { "Jun": 1100000 },
    transactions: [],
    ceco: "1180454005",
    descripCeco: "ESCUELA DE TECNOLOGÍA MÉDICA"
  },
  {
    id: "4202010101-tec",
    name: "MATERIALES E INSUMOS",
    presupuesto: 2100000,
    ejecutado: 520000,
    disponible: 1580000,
    pct: 24.8,
    monthlyPlan: { "Feb": 600000, "Abr": 700000, "Jun": 800000 },
    monthlyExec: { "Jun": 520000 },
    transactions: [],
    ceco: "1180454005",
    descripCeco: "ESCUELA DE TECNOLOGÍA MÉDICA"
  },
  {
    id: "4202010106-tec",
    name: "INSUMOS TECNICOS",
    presupuesto: 11000000,
    ejecutado: 2100000,
    disponible: 8900000,
    pct: 19.1,
    monthlyPlan: { "Feb": 3000000, "May": 4000000, "Jul": 4000000 },
    monthlyExec: { "May": 2100000 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.ceco === "1180454005" && t.cuenta === "4202010106"),
    ceco: "1180454005",
    descripCeco: "ESCUELA DE TECNOLOGÍA MÉDICA"
  },
  {
    id: "4202040401-tec",
    name: "MANTENCION Y REPARACION EQUIPOS",
    presupuesto: 3500000,
    ejecutado: 680000,
    disponible: 2820000,
    pct: 19.4,
    monthlyPlan: { "Mar": 1500000, "Jun": 2000000 },
    monthlyExec: { "Jun": 680000 },
    transactions: [],
    ceco: "1180454005",
    descripCeco: "ESCUELA DE TECNOLOGÍA MÉDICA"
  },
  {
    id: "4202050507-tec",
    name: "ATENCION A TERCEROS",
    presupuesto: 320000,
    ejecutado: 80000,
    disponible: 240000,
    pct: 25.0,
    monthlyPlan: { "Mar": 120000, "Jun": 200000 },
    monthlyExec: { "Jun": 80000 },
    transactions: [],
    ceco: "1180454005",
    descripCeco: "ESCUELA DE TECNOLOGÍA MÉDICA"
  },
  {
    id: "4202060602-tec",
    name: "ALOJA Y PASAJES",
    presupuesto: 500000,
    ejecutado: 0,
    disponible: 500000,
    pct: 0,
    monthlyPlan: { "Jun": 500000 },
    monthlyExec: {},
    transactions: [],
    ceco: "1180454005",
    descripCeco: "ESCUELA DE TECNOLOGÍA MÉDICA"
  },
  {
    id: "4202060603-tec",
    name: "ALIMENTOS PERSONAL",
    presupuesto: 600000,
    ejecutado: 175000,
    disponible: 425000,
    pct: 29.2,
    monthlyPlan: { "Mar": 250000, "Jun": 350000 },
    monthlyExec: { "Jun": 175000 },
    transactions: [],
    ceco: "1180454005",
    descripCeco: "ESCUELA DE TECNOLOGÍA MÉDICA"
  },
  {
    id: "4202070705-tec",
    name: "ALIMENTOS ALUMNOS",
    presupuesto: 280000,
    ejecutado: 50000,
    disponible: 230000,
    pct: 17.9,
    monthlyPlan: { "May": 280000 },
    monthlyExec: { "May": 50000 },
    transactions: [],
    ceco: "1180454005",
    descripCeco: "ESCUELA DE TECNOLOGÍA MÉDICA"
  },
  {
    id: "4202090902-tec",
    name: "GASTOS DE INVERSION",
    presupuesto: 2000000,
    ejecutado: 0,
    disponible: 2000000,
    pct: 0,
    monthlyPlan: { "Jun": 2000000 },
    monthlyExec: {},
    transactions: [],
    ceco: "1180454005",
    descripCeco: "ESCUELA DE TECNOLOGÍA MÉDICA"
  }
];

export const DEMO_MONTHLY_EVOLUTION: MonthlyEvolutionItem[] = [
  { mes: "Ene", mesNombre: "Enero", plan: 1390000, ejec: 300000, planAcum: 1390000, ejecAcum: 300000 },
  { mes: "Feb", mesNombre: "Febrero", plan: 1710000, ejec: 400000, planAcum: 3100000, ejecAcum: 700000 },
  { mes: "Mar", mesNombre: "Marzo", plan: 3098000, ejec: 900000, planAcum: 6198000, ejecAcum: 1600000 },
  { mes: "Abr", mesNombre: "Abril", plan: 3030000, ejec: 900000, planAcum: 9228000, ejecAcum: 2500000 },
  { mes: "May", mesNombre: "Mayo", plan: 3090000, ejec: 900000, planAcum: 12318000, ejecAcum: 3400000 },
  { mes: "Jun", mesNombre: "Junio", plan: 2751000, ejec: 800000, planAcum: 15069000, ejecAcum: 4200000 },
  { mes: "Jul", mesNombre: "Julio", plan: 2669900, ejec: 903310, planAcum: 17738900, ejecAcum: 5103310 },
  { mes: "Ago", mesNombre: "Agosto", plan: 301100, ejec: 0, planAcum: 18040000, ejecAcum: 5103310 }
];
