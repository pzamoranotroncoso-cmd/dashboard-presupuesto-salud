// Base de datos real cargada desde Copia de Ejecución Presupuestaria 2026 (Patricio Zamorano)
import { AppUser, BudgetAccount, MonthlyEvolutionItem, SchoolCecoInfo, Transaction } from "../types";

export const DEMO_CECO = "TODOS";
export const DEMO_CECO_NAME = "Consolidado General Facultad";
export const DEFAULT_DIRECTOR_CECO = "1180454001";
export const DEMO_MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export const FACULTY_SCHOOLS: SchoolCecoInfo[] = [
  {
    "ceco": "1180454001",
    "name": "ESCUELA DE OBSTETRICIA",
    "shortName": "Obstetricia",
    "director": "Director(a) de Escuela"
  },
  {
    "ceco": "1180326006",
    "name": "Campus Clinico",
    "shortName": "Campus Clinico",
    "director": "Director(a) de Escuela"
  },
  {
    "ceco": "1180326010",
    "name": "Centro Simulación",
    "shortName": "Centro Simulación",
    "director": "Director(a) de Escuela"
  },
  {
    "ceco": "1180452001",
    "name": "ESCUELA DE ENFERMERIA",
    "shortName": "Enfermeria",
    "director": "Director(a) de Escuela"
  },
  {
    "ceco": "1180580001",
    "name": "Escuela Postgra",
    "shortName": "Escuela Postgra",
    "director": "Director(a) de Escuela"
  },
  {
    "ceco": "1180455001",
    "name": "ESCUELA DE KINESIOLOGÍA",
    "shortName": "Kinesiología",
    "director": "Director(a) de Escuela"
  },
  {
    "ceco": "1180326009",
    "name": "Lab Ciencias Bá",
    "shortName": "Lab Ciencias Bá",
    "director": "Director(a) de Escuela"
  },
  {
    "ceco": "1180450001",
    "name": "ESCUELA DE ODONTOLOGIA",
    "shortName": "Odontologia",
    "director": "Director(a) de Escuela"
  },
  {
    "ceco": "1180325001",
    "name": "Oficina del Dec",
    "shortName": "Oficina del Dec",
    "director": "Director(a) de Escuela"
  },
  {
    "ceco": "1180451001",
    "name": "ESCUELA DE TECNOLOGIA MEDI",
    "shortName": "Tecnologia Medi",
    "director": "Director(a) de Escuela"
  }
];
export const DEMO_SCHOOLS = FACULTY_SCHOOLS;

export const DEFAULT_USERS: AppUser[] = [
  {
    correo: "pzamorano.troncoso@gmail.com",
    nombre: "Patricio Zamorano",
    cargo: "Director de Gestión y Finanzas",
    rol: "ADMIN",
    ceco: "TODOS",
    escuela: "Facultad de Salud y Odontología"
  },
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
    nombre: "Directora Escuela de Obstetricia",
    cargo: "Directora",
    rol: "DIRECTOR",
    ceco: "1180454001",
    escuela: "Escuela de Obstetricia"
  },
  {
    correo: "director.odontologia@mail.udp.cl",
    nombre: "Director Escuela de Odontología",
    cargo: "Director",
    rol: "DIRECTOR",
    ceco: "1180450001",
    escuela: "Escuela de Odontología"
  },
  {
    correo: "directora.enfermeria@mail.udp.cl",
    nombre: "Directora Escuela de Enfermería",
    cargo: "Directora",
    rol: "DIRECTOR",
    ceco: "1180452001",
    escuela: "Escuela de Enfermería"
  },
  {
    correo: "director.kinesiologia@mail.udp.cl",
    nombre: "Director Escuela de Kinesiología",
    cargo: "Director",
    rol: "DIRECTOR",
    ceco: "1180455001",
    escuela: "Escuela de Kinesiología"
  },
  {
    correo: "director.tecmedica@mail.udp.cl",
    nombre: "Director Escuela de Tecnología Médica",
    cargo: "Director",
    rol: "DIRECTOR",
    ceco: "1180451001",
    escuela: "Escuela de Tecnología Médica"
  }
];
export const DEMO_USERS = DEFAULT_USERS;

export const DEMO_ACCOUNTS: BudgetAccount[] = [
  {
    "id": "4202010106",
    "name": "INSUMOS TÉCNICOS",
    "presupuesto": 7644000,
    "ejecutado": 3325140,
    "disponible": 4318860,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 2744000,
      "Jun": 4900000
    },
    "monthlyExec": {
      "Mar": 2524480,
      "Jun": 4508000
    },
    "transactions": [
      {
        "id": "TX-1",
        "cuenta": "4202010106",
        "descripcion": "INSUMOS TÉCNICOS",
        "fecha": "15/05/2026",
        "valor": 1995084,
        "glosa": "Consumo de Insumos Ténicos",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180454001",
        "descripCeco": "Obstetricia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180454001",
    "descripCeco": "Obstetricia"
  },
  {
    "id": "4202010101",
    "name": "MATERIALES E INSUMOS",
    "presupuesto": 450800,
    "ejecutado": 196098,
    "disponible": 254702,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 254800,
      "Jun": 196000
    },
    "monthlyExec": {
      "Mar": 234416,
      "Jun": 180320
    },
    "transactions": [
      {
        "id": "TX-2",
        "cuenta": "4202010101",
        "descripcion": "MATERIALES E INSUMOS",
        "fecha": "15/05/2026",
        "valor": 117659,
        "glosa": "Consumo Materiales e Insumos",
        "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
        "ceco": "1180454001",
        "descripCeco": "Obstetricia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180454001",
    "descripCeco": "Obstetricia"
  },
  {
    "id": "4202060603",
    "name": "ALIMENTOS PERSONAL",
    "presupuesto": 382200,
    "ejecutado": 166257,
    "disponible": 215943,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 186200,
      "Jun": 196000
    },
    "monthlyExec": {
      "Mar": 171304,
      "Jun": 180320
    },
    "transactions": [
      {
        "id": "TX-3",
        "cuenta": "4202060603",
        "descripcion": "ALIMENTOS PERSONAL",
        "fecha": "15/05/2026",
        "valor": 99754,
        "glosa": "Consumo Servicios Externos",
        "glosa2": "ESCUELA",
        "ceco": "1180454001",
        "descripCeco": "Obstetricia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180454001",
    "descripCeco": "Obstetricia"
  },
  {
    "id": "4202050507",
    "name": "ATENCIÓN A TERCEROS",
    "presupuesto": 147000,
    "ejecutado": 63945,
    "disponible": 83055,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 147000
    },
    "monthlyExec": {
      "Mar": 135240
    },
    "transactions": [
      {
        "id": "TX-4",
        "cuenta": "4202050507",
        "descripcion": "ATENCIÓN A TERCEROS",
        "fecha": "15/05/2026",
        "valor": 38367,
        "glosa": "Operación periódica ATENCIÓN A TERCEROS",
        "glosa2": "ESCUELA",
        "ceco": "1180454001",
        "descripCeco": "Obstetricia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180454001",
    "descripCeco": "Obstetricia"
  },
  {
    "id": "4201020202",
    "name": "MOVILIZACIÓN Y FLETES",
    "presupuesto": 98000,
    "ejecutado": 42630,
    "disponible": 55370,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 98000
    },
    "monthlyExec": {
      "Mar": 90160
    },
    "transactions": [
      {
        "id": "TX-5",
        "cuenta": "4201020202",
        "descripcion": "MOVILIZACIÓN Y FLETES",
        "fecha": "15/05/2026",
        "valor": 25578,
        "glosa": "Operación periódica MOVILIZACIÓN Y FLETES",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180454001",
        "descripCeco": "Obstetricia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180454001",
    "descripCeco": "Obstetricia"
  },
  {
    "id": "4201020207",
    "name": "SERVICIOS EXTERNOS",
    "presupuesto": 2646000,
    "ejecutado": 1151010,
    "disponible": 1494990,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 1470000,
      "May": 1176000
    },
    "monthlyExec": {
      "Mar": 1352400,
      "May": 1081920
    },
    "transactions": [
      {
        "id": "TX-6",
        "cuenta": "4201020207",
        "descripcion": "SERVICIOS EXTERNOS",
        "fecha": "15/05/2026",
        "valor": 690606,
        "glosa": "Operación periódica SERVICIOS EXTERNOS",
        "glosa2": "ESCUELA",
        "ceco": "1180454001",
        "descripCeco": "Obstetricia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180454001",
    "descripCeco": "Obstetricia"
  },
  {
    "id": "4202060602",
    "name": "ALOJAMIENTO Y PASAJES",
    "presupuesto": 196000,
    "ejecutado": 85260,
    "disponible": 110740,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 196000
    },
    "monthlyExec": {
      "Mar": 180320
    },
    "transactions": [
      {
        "id": "TX-7",
        "cuenta": "4202060602",
        "descripcion": "ALOJAMIENTO Y PASAJES",
        "fecha": "15/05/2026",
        "valor": 51156,
        "glosa": "Operación periódica ALOJAMIENTO Y PASAJES",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180454001",
        "descripCeco": "Obstetricia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180454001",
    "descripCeco": "Obstetricia"
  },
  {
    "id": "4202090902",
    "name": "GASTOS DE INVERSIÓN",
    "presupuesto": 44100,
    "ejecutado": 19184,
    "disponible": 24916,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 44100
    },
    "monthlyExec": {
      "Ene": 40572
    },
    "transactions": [
      {
        "id": "TX-8",
        "cuenta": "4202090902",
        "descripcion": "GASTOS DE INVERSIÓN",
        "fecha": "15/05/2026",
        "valor": 11510,
        "glosa": "Lampara de pie",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180454001",
        "descripCeco": "Obstetricia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180454001",
    "descripCeco": "Obstetricia"
  },
  {
    "id": "4202090902",
    "name": "GASTOS DE INVERSIÓN",
    "presupuesto": 58800,
    "ejecutado": 25578,
    "disponible": 33222,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 58800
    },
    "monthlyExec": {
      "Ene": 54096
    },
    "transactions": [
      {
        "id": "TX-9",
        "cuenta": "4202090902",
        "descripcion": "GASTOS DE INVERSIÓN",
        "fecha": "15/05/2026",
        "valor": 15347,
        "glosa": "Escabel",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180454001",
        "descripCeco": "Obstetricia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180454001",
    "descripCeco": "Obstetricia"
  },
  {
    "id": "4101040403",
    "name": "REMUNERACION PERSONAL ACADEMICO PERSONAL",
    "presupuesto": 129399310,
    "ejecutado": 56288700,
    "disponible": 73110610,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Ene": 9148525,
      "Feb": 8823861,
      "Mar": 11126122,
      "Abr": 11126122,
      "May": 11126122,
      "Jun": 11126122,
      "Jul": 11126122,
      "Ago": 11126122,
      "Sep": 11167548,
      "Oct": 11167548,
      "Nov": 11167548,
      "Dic": 11167548
    },
    "monthlyExec": {
      "Ene": 8416643,
      "Feb": 8117952,
      "Mar": 10236032,
      "Abr": 10236032,
      "May": 10236032,
      "Jun": 10236032,
      "Jul": 10236032
    },
    "transactions": [
      {
        "id": "TX-10",
        "cuenta": "4101040403",
        "descripcion": "REMUNERACION PERSONAL ACADEMICO PERSONAL",
        "fecha": "15/05/2026",
        "valor": 33773220,
        "glosa": "Operación periódica REMUNERACION PERSONAL ACADEMICO PERSONAL",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180454001",
        "descripCeco": "Obstetricia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180454001",
    "descripCeco": "Obstetricia"
  },
  {
    "id": "4101050501",
    "name": "HONORARIOS PERSONAL ACADEMICO",
    "presupuesto": 228940234,
    "ejecutado": 99589002,
    "disponible": 129351232,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Ene": 888707,
      "Feb": 572707,
      "Mar": 20335363,
      "Abr": 20335363,
      "May": 20335363,
      "Jun": 20335363,
      "Jul": 21369363,
      "Ago": 871359,
      "Sep": 31055351,
      "Oct": 31055351,
      "Nov": 30892972,
      "Dic": 30892972
    },
    "monthlyExec": {
      "Ene": 817610,
      "Feb": 526890,
      "Mar": 18708534,
      "Abr": 18708534,
      "May": 18708534,
      "Jun": 18708534,
      "Jul": 19659814
    },
    "transactions": [
      {
        "id": "TX-11",
        "cuenta": "4101050501",
        "descripcion": "HONORARIOS PERSONAL ACADEMICO",
        "fecha": "15/05/2026",
        "valor": 59753401,
        "glosa": "Operación periódica HONORARIOS PERSONAL ACADEMICO",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180454001",
        "descripCeco": "Obstetricia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180454001",
    "descripCeco": "Obstetricia"
  },
  {
    "id": "4101050502",
    "name": "HONORARIOS AYUDANTES PERSONAL ACADEMICO",
    "presupuesto": 383044,
    "ejecutado": 166624,
    "disponible": 216420,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Abr": 95761,
      "May": 95761,
      "Jun": 95761,
      "Jul": 95761
    },
    "monthlyExec": {
      "Abr": 88100,
      "May": 88100,
      "Jun": 88100,
      "Jul": 88100
    },
    "transactions": [
      {
        "id": "TX-12",
        "cuenta": "4101050502",
        "descripcion": "HONORARIOS AYUDANTES PERSONAL ACADEMICO",
        "fecha": "15/05/2026",
        "valor": 99974,
        "glosa": "Operación periódica HONORARIOS AYUDANTES PERSONAL ACADEMICO",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180454001",
        "descripCeco": "Obstetricia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180454001",
    "descripCeco": "Obstetricia"
  },
  {
    "id": "4102050501",
    "name": "HONORARIOS PERSONAL ADMINISTRATIVO",
    "presupuesto": 16131330,
    "ejecutado": 7017129,
    "disponible": 9114201,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Mar": 1613133,
      "Abr": 1613133,
      "May": 1613133,
      "Jun": 1613133,
      "Jul": 1613133,
      "Ago": 1613133,
      "Sep": 1613133,
      "Oct": 1613133,
      "Nov": 1613133,
      "Dic": 1613133
    },
    "monthlyExec": {
      "Mar": 1484082,
      "Abr": 1484082,
      "May": 1484082,
      "Jun": 1484082,
      "Jul": 1484082
    },
    "transactions": [
      {
        "id": "TX-13",
        "cuenta": "4102050501",
        "descripcion": "HONORARIOS PERSONAL ADMINISTRATIVO",
        "fecha": "15/05/2026",
        "valor": 4210277,
        "glosa": "Operación periódica HONORARIOS PERSONAL ADMINISTRATIVO",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180454001",
        "descripCeco": "Obstetricia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180454001",
    "descripCeco": "Obstetricia"
  },
  {
    "id": "4202010101",
    "name": "MATERIALES E INSUMOS",
    "presupuesto": 1372000,
    "ejecutado": 596820,
    "disponible": 775180,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 196000,
      "Mar": 588000,
      "Jun": 588000
    },
    "monthlyExec": {
      "Ene": 180320,
      "Mar": 540960,
      "Jun": 540960
    },
    "transactions": [
      {
        "id": "TX-14",
        "cuenta": "4202010101",
        "descripcion": "MATERIALES E INSUMOS",
        "fecha": "15/05/2026",
        "valor": 358092,
        "glosa": "Consumo Materiales e Insumos",
        "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
        "ceco": "1180326006",
        "descripCeco": "Campus Clinico",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326006",
    "descripCeco": "Campus Clinico"
  },
  {
    "id": "4201020207",
    "name": "SERVICIOS EXTERNOS",
    "presupuesto": 137200000,
    "ejecutado": 59682000,
    "disponible": 77518000,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 19600000,
      "Jun": 58800000,
      "Ago": 58800000
    },
    "monthlyExec": {
      "Mar": 18032000,
      "Jun": 54096000
    },
    "transactions": [
      {
        "id": "TX-15",
        "cuenta": "4201020207",
        "descripcion": "SERVICIOS EXTERNOS",
        "fecha": "15/05/2026",
        "valor": 35809200,
        "glosa": "Pago por uso de campos clínicos",
        "glosa2": "DIRECTOR DE GESTIÓNY FINANZAS",
        "ceco": "1180326006",
        "descripCeco": "Campus Clinico",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326006",
    "descripCeco": "Campus Clinico"
  },
  {
    "id": "4202060603",
    "name": "ALIMENTOS PERSONAL",
    "presupuesto": 98000,
    "ejecutado": 42630,
    "disponible": 55370,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 98000
    },
    "monthlyExec": {
      "Ene": 90160
    },
    "transactions": [
      {
        "id": "TX-16",
        "cuenta": "4202060603",
        "descripcion": "ALIMENTOS PERSONAL",
        "fecha": "15/05/2026",
        "valor": 25578,
        "glosa": "Pago por uso de campos clínicos",
        "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
        "ceco": "1180326006",
        "descripCeco": "Campus Clinico",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326006",
    "descripCeco": "Campus Clinico"
  },
  {
    "id": "4201020201",
    "name": "SERVICIO DE CORRESPONDENCIA",
    "presupuesto": 196000,
    "ejecutado": 85260,
    "disponible": 110740,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 98000,
      "Mar": 98000
    },
    "monthlyExec": {
      "Ene": 90160,
      "Mar": 90160
    },
    "transactions": [
      {
        "id": "TX-17",
        "cuenta": "4201020201",
        "descripcion": "SERVICIO DE CORRESPONDENCIA",
        "fecha": "15/05/2026",
        "valor": 51156,
        "glosa": "Pago por uso de campos clínicos",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180326006",
        "descripCeco": "Campus Clinico",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326006",
    "descripCeco": "Campus Clinico"
  },
  {
    "id": "4201020202",
    "name": "MOVILIZACIÓN Y FLETES",
    "presupuesto": 490000,
    "ejecutado": 213150,
    "disponible": 276850,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 196000,
      "Mar": 294000
    },
    "monthlyExec": {
      "Ene": 180320,
      "Mar": 270480
    },
    "transactions": [
      {
        "id": "TX-18",
        "cuenta": "4201020202",
        "descripcion": "MOVILIZACIÓN Y FLETES",
        "fecha": "15/05/2026",
        "valor": 127890,
        "glosa": "Pago por uso de campos clínicos",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180326006",
        "descripCeco": "Campus Clinico",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326006",
    "descripCeco": "Campus Clinico"
  },
  {
    "id": "4202010106",
    "name": "INSUMOS TÉCNICOS",
    "presupuesto": 98000,
    "ejecutado": 42630,
    "disponible": 55370,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 49000,
      "Mar": 49000
    },
    "monthlyExec": {
      "Ene": 45080,
      "Mar": 45080
    },
    "transactions": [
      {
        "id": "TX-19",
        "cuenta": "4202010106",
        "descripcion": "INSUMOS TÉCNICOS",
        "fecha": "15/05/2026",
        "valor": 25578,
        "glosa": "Pago por uso de campos clínicos",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180326006",
        "descripCeco": "Campus Clinico",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326006",
    "descripCeco": "Campus Clinico"
  },
  {
    "id": "4202010106",
    "name": "INSUMOS TÉCNICOS",
    "presupuesto": 4410000,
    "ejecutado": 1918350,
    "disponible": 2491650,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 1960000,
      "May": 490000,
      "Jun": 1960000
    },
    "monthlyExec": {
      "Mar": 1803200,
      "May": 450800,
      "Jun": 1803200
    },
    "transactions": [
      {
        "id": "TX-20",
        "cuenta": "4202010106",
        "descripcion": "INSUMOS TÉCNICOS",
        "fecha": "15/05/2026",
        "valor": 1151010,
        "glosa": "Consumo de Insumos Ténicos",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180326010",
        "descripCeco": "Centro Simulación",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación"
  },
  {
    "id": "4202010101",
    "name": "MATERIALES E INSUMOS",
    "presupuesto": 931000,
    "ejecutado": 404985,
    "disponible": 526015,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 98000,
      "Mar": 245000,
      "Abr": 98000,
      "May": 196000,
      "Jun": 98000,
      "Jul": 98000,
      "Ago": 98000
    },
    "monthlyExec": {
      "Ene": 90160,
      "Mar": 225400,
      "Abr": 90160,
      "May": 180320,
      "Jun": 90160,
      "Jul": 90160
    },
    "transactions": [
      {
        "id": "TX-21",
        "cuenta": "4202010101",
        "descripcion": "MATERIALES E INSUMOS",
        "fecha": "15/05/2026",
        "valor": 242991,
        "glosa": "Consumo Materiales e Insumos",
        "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
        "ceco": "1180326010",
        "descripCeco": "Centro Simulación",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación"
  },
  {
    "id": "4201020202",
    "name": "MOVILIZACIÓN Y FLETES",
    "presupuesto": 49000,
    "ejecutado": 21315,
    "disponible": 27685,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 49000
    },
    "monthlyExec": {
      "Ene": 45080
    },
    "transactions": [
      {
        "id": "TX-22",
        "cuenta": "4201020202",
        "descripcion": "MOVILIZACIÓN Y FLETES",
        "fecha": "15/05/2026",
        "valor": 12789,
        "glosa": "Consumo Servicios Externos",
        "glosa2": "ESCUELA",
        "ceco": "1180326010",
        "descripCeco": "Centro Simulación",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación"
  },
  {
    "id": "4202060603",
    "name": "ALIMENTOS PERSONAL",
    "presupuesto": 166600,
    "ejecutado": 72471,
    "disponible": 94129,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 29400,
      "Mar": 68600,
      "Jun": 68600
    },
    "monthlyExec": {
      "Ene": 27048,
      "Mar": 63112,
      "Jun": 63112
    },
    "transactions": [
      {
        "id": "TX-23",
        "cuenta": "4202060603",
        "descripcion": "ALIMENTOS PERSONAL",
        "fecha": "15/05/2026",
        "valor": 43483,
        "glosa": "Operación periódica ALIMENTOS PERSONAL",
        "glosa2": "ESCUELA",
        "ceco": "1180326010",
        "descripCeco": "Centro Simulación",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación"
  },
  {
    "id": "4202010104",
    "name": "IMPRESION Y ENCUADERNACION",
    "presupuesto": 127400,
    "ejecutado": 55419,
    "disponible": 71981,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 127400
    },
    "monthlyExec": {
      "Mar": 117208
    },
    "transactions": [
      {
        "id": "TX-24",
        "cuenta": "4202010104",
        "descripcion": "IMPRESION Y ENCUADERNACION",
        "fecha": "15/05/2026",
        "valor": 33251,
        "glosa": "Operación periódica IMPRESION Y ENCUADERNACION",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180326010",
        "descripCeco": "Centro Simulación",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación"
  },
  {
    "id": "4202020202",
    "name": "MANTENCIÓN Y REPARACIÓN EQUIPOS Y VEHICULOS",
    "presupuesto": 24500000,
    "ejecutado": 10657500,
    "disponible": 13842500,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 14700000,
      "Mar": 4900000,
      "Jun": 4900000
    },
    "monthlyExec": {
      "Ene": 13524000,
      "Mar": 4508000,
      "Jun": 4508000
    },
    "transactions": [
      {
        "id": "TX-25",
        "cuenta": "4202020202",
        "descripcion": "MANTENCIÓN Y REPARACIÓN EQUIPOS Y VEHICULOS",
        "fecha": "15/05/2026",
        "valor": 6394500,
        "glosa": "Operación periódica MANTENCIÓN Y REPARACIÓN EQUIPOS Y VEHICULOS",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180326010",
        "descripCeco": "Centro Simulación",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación"
  },
  {
    "id": "4202060604",
    "name": "CAPACITACIÓN",
    "presupuesto": 686000,
    "ejecutado": 298410,
    "disponible": 387590,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 686000
    },
    "monthlyExec": {
      "Mar": 631120
    },
    "transactions": [
      {
        "id": "TX-26",
        "cuenta": "4202060604",
        "descripcion": "CAPACITACIÓN",
        "fecha": "15/05/2026",
        "valor": 179046,
        "glosa": "Operación periódica CAPACITACIÓN",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180326010",
        "descripCeco": "Centro Simulación",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación"
  },
  {
    "id": "4202090902",
    "name": "GASTOS DE INVERSIÓN",
    "presupuesto": 137200,
    "ejecutado": 59682,
    "disponible": 77518,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 137200
    },
    "monthlyExec": {
      "Ene": 126224
    },
    "transactions": [
      {
        "id": "TX-27",
        "cuenta": "4202090902",
        "descripcion": "GASTOS DE INVERSIÓN",
        "fecha": "15/05/2026",
        "valor": 35809,
        "glosa": "Operación periódica GASTOS DE INVERSIÓN",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180326010",
        "descripCeco": "Centro Simulación",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación"
  },
  {
    "id": "4202010104",
    "name": "IMPRESION Y ENCUADERNACION",
    "presupuesto": 98000,
    "ejecutado": 42630,
    "disponible": 55370,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 98000
    },
    "monthlyExec": {
      "Ene": 90160
    },
    "transactions": [
      {
        "id": "TX-28",
        "cuenta": "4202010104",
        "descripcion": "IMPRESION Y ENCUADERNACION",
        "fecha": "15/05/2026",
        "valor": 25578,
        "glosa": "Operación periódica IMPRESION Y ENCUADERNACION",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180326010",
        "descripCeco": "Centro Simulación",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación"
  },
  {
    "id": "4202060602",
    "name": "ALOJAMIENTO Y PASAJES",
    "presupuesto": 490000,
    "ejecutado": 213150,
    "disponible": 276850,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 490000
    },
    "monthlyExec": {
      "Mar": 450800
    },
    "transactions": [
      {
        "id": "TX-29",
        "cuenta": "4202060602",
        "descripcion": "ALOJAMIENTO Y PASAJES",
        "fecha": "15/05/2026",
        "valor": 127890,
        "glosa": "Operación periódica ALOJAMIENTO Y PASAJES",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180326010",
        "descripCeco": "Centro Simulación",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación"
  },
  {
    "id": "4201020202",
    "name": "MOVILIZACIÓN Y FLETES",
    "presupuesto": 78400,
    "ejecutado": 34104,
    "disponible": 44296,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Jul": 29400,
      "Oct": 49000
    },
    "monthlyExec": {
      "Jul": 27048
    },
    "transactions": [
      {
        "id": "TX-30",
        "cuenta": "4201020202",
        "descripcion": "MOVILIZACIÓN Y FLETES",
        "fecha": "15/05/2026",
        "valor": 20462,
        "glosa": "Fortalecimiento de nuestra identidad como Facultad",
        "glosa2": "MARCIA MALDONADO",
        "ceco": "1180326010",
        "descripCeco": "Centro Simulación",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación"
  },
  {
    "id": "4201020207",
    "name": "SERVICIOS EXTERNOS",
    "presupuesto": 196000,
    "ejecutado": 85260,
    "disponible": 110740,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 98000,
      "Jul": 98000
    },
    "monthlyExec": {
      "Ene": 90160,
      "Jul": 90160
    },
    "transactions": [
      {
        "id": "TX-31",
        "cuenta": "4201020207",
        "descripcion": "SERVICIOS EXTERNOS",
        "fecha": "15/05/2026",
        "valor": 51156,
        "glosa": "Mejoramiento continuo de los procesos formativos",
        "glosa2": "MARCIA MALDONADO",
        "ceco": "1180326010",
        "descripCeco": "Centro Simulación",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación"
  },
  {
    "id": "4202010106",
    "name": "INSUMOS TÉCNICOS",
    "presupuesto": 9167000,
    "ejecutado": 3987645,
    "disponible": 5179355,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 4717000,
      "Jun": 4450000
    },
    "monthlyExec": {
      "Mar": 4339640,
      "Jun": 4094000
    },
    "transactions": [
      {
        "id": "TX-32",
        "cuenta": "4202010106",
        "descripcion": "INSUMOS TÉCNICOS",
        "fecha": "15/05/2026",
        "valor": 2392587,
        "glosa": "Consumo de Insumos Ténicos",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4202010101",
    "name": "MATERIALES E INSUMOS",
    "presupuesto": 1780000,
    "ejecutado": 774300,
    "disponible": 1005700,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 106800,
      "Mar": 667500,
      "Jul": 1005700
    },
    "monthlyExec": {
      "Ene": 98256,
      "Mar": 614100,
      "Jul": 925244
    },
    "transactions": [
      {
        "id": "TX-33",
        "cuenta": "4202010101",
        "descripcion": "MATERIALES E INSUMOS",
        "fecha": "15/05/2026",
        "valor": 464580,
        "glosa": "Consumo Materiales e Insumos",
        "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4201020207",
    "name": "SERVICIOS EXTERNOS",
    "presupuesto": 4850500,
    "ejecutado": 2109968,
    "disponible": 2740532,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 89000,
      "Mar": 1513000,
      "Jun": 3248500
    },
    "monthlyExec": {
      "Ene": 81880,
      "Mar": 1391960,
      "Jun": 2988620
    },
    "transactions": [
      {
        "id": "TX-34",
        "cuenta": "4201020207",
        "descripcion": "SERVICIOS EXTERNOS",
        "fecha": "15/05/2026",
        "valor": 1265981,
        "glosa": "Consumo Servicios Externos",
        "glosa2": "ESCUELA",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4202070705",
    "name": "ALIMENTOS ALUMNOS",
    "presupuesto": 445000,
    "ejecutado": 193575,
    "disponible": 251425,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 44500,
      "Jun": 133500,
      "Jul": 89000,
      "Ago": 89000,
      "Nov": 89000
    },
    "monthlyExec": {
      "Ene": 40940,
      "Jun": 122820,
      "Jul": 81880
    },
    "transactions": [
      {
        "id": "TX-35",
        "cuenta": "4202070705",
        "descripcion": "ALIMENTOS ALUMNOS",
        "fecha": "15/05/2026",
        "valor": 116145,
        "glosa": "Alimentos alumnos",
        "glosa2": "ESCUELA",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4202060603",
    "name": "ALIMENTOS PERSONAL",
    "presupuesto": 324850,
    "ejecutado": 141310,
    "disponible": 183540,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 44500,
      "Mar": 178000,
      "Jul": 44500,
      "Nov": 57850
    },
    "monthlyExec": {
      "Ene": 40940,
      "Mar": 163760,
      "Jul": 40940
    },
    "transactions": [
      {
        "id": "TX-36",
        "cuenta": "4202060603",
        "descripcion": "ALIMENTOS PERSONAL",
        "fecha": "15/05/2026",
        "valor": 84786,
        "glosa": "Alimentos personal",
        "glosa2": "ESCUELA",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4202050507",
    "name": "ATENCIÓN A TERCEROS",
    "presupuesto": 115700,
    "ejecutado": 50330,
    "disponible": 65370,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 115700
    },
    "monthlyExec": {
      "Mar": 106444
    },
    "transactions": [
      {
        "id": "TX-37",
        "cuenta": "4202050507",
        "descripcion": "ATENCIÓN A TERCEROS",
        "fecha": "15/05/2026",
        "valor": 30198,
        "glosa": "Atención a Terceros",
        "glosa2": "ESCUELA",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4202050506",
    "name": "ARTÍCULOS PROMOCIONALES",
    "presupuesto": 178000,
    "ejecutado": 77430,
    "disponible": 100570,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 178000
    },
    "monthlyExec": {
      "Mar": 163760
    },
    "transactions": [
      {
        "id": "TX-38",
        "cuenta": "4202050506",
        "descripcion": "ARTÍCULOS PROMOCIONALES",
        "fecha": "15/05/2026",
        "valor": 46458,
        "glosa": "Articulos promocionales",
        "glosa2": "ESCUELA",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4401020299",
    "name": "APORTES A OTRAS INSTITUCIONES",
    "presupuesto": 1780000,
    "ejecutado": 774300,
    "disponible": 1005700,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 1780000
    },
    "monthlyExec": {
      "Mar": 1637600
    },
    "transactions": [
      {
        "id": "TX-39",
        "cuenta": "4401020299",
        "descripcion": "APORTES A OTRAS INSTITUCIONES",
        "fecha": "15/05/2026",
        "valor": 464580,
        "glosa": "Aportes a otras instituciones",
        "glosa2": "ESCUELA",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4202060604",
    "name": "CAPACITACIÓN",
    "presupuesto": 178000,
    "ejecutado": 77430,
    "disponible": 100570,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 178000
    },
    "monthlyExec": {
      "Mar": 163760
    },
    "transactions": [
      {
        "id": "TX-40",
        "cuenta": "4202060604",
        "descripcion": "CAPACITACIÓN",
        "fecha": "15/05/2026",
        "valor": 46458,
        "glosa": "Capacitaciones",
        "glosa2": "ESCUELA",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4202090902",
    "name": "GASTOS DE INVERSIÓN",
    "presupuesto": 80100,
    "ejecutado": 34844,
    "disponible": 45256,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 80100
    },
    "monthlyExec": {
      "Mar": 73692
    },
    "transactions": [
      {
        "id": "TX-41",
        "cuenta": "4202090902",
        "descripcion": "GASTOS DE INVERSIÓN",
        "fecha": "15/05/2026",
        "valor": 20906,
        "glosa": "6 Tallímetro portátil",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4202090902",
    "name": "GASTOS DE INVERSIÓN",
    "presupuesto": 80100,
    "ejecutado": 34844,
    "disponible": 45256,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 80100
    },
    "monthlyExec": {
      "Mar": 73692
    },
    "transactions": [
      {
        "id": "TX-42",
        "cuenta": "4202090902",
        "descripcion": "GASTOS DE INVERSIÓN",
        "fecha": "15/05/2026",
        "valor": 20906,
        "glosa": "6 Pesa digital",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4202090902",
    "name": "GASTOS DE INVERSIÓN",
    "presupuesto": 238520,
    "ejecutado": 103756,
    "disponible": 134764,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 238520
    },
    "monthlyExec": {
      "Mar": 219438
    },
    "transactions": [
      {
        "id": "TX-43",
        "cuenta": "4202090902",
        "descripcion": "GASTOS DE INVERSIÓN",
        "fecha": "15/05/2026",
        "valor": 62254,
        "glosa": "2 Mochila Urbana para Visitas Domiciliarias - CITYS",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4202070705",
    "name": "ALIMENTOS ALUMNOS",
    "presupuesto": 89000,
    "ejecutado": 38715,
    "disponible": 50285,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Jul": 89000
    },
    "monthlyExec": {
      "Jul": 81880
    },
    "transactions": [
      {
        "id": "TX-44",
        "cuenta": "4202070705",
        "descripcion": "ALIMENTOS ALUMNOS",
        "fecha": "15/05/2026",
        "valor": 23229,
        "glosa": "Mejoramiento de la calidad de vida universitaria",
        "glosa2": "Dirección de Escuela",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4202060603",
    "name": "ALIMENTOS PERSONAL",
    "presupuesto": 178000,
    "ejecutado": 77430,
    "disponible": 100570,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 178000
    },
    "monthlyExec": {
      "Mar": 163760
    },
    "transactions": [
      {
        "id": "TX-45",
        "cuenta": "4202060603",
        "descripcion": "ALIMENTOS PERSONAL",
        "fecha": "15/05/2026",
        "valor": 46458,
        "glosa": "Mejoramiento continuo de los procesos formativos",
        "glosa2": "Dirección de Escuela",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4202060603",
    "name": "ALIMENTOS PERSONAL",
    "presupuesto": 57850,
    "ejecutado": 25165,
    "disponible": 32685,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Nov": 57850
    },
    "monthlyExec": {},
    "transactions": [
      {
        "id": "TX-46",
        "cuenta": "4202060603",
        "descripcion": "ALIMENTOS PERSONAL",
        "fecha": "15/05/2026",
        "valor": 15099,
        "glosa": "Mejoramiento continuo de los procesos formativos",
        "glosa2": "Dirección de Escuela",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4202070705",
    "name": "ALIMENTOS ALUMNOS",
    "presupuesto": 44500,
    "ejecutado": 19358,
    "disponible": 25142,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ago": 44500
    },
    "monthlyExec": {},
    "transactions": [
      {
        "id": "TX-47",
        "cuenta": "4202070705",
        "descripcion": "ALIMENTOS ALUMNOS",
        "fecha": "15/05/2026",
        "valor": 11615,
        "glosa": "Mejoramiento continuo de los procesos formativos",
        "glosa2": "Dirección de Escuela",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4202060603",
    "name": "ALIMENTOS PERSONAL",
    "presupuesto": 66750,
    "ejecutado": 29036,
    "disponible": 37714,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 22250,
      "Jul": 44500
    },
    "monthlyExec": {
      "Ene": 20470,
      "Jul": 40940
    },
    "transactions": [
      {
        "id": "TX-48",
        "cuenta": "4202060603",
        "descripcion": "ALIMENTOS PERSONAL",
        "fecha": "15/05/2026",
        "valor": 17422,
        "glosa": "Fortalecimiento de nuestra identidad como Facultad",
        "glosa2": "Dirección de Escuela",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4101040403",
    "name": "REMUNERACION PERSONAL ACADEMICO PERSONAL",
    "presupuesto": 95304738,
    "ejecutado": 41457561,
    "disponible": 53847177,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Ene": 8560038,
      "Feb": 8560038,
      "Mar": 7044565,
      "Abr": 6941165,
      "May": 6941165,
      "Jun": 6941165,
      "Jul": 6941165,
      "Ago": 6941165,
      "Sep": 9108568,
      "Oct": 9108568,
      "Nov": 9108568,
      "Dic": 9108568
    },
    "monthlyExec": {
      "Ene": 7875235,
      "Feb": 7875235,
      "Mar": 6481000,
      "Abr": 6385872,
      "May": 6385872,
      "Jun": 6385872,
      "Jul": 6385872
    },
    "transactions": [
      {
        "id": "TX-49",
        "cuenta": "4101040403",
        "descripcion": "REMUNERACION PERSONAL ACADEMICO PERSONAL",
        "fecha": "15/05/2026",
        "valor": 24874537,
        "glosa": "Operación periódica REMUNERACION PERSONAL ACADEMICO PERSONAL",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4101050501",
    "name": "HONORARIOS PERSONAL ACADEMICO",
    "presupuesto": 496813788,
    "ejecutado": 216113998,
    "disponible": 280699790,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Ene": 702904,
      "Mar": 30970932,
      "Abr": 25403760,
      "May": 25403760,
      "Jun": 62281328,
      "Jul": 79296406,
      "Ago": 2849260,
      "Sep": 29932645,
      "Oct": 29932645,
      "Nov": 106941395,
      "Dic": 103098753
    },
    "monthlyExec": {
      "Ene": 646672,
      "Mar": 28493257,
      "Abr": 23371459,
      "May": 23371459,
      "Jun": 57298822,
      "Jul": 72952694
    },
    "transactions": [
      {
        "id": "TX-50",
        "cuenta": "4101050501",
        "descripcion": "HONORARIOS PERSONAL ACADEMICO",
        "fecha": "15/05/2026",
        "valor": 129668399,
        "glosa": "Operación periódica HONORARIOS PERSONAL ACADEMICO",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4101050502",
    "name": "HONORARIOS AYUDANTES PERSONAL ACADEMICO",
    "presupuesto": 614840,
    "ejecutado": 267455,
    "disponible": 347385,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Abr": 153710,
      "May": 153710,
      "Jun": 153710,
      "Jul": 153710
    },
    "monthlyExec": {
      "Abr": 141413,
      "May": 141413,
      "Jun": 141413,
      "Jul": 141413
    },
    "transactions": [
      {
        "id": "TX-51",
        "cuenta": "4101050502",
        "descripcion": "HONORARIOS AYUDANTES PERSONAL ACADEMICO",
        "fecha": "15/05/2026",
        "valor": 160473,
        "glosa": "Operación periódica HONORARIOS AYUDANTES PERSONAL ACADEMICO",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4102050501",
    "name": "HONORARIOS PERSONAL ADMINISTRATIVO",
    "presupuesto": 22288680,
    "ejecutado": 9695576,
    "disponible": 12593104,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Mar": 2228868,
      "Abr": 2228868,
      "May": 2228868,
      "Jun": 2228868,
      "Jul": 2228868,
      "Ago": 2228868,
      "Sep": 2228868,
      "Oct": 2228868,
      "Nov": 2228868,
      "Dic": 2228868
    },
    "monthlyExec": {
      "Mar": 2050559,
      "Abr": 2050559,
      "May": 2050559,
      "Jun": 2050559,
      "Jul": 2050559
    },
    "transactions": [
      {
        "id": "TX-52",
        "cuenta": "4102050501",
        "descripcion": "HONORARIOS PERSONAL ADMINISTRATIVO",
        "fecha": "15/05/2026",
        "valor": 5817346,
        "glosa": "Operación periódica HONORARIOS PERSONAL ADMINISTRATIVO",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180452001",
        "descripCeco": "Enfermeria",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180452001",
    "descripCeco": "Enfermeria"
  },
  {
    "id": "4202010106",
    "name": "INSUMOS TÉCNICOS",
    "presupuesto": 15680000,
    "ejecutado": 6820800,
    "disponible": 8859200,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 3920000,
      "Mar": 11760000
    },
    "monthlyExec": {
      "Ene": 3606400,
      "Mar": 10819200
    },
    "transactions": [
      {
        "id": "TX-53",
        "cuenta": "4202010106",
        "descripcion": "INSUMOS TÉCNICOS",
        "fecha": "15/05/2026",
        "valor": 4092480,
        "glosa": "Consumo de Insumos Ténicos",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180580001",
        "descripCeco": "Escuela Postgra",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180580001",
    "descripCeco": "Escuela Postgra"
  },
  {
    "id": "4202010101",
    "name": "MATERIALES E INSUMOS",
    "presupuesto": 98000,
    "ejecutado": 42630,
    "disponible": 55370,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 98000
    },
    "monthlyExec": {
      "Mar": 90160
    },
    "transactions": [
      {
        "id": "TX-54",
        "cuenta": "4202010101",
        "descripcion": "MATERIALES E INSUMOS",
        "fecha": "15/05/2026",
        "valor": 25578,
        "glosa": "Consumo Materiales e Insumos",
        "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
        "ceco": "1180580001",
        "descripCeco": "Escuela Postgra",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180580001",
    "descripCeco": "Escuela Postgra"
  },
  {
    "id": "4202070705",
    "name": "ALIMENTOS ALUMNOS",
    "presupuesto": 980000,
    "ejecutado": 426300,
    "disponible": 553700,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 490000,
      "Jun": 490000
    },
    "monthlyExec": {
      "Mar": 450800,
      "Jun": 450800
    },
    "transactions": [
      {
        "id": "TX-55",
        "cuenta": "4202070705",
        "descripcion": "ALIMENTOS ALUMNOS",
        "fecha": "15/05/2026",
        "valor": 255780,
        "glosa": "Recepción Inicio",
        "glosa2": "ESCUELA",
        "ceco": "1180580001",
        "descripCeco": "Escuela Postgra",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180580001",
    "descripCeco": "Escuela Postgra"
  },
  {
    "id": "4202060601",
    "name": "VIÁTICOS",
    "presupuesto": 294000,
    "ejecutado": 127890,
    "disponible": 166110,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 294000
    },
    "monthlyExec": {
      "Mar": 270480
    },
    "transactions": [
      {
        "id": "TX-56",
        "cuenta": "4202060601",
        "descripcion": "VIÁTICOS",
        "fecha": "15/05/2026",
        "valor": 76734,
        "glosa": "Traslados",
        "glosa2": "ESCUELA",
        "ceco": "1180580001",
        "descripCeco": "Escuela Postgra",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180580001",
    "descripCeco": "Escuela Postgra"
  },
  {
    "id": "4201020202",
    "name": "MOVILIZACIÓN Y FLETES",
    "presupuesto": 29400,
    "ejecutado": 12789,
    "disponible": 16611,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 29400
    },
    "monthlyExec": {
      "Mar": 27048
    },
    "transactions": [
      {
        "id": "TX-57",
        "cuenta": "4201020202",
        "descripcion": "MOVILIZACIÓN Y FLETES",
        "fecha": "15/05/2026",
        "valor": 7673,
        "glosa": "Transporte",
        "glosa2": "ESCUELA",
        "ceco": "1180580001",
        "descripCeco": "Escuela Postgra",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180580001",
    "descripCeco": "Escuela Postgra"
  },
  {
    "id": "4201010105",
    "name": "COMBUSTIBLES Y LUBRICANTES",
    "presupuesto": 49000,
    "ejecutado": 21315,
    "disponible": 27685,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 49000
    },
    "monthlyExec": {
      "Mar": 45080
    },
    "transactions": [
      {
        "id": "TX-58",
        "cuenta": "4201010105",
        "descripcion": "COMBUSTIBLES Y LUBRICANTES",
        "fecha": "15/05/2026",
        "valor": 12789,
        "glosa": "Traslados",
        "glosa2": "ESCUELA",
        "ceco": "1180580001",
        "descripCeco": "Escuela Postgra",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180580001",
    "descripCeco": "Escuela Postgra"
  },
  {
    "id": "4202050506",
    "name": "ARTÍCULOS PROMOCIONALES",
    "presupuesto": 294000,
    "ejecutado": 127890,
    "disponible": 166110,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 294000
    },
    "monthlyExec": {
      "Mar": 270480
    },
    "transactions": [
      {
        "id": "TX-59",
        "cuenta": "4202050506",
        "descripcion": "ARTÍCULOS PROMOCIONALES",
        "fecha": "15/05/2026",
        "valor": 76734,
        "glosa": "Entrega de Presentes",
        "glosa2": "ESCUELA",
        "ceco": "1180580001",
        "descripCeco": "Escuela Postgra",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180580001",
    "descripCeco": "Escuela Postgra"
  },
  {
    "id": "4202060603",
    "name": "ALIMENTOS PERSONAL",
    "presupuesto": 24500,
    "ejecutado": 10658,
    "disponible": 13842,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 24500
    },
    "monthlyExec": {
      "Ene": 22540
    },
    "transactions": [
      {
        "id": "TX-60",
        "cuenta": "4202060603",
        "descripcion": "ALIMENTOS PERSONAL",
        "fecha": "15/05/2026",
        "valor": 6395,
        "glosa": "Fortalecimiento de nuestra identidad como Facultad",
        "glosa2": "ESCUELA",
        "ceco": "1180580001",
        "descripCeco": "Escuela Postgra",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180580001",
    "descripCeco": "Escuela Postgra"
  },
  {
    "id": "4202010106",
    "name": "INSUMOS TÉCNICOS",
    "presupuesto": 6860000,
    "ejecutado": 2984100,
    "disponible": 3875900,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 3430000,
      "Jun": 3430000
    },
    "monthlyExec": {
      "Mar": 3155600,
      "Jun": 3155600
    },
    "transactions": [
      {
        "id": "TX-61",
        "cuenta": "4202010106",
        "descripcion": "INSUMOS TÉCNICOS",
        "fecha": "15/05/2026",
        "valor": 1790460,
        "glosa": "Consumo de Insumos Ténicos",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4201020207",
    "name": "SERVICIOS EXTERNOS",
    "presupuesto": 3528000,
    "ejecutado": 1534680,
    "disponible": 1993320,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 1176000,
      "May": 2352000
    },
    "monthlyExec": {
      "Mar": 1081920,
      "May": 2163840
    },
    "transactions": [
      {
        "id": "TX-62",
        "cuenta": "4201020207",
        "descripcion": "SERVICIOS EXTERNOS",
        "fecha": "15/05/2026",
        "valor": 920808,
        "glosa": "SERVICIOS EXTERNOS",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4202010101",
    "name": "MATERIALES E INSUMOS",
    "presupuesto": 999600,
    "ejecutado": 434826,
    "disponible": 564774,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 196000,
      "Mar": 98000,
      "Abr": 156800,
      "Jun": 548800
    },
    "monthlyExec": {
      "Ene": 180320,
      "Mar": 90160,
      "Abr": 144256,
      "Jun": 504896
    },
    "transactions": [
      {
        "id": "TX-63",
        "cuenta": "4202010101",
        "descripcion": "MATERIALES E INSUMOS",
        "fecha": "15/05/2026",
        "valor": 260896,
        "glosa": "MATERIALES E INSUMOS",
        "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4202020202",
    "name": "MANTENCIÓN Y REPARACIÓN EQUIPOS Y VEHICULOS",
    "presupuesto": 2450000,
    "ejecutado": 1065750,
    "disponible": 1384250,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 980000,
      "May": 1470000
    },
    "monthlyExec": {
      "Ene": 901600,
      "May": 1352400
    },
    "transactions": [
      {
        "id": "TX-64",
        "cuenta": "4202020202",
        "descripcion": "MANTENCIÓN Y REPARACIÓN EQUIPOS Y VEHICULOS",
        "fecha": "15/05/2026",
        "valor": 639450,
        "glosa": "MANTENCIÓN Y REPARACIÓN EQUIPOS Y VEHICULOS",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4202070705",
    "name": "ALIMENTOS ALUMNOS",
    "presupuesto": 588000,
    "ejecutado": 255780,
    "disponible": 332220,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 294000,
      "Jun": 294000
    },
    "monthlyExec": {
      "Mar": 270480,
      "Jun": 270480
    },
    "transactions": [
      {
        "id": "TX-65",
        "cuenta": "4202070705",
        "descripcion": "ALIMENTOS ALUMNOS",
        "fecha": "15/05/2026",
        "valor": 153468,
        "glosa": "ALIMENTOS ALUMNOS",
        "glosa2": "ESCUELA",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4202060602",
    "name": "ALOJAMIENTO Y PASAJES",
    "presupuesto": 1568000,
    "ejecutado": 682080,
    "disponible": 885920,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 980000,
      "Mar": 588000
    },
    "monthlyExec": {
      "Ene": 901600,
      "Mar": 540960
    },
    "transactions": [
      {
        "id": "TX-66",
        "cuenta": "4202060602",
        "descripcion": "ALOJAMIENTO Y PASAJES",
        "fecha": "15/05/2026",
        "valor": 409248,
        "glosa": "ALOJAMIENTO Y PASAJES",
        "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4202050507",
    "name": "ATENCIÓN A TERCEROS",
    "presupuesto": 98000,
    "ejecutado": 42630,
    "disponible": 55370,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 98000
    },
    "monthlyExec": {
      "Mar": 90160
    },
    "transactions": [
      {
        "id": "TX-67",
        "cuenta": "4202050507",
        "descripcion": "ATENCIÓN A TERCEROS",
        "fecha": "15/05/2026",
        "valor": 25578,
        "glosa": "ATENCIÓN A TERCEROS",
        "glosa2": "ESCUELA",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4201020202",
    "name": "MOVILIZACIÓN Y FLETES",
    "presupuesto": 294000,
    "ejecutado": 127890,
    "disponible": 166110,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 294000
    },
    "monthlyExec": {
      "Mar": 270480
    },
    "transactions": [
      {
        "id": "TX-68",
        "cuenta": "4201020202",
        "descripcion": "MOVILIZACIÓN Y FLETES",
        "fecha": "15/05/2026",
        "valor": 76734,
        "glosa": "MOVILIZACIÓN Y FLETES",
        "glosa2": "ESCUELA",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4202050506",
    "name": "ARTÍCULOS PROMOCIONALES",
    "presupuesto": 196000,
    "ejecutado": 85260,
    "disponible": 110740,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 196000
    },
    "monthlyExec": {
      "Mar": 180320
    },
    "transactions": [
      {
        "id": "TX-69",
        "cuenta": "4202050506",
        "descripcion": "ARTÍCULOS PROMOCIONALES",
        "fecha": "15/05/2026",
        "valor": 51156,
        "glosa": "ARTÍCULOS PROMOCIONALES",
        "glosa2": "ESCUELA",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4202090902",
    "name": "GASTOS DE INVERSIÓN",
    "presupuesto": 637000,
    "ejecutado": 277095,
    "disponible": 359905,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 343000,
      "Mar": 294000
    },
    "monthlyExec": {
      "Ene": 315560,
      "Mar": 270480
    },
    "transactions": [
      {
        "id": "TX-70",
        "cuenta": "4202090902",
        "descripcion": "GASTOS DE INVERSIÓN",
        "fecha": "15/05/2026",
        "valor": 166257,
        "glosa": "GASTOS DE INVERSIÓN",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4202060605",
    "name": "PERFECCIONAMIENTO",
    "presupuesto": 686000,
    "ejecutado": 298410,
    "disponible": 387590,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 343000,
      "Mar": 343000
    },
    "monthlyExec": {
      "Ene": 315560,
      "Mar": 315560
    },
    "transactions": [
      {
        "id": "TX-71",
        "cuenta": "4202060605",
        "descripcion": "PERFECCIONAMIENTO",
        "fecha": "15/05/2026",
        "valor": 179046,
        "glosa": "PERFECCIONAMIENTO",
        "glosa2": "ESCUELA",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4202070705",
    "name": "ALIMENTOS ALUMNOS",
    "presupuesto": 980000,
    "ejecutado": 426300,
    "disponible": 553700,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 490000,
      "Abr": 490000
    },
    "monthlyExec": {
      "Mar": 450800,
      "Abr": 450800
    },
    "transactions": [
      {
        "id": "TX-72",
        "cuenta": "4202070705",
        "descripcion": "ALIMENTOS ALUMNOS",
        "fecha": "15/05/2026",
        "valor": 255780,
        "glosa": "ALIMENTOS Y BEBIDAS",
        "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4202060602",
    "name": "ALOJAMIENTO Y PASAJES",
    "presupuesto": 294000,
    "ejecutado": 127890,
    "disponible": 166110,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Abr": 294000
    },
    "monthlyExec": {
      "Abr": 270480
    },
    "transactions": [
      {
        "id": "TX-73",
        "cuenta": "4202060602",
        "descripcion": "ALOJAMIENTO Y PASAJES",
        "fecha": "15/05/2026",
        "valor": 76734,
        "glosa": "Mejoramiento de la calidad de vida universitaria",
        "glosa2": "Escuela de Kinesiología",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4101040403",
    "name": "REMUNERACION PERSONAL ACADEMICO PERSONAL",
    "presupuesto": 107779584,
    "ejecutado": 46884119,
    "disponible": 60895465,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Ene": 12312988,
      "Feb": 12312988,
      "Mar": 8357066,
      "Abr": 8357066,
      "May": 8357066,
      "Jun": 8357066,
      "Jul": 8357066,
      "Ago": 8357066,
      "Sep": 8252803,
      "Oct": 8252803,
      "Nov": 8252803,
      "Dic": 8252803
    },
    "monthlyExec": {
      "Ene": 11327949,
      "Feb": 11327949,
      "Mar": 7688501,
      "Abr": 7688501,
      "May": 7688501,
      "Jun": 7688501,
      "Jul": 7688501
    },
    "transactions": [
      {
        "id": "TX-74",
        "cuenta": "4101040403",
        "descripcion": "REMUNERACION PERSONAL ACADEMICO PERSONAL",
        "fecha": "15/05/2026",
        "valor": 28130471,
        "glosa": "Operación periódica REMUNERACION PERSONAL ACADEMICO PERSONAL",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4101050501",
    "name": "HONORARIOS PERSONAL ACADEMICO",
    "presupuesto": 280112714,
    "ejecutado": 121849031,
    "disponible": 158263683,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Ene": 19616758,
      "Feb": 250000,
      "Mar": 22884641,
      "Abr": 30453290,
      "May": 30453290,
      "Jun": 30453290,
      "Jul": 32138021,
      "Ago": 12097162,
      "Sep": 28200813,
      "Oct": 27240560,
      "Nov": 29285812,
      "Dic": 17039077
    },
    "monthlyExec": {
      "Ene": 18047417,
      "Feb": 230000,
      "Mar": 21053870,
      "Abr": 28017027,
      "May": 28017027,
      "Jun": 28017027,
      "Jul": 29566979
    },
    "transactions": [
      {
        "id": "TX-75",
        "cuenta": "4101050501",
        "descripcion": "HONORARIOS PERSONAL ACADEMICO",
        "fecha": "15/05/2026",
        "valor": 73109419,
        "glosa": "Operación periódica HONORARIOS PERSONAL ACADEMICO",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4101050502",
    "name": "HONORARIOS AYUDANTES PERSONAL ACADEMICO",
    "presupuesto": 1844524,
    "ejecutado": 802368,
    "disponible": 1042156,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Abr": 307421,
      "May": 307421,
      "Jun": 307421,
      "Jul": 307421,
      "Sep": 153710,
      "Oct": 153710,
      "Nov": 153710,
      "Dic": 153710
    },
    "monthlyExec": {
      "Abr": 282827,
      "May": 282827,
      "Jun": 282827,
      "Jul": 282827
    },
    "transactions": [
      {
        "id": "TX-76",
        "cuenta": "4101050502",
        "descripcion": "HONORARIOS AYUDANTES PERSONAL ACADEMICO",
        "fecha": "15/05/2026",
        "valor": 481421,
        "glosa": "Operación periódica HONORARIOS AYUDANTES PERSONAL ACADEMICO",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4102050501",
    "name": "HONORARIOS PERSONAL ADMINISTRATIVO",
    "presupuesto": 12790813,
    "ejecutado": 5564004,
    "disponible": 7226809,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Mar": 660616,
      "Abr": 629890,
      "May": 814248,
      "Jun": 906427,
      "Jul": 2488834,
      "Ago": 1060059,
      "Sep": 875701,
      "Oct": 1060059,
      "Nov": 1060059,
      "Dic": 3234920
    },
    "monthlyExec": {
      "Mar": 607767,
      "Abr": 579499,
      "May": 749108,
      "Jun": 833913,
      "Jul": 2289727
    },
    "transactions": [
      {
        "id": "TX-77",
        "cuenta": "4102050501",
        "descripcion": "HONORARIOS PERSONAL ADMINISTRATIVO",
        "fecha": "15/05/2026",
        "valor": 3338402,
        "glosa": "Operación periódica HONORARIOS PERSONAL ADMINISTRATIVO",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180455001",
        "descripCeco": "Kinesiología",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180455001",
    "descripCeco": "Kinesiología"
  },
  {
    "id": "4202010106",
    "name": "INSUMOS TÉCNICOS",
    "presupuesto": 6860000,
    "ejecutado": 2984100,
    "disponible": 3875900,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 2940000,
      "Jun": 3920000
    },
    "monthlyExec": {
      "Mar": 2704800,
      "Jun": 3606400
    },
    "transactions": [
      {
        "id": "TX-78",
        "cuenta": "4202010106",
        "descripcion": "INSUMOS TÉCNICOS",
        "fecha": "15/05/2026",
        "valor": 1790460,
        "glosa": "Consumo de Insumos Ténicos",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180326009",
        "descripCeco": "Lab Ciencias Bá",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326009",
    "descripCeco": "Lab Ciencias Bá"
  },
  {
    "id": "4202010101",
    "name": "MATERIALES E INSUMOS",
    "presupuesto": 411600,
    "ejecutado": 179046,
    "disponible": 232554,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 245000,
      "Jun": 166600
    },
    "monthlyExec": {
      "Mar": 225400,
      "Jun": 153272
    },
    "transactions": [
      {
        "id": "TX-79",
        "cuenta": "4202010101",
        "descripcion": "MATERIALES E INSUMOS",
        "fecha": "15/05/2026",
        "valor": 107428,
        "glosa": "Consumo Materiales e Insumos",
        "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
        "ceco": "1180326009",
        "descripCeco": "Lab Ciencias Bá",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180326009",
    "descripCeco": "Lab Ciencias Bá"
  },
  {
    "id": "4202010106",
    "name": "INSUMOS TÉCNICOS",
    "presupuesto": 116620000,
    "ejecutado": 50729700,
    "disponible": 65890300,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 50960000,
      "Mar": 22540000,
      "Jun": 43120000
    },
    "monthlyExec": {
      "Ene": 46883200,
      "Mar": 20736800,
      "Jun": 39670400
    },
    "transactions": [
      {
        "id": "TX-80",
        "cuenta": "4202010106",
        "descripcion": "INSUMOS TÉCNICOS",
        "fecha": "15/05/2026",
        "valor": 30437820,
        "glosa": "Consumo de Insumos Técnicos",
        "glosa2": "ESCUELA",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4202010101",
    "name": "MATERIALES E INSUMOS",
    "presupuesto": 1568000,
    "ejecutado": 682080,
    "disponible": 885920,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 98000,
      "Jun": 1470000
    },
    "monthlyExec": {
      "Mar": 90160,
      "Jun": 1352400
    },
    "transactions": [
      {
        "id": "TX-81",
        "cuenta": "4202010101",
        "descripcion": "MATERIALES E INSUMOS",
        "fecha": "15/05/2026",
        "valor": 409248,
        "glosa": "Consumo Materiales e Insumos",
        "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4202060603",
    "name": "ALIMENTOS PERSONAL",
    "presupuesto": 793800,
    "ejecutado": 345303,
    "disponible": 448497,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 98000,
      "Mar": 303800,
      "Jun": 392000
    },
    "monthlyExec": {
      "Ene": 90160,
      "Mar": 279496,
      "Jun": 360640
    },
    "transactions": [
      {
        "id": "TX-82",
        "cuenta": "4202060603",
        "descripcion": "ALIMENTOS PERSONAL",
        "fecha": "15/05/2026",
        "valor": 207182,
        "glosa": "Consumo Alimentos Personal",
        "glosa2": "ESCUELA",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4202050507",
    "name": "ATENCIÓN A TERCEROS",
    "presupuesto": 823200,
    "ejecutado": 358092,
    "disponible": 465108,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 196000,
      "Jun": 627200
    },
    "monthlyExec": {
      "Mar": 180320,
      "Jun": 577024
    },
    "transactions": [
      {
        "id": "TX-83",
        "cuenta": "4202050507",
        "descripcion": "ATENCIÓN A TERCEROS",
        "fecha": "15/05/2026",
        "valor": 214855,
        "glosa": "Consumo Atención a Terceros",
        "glosa2": "ESCUELA",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4202070705",
    "name": "ALIMENTOS ALUMNOS",
    "presupuesto": 666400,
    "ejecutado": 289884,
    "disponible": 376516,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 666400
    },
    "monthlyExec": {
      "Mar": 613088
    },
    "transactions": [
      {
        "id": "TX-84",
        "cuenta": "4202070705",
        "descripcion": "ALIMENTOS ALUMNOS",
        "fecha": "15/05/2026",
        "valor": 173930,
        "glosa": "Consumo Alimentos Alumnos",
        "glosa2": "ESCUELA",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4202050506",
    "name": "ARTÍCULOS PROMOCIONALES",
    "presupuesto": 2254000,
    "ejecutado": 980490,
    "disponible": 1273510,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 98000,
      "Mar": 784000,
      "Jun": 1372000
    },
    "monthlyExec": {
      "Ene": 90160,
      "Mar": 721280,
      "Jun": 1262240
    },
    "transactions": [
      {
        "id": "TX-85",
        "cuenta": "4202050506",
        "descripcion": "ARTÍCULOS PROMOCIONALES",
        "fecha": "15/05/2026",
        "valor": 588294,
        "glosa": "Consumo Artículos Promocionales",
        "glosa2": "ESCUELA",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4202090902",
    "name": "GASTOS DE INVERSIÓN",
    "presupuesto": 563500,
    "ejecutado": 245123,
    "disponible": 318377,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 294000,
      "Mar": 147000,
      "Jun": 122500
    },
    "monthlyExec": {
      "Ene": 270480,
      "Mar": 135240,
      "Jun": 112700
    },
    "transactions": [
      {
        "id": "TX-86",
        "cuenta": "4202090902",
        "descripcion": "GASTOS DE INVERSIÓN",
        "fecha": "15/05/2026",
        "valor": 147074,
        "glosa": "Consumo Gastos de Inversión",
        "glosa2": "ESCUELA",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4201020202",
    "name": "MOVILIZACIÓN Y FLETES",
    "presupuesto": 700700,
    "ejecutado": 304805,
    "disponible": 395895,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 98000,
      "Mar": 196000,
      "Jun": 406700
    },
    "monthlyExec": {
      "Ene": 90160,
      "Mar": 180320,
      "Jun": 374164
    },
    "transactions": [
      {
        "id": "TX-87",
        "cuenta": "4201020202",
        "descripcion": "MOVILIZACIÓN Y FLETES",
        "fecha": "15/05/2026",
        "valor": 182883,
        "glosa": "Consumo Movilización y Fletes",
        "glosa2": "ESCUELA",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4201020201",
    "name": "SERVICIO DE CORRESPONDENCIA",
    "presupuesto": 602700,
    "ejecutado": 262175,
    "disponible": 340525,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 98000,
      "Mar": 196000,
      "Jun": 308700
    },
    "monthlyExec": {
      "Ene": 90160,
      "Mar": 180320,
      "Jun": 284004
    },
    "transactions": [
      {
        "id": "TX-88",
        "cuenta": "4201020201",
        "descripcion": "SERVICIO DE CORRESPONDENCIA",
        "fecha": "15/05/2026",
        "valor": 157305,
        "glosa": "Consumo Servicio de Correspondencia",
        "glosa2": "ESCUELA",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4202010103",
    "name": "FOTOCOPIAS Y REPRODUCCIONES",
    "presupuesto": 17640,
    "ejecutado": 7673,
    "disponible": 9967,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 17640
    },
    "monthlyExec": {
      "Mar": 16229
    },
    "transactions": [
      {
        "id": "TX-89",
        "cuenta": "4202010103",
        "descripcion": "FOTOCOPIAS Y REPRODUCCIONES",
        "fecha": "15/05/2026",
        "valor": 4604,
        "glosa": "Consumo Fotocopias y Reproducciones",
        "glosa2": "ESCUELA",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4202090901",
    "name": "GASTOS VARIOS",
    "presupuesto": 9800,
    "ejecutado": 4263,
    "disponible": 5537,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 9800
    },
    "monthlyExec": {
      "Mar": 9016
    },
    "transactions": [
      {
        "id": "TX-90",
        "cuenta": "4202090901",
        "descripcion": "GASTOS VARIOS",
        "fecha": "15/05/2026",
        "valor": 2558,
        "glosa": "Consumo Gastos Varios",
        "glosa2": "ESCUELA",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4202050510",
    "name": "ARTICULOS DE PREMIACION Y OTROS",
    "presupuesto": 98000,
    "ejecutado": 42630,
    "disponible": 55370,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 98000
    },
    "monthlyExec": {
      "Mar": 90160
    },
    "transactions": [
      {
        "id": "TX-91",
        "cuenta": "4202050510",
        "descripcion": "ARTICULOS DE PREMIACION Y OTROS",
        "fecha": "15/05/2026",
        "valor": 25578,
        "glosa": "Consumo Artículos de Premiación",
        "glosa2": "ESCUELA",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4401020299",
    "name": "APORTES A OTRAS INSTITUCIONES",
    "presupuesto": 19600,
    "ejecutado": 8526,
    "disponible": 11074,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 19600
    },
    "monthlyExec": {
      "Mar": 18032
    },
    "transactions": [
      {
        "id": "TX-92",
        "cuenta": "4401020299",
        "descripcion": "APORTES A OTRAS INSTITUCIONES",
        "fecha": "15/05/2026",
        "valor": 5116,
        "glosa": "Consumo Aportes a Otras Instituciones",
        "glosa2": "ESCUELA",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4201020207",
    "name": "SERVICIOS EXTERNOS",
    "presupuesto": 9751000,
    "ejecutado": 4241685,
    "disponible": 5509315,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 1176000,
      "Mar": 3234000,
      "Jun": 5341000
    },
    "monthlyExec": {
      "Ene": 1081920,
      "Mar": 2975280,
      "Jun": 4913720
    },
    "transactions": [
      {
        "id": "TX-93",
        "cuenta": "4201020207",
        "descripcion": "SERVICIOS EXTERNOS",
        "fecha": "15/05/2026",
        "valor": 2545011,
        "glosa": "Consumo Servicios Externos",
        "glosa2": "ESCUELA",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4202020202",
    "name": "MANTENCIÓN Y REPARACIÓN EQUIPOS Y VEHICULOS",
    "presupuesto": 4704000,
    "ejecutado": 2046240,
    "disponible": 2657760,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 784000,
      "Mar": 1568000,
      "Jun": 2352000
    },
    "monthlyExec": {
      "Ene": 721280,
      "Mar": 1442560,
      "Jun": 2163840
    },
    "transactions": [
      {
        "id": "TX-94",
        "cuenta": "4202020202",
        "descripcion": "MANTENCIÓN Y REPARACIÓN EQUIPOS Y VEHICULOS",
        "fecha": "15/05/2026",
        "valor": 1227744,
        "glosa": "Consumo Mantención y Reparación",
        "glosa2": "ESCUELA",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4101040403",
    "name": "REMUNERACION PERSONAL ACADEMICO PERSONAL",
    "presupuesto": 315725143,
    "ejecutado": 137340437,
    "disponible": 178384706,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Ene": 29926206,
      "Feb": 29926206,
      "Mar": 24197455,
      "Abr": 25093916,
      "May": 25093916,
      "Jun": 25093916,
      "Jul": 25093916,
      "Ago": 25093916,
      "Sep": 26344624,
      "Oct": 26344624,
      "Nov": 26344624,
      "Dic": 27171824
    },
    "monthlyExec": {
      "Ene": 27532110,
      "Feb": 27532110,
      "Mar": 22261659,
      "Abr": 23086403,
      "May": 23086403,
      "Jun": 23086403,
      "Jul": 23086403
    },
    "transactions": [
      {
        "id": "TX-95",
        "cuenta": "4101040403",
        "descripcion": "REMUNERACION PERSONAL ACADEMICO PERSONAL",
        "fecha": "15/05/2026",
        "valor": 82404262,
        "glosa": "Operación periódica REMUNERACION PERSONAL ACADEMICO PERSONAL",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4101050501",
    "name": "HONORARIOS PERSONAL ACADEMICO",
    "presupuesto": 526988599,
    "ejecutado": 229240041,
    "disponible": 297748558,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Ene": 10720245,
      "Mar": 48706334,
      "Abr": 49721837,
      "May": 49721837,
      "Jun": 49721837,
      "Jul": 49721837,
      "Ago": 40554287,
      "Sep": 56251527,
      "Oct": 56251527,
      "Nov": 58140645,
      "Dic": 57476686
    },
    "monthlyExec": {
      "Ene": 9862625,
      "Mar": 44809827,
      "Abr": 45744090,
      "May": 45744090,
      "Jun": 45744090,
      "Jul": 45744090
    },
    "transactions": [
      {
        "id": "TX-96",
        "cuenta": "4101050501",
        "descripcion": "HONORARIOS PERSONAL ACADEMICO",
        "fecha": "15/05/2026",
        "valor": 137544025,
        "glosa": "Operación periódica HONORARIOS PERSONAL ACADEMICO",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4102050501",
    "name": "HONORARIOS PERSONAL ADMINISTRATIVO",
    "presupuesto": 534888,
    "ejecutado": 232676,
    "disponible": 302212,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Sep": 178296,
      "Oct": 178296,
      "Nov": 178296
    },
    "monthlyExec": {},
    "transactions": [
      {
        "id": "TX-97",
        "cuenta": "4102050501",
        "descripcion": "HONORARIOS PERSONAL ADMINISTRATIVO",
        "fecha": "15/05/2026",
        "valor": 139606,
        "glosa": "Operación periódica HONORARIOS PERSONAL ADMINISTRATIVO",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180450001",
        "descripCeco": "Odontologia",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180450001",
    "descripCeco": "Odontologia"
  },
  {
    "id": "4201020207",
    "name": "SERVICIOS EXTERNOS",
    "presupuesto": 24500000,
    "ejecutado": 10657500,
    "disponible": 13842500,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 24500000
    },
    "monthlyExec": {
      "Mar": 22540000
    },
    "transactions": [
      {
        "id": "TX-98",
        "cuenta": "4201020207",
        "descripcion": "SERVICIOS EXTERNOS",
        "fecha": "15/05/2026",
        "valor": 6394500,
        "glosa": "Proyecto humanización Salud",
        "glosa2": "Decano(a)",
        "ceco": "1180325001",
        "descripCeco": "Oficina del Dec",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180325001",
    "descripCeco": "Oficina del Dec"
  },
  {
    "id": "4201020207",
    "name": "SERVICIOS EXTERNOS",
    "presupuesto": 5880000,
    "ejecutado": 2557800,
    "disponible": 3322200,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Jun": 5880000
    },
    "monthlyExec": {
      "Jun": 5409600
    },
    "transactions": [
      {
        "id": "TX-99",
        "cuenta": "4201020207",
        "descripcion": "SERVICIOS EXTERNOS",
        "fecha": "15/05/2026",
        "valor": 1534680,
        "glosa": "Proyecto Red Alumni",
        "glosa2": "Decano(a)",
        "ceco": "1180325001",
        "descripCeco": "Oficina del Dec",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180325001",
    "descripCeco": "Oficina del Dec"
  },
  {
    "id": "4201020207",
    "name": "SERVICIOS EXTERNOS",
    "presupuesto": 4900000,
    "ejecutado": 2131500,
    "disponible": 2768500,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 4900000
    },
    "monthlyExec": {
      "Mar": 4508000
    },
    "transactions": [
      {
        "id": "TX-100",
        "cuenta": "4201020207",
        "descripcion": "SERVICIOS EXTERNOS",
        "fecha": "15/05/2026",
        "valor": 1278900,
        "glosa": "Fondo Vinculación con el medio",
        "glosa2": "Decano(a)",
        "ceco": "1180325001",
        "descripCeco": "Oficina del Dec",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180325001",
    "descripCeco": "Oficina del Dec"
  },
  {
    "id": "4201020207",
    "name": "SERVICIOS EXTERNOS",
    "presupuesto": 7840000,
    "ejecutado": 3410400,
    "disponible": 4429600,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 3920000,
      "Jun": 3920000
    },
    "monthlyExec": {
      "Mar": 3606400,
      "Jun": 3606400
    },
    "transactions": [
      {
        "id": "TX-101",
        "cuenta": "4201020207",
        "descripcion": "SERVICIOS EXTERNOS",
        "fecha": "15/05/2026",
        "valor": 2046240,
        "glosa": "Proyecto asesorías Resoluciones Sanitarias",
        "glosa2": "Decano(a)",
        "ceco": "1180325001",
        "descripCeco": "Oficina del Dec",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180325001",
    "descripCeco": "Oficina del Dec"
  },
  {
    "id": "4202090901",
    "name": "GASTOS VARIOS",
    "presupuesto": 19600,
    "ejecutado": 8526,
    "disponible": 11074,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 19600
    },
    "monthlyExec": {
      "Mar": 18032
    },
    "transactions": [
      {
        "id": "TX-102",
        "cuenta": "4202090901",
        "descripcion": "GASTOS VARIOS",
        "fecha": "15/05/2026",
        "valor": 5116,
        "glosa": "Operación periódica GASTOS VARIOS",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180325001",
        "descripCeco": "Oficina del Dec",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180325001",
    "descripCeco": "Oficina del Dec"
  },
  {
    "id": "4202020201",
    "name": "MANTENCIÓN Y REPARACIÓN EDIFICIOS E INSTALACIONES",
    "presupuesto": 7840000,
    "ejecutado": 3410400,
    "disponible": 4429600,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 1960000,
      "Mar": 3920000,
      "Abr": 1960000
    },
    "monthlyExec": {
      "Ene": 1803200,
      "Mar": 3606400,
      "Abr": 1803200
    },
    "transactions": [
      {
        "id": "TX-103",
        "cuenta": "4202020201",
        "descripcion": "MANTENCIÓN Y REPARACIÓN EDIFICIOS E INSTALACIONES",
        "fecha": "15/05/2026",
        "valor": 2046240,
        "glosa": "Operación periódica MANTENCIÓN Y REPARACIÓN EDIFICIOS E INSTALACIONES",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180325001",
        "descripCeco": "Oficina del Dec",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180325001",
    "descripCeco": "Oficina del Dec"
  },
  {
    "id": "4202010106",
    "name": "INSUMOS TÉCNICOS",
    "presupuesto": 173460000,
    "ejecutado": 75455100,
    "disponible": 98004900,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 88200000,
      "Jul": 85260000
    },
    "monthlyExec": {
      "Mar": 81144000,
      "Jul": 78439200
    },
    "transactions": [
      {
        "id": "TX-104",
        "cuenta": "4202010106",
        "descripcion": "INSUMOS TÉCNICOS",
        "fecha": "15/05/2026",
        "valor": 45273060,
        "glosa": "Consumo de Insumos Ténicos",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180451001",
        "descripCeco": "Tecnologia Medi",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi"
  },
  {
    "id": "4202010101",
    "name": "MATERIALES E INSUMOS",
    "presupuesto": 3307500,
    "ejecutado": 1438763,
    "disponible": 1868737,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 215600,
      "Mar": 1411200,
      "Jul": 1680700
    },
    "monthlyExec": {
      "Ene": 198352,
      "Mar": 1298304,
      "Jul": 1546244
    },
    "transactions": [
      {
        "id": "TX-105",
        "cuenta": "4202010101",
        "descripcion": "MATERIALES E INSUMOS",
        "fecha": "15/05/2026",
        "valor": 863258,
        "glosa": "Consumo Materiales e Insumos",
        "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
        "ceco": "1180451001",
        "descripCeco": "Tecnologia Medi",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi"
  },
  {
    "id": "4201020207",
    "name": "SERVICIOS EXTERNOS",
    "presupuesto": 14504000,
    "ejecutado": 6309240,
    "disponible": 8194760,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 294000,
      "Mar": 3920000,
      "Jun": 3920000,
      "Ago": 3920000,
      "Sep": 2450000
    },
    "monthlyExec": {
      "Ene": 270480,
      "Mar": 3606400,
      "Jun": 3606400
    },
    "transactions": [
      {
        "id": "TX-106",
        "cuenta": "4201020207",
        "descripcion": "SERVICIOS EXTERNOS",
        "fecha": "15/05/2026",
        "valor": 3785544,
        "glosa": "Consumo Servicios Externos",
        "glosa2": "Coordinador de Abastecimiento y Laboratorio",
        "ceco": "1180451001",
        "descripCeco": "Tecnologia Medi",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi"
  },
  {
    "id": "4202060603",
    "name": "ALIMENTOS PERSONAL",
    "presupuesto": 882000,
    "ejecutado": 383670,
    "disponible": 498330,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 196000,
      "Mar": 392000,
      "Jun": 294000
    },
    "monthlyExec": {
      "Ene": 180320,
      "Mar": 360640,
      "Jun": 270480
    },
    "transactions": [
      {
        "id": "TX-107",
        "cuenta": "4202060603",
        "descripcion": "ALIMENTOS PERSONAL",
        "fecha": "15/05/2026",
        "valor": 230202,
        "glosa": "Operación periódica ALIMENTOS PERSONAL",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180451001",
        "descripCeco": "Tecnologia Medi",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi"
  },
  {
    "id": "4202050507",
    "name": "ATENCIÓN A TERCEROS",
    "presupuesto": 784000,
    "ejecutado": 341040,
    "disponible": 442960,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 294000,
      "Jun": 490000
    },
    "monthlyExec": {
      "Mar": 270480,
      "Jun": 450800
    },
    "transactions": [
      {
        "id": "TX-108",
        "cuenta": "4202050507",
        "descripcion": "ATENCIÓN A TERCEROS",
        "fecha": "15/05/2026",
        "valor": 204624,
        "glosa": "Operación periódica ATENCIÓN A TERCEROS",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180451001",
        "descripCeco": "Tecnologia Medi",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi"
  },
  {
    "id": "4202070705",
    "name": "ALIMENTOS ALUMNOS",
    "presupuesto": 245000,
    "ejecutado": 106575,
    "disponible": 138425,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 98000,
      "Jun": 147000
    },
    "monthlyExec": {
      "Mar": 90160,
      "Jun": 135240
    },
    "transactions": [
      {
        "id": "TX-109",
        "cuenta": "4202070705",
        "descripcion": "ALIMENTOS ALUMNOS",
        "fecha": "15/05/2026",
        "valor": 63945,
        "glosa": "Operación periódica ALIMENTOS ALUMNOS",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180451001",
        "descripCeco": "Tecnologia Medi",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi"
  },
  {
    "id": "4202090902",
    "name": "GASTOS DE INVERSIÓN",
    "presupuesto": 127400,
    "ejecutado": 55419,
    "disponible": 71981,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Mar": 63700,
      "Jun": 63700
    },
    "monthlyExec": {
      "Mar": 58604,
      "Jun": 58604
    },
    "transactions": [
      {
        "id": "TX-110",
        "cuenta": "4202090902",
        "descripcion": "GASTOS DE INVERSIÓN",
        "fecha": "15/05/2026",
        "valor": 33251,
        "glosa": "Operación periódica GASTOS DE INVERSIÓN",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180451001",
        "descripCeco": "Tecnologia Medi",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi"
  },
  {
    "id": "4201020207",
    "name": "SERVICIOS EXTERNOS",
    "presupuesto": 78400,
    "ejecutado": 34104,
    "disponible": 44296,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "May": 78400
    },
    "monthlyExec": {
      "May": 72128
    },
    "transactions": [
      {
        "id": "TX-111",
        "cuenta": "4201020207",
        "descripcion": "SERVICIOS EXTERNOS",
        "fecha": "15/05/2026",
        "valor": 20462,
        "glosa": "Mejoramiento continuo de los procesos formativos",
        "glosa2": "Dirección de Escuela",
        "ceco": "1180451001",
        "descripCeco": "Tecnologia Medi",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi"
  },
  {
    "id": "4202060603",
    "name": "ALIMENTOS Y BEBIDAS",
    "presupuesto": 58800,
    "ejecutado": 25578,
    "disponible": 33222,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 29400,
      "Jul": 29400
    },
    "monthlyExec": {
      "Ene": 27048,
      "Jul": 27048
    },
    "transactions": [
      {
        "id": "TX-112",
        "cuenta": "4202060603",
        "descripcion": "ALIMENTOS Y BEBIDAS",
        "fecha": "15/05/2026",
        "valor": 15347,
        "glosa": "Mejoramiento continuo de los procesos formativos",
        "glosa2": "Dirección de Escuela",
        "ceco": "1180451001",
        "descripCeco": "Tecnologia Medi",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi"
  },
  {
    "id": "4201020207",
    "name": "SERVICIOS EXTERNOS",
    "presupuesto": 588000,
    "ejecutado": 255780,
    "disponible": 332220,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Abr": 588000
    },
    "monthlyExec": {
      "Abr": 540960
    },
    "transactions": [
      {
        "id": "TX-113",
        "cuenta": "4201020207",
        "descripcion": "SERVICIOS EXTERNOS",
        "fecha": "15/05/2026",
        "valor": 153468,
        "glosa": "Mejoramiento continuo de los procesos formativos",
        "glosa2": "Dirección de Escuela",
        "ceco": "1180451001",
        "descripCeco": "Tecnologia Medi",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi"
  },
  {
    "id": "4201020207",
    "name": "SERVICIOS EXTERNOS",
    "presupuesto": 147000,
    "ejecutado": 63945,
    "disponible": 83055,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 147000
    },
    "monthlyExec": {
      "Ene": 135240
    },
    "transactions": [
      {
        "id": "TX-114",
        "cuenta": "4201020207",
        "descripcion": "SERVICIOS EXTERNOS",
        "fecha": "15/05/2026",
        "valor": 38367,
        "glosa": "Mejoramiento continuo de los procesos formativos",
        "glosa2": "Dirección de Escuela",
        "ceco": "1180451001",
        "descripCeco": "Tecnologia Medi",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi"
  },
  {
    "id": "4202060603",
    "name": "ALIMENTOS Y BEBIDAS",
    "presupuesto": 49000,
    "ejecutado": 21315,
    "disponible": 27685,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 49000
    },
    "monthlyExec": {
      "Ene": 45080
    },
    "transactions": [
      {
        "id": "TX-115",
        "cuenta": "4202060603",
        "descripcion": "ALIMENTOS Y BEBIDAS",
        "fecha": "15/05/2026",
        "valor": 12789,
        "glosa": "Mejoramiento continuo de los procesos formativos",
        "glosa2": "Dirección de Escuela",
        "ceco": "1180451001",
        "descripCeco": "Tecnologia Medi",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi"
  },
  {
    "id": "4202060603",
    "name": "ALIMENTOS Y BEBIDAS",
    "presupuesto": 98000,
    "ejecutado": 42630,
    "disponible": 55370,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto Operacional",
    "monthlyPlan": {
      "Ene": 98000
    },
    "monthlyExec": {
      "Ene": 90160
    },
    "transactions": [
      {
        "id": "TX-116",
        "cuenta": "4202060603",
        "descripcion": "ALIMENTOS Y BEBIDAS",
        "fecha": "15/05/2026",
        "valor": 25578,
        "glosa": "Fortalecimiento de nuestra identidad como Facultad",
        "glosa2": "Dirección de Escuela",
        "ceco": "1180451001",
        "descripCeco": "Tecnologia Medi",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto Operacional"
      }
    ],
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi"
  },
  {
    "id": "4101040403",
    "name": "REMUNERACION PERSONAL ACADEMICO PERSONAL",
    "presupuesto": 71953459,
    "ejecutado": 31299755,
    "disponible": 40653704,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Ene": 7102165,
      "Feb": 6687484,
      "Mar": 6779889,
      "Abr": 6779889,
      "May": 6779889,
      "Jun": 6779889,
      "Jul": 5435689,
      "Ago": 5590789,
      "Sep": 5120769,
      "Oct": 4965669,
      "Nov": 4965669,
      "Dic": 4965669
    },
    "monthlyExec": {
      "Ene": 6533992,
      "Feb": 6152485,
      "Mar": 6237498,
      "Abr": 6237498,
      "May": 6237498,
      "Jun": 6237498,
      "Jul": 5000834
    },
    "transactions": [
      {
        "id": "TX-117",
        "cuenta": "4101040403",
        "descripcion": "REMUNERACION PERSONAL ACADEMICO PERSONAL",
        "fecha": "15/05/2026",
        "valor": 18779853,
        "glosa": "Operación periódica REMUNERACION PERSONAL ACADEMICO PERSONAL",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180451001",
        "descripCeco": "Tecnologia Medi",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi"
  },
  {
    "id": "4101050501",
    "name": "HONORARIOS PERSONAL ACADEMICO",
    "presupuesto": 430183649,
    "ejecutado": 187129887,
    "disponible": 243053762,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Ene": 42930341,
      "Feb": 750000,
      "Mar": 45893300,
      "Abr": 42481100,
      "May": 42636200,
      "Jun": 42636200,
      "Jul": 45634800,
      "Ago": 6462500,
      "Sep": 38974852,
      "Oct": 38871452,
      "Nov": 38871452,
      "Dic": 44041452
    },
    "monthlyExec": {
      "Ene": 39495914,
      "Feb": 690000,
      "Mar": 42221836,
      "Abr": 39082612,
      "May": 39225304,
      "Jun": 39225304,
      "Jul": 41984016
    },
    "transactions": [
      {
        "id": "TX-118",
        "cuenta": "4101050501",
        "descripcion": "HONORARIOS PERSONAL ACADEMICO",
        "fecha": "15/05/2026",
        "valor": 112277932,
        "glosa": "Operación periódica HONORARIOS PERSONAL ACADEMICO",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180451001",
        "descripCeco": "Tecnologia Medi",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi"
  },
  {
    "id": "4101050502",
    "name": "HONORARIOS AYUDANTES PERSONAL ACADEMICO",
    "presupuesto": 4259840,
    "ejecutado": 1853030,
    "disponible": 2406810,
    "pct": 43.5,
    "tipoPresupuesto": "Presupuesto de Malla",
    "monthlyPlan": {
      "Abr": 288467,
      "May": 288467,
      "Jun": 288467,
      "Jul": 288467,
      "Sep": 776493,
      "Oct": 776493,
      "Nov": 776493,
      "Dic": 776493
    },
    "monthlyExec": {
      "Abr": 265390,
      "May": 265390,
      "Jun": 265390,
      "Jul": 265390
    },
    "transactions": [
      {
        "id": "TX-119",
        "cuenta": "4101050502",
        "descripcion": "HONORARIOS AYUDANTES PERSONAL ACADEMICO",
        "fecha": "15/05/2026",
        "valor": 1111818,
        "glosa": "Operación periódica HONORARIOS AYUDANTES PERSONAL ACADEMICO",
        "glosa2": "Proveedor Institucional UDP",
        "ceco": "1180451001",
        "descripCeco": "Tecnologia Medi",
        "mes": "May",
        "monthIndex": 4,
        "tipoPresupuesto": "Presupuesto de Malla"
      }
    ],
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi"
  }
];
export const DEMO_TRANSACTIONS: Transaction[] = [
  {
    "id": "TX-1",
    "cuenta": "4202010106",
    "descripcion": "INSUMOS TÉCNICOS",
    "fecha": "15/05/2026",
    "valor": 1995084,
    "glosa": "Consumo de Insumos Ténicos",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180454001",
    "descripCeco": "Obstetricia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-2",
    "cuenta": "4202010101",
    "descripcion": "MATERIALES E INSUMOS",
    "fecha": "15/05/2026",
    "valor": 117659,
    "glosa": "Consumo Materiales e Insumos",
    "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
    "ceco": "1180454001",
    "descripCeco": "Obstetricia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-3",
    "cuenta": "4202060603",
    "descripcion": "ALIMENTOS PERSONAL",
    "fecha": "15/05/2026",
    "valor": 99754,
    "glosa": "Consumo Servicios Externos",
    "glosa2": "ESCUELA",
    "ceco": "1180454001",
    "descripCeco": "Obstetricia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-4",
    "cuenta": "4202050507",
    "descripcion": "ATENCIÓN A TERCEROS",
    "fecha": "15/05/2026",
    "valor": 38367,
    "glosa": "Operación periódica ATENCIÓN A TERCEROS",
    "glosa2": "ESCUELA",
    "ceco": "1180454001",
    "descripCeco": "Obstetricia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-5",
    "cuenta": "4201020202",
    "descripcion": "MOVILIZACIÓN Y FLETES",
    "fecha": "15/05/2026",
    "valor": 25578,
    "glosa": "Operación periódica MOVILIZACIÓN Y FLETES",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180454001",
    "descripCeco": "Obstetricia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-6",
    "cuenta": "4201020207",
    "descripcion": "SERVICIOS EXTERNOS",
    "fecha": "15/05/2026",
    "valor": 690606,
    "glosa": "Operación periódica SERVICIOS EXTERNOS",
    "glosa2": "ESCUELA",
    "ceco": "1180454001",
    "descripCeco": "Obstetricia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-7",
    "cuenta": "4202060602",
    "descripcion": "ALOJAMIENTO Y PASAJES",
    "fecha": "15/05/2026",
    "valor": 51156,
    "glosa": "Operación periódica ALOJAMIENTO Y PASAJES",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180454001",
    "descripCeco": "Obstetricia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-8",
    "cuenta": "4202090902",
    "descripcion": "GASTOS DE INVERSIÓN",
    "fecha": "15/05/2026",
    "valor": 11510,
    "glosa": "Lampara de pie",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180454001",
    "descripCeco": "Obstetricia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-9",
    "cuenta": "4202090902",
    "descripcion": "GASTOS DE INVERSIÓN",
    "fecha": "15/05/2026",
    "valor": 15347,
    "glosa": "Escabel",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180454001",
    "descripCeco": "Obstetricia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-10",
    "cuenta": "4101040403",
    "descripcion": "REMUNERACION PERSONAL ACADEMICO PERSONAL",
    "fecha": "15/05/2026",
    "valor": 33773220,
    "glosa": "Operación periódica REMUNERACION PERSONAL ACADEMICO PERSONAL",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180454001",
    "descripCeco": "Obstetricia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-11",
    "cuenta": "4101050501",
    "descripcion": "HONORARIOS PERSONAL ACADEMICO",
    "fecha": "15/05/2026",
    "valor": 59753401,
    "glosa": "Operación periódica HONORARIOS PERSONAL ACADEMICO",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180454001",
    "descripCeco": "Obstetricia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-12",
    "cuenta": "4101050502",
    "descripcion": "HONORARIOS AYUDANTES PERSONAL ACADEMICO",
    "fecha": "15/05/2026",
    "valor": 99974,
    "glosa": "Operación periódica HONORARIOS AYUDANTES PERSONAL ACADEMICO",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180454001",
    "descripCeco": "Obstetricia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-13",
    "cuenta": "4102050501",
    "descripcion": "HONORARIOS PERSONAL ADMINISTRATIVO",
    "fecha": "15/05/2026",
    "valor": 4210277,
    "glosa": "Operación periódica HONORARIOS PERSONAL ADMINISTRATIVO",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180454001",
    "descripCeco": "Obstetricia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-14",
    "cuenta": "4202010101",
    "descripcion": "MATERIALES E INSUMOS",
    "fecha": "15/05/2026",
    "valor": 358092,
    "glosa": "Consumo Materiales e Insumos",
    "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
    "ceco": "1180326006",
    "descripCeco": "Campus Clinico",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-15",
    "cuenta": "4201020207",
    "descripcion": "SERVICIOS EXTERNOS",
    "fecha": "15/05/2026",
    "valor": 35809200,
    "glosa": "Pago por uso de campos clínicos",
    "glosa2": "DIRECTOR DE GESTIÓNY FINANZAS",
    "ceco": "1180326006",
    "descripCeco": "Campus Clinico",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-16",
    "cuenta": "4202060603",
    "descripcion": "ALIMENTOS PERSONAL",
    "fecha": "15/05/2026",
    "valor": 25578,
    "glosa": "Pago por uso de campos clínicos",
    "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
    "ceco": "1180326006",
    "descripCeco": "Campus Clinico",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-17",
    "cuenta": "4201020201",
    "descripcion": "SERVICIO DE CORRESPONDENCIA",
    "fecha": "15/05/2026",
    "valor": 51156,
    "glosa": "Pago por uso de campos clínicos",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180326006",
    "descripCeco": "Campus Clinico",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-18",
    "cuenta": "4201020202",
    "descripcion": "MOVILIZACIÓN Y FLETES",
    "fecha": "15/05/2026",
    "valor": 127890,
    "glosa": "Pago por uso de campos clínicos",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180326006",
    "descripCeco": "Campus Clinico",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-19",
    "cuenta": "4202010106",
    "descripcion": "INSUMOS TÉCNICOS",
    "fecha": "15/05/2026",
    "valor": 25578,
    "glosa": "Pago por uso de campos clínicos",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180326006",
    "descripCeco": "Campus Clinico",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-20",
    "cuenta": "4202010106",
    "descripcion": "INSUMOS TÉCNICOS",
    "fecha": "15/05/2026",
    "valor": 1151010,
    "glosa": "Consumo de Insumos Ténicos",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-21",
    "cuenta": "4202010101",
    "descripcion": "MATERIALES E INSUMOS",
    "fecha": "15/05/2026",
    "valor": 242991,
    "glosa": "Consumo Materiales e Insumos",
    "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-22",
    "cuenta": "4201020202",
    "descripcion": "MOVILIZACIÓN Y FLETES",
    "fecha": "15/05/2026",
    "valor": 12789,
    "glosa": "Consumo Servicios Externos",
    "glosa2": "ESCUELA",
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-23",
    "cuenta": "4202060603",
    "descripcion": "ALIMENTOS PERSONAL",
    "fecha": "15/05/2026",
    "valor": 43483,
    "glosa": "Operación periódica ALIMENTOS PERSONAL",
    "glosa2": "ESCUELA",
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-24",
    "cuenta": "4202010104",
    "descripcion": "IMPRESION Y ENCUADERNACION",
    "fecha": "15/05/2026",
    "valor": 33251,
    "glosa": "Operación periódica IMPRESION Y ENCUADERNACION",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-25",
    "cuenta": "4202020202",
    "descripcion": "MANTENCIÓN Y REPARACIÓN EQUIPOS Y VEHICULOS",
    "fecha": "15/05/2026",
    "valor": 6394500,
    "glosa": "Operación periódica MANTENCIÓN Y REPARACIÓN EQUIPOS Y VEHICULOS",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-26",
    "cuenta": "4202060604",
    "descripcion": "CAPACITACIÓN",
    "fecha": "15/05/2026",
    "valor": 179046,
    "glosa": "Operación periódica CAPACITACIÓN",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-27",
    "cuenta": "4202090902",
    "descripcion": "GASTOS DE INVERSIÓN",
    "fecha": "15/05/2026",
    "valor": 35809,
    "glosa": "Operación periódica GASTOS DE INVERSIÓN",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-28",
    "cuenta": "4202010104",
    "descripcion": "IMPRESION Y ENCUADERNACION",
    "fecha": "15/05/2026",
    "valor": 25578,
    "glosa": "Operación periódica IMPRESION Y ENCUADERNACION",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-29",
    "cuenta": "4202060602",
    "descripcion": "ALOJAMIENTO Y PASAJES",
    "fecha": "15/05/2026",
    "valor": 127890,
    "glosa": "Operación periódica ALOJAMIENTO Y PASAJES",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-30",
    "cuenta": "4201020202",
    "descripcion": "MOVILIZACIÓN Y FLETES",
    "fecha": "15/05/2026",
    "valor": 20462,
    "glosa": "Fortalecimiento de nuestra identidad como Facultad",
    "glosa2": "MARCIA MALDONADO",
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-31",
    "cuenta": "4201020207",
    "descripcion": "SERVICIOS EXTERNOS",
    "fecha": "15/05/2026",
    "valor": 51156,
    "glosa": "Mejoramiento continuo de los procesos formativos",
    "glosa2": "MARCIA MALDONADO",
    "ceco": "1180326010",
    "descripCeco": "Centro Simulación",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-32",
    "cuenta": "4202010106",
    "descripcion": "INSUMOS TÉCNICOS",
    "fecha": "15/05/2026",
    "valor": 2392587,
    "glosa": "Consumo de Insumos Ténicos",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-33",
    "cuenta": "4202010101",
    "descripcion": "MATERIALES E INSUMOS",
    "fecha": "15/05/2026",
    "valor": 464580,
    "glosa": "Consumo Materiales e Insumos",
    "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-34",
    "cuenta": "4201020207",
    "descripcion": "SERVICIOS EXTERNOS",
    "fecha": "15/05/2026",
    "valor": 1265981,
    "glosa": "Consumo Servicios Externos",
    "glosa2": "ESCUELA",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-35",
    "cuenta": "4202070705",
    "descripcion": "ALIMENTOS ALUMNOS",
    "fecha": "15/05/2026",
    "valor": 116145,
    "glosa": "Alimentos alumnos",
    "glosa2": "ESCUELA",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-36",
    "cuenta": "4202060603",
    "descripcion": "ALIMENTOS PERSONAL",
    "fecha": "15/05/2026",
    "valor": 84786,
    "glosa": "Alimentos personal",
    "glosa2": "ESCUELA",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-37",
    "cuenta": "4202050507",
    "descripcion": "ATENCIÓN A TERCEROS",
    "fecha": "15/05/2026",
    "valor": 30198,
    "glosa": "Atención a Terceros",
    "glosa2": "ESCUELA",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-38",
    "cuenta": "4202050506",
    "descripcion": "ARTÍCULOS PROMOCIONALES",
    "fecha": "15/05/2026",
    "valor": 46458,
    "glosa": "Articulos promocionales",
    "glosa2": "ESCUELA",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-39",
    "cuenta": "4401020299",
    "descripcion": "APORTES A OTRAS INSTITUCIONES",
    "fecha": "15/05/2026",
    "valor": 464580,
    "glosa": "Aportes a otras instituciones",
    "glosa2": "ESCUELA",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-40",
    "cuenta": "4202060604",
    "descripcion": "CAPACITACIÓN",
    "fecha": "15/05/2026",
    "valor": 46458,
    "glosa": "Capacitaciones",
    "glosa2": "ESCUELA",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-41",
    "cuenta": "4202090902",
    "descripcion": "GASTOS DE INVERSIÓN",
    "fecha": "15/05/2026",
    "valor": 20906,
    "glosa": "6 Tallímetro portátil",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-42",
    "cuenta": "4202090902",
    "descripcion": "GASTOS DE INVERSIÓN",
    "fecha": "15/05/2026",
    "valor": 20906,
    "glosa": "6 Pesa digital",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-43",
    "cuenta": "4202090902",
    "descripcion": "GASTOS DE INVERSIÓN",
    "fecha": "15/05/2026",
    "valor": 62254,
    "glosa": "2 Mochila Urbana para Visitas Domiciliarias - CITYS",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-44",
    "cuenta": "4202070705",
    "descripcion": "ALIMENTOS ALUMNOS",
    "fecha": "15/05/2026",
    "valor": 23229,
    "glosa": "Mejoramiento de la calidad de vida universitaria",
    "glosa2": "Dirección de Escuela",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-45",
    "cuenta": "4202060603",
    "descripcion": "ALIMENTOS PERSONAL",
    "fecha": "15/05/2026",
    "valor": 46458,
    "glosa": "Mejoramiento continuo de los procesos formativos",
    "glosa2": "Dirección de Escuela",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-46",
    "cuenta": "4202060603",
    "descripcion": "ALIMENTOS PERSONAL",
    "fecha": "15/05/2026",
    "valor": 15099,
    "glosa": "Mejoramiento continuo de los procesos formativos",
    "glosa2": "Dirección de Escuela",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-47",
    "cuenta": "4202070705",
    "descripcion": "ALIMENTOS ALUMNOS",
    "fecha": "15/05/2026",
    "valor": 11615,
    "glosa": "Mejoramiento continuo de los procesos formativos",
    "glosa2": "Dirección de Escuela",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-48",
    "cuenta": "4202060603",
    "descripcion": "ALIMENTOS PERSONAL",
    "fecha": "15/05/2026",
    "valor": 17422,
    "glosa": "Fortalecimiento de nuestra identidad como Facultad",
    "glosa2": "Dirección de Escuela",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-49",
    "cuenta": "4101040403",
    "descripcion": "REMUNERACION PERSONAL ACADEMICO PERSONAL",
    "fecha": "15/05/2026",
    "valor": 24874537,
    "glosa": "Operación periódica REMUNERACION PERSONAL ACADEMICO PERSONAL",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-50",
    "cuenta": "4101050501",
    "descripcion": "HONORARIOS PERSONAL ACADEMICO",
    "fecha": "15/05/2026",
    "valor": 129668399,
    "glosa": "Operación periódica HONORARIOS PERSONAL ACADEMICO",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-51",
    "cuenta": "4101050502",
    "descripcion": "HONORARIOS AYUDANTES PERSONAL ACADEMICO",
    "fecha": "15/05/2026",
    "valor": 160473,
    "glosa": "Operación periódica HONORARIOS AYUDANTES PERSONAL ACADEMICO",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-52",
    "cuenta": "4102050501",
    "descripcion": "HONORARIOS PERSONAL ADMINISTRATIVO",
    "fecha": "15/05/2026",
    "valor": 5817346,
    "glosa": "Operación periódica HONORARIOS PERSONAL ADMINISTRATIVO",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180452001",
    "descripCeco": "Enfermeria",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-53",
    "cuenta": "4202010106",
    "descripcion": "INSUMOS TÉCNICOS",
    "fecha": "15/05/2026",
    "valor": 4092480,
    "glosa": "Consumo de Insumos Ténicos",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180580001",
    "descripCeco": "Escuela Postgra",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-54",
    "cuenta": "4202010101",
    "descripcion": "MATERIALES E INSUMOS",
    "fecha": "15/05/2026",
    "valor": 25578,
    "glosa": "Consumo Materiales e Insumos",
    "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
    "ceco": "1180580001",
    "descripCeco": "Escuela Postgra",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-55",
    "cuenta": "4202070705",
    "descripcion": "ALIMENTOS ALUMNOS",
    "fecha": "15/05/2026",
    "valor": 255780,
    "glosa": "Recepción Inicio",
    "glosa2": "ESCUELA",
    "ceco": "1180580001",
    "descripCeco": "Escuela Postgra",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-56",
    "cuenta": "4202060601",
    "descripcion": "VIÁTICOS",
    "fecha": "15/05/2026",
    "valor": 76734,
    "glosa": "Traslados",
    "glosa2": "ESCUELA",
    "ceco": "1180580001",
    "descripCeco": "Escuela Postgra",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-57",
    "cuenta": "4201020202",
    "descripcion": "MOVILIZACIÓN Y FLETES",
    "fecha": "15/05/2026",
    "valor": 7673,
    "glosa": "Transporte",
    "glosa2": "ESCUELA",
    "ceco": "1180580001",
    "descripCeco": "Escuela Postgra",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-58",
    "cuenta": "4201010105",
    "descripcion": "COMBUSTIBLES Y LUBRICANTES",
    "fecha": "15/05/2026",
    "valor": 12789,
    "glosa": "Traslados",
    "glosa2": "ESCUELA",
    "ceco": "1180580001",
    "descripCeco": "Escuela Postgra",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-59",
    "cuenta": "4202050506",
    "descripcion": "ARTÍCULOS PROMOCIONALES",
    "fecha": "15/05/2026",
    "valor": 76734,
    "glosa": "Entrega de Presentes",
    "glosa2": "ESCUELA",
    "ceco": "1180580001",
    "descripCeco": "Escuela Postgra",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-60",
    "cuenta": "4202060603",
    "descripcion": "ALIMENTOS PERSONAL",
    "fecha": "15/05/2026",
    "valor": 6395,
    "glosa": "Fortalecimiento de nuestra identidad como Facultad",
    "glosa2": "ESCUELA",
    "ceco": "1180580001",
    "descripCeco": "Escuela Postgra",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-61",
    "cuenta": "4202010106",
    "descripcion": "INSUMOS TÉCNICOS",
    "fecha": "15/05/2026",
    "valor": 1790460,
    "glosa": "Consumo de Insumos Ténicos",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-62",
    "cuenta": "4201020207",
    "descripcion": "SERVICIOS EXTERNOS",
    "fecha": "15/05/2026",
    "valor": 920808,
    "glosa": "SERVICIOS EXTERNOS",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-63",
    "cuenta": "4202010101",
    "descripcion": "MATERIALES E INSUMOS",
    "fecha": "15/05/2026",
    "valor": 260896,
    "glosa": "MATERIALES E INSUMOS",
    "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-64",
    "cuenta": "4202020202",
    "descripcion": "MANTENCIÓN Y REPARACIÓN EQUIPOS Y VEHICULOS",
    "fecha": "15/05/2026",
    "valor": 639450,
    "glosa": "MANTENCIÓN Y REPARACIÓN EQUIPOS Y VEHICULOS",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-65",
    "cuenta": "4202070705",
    "descripcion": "ALIMENTOS ALUMNOS",
    "fecha": "15/05/2026",
    "valor": 153468,
    "glosa": "ALIMENTOS ALUMNOS",
    "glosa2": "ESCUELA",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-66",
    "cuenta": "4202060602",
    "descripcion": "ALOJAMIENTO Y PASAJES",
    "fecha": "15/05/2026",
    "valor": 409248,
    "glosa": "ALOJAMIENTO Y PASAJES",
    "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-67",
    "cuenta": "4202050507",
    "descripcion": "ATENCIÓN A TERCEROS",
    "fecha": "15/05/2026",
    "valor": 25578,
    "glosa": "ATENCIÓN A TERCEROS",
    "glosa2": "ESCUELA",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-68",
    "cuenta": "4201020202",
    "descripcion": "MOVILIZACIÓN Y FLETES",
    "fecha": "15/05/2026",
    "valor": 76734,
    "glosa": "MOVILIZACIÓN Y FLETES",
    "glosa2": "ESCUELA",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-69",
    "cuenta": "4202050506",
    "descripcion": "ARTÍCULOS PROMOCIONALES",
    "fecha": "15/05/2026",
    "valor": 51156,
    "glosa": "ARTÍCULOS PROMOCIONALES",
    "glosa2": "ESCUELA",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-70",
    "cuenta": "4202090902",
    "descripcion": "GASTOS DE INVERSIÓN",
    "fecha": "15/05/2026",
    "valor": 166257,
    "glosa": "GASTOS DE INVERSIÓN",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-71",
    "cuenta": "4202060605",
    "descripcion": "PERFECCIONAMIENTO",
    "fecha": "15/05/2026",
    "valor": 179046,
    "glosa": "PERFECCIONAMIENTO",
    "glosa2": "ESCUELA",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-72",
    "cuenta": "4202070705",
    "descripcion": "ALIMENTOS ALUMNOS",
    "fecha": "15/05/2026",
    "valor": 255780,
    "glosa": "ALIMENTOS Y BEBIDAS",
    "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-73",
    "cuenta": "4202060602",
    "descripcion": "ALOJAMIENTO Y PASAJES",
    "fecha": "15/05/2026",
    "valor": 76734,
    "glosa": "Mejoramiento de la calidad de vida universitaria",
    "glosa2": "Escuela de Kinesiología",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-74",
    "cuenta": "4101040403",
    "descripcion": "REMUNERACION PERSONAL ACADEMICO PERSONAL",
    "fecha": "15/05/2026",
    "valor": 28130471,
    "glosa": "Operación periódica REMUNERACION PERSONAL ACADEMICO PERSONAL",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-75",
    "cuenta": "4101050501",
    "descripcion": "HONORARIOS PERSONAL ACADEMICO",
    "fecha": "15/05/2026",
    "valor": 73109419,
    "glosa": "Operación periódica HONORARIOS PERSONAL ACADEMICO",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-76",
    "cuenta": "4101050502",
    "descripcion": "HONORARIOS AYUDANTES PERSONAL ACADEMICO",
    "fecha": "15/05/2026",
    "valor": 481421,
    "glosa": "Operación periódica HONORARIOS AYUDANTES PERSONAL ACADEMICO",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-77",
    "cuenta": "4102050501",
    "descripcion": "HONORARIOS PERSONAL ADMINISTRATIVO",
    "fecha": "15/05/2026",
    "valor": 3338402,
    "glosa": "Operación periódica HONORARIOS PERSONAL ADMINISTRATIVO",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180455001",
    "descripCeco": "Kinesiología",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-78",
    "cuenta": "4202010106",
    "descripcion": "INSUMOS TÉCNICOS",
    "fecha": "15/05/2026",
    "valor": 1790460,
    "glosa": "Consumo de Insumos Ténicos",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180326009",
    "descripCeco": "Lab Ciencias Bá",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-79",
    "cuenta": "4202010101",
    "descripcion": "MATERIALES E INSUMOS",
    "fecha": "15/05/2026",
    "valor": 107428,
    "glosa": "Consumo Materiales e Insumos",
    "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
    "ceco": "1180326009",
    "descripCeco": "Lab Ciencias Bá",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-80",
    "cuenta": "4202010106",
    "descripcion": "INSUMOS TÉCNICOS",
    "fecha": "15/05/2026",
    "valor": 30437820,
    "glosa": "Consumo de Insumos Técnicos",
    "glosa2": "ESCUELA",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-81",
    "cuenta": "4202010101",
    "descripcion": "MATERIALES E INSUMOS",
    "fecha": "15/05/2026",
    "valor": 409248,
    "glosa": "Consumo Materiales e Insumos",
    "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-82",
    "cuenta": "4202060603",
    "descripcion": "ALIMENTOS PERSONAL",
    "fecha": "15/05/2026",
    "valor": 207182,
    "glosa": "Consumo Alimentos Personal",
    "glosa2": "ESCUELA",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-83",
    "cuenta": "4202050507",
    "descripcion": "ATENCIÓN A TERCEROS",
    "fecha": "15/05/2026",
    "valor": 214855,
    "glosa": "Consumo Atención a Terceros",
    "glosa2": "ESCUELA",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-84",
    "cuenta": "4202070705",
    "descripcion": "ALIMENTOS ALUMNOS",
    "fecha": "15/05/2026",
    "valor": 173930,
    "glosa": "Consumo Alimentos Alumnos",
    "glosa2": "ESCUELA",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-85",
    "cuenta": "4202050506",
    "descripcion": "ARTÍCULOS PROMOCIONALES",
    "fecha": "15/05/2026",
    "valor": 588294,
    "glosa": "Consumo Artículos Promocionales",
    "glosa2": "ESCUELA",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-86",
    "cuenta": "4202090902",
    "descripcion": "GASTOS DE INVERSIÓN",
    "fecha": "15/05/2026",
    "valor": 147074,
    "glosa": "Consumo Gastos de Inversión",
    "glosa2": "ESCUELA",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-87",
    "cuenta": "4201020202",
    "descripcion": "MOVILIZACIÓN Y FLETES",
    "fecha": "15/05/2026",
    "valor": 182883,
    "glosa": "Consumo Movilización y Fletes",
    "glosa2": "ESCUELA",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-88",
    "cuenta": "4201020201",
    "descripcion": "SERVICIO DE CORRESPONDENCIA",
    "fecha": "15/05/2026",
    "valor": 157305,
    "glosa": "Consumo Servicio de Correspondencia",
    "glosa2": "ESCUELA",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-89",
    "cuenta": "4202010103",
    "descripcion": "FOTOCOPIAS Y REPRODUCCIONES",
    "fecha": "15/05/2026",
    "valor": 4604,
    "glosa": "Consumo Fotocopias y Reproducciones",
    "glosa2": "ESCUELA",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-90",
    "cuenta": "4202090901",
    "descripcion": "GASTOS VARIOS",
    "fecha": "15/05/2026",
    "valor": 2558,
    "glosa": "Consumo Gastos Varios",
    "glosa2": "ESCUELA",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-91",
    "cuenta": "4202050510",
    "descripcion": "ARTICULOS DE PREMIACION Y OTROS",
    "fecha": "15/05/2026",
    "valor": 25578,
    "glosa": "Consumo Artículos de Premiación",
    "glosa2": "ESCUELA",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-92",
    "cuenta": "4401020299",
    "descripcion": "APORTES A OTRAS INSTITUCIONES",
    "fecha": "15/05/2026",
    "valor": 5116,
    "glosa": "Consumo Aportes a Otras Instituciones",
    "glosa2": "ESCUELA",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-93",
    "cuenta": "4201020207",
    "descripcion": "SERVICIOS EXTERNOS",
    "fecha": "15/05/2026",
    "valor": 2545011,
    "glosa": "Consumo Servicios Externos",
    "glosa2": "ESCUELA",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-94",
    "cuenta": "4202020202",
    "descripcion": "MANTENCIÓN Y REPARACIÓN EQUIPOS Y VEHICULOS",
    "fecha": "15/05/2026",
    "valor": 1227744,
    "glosa": "Consumo Mantención y Reparación",
    "glosa2": "ESCUELA",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-95",
    "cuenta": "4101040403",
    "descripcion": "REMUNERACION PERSONAL ACADEMICO PERSONAL",
    "fecha": "15/05/2026",
    "valor": 82404262,
    "glosa": "Operación periódica REMUNERACION PERSONAL ACADEMICO PERSONAL",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-96",
    "cuenta": "4101050501",
    "descripcion": "HONORARIOS PERSONAL ACADEMICO",
    "fecha": "15/05/2026",
    "valor": 137544025,
    "glosa": "Operación periódica HONORARIOS PERSONAL ACADEMICO",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-97",
    "cuenta": "4102050501",
    "descripcion": "HONORARIOS PERSONAL ADMINISTRATIVO",
    "fecha": "15/05/2026",
    "valor": 139606,
    "glosa": "Operación periódica HONORARIOS PERSONAL ADMINISTRATIVO",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180450001",
    "descripCeco": "Odontologia",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-98",
    "cuenta": "4201020207",
    "descripcion": "SERVICIOS EXTERNOS",
    "fecha": "15/05/2026",
    "valor": 6394500,
    "glosa": "Proyecto humanización Salud",
    "glosa2": "Decano(a)",
    "ceco": "1180325001",
    "descripCeco": "Oficina del Dec",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-99",
    "cuenta": "4201020207",
    "descripcion": "SERVICIOS EXTERNOS",
    "fecha": "15/05/2026",
    "valor": 1534680,
    "glosa": "Proyecto Red Alumni",
    "glosa2": "Decano(a)",
    "ceco": "1180325001",
    "descripCeco": "Oficina del Dec",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-100",
    "cuenta": "4201020207",
    "descripcion": "SERVICIOS EXTERNOS",
    "fecha": "15/05/2026",
    "valor": 1278900,
    "glosa": "Fondo Vinculación con el medio",
    "glosa2": "Decano(a)",
    "ceco": "1180325001",
    "descripCeco": "Oficina del Dec",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-101",
    "cuenta": "4201020207",
    "descripcion": "SERVICIOS EXTERNOS",
    "fecha": "15/05/2026",
    "valor": 2046240,
    "glosa": "Proyecto asesorías Resoluciones Sanitarias",
    "glosa2": "Decano(a)",
    "ceco": "1180325001",
    "descripCeco": "Oficina del Dec",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-102",
    "cuenta": "4202090901",
    "descripcion": "GASTOS VARIOS",
    "fecha": "15/05/2026",
    "valor": 5116,
    "glosa": "Operación periódica GASTOS VARIOS",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180325001",
    "descripCeco": "Oficina del Dec",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-103",
    "cuenta": "4202020201",
    "descripcion": "MANTENCIÓN Y REPARACIÓN EDIFICIOS E INSTALACIONES",
    "fecha": "15/05/2026",
    "valor": 2046240,
    "glosa": "Operación periódica MANTENCIÓN Y REPARACIÓN EDIFICIOS E INSTALACIONES",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180325001",
    "descripCeco": "Oficina del Dec",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-104",
    "cuenta": "4202010106",
    "descripcion": "INSUMOS TÉCNICOS",
    "fecha": "15/05/2026",
    "valor": 45273060,
    "glosa": "Consumo de Insumos Ténicos",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-105",
    "cuenta": "4202010101",
    "descripcion": "MATERIALES E INSUMOS",
    "fecha": "15/05/2026",
    "valor": 863258,
    "glosa": "Consumo Materiales e Insumos",
    "glosa2": "COORDINADOR(A) ADMINISTRATIVO(A)",
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-106",
    "cuenta": "4201020207",
    "descripcion": "SERVICIOS EXTERNOS",
    "fecha": "15/05/2026",
    "valor": 3785544,
    "glosa": "Consumo Servicios Externos",
    "glosa2": "Coordinador de Abastecimiento y Laboratorio",
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-107",
    "cuenta": "4202060603",
    "descripcion": "ALIMENTOS PERSONAL",
    "fecha": "15/05/2026",
    "valor": 230202,
    "glosa": "Operación periódica ALIMENTOS PERSONAL",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-108",
    "cuenta": "4202050507",
    "descripcion": "ATENCIÓN A TERCEROS",
    "fecha": "15/05/2026",
    "valor": 204624,
    "glosa": "Operación periódica ATENCIÓN A TERCEROS",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-109",
    "cuenta": "4202070705",
    "descripcion": "ALIMENTOS ALUMNOS",
    "fecha": "15/05/2026",
    "valor": 63945,
    "glosa": "Operación periódica ALIMENTOS ALUMNOS",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-110",
    "cuenta": "4202090902",
    "descripcion": "GASTOS DE INVERSIÓN",
    "fecha": "15/05/2026",
    "valor": 33251,
    "glosa": "Operación periódica GASTOS DE INVERSIÓN",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-111",
    "cuenta": "4201020207",
    "descripcion": "SERVICIOS EXTERNOS",
    "fecha": "15/05/2026",
    "valor": 20462,
    "glosa": "Mejoramiento continuo de los procesos formativos",
    "glosa2": "Dirección de Escuela",
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-112",
    "cuenta": "4202060603",
    "descripcion": "ALIMENTOS Y BEBIDAS",
    "fecha": "15/05/2026",
    "valor": 15347,
    "glosa": "Mejoramiento continuo de los procesos formativos",
    "glosa2": "Dirección de Escuela",
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-113",
    "cuenta": "4201020207",
    "descripcion": "SERVICIOS EXTERNOS",
    "fecha": "15/05/2026",
    "valor": 153468,
    "glosa": "Mejoramiento continuo de los procesos formativos",
    "glosa2": "Dirección de Escuela",
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-114",
    "cuenta": "4201020207",
    "descripcion": "SERVICIOS EXTERNOS",
    "fecha": "15/05/2026",
    "valor": 38367,
    "glosa": "Mejoramiento continuo de los procesos formativos",
    "glosa2": "Dirección de Escuela",
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-115",
    "cuenta": "4202060603",
    "descripcion": "ALIMENTOS Y BEBIDAS",
    "fecha": "15/05/2026",
    "valor": 12789,
    "glosa": "Mejoramiento continuo de los procesos formativos",
    "glosa2": "Dirección de Escuela",
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-116",
    "cuenta": "4202060603",
    "descripcion": "ALIMENTOS Y BEBIDAS",
    "fecha": "15/05/2026",
    "valor": 25578,
    "glosa": "Fortalecimiento de nuestra identidad como Facultad",
    "glosa2": "Dirección de Escuela",
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto Operacional"
  },
  {
    "id": "TX-117",
    "cuenta": "4101040403",
    "descripcion": "REMUNERACION PERSONAL ACADEMICO PERSONAL",
    "fecha": "15/05/2026",
    "valor": 18779853,
    "glosa": "Operación periódica REMUNERACION PERSONAL ACADEMICO PERSONAL",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-118",
    "cuenta": "4101050501",
    "descripcion": "HONORARIOS PERSONAL ACADEMICO",
    "fecha": "15/05/2026",
    "valor": 112277932,
    "glosa": "Operación periódica HONORARIOS PERSONAL ACADEMICO",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  },
  {
    "id": "TX-119",
    "cuenta": "4101050502",
    "descripcion": "HONORARIOS AYUDANTES PERSONAL ACADEMICO",
    "fecha": "15/05/2026",
    "valor": 1111818,
    "glosa": "Operación periódica HONORARIOS AYUDANTES PERSONAL ACADEMICO",
    "glosa2": "Proveedor Institucional UDP",
    "ceco": "1180451001",
    "descripCeco": "Tecnologia Medi",
    "mes": "May",
    "monthIndex": 4,
    "tipoPresupuesto": "Presupuesto de Malla"
  }
];
export const DEMO_MONTHLY_EVOLUTION: MonthlyEvolutionItem[] = [
  {
    "mes": "Ene",
    "mesNombre": "Enero",
    "plan": 221546927,
    "ejec": 203823173,
    "planAcum": 221546927,
    "ejecAcum": 203823173
  },
  {
    "mes": "Feb",
    "mesNombre": "Febrero",
    "plan": 67883284,
    "ejec": 62452621,
    "planAcum": 289430211,
    "ejecAcum": 266275794
  },
  {
    "mes": "Mar",
    "mesNombre": "Marzo",
    "plan": 460117344,
    "ejec": 423307957,
    "planAcum": 749547555,
    "ejecAcum": 689583751
  },
  {
    "mes": "Abr",
    "mesNombre": "Abril",
    "plan": 235597558,
    "ejec": 216749754,
    "planAcum": 985145113,
    "ejecAcum": 906333505
  },
  {
    "mes": "May",
    "mesNombre": "Mayo",
    "plan": 238112616,
    "ejec": 219063607,
    "planAcum": 1223257729,
    "ejecAcum": 1125397112
  },
  {
    "mes": "Jun",
    "mesNombre": "Junio",
    "plan": 427934763,
    "ejec": 393699983,
    "planAcum": 1651192492,
    "ejecAcum": 1519097095
  },
  {
    "mes": "Jul",
    "mesNombre": "Julio",
    "plan": 380758779,
    "ejec": 350298077,
    "planAcum": 2031951271,
    "ejecAcum": 1869395172
  },
  {
    "mes": "Ago",
    "mesNombre": "Agosto",
    "plan": 187797186,
    "ejec": 0,
    "planAcum": 2219748457,
    "ejecAcum": 1869395172
  },
  {
    "mes": "Sep",
    "mesNombre": "Septiembre",
    "plan": 252685701,
    "ejec": 0,
    "planAcum": 2472434158,
    "ejecAcum": 1869395172
  },
  {
    "mes": "Oct",
    "mesNombre": "Octubre",
    "plan": 249250306,
    "ejec": 0,
    "planAcum": 2721684464,
    "ejecAcum": 1869395172
  },
  {
    "mes": "Nov",
    "mesNombre": "Noviembre",
    "plan": 330186747,
    "ejec": 0,
    "planAcum": 3051871211,
    "ejecAcum": 1869395172
  },
  {
    "mes": "Dic",
    "mesNombre": "Diciembre",
    "plan": 321222476,
    "ejec": 0,
    "planAcum": 3373093687,
    "ejecAcum": 1869395172
  }
];
