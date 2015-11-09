var mongoose = require('mongoose');
var dbURL = 'mongodb://localhost:27017/nodestore';


//Este connect lo unico que hace es disparar el request de la conexion.
//Trabaja con un event emiter
//Luego registro callbacks para los eventos mas importantes.
mongoose.connect(dbURL);

//A partir de aquie es un event emmiter.
mongoose.connection.on('connected',function(){
    console.log('Mongoose connected to: ' , dbURL);   
});

//Se disparar en cualquier momento que haya algun tipo de error
mongoose.connection.on('error',function(err){
    console.log('Mongoose connection error: ' , err);   
    
    
});


//Se dispara cuando se cierra la conexion.
mongoose.connection.on('disconnected',function(){
    console.log('Mongoose disconnected: ');   
    process.exit(0);//Como en C cuando avisas que terminaste con errores o sin errores.
});

//Vamos a poner un handler al objeto process que tambien es un event emmiter
//Se ejecuta cuando el proceso termina por cualquier motivo
process.on('SIGINT', function(){
    //Cerramos la conexion a mano.
    //No tiene sentido registrar un callback aca porque se va a disparar el evento disconnected.
    mongoose.connection.close();
    
});

exports.User = require('./user');

//La carga de archivos q son de codigo se hacen de manera sincronica.
//Pero tambien se ejecutan una sola vez cuando se instancia la aplicacion
