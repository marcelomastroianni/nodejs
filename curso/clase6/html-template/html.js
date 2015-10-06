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
        
        //El array va a tener la misma cantidad de elemenetos que el array original,
        //pero en cada item voy a tener lo que devuelva la funcion que recibe map
        
        var list = data.map(function(user){
            return "<li><a href='/user/" + user._id + "' >" + user.name + "</a></li>"
        });
        
        //por defecto devuelve html
        res.send("<ul>" + list.join("") + "</ul>" );        
        
        
        
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
            return user._id == req.params.id ? "<h1> "+ user.name  +  " </h1>" :  defaultRes;
        }, "<h1>Usuario inexistente</h1>");
         
        
         //por defecto devuelve html
        res.send(response);
         
    });
    
});

var server = app.listen(3000, function(){
    console.log('Server running at http://localhost:' + server.address().port );
});
