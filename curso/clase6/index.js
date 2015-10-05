var express = require('express');

var app = express();

/*
    http://localhost:8080/index.html
    / Seria cuando no hay path
    es decir
    http://localhost:8080/
*/


//req y res son streams.
//tienen otros metodos nuevos, como un metodo json
//tiene otro metodo send que agrega todas las cabeceras.
//Esta informacion la podemos agregar a mano, pero tenemos los metodos que agilizan el proceso.


app.get('/', function(req,res){

        res.send("Hello Express!!");
    
    
});


var server = app.listen(3000, function(){
   
    //Este callback se usa para dar un feedback a la consola de que el servidor esta corriendo.
    
    console.log('Server running at http://localhost:' + server.address().port );
});
