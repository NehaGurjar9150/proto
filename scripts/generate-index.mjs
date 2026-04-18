import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(__dirname, '../dist/client');

// Get all .js files in assets
const assetsDir = path.join(clientDir, 'assets');
let mainScript = 'assets/index.js';

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
  if (jsFile) {
    mainScript = `assets/${jsFile}`;
  }
}

// Create minimal index.html
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="author" content="Neha Gurjar" />
  <title>Neha Gurjar — Data Analyst Portfolio</title>
  <meta name="description" content="Aspiring Data Analyst specializing in Power BI, SQL, Tableau & Python." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Neha Gurjar — Data Analyst Portfolio" />
  <meta name="twitter:card" content="summary_large_image" />
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
