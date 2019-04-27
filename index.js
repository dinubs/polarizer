// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { createServer, request } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.NODE_PORT || 80;
const app = next({ dev, hostname: HOST });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname.indexOf('/api') === 0) {
      return proxyApi(req, res);
    } else {
      return handle(req, res);
    }
  }).listen(PORT, HOST, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

function proxyApi(req, res) {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: req.url.replace('/api', ''),
    headers: req.headers,
    method: req.method,
  };

  const proxy = request(options, function (response) {
    res.writeHead(response.statusCode, response.headers);
    response.pipe(res, {
      end: true
    });
  });

  return req.pipe(proxy, {
    end: true
  });
}
