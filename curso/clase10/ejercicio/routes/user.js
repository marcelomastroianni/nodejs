var express = require('express');
var router = express.Router({
  mergeParams : true
});

//Los constructores van en mayuscula
var User = require('../models/db').User; 

var sendResponse = function(err,data,res){
    if(err){
            //Con estatus 400 ya le estamos diciendo al cliente que el request fallo.
            //Si devolvemos 200 cuando hay error, y la aplicacion debe fijarse las propiedades del json q devolvemos para saber si hubo un error
            //entonces no estamos respetando el protocolo http que dice q 400 es error.
            return res.status(400).json({
                error : true,
                errorData : err
            });                
        }
        res.json({
            error: false,
            data: data
        });    
};

router.post('/', function(req, res){
    //Lo que hacemos en post es crear un usuario
    var user = new User(req.body);
    //Lo que tengo aca es una instancia del modelo, pero todavia no se guardo.
    //En vez de tener un json, tengo un objeto con metodos.
    user.save(function(err,data){
      sendResponse(err,data,res)
    });
});


router.put('/:id', function(req, res){
    User.findById(req.params.id,function(err,user){
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.userName = req.body.userName;
        user.email = req.body.email;    
        user.save(function(err,data){
           sendResponse(err,data,res); 
        });         
    }); 
});


router.get('/', function(req, res){
    //find es un metodo de toda la collecion, no de una instancia particular de un objeto.
    //User sirve como constructor para crear instancias de Users, y tambien como una clase que representa a la collecion.
    User.find({},function(err,data){
        sendResponse(err,data,res);   
    });
    
});

router.get('/:id', function(req, res){
    User.findById(req.params.id,function(err,data){
        sendResponse(err,data,res);   
    });
});

router.delete('/:id', function(req, res){
     User.findById(req.params.id,function(err,user){         
        user.remove(function(err,data){
           sendResponse(err,data,res); 
        });                   
    });
});

module.exports = router;
