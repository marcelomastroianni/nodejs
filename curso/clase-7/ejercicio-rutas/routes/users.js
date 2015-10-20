var express = require('express');
var router = express.Router();
//para mergear los parametros se pone aca:
/*
var router = express.Router();...

*/

var userModel = require("../models/user");


//Los params de la aplicacion principal no llegan aca directamente
//a menos que mergeemos los parametros.
//Ya que es una aplicacion aparte del router que esta en app.


router.post('/', function(req, res){    
    userModel.create(req.body,function(err,data){
       res.json(data); 
    });    
});


router.get('/', function(req, res){
   userModel.list(function(err,data){
       res.json(data); 
    });    
});

router.get('/:id', function(req, res){
  userModel.get(req.params.id,function(err,data){
       res.json(data); 
    });    
});


router.delete('/:id', function(req, res){
  userModel.delete(req.params.id,function(err,data){
       res.json(data); 
    });    
});


router.put('/', function(req, res){
  userModel.update(req.body,function(err,data){
       res.json(data); 
    });    
});


//Tengo que pisar exports
module.exports = router;
