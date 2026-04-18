import { createServer } from 'http';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

// Import the entry point
let handler;
try {
  const module = await import('./dist/server/index.js');
  handler = module.default;
  console.log('✅ Handler loaded successfully');
} catch (err) {
  console.error('❌ Failed to load handler:', err);
  process.exit(1);
}

// Create HTTP server
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host}`);
    
    // Create a Web-compatible request
    let body = null;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = req;
    }

    const webRequest = new Request(url, {
      method: req.method,
      headers: Object.fromEntries(
        Object.entries(req.headers).map(([k, v]) => [k, String(v)])
      ),
      body,
    });

    // Get response from handler
    const response = await handler(webRequest);

    // Write response
    res.writeHead(response.status, Object.fromEntries(response.headers));
    
    if (response.body) {
      res.end(await response.text());
    } else {
      res.end();
    }
  } catch (error) {
    console.error('💥 Error:', error?.message || error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Internal Server Error: ${error?.message || 'Unknown'}`);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`
🚀 Server running at http://localhost:${PORT}
📦 Node.js ${process.version}
⚙️  Port: ${PORT}
  `);
});

process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
