var users = [];
var uuid = require('node-uuid');

exports.create = function(data,callback){    
    data.id = uuid.v1();//genera un hash unico
    users.push(data);
    process.netTick(function(){
        callback(null,data) //Llamamos al callback de forma asincronica
    });
};


exports.list = function(callback){
    process.nextTick(function(){       
        callback(null,users);
    });    
}


exports.get = function(id,callback){
    process.nextTick(function(){       
        var user = users.reduce(function(prev,actual){
            return actual.id == id ? actual : prev;     //Si hay dos elementos iguales retorno el ultimo elemento       
        },null);
        
        callback(null,users);
    });    
}    
