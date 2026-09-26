import { AppUser, BudgetAccount, MonthlyEvolutionItem, SchoolCecoInfo, Transaction } from '../types';

export const DEMO_CECO = "TODOS";
export const DEMO_CECO_NAME = "Consolidado General Facultad";
export const DEFAULT_DIRECTOR_CECO = "1180454001";

export const DEMO_MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export const FACULTY_SCHOOLS: SchoolCecoInfo[] = [
  { ceco: "1180454001", name: "ESCUELA DE OBSTETRICIA Y PUERICULTURA", shortName: "Obstetricia", director: "Marcela Paz" },
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
    escuela: "Escuela de Obstetricia y Puericultura"
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
    glosa2: "Boleta 55102 - Banquetería Campus Central",
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA",
    mes: "Jun",
    monthIndex: 5
  },
  {
    id: "tx-obs-10",
    cuenta: "4202050510",
    descripcion: "EL ARTE DE PREMIAR Y",
    fecha: "20/07/2026",
    valor: 52900,
    glosa: "Galardón de reconocimiento a docentes destacados carrera",
    glosa2: "Boleta 4492 - Trofeos y Grabados Chile",
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA",
    mes: "Jul",
    monthIndex: 6
  },
  {
    id: "tx-obs-11",
    cuenta: "4202060603",
    descripcion: "ALIMENTOS PERSONAL",
    fecha: "10/04/2026",
    valor: 75000,
    glosa: "Servicio colación jornada evaluación curricular acreditación",
    glosa2: "Boleta 66210 - Casino Facultad",
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA",
    mes: "Abr",
    monthIndex: 3
  },
  {
    id: "tx-obs-12",
    cuenta: "4202060603",
    descripcion: "ALIMENTOS PERSONAL",
    fecha: "18/06/2026",
    valor: 65029,
    glosa: "Insumos cafetería reunión claustro académico",
    glosa2: "Boleta 71203 - Distribuidora Central",
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA",
    mes: "Jun",
    monthIndex: 5
  },
  {
    id: "tx-obs-13",
    cuenta: "4202070705",
    descripcion: "ALIMENTOS ALUMNOS",
    fecha: "25/05/2026",
    valor: 58013,
    glosa: "Colación alumnos en operativo de campo rural perinatal",
    glosa2: "Boleta 3381 - Panadería & Pastelería Providencia",
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
    fecha: "10/02/2026",
    valor: 1850000,
    glosa: "Mantención y calibración sillones dentales clínicas docentes",
    glosa2: "Factura 3012 - DentalTec Sur",
    ceco: "1180454002",
    descripCeco: "ESCUELA DE ODONTOLOGÍA",
    mes: "Feb",
    monthIndex: 1
  },
  {
    id: "tx-odo-2",
    cuenta: "4202010106",
    descripcion: "INSUMOS TECNICOS",
    fecha: "15/04/2026",
    valor: 3400000,
    glosa: "Fresas diamantadas, resinas compuestas y biomateriales",
    glosa2: "Factura 4410 - Dentsply Sirona Chile",
    ceco: "1180454002",
    descripCeco: "ESCUELA DE ODONTOLOGÍA",
    mes: "Abr",
    monthIndex: 3
  },
  {
    id: "tx-odo-3",
    cuenta: "4202010101",
    descripcion: "MATERIALES E INSUMOS",
    fecha: "12/06/2026",
    valor: 620000,
    glosa: "Baberos odontológicos, eyectores saliva, mascarillas",
    glosa2: "Factura 9921 - Proveedora Dental Santiago",
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
    fecha: "08/03/2026",
    valor: 1950000,
    glosa: "Agujas, vías venosas, catéteres periféricos y simuladores de punción",
    glosa2: "Factura 5120 - BD Medical Chile",
    ceco: "1180454003",
    descripCeco: "ESCUELA DE ENFERMERÍA",
    mes: "Mar",
    monthIndex: 2
  },
  {
    id: "tx-enf-2",
    cuenta: "4201020207",
    descripcion: "SERVICIOS EXTERNOS",
    fecha: "20/06/2026",
    valor: 820000,
    glosa: "Mantención bombas de infusión y monitores multiparámetros",
    glosa2: "Factura 1104 - BioIngeniería Médica",
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
    fecha: "12/04/2026",
    valor: 1450000,
    glosa: "Electrodos TENS, gel ultrasonido, bandas elásticas de rehabilitación",
    glosa2: "Factura 8820 - KineMarket Chile",
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
    fecha: "14/05/2026",
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
    id: "4201020202",
    name: "MOVILIZACIÓN Y FTES",
    presupuesto: 98000,
    ejecutado: 0,
    disponible: 98000,
    pct: 0,
    monthlyPlan: { "Ene": 10000, "Feb": 10000, "Mar": 20000, "Abr": 20000, "May": 20000, "Jun": 10000, "Jul": 8000 },
    monthlyExec: {},
    transactions: [],
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA Y PUERICULTURA"
  },
  {
    id: "4201020207",
    name: "SERVICIOS EXTERNOS",
    presupuesto: 9016000,
    ejecutado: 1371718,
    disponible: 7644282,
    pct: 15.2,
    monthlyPlan: { "Ene": 700000, "Feb": 800000, "Mar": 1500000, "Abr": 1500000, "May": 1500000, "Jun": 1500000, "Jul": 1516000 },
    monthlyExec: { "Mar": 450000, "May": 520000, "Jul": 401718 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.cuenta === "4201020207" && t.ceco === "1180454001"),
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA Y PUERICULTURA"
  },
  {
    id: "4202010101",
    name: "MATERIALES E INSUMOS",
    presupuesto: 450800,
    ejecutado: 413829,
    disponible: 36971,
    pct: 91.8,
    monthlyPlan: { "Ene": 50000, "Feb": 70000, "Mar": 80000, "Abr": 80000, "May": 80000, "Jun": 50000, "Jul": 40800 },
    monthlyExec: { "Feb": 180000, "Abr": 233829 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.cuenta === "4202010101" && t.ceco === "1180454001"),
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA Y PUERICULTURA"
  },
  {
    id: "4202010106",
    name: "INSUMOS TECNICOS",
    presupuesto: 7644000,
    ejecutado: 3002561,
    disponible: 4641439,
    pct: 39.3,
    monthlyPlan: { "Ene": 600000, "Feb": 800000, "Mar": 1400000, "Abr": 1400000, "May": 1400000, "Jun": 1044000, "Jul": 1000000 },
    monthlyExec: { "Mar": 1200000, "May": 950000, "Jul": 852561 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.cuenta === "4202010106" && t.ceco === "1180454001"),
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA Y PUERICULTURA"
  },
  {
    id: "4202050507",
    name: "ATENCION A TERCEROS",
    presupuesto: 147000,
    ejecutado: 64260,
    disponible: 82740,
    pct: 43.7,
    monthlyPlan: { "Ene": 0, "Feb": 0, "Mar": 30000, "Abr": 30000, "May": 40000, "Jun": 47000, "Jul": 0 },
    monthlyExec: { "Jun": 64260 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.cuenta === "4202050507" && t.ceco === "1180454001"),
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA Y PUERICULTURA"
  },
  {
    id: "4202050510",
    name: "EL ARTE DE PREMIAR Y",
    presupuesto: 0,
    ejecutado: 52900,
    disponible: -52900,
    pct: 100,
    monthlyPlan: {},
    monthlyExec: { "Jul": 52900 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.cuenta === "4202050510" && t.ceco === "1180454001"),
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA Y PUERICULTURA"
  },
  {
    id: "4202060602",
    name: "ALOJA Y PASAJES",
    presupuesto: 196000,
    ejecutado: 0,
    disponible: 196000,
    pct: 0,
    monthlyPlan: { "Mar": 98000, "Jun": 98000 },
    monthlyExec: {},
    transactions: [],
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA Y PUERICULTURA"
  },
  {
    id: "4202060603",
    name: "ALIMENTOS PERSONAL",
    presupuesto: 382200,
    ejecutado: 140029,
    disponible: 242171,
    pct: 36.6,
    monthlyPlan: { "Ene": 30000, "Feb": 30000, "Mar": 70000, "Abr": 80000, "May": 80000, "Jun": 50000, "Jul": 42200 },
    monthlyExec: { "Abr": 75000, "Jun": 65029 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.cuenta === "4202060603" && t.ceco === "1180454001"),
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA Y PUERICULTURA"
  },
  {
    id: "4202070705",
    name: "ALIMENTOS ALUMNOS",
    presupuesto: 0,
    ejecutado: 58013,
    disponible: -58013,
    pct: 100,
    monthlyPlan: {},
    monthlyExec: { "May": 58013 },
    transactions: DEMO_TRANSACTIONS.filter(t => t.cuenta === "4202070705" && t.ceco === "1180454001"),
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA Y PUERICULTURA"
  },
  {
    id: "4202090902",
    name: "GASTOS DE INVERSION",
    presupuesto: 102900,
    ejecutado: 0,
    disponible: 102900,
    pct: 0,
    monthlyPlan: { "May": 50000, "Jul": 52900 },
    monthlyExec: {},
    transactions: [],
    ceco: "1180454001",
    descripCeco: "ESCUELA DE OBSTETRICIA Y PUERICULTURA"
  },

  // --- ODONTOLOGÍA (1180454002) ---
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

  // --- ENFERMERÍA (1180454003) ---
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

  // --- KINESIOLOGÍA (1180454004) ---
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

  // --- TECNOLOGÍA MÉDICA (1180454005) ---
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
