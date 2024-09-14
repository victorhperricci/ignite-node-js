import http from 'node:http';

const users = []

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      name: 'Lucas',
      age: 25
    })

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);
