var express = require('express');
var router = express.Router({
  mergeParams : true
});
var user = require('../models/user'); 

router.post('/', function(req, res){
  user.create(req.body, function(err, data){
    res.json(data);
  })
});

router.put('/', function(req, res){
  user.update(req.body, function(err, data){
    res.json(data);
  })
});

router.get('/', function(req, res){
  user.list(function(err, data){
    res.json(data);
  })
});

router.get('/:id', function(req, res){
  user.get(req.params.id, function(err, data){
    if(data){
      return res.json(data);
    }
    res.json({
      error : true,
      msg : "usuario inexistente"
    })
  })
});

router.delete('/:id', function(req, res){
  user.delete(req.params.id, function(err, data){
    if(data){
      return res.json({
        error: false,
        msg : "usuario " + data + " eliminado"
      });
    }
    res.json({
      error : true,
      msg : "usuario inexistente"
    })
  })
});

module.exports = router;
