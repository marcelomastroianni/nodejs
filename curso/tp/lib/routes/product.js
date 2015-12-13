var express = require('express');
var authService = require('../services/auth');
var error = require('../helpers/error');

var router = express.Router({
  mergeParams : true
});

var Product = require('../models/db').Product; 



router.get('/', 
  //authService.authenticate(),         
  function(req, res, next){
    console.log(req.user);
    Product.find({},
      function (err, data){
        if (err) return next(err);
        res.status(200).json(data);
      }
    );
  }
);



module.exports = router;