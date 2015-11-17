var express = require('express');

//tiene metodos para crear y decifrar tokens
var jwt = require("jsonwebtoken");
var passport = require('passport');



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
    sendResponse(err, data, res);
  });
});

router.put('/:id', function(req, res){
  User.findById(req.params.id, function(err, user) {
      user.gender = req.body.gender;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.userName = req.body.userName;
      user.email = req.body.email;
      user.save(function(err,user){
        sendResponse(err, user, res);
      });
    }
  );
});

router.get('/', function(req, res){
  User.find({},
    function (err, data){
      sendResponse(err, data, res);
    }
  );
});

/*Asi estariamos creando un middleware nosotros
router.get('/:id', 
  function(req,res,next){
    next();
    },
  function(req, res){
  User.findById(req.params.id, function(err, user){
    sendResponse(err, user, res);
  });
});
*/


router.get('/:id', 
   passport.authenticate('jwt', {sesion: false}), //Esto lo tenemos que agregar a todas las rutas que queremos que esten protegidas por el login
  function(req, res){
      console.log(req.user);
      User.findById(req.params.id, function(err, user){
        sendResponse(err, user, res);
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
 User.findOne( {userName: req.body.userName}  , function(err, user){
     
     if(!user){
        return sendResponse({
            message: 'Incorrect username or password'
        }, null, res);
     }
     
    user.comparePassword(req.body.password,function(err,isMatch){
        if(!isMatch){
            return sendResponse({
                message: 'Incorrect username or password'
            }, null, res);
        }
        
        var token = jwt.sign(
            {
                sub: user._id,
                username : user.userName
            },
            "Secret Phrase", //Puede estar en una variable de entorno y acceder a ella con Process
            {
                expiresIn : '2m'
            }
            
        );
        
        return sendResponse(err, { 
            token: token            
        }, res);
        
    });
     

  });
});


module.exports = router;
