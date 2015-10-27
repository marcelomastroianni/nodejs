var con = require('./connection');
var DB_COLLECTION = 'users';


exports.create = function(data,callback){    
    
    con.connect(function(err,db){
        var collection = db.collection(DB_COLLECTION);//Sino existe lo crea 
        collection.insertOne(data,function(err,result){
            console.log(result);
            callback(null,data) //Llamamos al callback de forma asincronica
        });
    });
    
};


exports.list = function(callback){
    process.nextTick(function(){       
        callback(null,users);
    });    
}


exports.update = function(data,callback){  
}




exports.delete = function(id,callback){

}

exports.get = function(id,callback){
    process.nextTick(function(){       
        var user = users.reduce(function(prev,actual){
            return actual.id == id ? actual : prev;     //Si hay dos elementos iguales retorno el ultimo elemento       
        },null);
        
        callback(null,user);
    });    
}    
