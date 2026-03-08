const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    try {
      const html = fs.readFileSync(path.join(__dirname, '../dist/index.html'));
      res.end(html);
    } catch (err) {
      res.writeHead(500);
      res.end('Server error: cannot read index.html');
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(9000, () => {
  console.log('E2E server running on http://localhost:9000');
  process.send('ready'); // Сигнал готовности для тестов
});

module.exports = server;
