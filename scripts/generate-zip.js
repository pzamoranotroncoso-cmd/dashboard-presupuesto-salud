import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const zip = new JSZip();
const rootDir = process.cwd();

// Files and folders to include
const includeFiles = [
  'package.json',
  'tsconfig.json',
  'tsconfig.node.json',
  'vite.config.ts',
  'index.html',
  'firebase-applet-config.json',
  'metadata.json'
];

const includeDirs = ['src', 'public'];

function addFilesRecursively(dirPath, zipFolder) {
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    // Skip node_modules, dist, .git, and any existing zip file
    if (item === 'node_modules' || item === 'dist' || item === '.git' || item.endsWith('.zip')) {
      continue;
    }

    if (stat.isDirectory()) {
      const subZip = zipFolder.folder(item);
      addFilesRecursively(fullPath, subZip);
    } else {
      const content = fs.readFileSync(fullPath);
      zipFolder.file(item, content);
    }
  }
}

// Add top-level files
for (const file of includeFiles) {
  const fullPath = path.join(rootDir, file);
  if (fs.existsSync(fullPath)) {
    zip.file(file, fs.readFileSync(fullPath));
  }
}

// Add directories
for (const dir of includeDirs) {
  const fullPath = path.join(rootDir, dir);
  if (fs.existsSync(fullPath)) {
    const folder = zip.folder(dir);
    addFilesRecursively(fullPath, folder);
  }
}

// Add README with instructions
const readmeContent = `# Dashboard de Ejecución Presupuestaria - FACSyO UDP

Aplicación web interactiva para la gestión y seguimiento presupuestario de la Facultad de Salud y Odontología, Universidad Diego Portales.

## Características
- Sincronización en vivo con Google Sheets (Google Drive).
- Detección automática de modificaciones cada 25 segundos.
- Control de acceso basado en roles (Director de Carrera / Admin).
- Filtros interactivos por CECO, Clase de Coste y cuentas.

## Cómo ejecutar en tu computadora:
1. Instala Node.js (v18 o superior).
2. Abre la terminal en esta carpeta.
3. Ejecuta:
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`
4. Abre http://localhost:3000 en tu navegador.

## Cómo publicar en GitHub y Vercel:
1. Sube este contenido a tu repositorio en GitHub (https://github.com/patriciozamorano-a11y/dashboard-presupuesto-salud).
2. Conecta el repositorio en https://vercel.com y presiona "Deploy".
`;

zip.file('README.md', readmeContent);

// Generate zip buffer
zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }).then((content) => {
  const outPath = path.join(rootDir, 'public', 'codigo-proyecto-udp.zip');
  fs.writeFileSync(outPath, content);
  console.log('ZIP generado exitosamente en:', outPath);
});
