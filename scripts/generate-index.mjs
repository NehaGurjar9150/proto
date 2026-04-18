import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(__dirname, '../dist/client');

// Get all .js and .css files in assets
const assetsDir = path.join(clientDir, 'assets');
let mainScript = 'assets/index.js';
let cssFile = '';

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
  const css = files.find(f => f.startsWith('styles-') && f.endsWith('.css'));
  
  if (jsFile) {
    mainScript = `assets/${jsFile}`;
  }
  if (css) {
    cssFile = `<link rel="stylesheet" href="/assets/${css}" />`;
  }
}

// Create index.html with all necessary assets
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="author" content="Neha Gurjar" />
  <title>Neha Gurjar — Data Analyst Portfolio</title>
  <meta name="description" content="Aspiring Data Analyst specializing in Power BI, SQL, Tableau & Python. Explore dashboards in Power BI, Tableau, and SQL." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Neha Gurjar — Data Analyst Portfolio" />
  <meta property="og:description" content="Power BI · SQL · Tableau · Python — 9 dashboards across operations, sales, healthcare, retail and automotive." />
  <meta name="twitter:card" content="summary_large_image" />
  ${cssFile}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/${mainScript}"></script>
</body>
</html>`;

try {
  fs.writeFileSync(path.join(clientDir, 'index.html'), html);
  console.log('✅ Generated dist/client/index.html');
} catch (error) {
  console.error('❌ Failed to generate index.html:', error.message);
  process.exit(1);
}
