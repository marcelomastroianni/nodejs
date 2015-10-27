var express = require('express');
var bodyParser = require('body-parser');
/*
    bodyParser es un middleware
    Express procesa rutas.
    Express tiene un solo enpoint, y luego lo va pasando a las difentes rutas.
    Por eso es importante el orden en que aparecen las rutas.
    Una aplicacion de express es equivalente a un pipe de linux. 
    
    El middleware es como una ruta que se pone en el medio, hace algo con el request, pero en vez de devolver, sigue pasando el request a las demas rutas.
    
    Para nosotros es abstracto.
    
    Un middleware puede hacer tareas de validacion.
    
    Puede parser el objeto request y acomodarlo un poco mas.
    Puede realizar la autenticacion
    Puede realizar el logueo.
    
*/
var fs = require('fs');
var app = express();


/*

    Json
    Multipart-form-data
*/

app.use(bodyParser.json());

var users = null;


/*
Creamos un middleware propio:

*/

var logger = function(req,res,next){
    console.log("REQUEST BODY : /n");
    console.log(req.body);
    console.log("REQUEST PARAMS: \n");
    console.log(req.params);
    console.log("----------------------------");
    
    //Tengo que pasar la ruta al siguiente middleware:
    next();        
}

//Esto se ejecuta para cualquier ruta:
app.use(logger);



/*

Asi estoy especificando el middleware para una ruta especifica:

app.get('/users/:id', logger, function(req, res){
  getUsers(function(err, data){
    var response = data.reduce(function(defaultRes, user){
      return user._id == req.params.id ? {
        error : false,
        data : user
      } : defaultRes;
    }, {
      error : true,
      messge : "Usuario inexistente",
      data : {}
    });
    
    res.json(response);
  })
});


Un middleware en una ruta particular se suele usar para validaciones de datos.


*/



var getUsers = function(callback){
  if(users){
    process.nextTick(function(){
      callback(false, users);
    })
  }else{
    fs.readFile('./data.json', 'utf8', function(err, data){
      users = JSON.parse(data);
      callback(null, users);
    });
  }
};

app.get("/",function(req,res){
    
    res.json({
        mensaje: "NODE Simple API",
        uris:[
            {
                uri : '/users'
            },
            {
                uri : '/users/:id'
            }
        ]
    });
    
});


app.post('/echo', function(req, res){  

    res.json(req.body);  
});




app.get('/users', function(req, res){
  getUsers(function(err, data){
    res.json(data);
  })
});

app.get('/users/:id', logger,function(req, res){
  getUsers(function(err, data){
    var response = data.reduce(function(defaultRes, user){
      return user._id == req.params.id ? {
        error : false,
        data : user
      } : defaultRes;
    }, {
      error : true,
      messge : "Usuario inexistente",
      data : {}
    });
    
    res.json(response);
  })
});

var server = app.listen(3000, function(){
  console.log('Server running at http://localhost:' + server.address().port);
});
