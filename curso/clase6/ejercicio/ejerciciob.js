var express = require('express');
var fs = require("fs");
var app = express();

//Implementamos un cache para el archivo json
var users = null;
var getUsers = function(callback){
  if (users){
    //Nos aseguramos que el callback se ejecute en el siguiente ciclo, para no generar inconcistencias.
    process.nextTick(function(){
        callback(false,users);
    })
  }else{
    fs.readFile('./data.json','utf8',function(err,data){
      users = JSON.parse(data);
        callback(null,users);
    });      
  }   
};

app.get('/users/',function(req,res,next){
    getUsers(function(err,data){        
        res.json(data);        
    });
});

app.get('/user/:id', function(req,res){
     getUsers(function(err,data){        
        //El primer elemento de reduce, es lo que devolvio el llamado anterior 
         
         //La funcion callback de reduce se ejecuta por cada uno de los items del array
         //El parametro que 
        var response = data.reduce(function(defaultRes,user){
            
            //Utilizamos el operador ternario
            //Si se cumple la condicion devuelvo el usuario
            //Si no se cumple la condicion devuelvo defaultRes, que en este caso es el valro con el que
            //inicializo reduce
            return user._id == req.params.id ? {   error: false,
                                                   data: user
                                                } :  defaultRes;
        },{
            error: true,
            mensaje:"Usuario inexistente",
            data: {}
        });
         
         
        res.json(response);
         
    });
    
});

var server = app.listen(3000, function(){
    console.log('Server running at http://localhost:' + server.address().port );
});
