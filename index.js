const http = require('http');
const path = require('path');
const hostname = '192.168.1.40';
const port = 2000;
const app = require('./apis/app.js').get();

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
