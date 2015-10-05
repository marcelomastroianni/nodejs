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



//Este listener es mucho mas especifico que '/hello/:name' porque machea con muchos mas casos, entonces si queremos que se ejecute
//debemos ponerlo antes que '/hello/:name',
//En express el orden de las rutas importa

app.get('/hello/*',function(req,res,next){
   console.log("REQUEST EN /HELLO/");
    console.log();
});




//El parametro : es el nombre de una variable.
//Tiene un motor que utiliza expressiones regulares.
//Se parsea la ruta
//Podria tener una url que tenga el id del recurso que quiero obtener


/*
Cuando queremos leer la siguiente pagina el nevagador web:

http://localhost:3000/hello/alguien

Otenemos

Hello, alguien
*/


app.get('/hello/:name', function(req,res){
    res.send("Hello, " + req.params.name);    
});






var server = app.listen(3000, function(){
   
    //Este callback se usa para dar un feedback a la consola de que el servidor esta corriendo.
    
    console.log('Server running at http://localhost:' + server.address().port );
});
