require('./API/dataBase/mark_model.js');
require('./API/dataBase/producer_type.js');
require('./API/dataBase/products.js');
require('./API/dataBase/customer')

const http = require('http');
const path = require('path');
const hostname = 'localhost';
const port = 2000;
const app = require('./API/app.js').get();

// app.all('*', function(req, res, next){
//   console.log(req._parsedUrl.path.split("/")[1]);
//
//   next();
// });

// app.use(function(req, res, next) {
//   // Put some preprocessing here.
//   next();
// });
// app.use(app.router);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
