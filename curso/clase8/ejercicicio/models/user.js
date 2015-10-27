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
   con.connect(function(err,db){
    db.collection(DB_COLLECTION)
    .findOne({_id:oid}).toArray(function(err,result){
        console.log(result);
    })
   
   });
}    
