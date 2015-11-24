var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var authService = require('./lib/services/auth');
//load db settings
var db = require('./lib/models/db');

var userRouter = require('./lib/routes/user');
//var productRouter = require('./routes/product');
//var orderRouter = require('./routes/order');

var app = express();

app.use(bodyParser.json());

//passport.initialize() devuelve un middleware
//app.use(passport.initialize());
app.use(authService.configure('Secret Phrase',db.User));

app.use('/users', userRouter);
//app.use('/products', productRouter);
//app.use('/order', orderRouter);

app.get('/', function(req, res){
  res.json({
    message : "NODE Simple API",
  })
});

var server = app.listen(3000, function(){
  console.log('Server running at http://localhost:' + server.address().port);
});


//Podemos poner expresiones regulares
app.get('*',function(req,res,next){
    var error = new Error("Not Found");
    
    error.status = 404;
    next(error);
    
    //Cuando llamo a next sin nada se ejecuta el proximo middleware    
    //Los middleware no se comunican entre si pasandose informacion
    //Si quiero pasar informacion de un middleware a otro, lo hago
    //agregando informacion al objeto request    
});

//Por tener 4 parametros es interpretado como un handler especial
app.use(function(err,req,res,next){
   res.status(err.status).json({
      message: err.message || 'Internal Server Error' 
   });
    
});
