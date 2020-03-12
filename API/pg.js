// var pgp = require('pg-promise')(/*options*/)
// var db = (function () {
//     var dbconnect;
//     var options = {
//       host:'localhost',
//       port:5432,
//       database:'nextart',
//       user:'admin',
//       password:'1111'
//     };

//     function create() {
//       var connect = pgp(options);
//       return connect;
//     }

//     return {
//         get: function () {
//             if (!dbconnect) {
//                 dbconnect = create();
//             }
//             return dbconnect;
//         }
//     };
// })();
// module.exports = db;
module.exports = require('../dataBaseWorker/dataBaseWorker')("storage",{
    host:'localhost',
    port:5432,
    database:'nextart',
    user:'admin',
    password:'1111'});   
     

        
