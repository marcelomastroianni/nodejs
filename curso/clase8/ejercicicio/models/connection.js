//Driver nativo:
//MongoClient
var mongo = require("mongodb");
var client = mongo.MongoClient;
var ObjectID = require('
                       

//MongoSkin

//Mongooze   ODM
//Agrega validaciones.

//ORM:sistema que te mapea clases a un sistema de base datos
//ODM: objet document mapped. Pasa de documentos de la base de datos a objetos json.


//La coneccion con mongodb se hace por lo general a travez de la url

//No hace falta que la base de datos exista, solamente debe existir el servidor 
var dbURL = 'mongodb://localhost:27017/userapi';
var db = null;


//esto es un singleton, si existe db la devuelvo,
//pero es asincronico, entonces si existe la base debo llamar
//al metodo nextTick
exports.connect = function(callback){
    if (db){
        
        return process.nextTick(function(){
           //hay que tratar de respetar esta notacion para los callbacks.
           //primero el error y luego los datos.
           //esto habilitaria a utilizar promises por ejemplo.
           callback(null,db); 
        });
    }
        
    client.connect(dbURL,function(err,database){
      
        if (err){
            return callback(err);
        }    
        
        db = database;
        
        callback(null,db);                
    });
    
}

//Este pattern se llama factory pattern
//ObjectID es un constructor, abstraigo a mi sistema de la idea de construccion
//y simplemente llamo a una funcion.
exports.ObjectID = function(hash){
  return new mongo.ObjectID(hash);  
};
