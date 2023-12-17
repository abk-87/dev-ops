const http = require('http');
const url = require('url');
const { execSync } = require('child_process');
const hostname = execSync('hostname -i').toString().trim(); 
const port = 3000;

const server = http.createServer((req, res) => {
  const requestUrl = url.format({
    protocol: 'http',
    hostname: hostname,
    port: port,
    pathname: '/ping'
  });

  if (req.url === '/ping') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('pong\n'); 
  } else {
    res.statusCode = 404;
    res.end(`
    <!DOCTYPE html>
      <html>
      <head>
        <title>Not Found</title>
      </head>
      <body>
        <p>Go to <a href="${requestUrl}">${requestUrl}</a></p>
      </body>
      </html>
    `);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
