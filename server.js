import { createServer } from 'http';
import { createReadStream, existsSync, statSync } from 'fs';
import { resolve, extname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const CLIENT_DIR = resolve(__dirname, 'dist/client');

// MIME types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

function getMimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

const server = createServer(async (req, res) => {
  try {
    const parsedUrl = new URL(req.url || '/', `http://${req.headers.host}`);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // Remove trailing slash (except for root)
    if (pathname !== '/' && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }

    let filePath = resolve(CLIENT_DIR, pathname === '/' ? 'index.html' : pathname.slice(1));

    // Security: prevent directory traversal
    if (!filePath.startsWith(CLIENT_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }

    // Check if file exists
    if (existsSync(filePath)) {
      const stats = statSync(filePath);
      
      if (stats.isDirectory()) {
        // If directory, try index.html
        filePath = resolve(filePath, 'index.html');
        if (!existsSync(filePath)) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
          return;
        }
      }

      const mimeType = getMimeType(filePath);
      res.writeHead(200, {
        'Content-Type': mimeType,
        'Cache-Control': filePath.includes('assets') 
          ? 'public, max-age=31536000, immutable'
          : 'public, max-age=0, must-revalidate',
      });

      createReadStream(filePath).pipe(res);
    } else {
      // Fallback to index.html for SPA routing
      const indexPath = resolve(CLIENT_DIR, 'index.html');
      if (existsSync(indexPath)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        createReadStream(indexPath).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    }
  } catch (error) {
    console.error('❌ Server error:', error?.message || error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`
🚀 Server running at http://localhost:${PORT}
📦 Node.js ${process.version}
⚙️  Port: ${PORT}
📁 Serving: ${CLIENT_DIR}
  `);
});

process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
