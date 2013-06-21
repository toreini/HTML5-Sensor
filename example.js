var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, 'http://frozen-chamber-8664.herokuapp.com/');
console.log('Server running at http://frozen-chamber-8664.herokuapp.com/:1337/');