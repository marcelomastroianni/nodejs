var express = require('express');
var authService = require('../services/auth');
var error = require('../helpers/error');

var router = express.Router({
  mergeParams : true
});

var User = require('../models/db').User; 

router.post('/', authService.authenticate(),function(req, res, next){
  var user = new User(req.body);
  user.save(function(err, data){
    if (err) return next(err);
    res.status(200).json(data);
  });
});

router.put('/:id', authService.authenticate(),

           function(req, res, next){
  User.findById(req.params.id, function(err, user) {
      if (err) return next(err);
      if(!user) return next(error.NotFound('User Not Found'));
      //user.gender = req.body.gender;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.userName = req.body.userName;
      user.email = req.body.email;
      user.save(function(err,user){
        if (err) return next(err);
        res.status(200).json(user);
      });
    }
  );
});

router.get('/', 
  authService.authenticate(),         
  function(req, res, next){
    //console.log(req.user);
    User.find({},
      function (err, data){
        if (err) return next(err);
        res.status(200).json(data);
      }
    );
  }
);

router.get('/:id', 
 authService.authenticate(),
 function(req, res, next){
  User.findById(req.params.id, function(err, user){
    if (err) return next(err);
    if (!user) return next(error.NotFound('User Not Found'));
    res.status(200).json(user);
  });
});

router.delete('/:id', authService.authenticate(),function(req, res, next){
  User.findById(req.params.id, function(err, user){
    if (err) return next(err);
    if(!user) return next(error.NotFound('User Not Found'));    
    user.remove(function(err, data){
        if (err) return next(err);
        res.status(200).json(data);
    });
  });
});

router.post('/login', function(req, res,next){
  User.findOne( { userName : req.body.userName } , function(err, user){
   
    if (err) return next(err);
    if(!user) return next(error.NotFound('Incorrect username or password')); 
    
    user.comparePassword(req.body.password, function(err, match){
    
      if(!match){
        return next(error.NotFound('Incorrect username or password')); 
      }
      
      var token = authService.getToken(
        {
          sub : user._id,
          username : user.userName
        }, 
        '15m'
      );
      
      res.status(200).json({ token : token });
    });
  });
});


module.exports = router;