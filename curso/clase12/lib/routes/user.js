var express = require('express');
var authService = require('../services/auth');
var Error = require('../helpers/error.js');


/*
    El router de expres es asociacia una serie de rutas con middlewares particulares
    pero un router en si es un middleware tambien
*/
var router = express.Router({
  mergeParams : true
});

var User = require('../models/db').User; 

var sendResponse = function(err, data, res){
  if(err){
    return res.status(400).json({
      error : true,
      message : err
    });
  }
  res.json({
    error : false,
    data : data
  });
};

router.post('/', function(req, res){
  var user = new User(req.body);
  user.save(function(err, data){
    //sendResponse(err, data, res);
      if(err) return next(err);
      res.status(200).json(data);
  });
});

router.put('/:id', function(req, res){
  User.findById(req.params.id, function(err, user) {
      if (!user)
          next(Error.NotFound("User Not Found");
      if(err) return next(err);
      
      user.gender = req.body.gender;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.userName = req.body.userName;
      user.email = req.body.email;
      user.save(function(err,user){
        //sendResponse(err, user, res);
        if(err) return next(err);
        res.status(200).json(user);
      });
    }
  );
});

/*
    ruta,
    middleware 1,
    middleware 2,
    middleware 3,
    handler
    
    la arquitectura central de express es una serie de middlewares que se van llamando
    y el ultimo es quien cierra el request.
    
    
    
    podriamos tambien pasar los middleware con la siguiente sintaxis
    
    ruta 
    array middlewares
    handler
    
    y el handler es tambien un middleware, pero que no lo usamos como middleware
    porque no le pasamos el tercer parametro que es el next
*/

router.get('/', 
  //authService.authenticate(),             
  function(req, res){
    console.log(req.user);
    User.find({},
      function (err, data){
        sendResponse(err, data, res);
      }
    );
  }
);

router.get('/:id', 
  //authService.authenticate(),                  
  function(req, res){
  User.findById(req.params.id, function(err, user){
      
    if (!user) 
        return next(Error.NotFound("User Not Found"));
    if(err) 
        return next(err);
      
    //sendResponse(err, user, res);
    res.status(200).json(user);
  });
});

router.delete('/:id', function(req, res){
  User.findById(req.params.id, function(err, user){
    user.remove(function(err, data){
      sendResponse(err, data, res);
    });
  });
});

router.post('/login', function(req, res){
  User.findOne( { userName : req.body.userName } , function(err, user){
   
    if(!user) {
      return sendResponse({
        message : 'Incorrect username or password'
      }, null, res);
    }
    
    user.comparePassword(req.body.password, function(err, match){
    
      if(!match){
        return sendResponse({
          message : 'Incorrect username or password'
        }, null, res);
      }
      
      var token = authService.getToken(
        {
          sub : user._id,
          username : user.userName
        },'2m'        
      );
      
      sendResponse(err, {
        token : token
      }, res);
      
    });
  });
});


module.exports = router;