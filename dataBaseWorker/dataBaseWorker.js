var pgp = require('pg-promise')(/*options*/)
var Worker;
class dbWorker{
    
    constructor(schema  = 'public',options = {
        host:'localhost',
        port:5432,
        database:'postgres',
        user:'admin',
        password:'1111'}) {
        this.connect = pgp(options);
        this.schema = schema;
        };
   
    async get(getString,errorString) {
        let result;
        await this.connect.any(getString)
        .then(function(data){
            result = data;
        })
        .catch(function (error) {
            console.error(errorString, error);
            result = `${errorString} ${error}`;
        });
        return result;
    }

    async findOne(relation,params,errorString){
        let result;
        let getString = `SELECT * FROM ${this.schema}.${relation} where id=${params}`;
        await this.connect.one(getString)
        .then(function(data){
          result = data;
        })
        .catch(function (error) {
          console.error(errorString, error);
        });
        return result;
    };

    async getWithParams (getString, params, errorString){
        let result;
        await this.connect.any(getString,params)
        .then(function(data){
          result = data;
        })
        .catch(function (error) {
          console.error(errorString, error);
        });
        return result;
      };

      async insert(relation,data,errorString){
        let result = `INSERT INTO ${this.schema}.${relation} (`;
        let addString = '';
        for (let key in data){
            result += `${key},`;
            addString += '${'+`${key}`+'},';
        }
        result = result.substr(0,result.lastIndexOf(','));
        addString = addString.substr(0,addString.lastIndexOf(','));         
        await this.connect.none(`${result}) VALUES (${addString})`,data)
        .then(() => {
            result = {"result":"Добавление прошло успешно","response":true};
        })
        .catch((error) => {
            result = {"result":"ERROR:"+error,"response":false};
        });
        return result;
      }

      async update(relation,data,errorString){
        let result = `UPDATE ${this.schema}.${relation} SET `;
        for (let key in data){
            if(key==='id')continue;
            result += key + ' = ${'+key+'},';
        }
        result = result.substr(0,result.lastIndexOf(','));        
        await this.connect.none(`${result} WHERE id =`+'${id}',data)
        .then(() => {
            result = {"result":"Обновление прошло успешно","response":true};
        })
        .catch((error) => {
            result = {"result":"ERROR:"+error,"response":false};
        });
        return result;
      }
}
module.exports = function(schema,options){
    if(!Worker)
        {
            Worker = new dbWorker(schema,options);  
            Object.freeze(Worker);           
        }
    return Worker;
}