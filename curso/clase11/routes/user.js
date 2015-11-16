var express = require('express');

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

router.get('/:id', function(req, res){
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

module.exports = router;
