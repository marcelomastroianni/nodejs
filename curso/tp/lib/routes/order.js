var express = require('express');
var authService = require('../services/auth');
var error = require('../helpers/error');

var router = express.Router({
  mergeParams : true
});

var Order = require('../models/db').Order; 

//Listar todos
router.get('/', 
  authService.authenticate(),         
  function(req, res, next){
    //console.log(req.user);
    Order.find({},
      function (err, data){
        if (err) return next(err);
        res.status(200).json(data);
      }
    );
  }
);

//Alta
router.post('/', authService.authenticate(),function(req, res, next){
  var order = new Order(req.body);
  order.save(function(err, data){
    if (err) {
        console.log(err);
        return next(err);   
    }
    res.status(200).json(data);
  });
});

//Consulta
router.get('/:id', 
 authService.authenticate(),
 function(req, res, next){
  Order.findById(req.params.id, function(err, order){
    if (err) return next(err);
    if (!order) return next(error.NotFound('Order Not Found'));
    res.status(200).json(order);
  });
});

//Baja
router.delete('/:id', authService.authenticate(),function(req, res, next){
  Order.findById(req.params.id, function(err, order){
    if (err) return next(err);
    if(!order) return next(error.NotFound('Order Not Found'));    
    order.remove(function(err, data){
        if (err) return next(err);
        res.status(200).json(data);
    });
  });
});

//Modificacion
router.put('/:id', authService.authenticate(),
    function(req, res, next){
      Order.findById(req.params.id, function(err, order) {
          if (err) return next(err);
          if(!order) return next(error.NotFound('Order Not Found'));
          order.user = req.body.user;
          order.items = req.body.items;
          order.save(function(err,order){
            if (err) return next(err);
            res.status(200).json(order);
          });
        }
    );
});

//Alta item
router.post('/:id/items/', authService.authenticate(),function(req, res, next){
    Order.findById(req.params.id, function(err, order) {
          if (err) return next(err);
          if(!order) return next(error.NotFound('Order Not Found'));
          order.items.push(req.body);
          //console.log(req.body);
          order.save(function(err,order){
            if (err) return next(err);
            res.status(200).json(order);
          });
        }
    );        
});

//Baja item
router.delete('/:id/items/:idItem/', authService.authenticate(),function(req, res, next){
        Order.update( 
          { _id: req.params.id },
          { $pull: { items : { _id : req.params.idItem } } },
          { safe: true },
          function removeConnectionsCB(err, data) {
              if (err) return next(err);
              res.status(200).json(data);
          });
});

/*
//Baja item
router.delete('/:id/items/:idItem/', authService.authenticate(),function(req, res, next){
    
   Order.findById(req.params.id, function(err, order) {
          if (err) return next(err);
          if(!order) return next(error.NotFound('Order Not Found'));              
          order.items.pull(req.params.idItem);                 
          res.status(200).json(order);                   
        }
    );
    */
    
    
     /*
    Order.update( 
          { _id: req.params.id },
          { $pull: { items : req.params.idItem } },
          { safe: true },
          function removeConnectionsCB(err, data) {
              if (err) return next(err);
              res.status(200).json(data);
          });
     */
    /*
    
    Order.update( 
          { _id: req.params.id },
          { $pull: { items : { _id : req.params.idItem } } },
          { safe: true },
          function removeConnectionsCB(err, data) {
              if (err) return next(err);
              res.status(200).json(data);
          });
    */
    
    
    /*        
    Order.findById(req.params.id, function(err, order) {
          if (err) return next(err);
          if(!order) return next(error.NotFound('Order Not Found'));
          
          order.items.push(req.body);
        
          var itemToRemove;
        
          order.items.forEach(function(item, index, array){
            
             if (item._id == req.params.idItem)
                {
                    itemToRemove = item;        
                }
            
          });                        
          itemToRemove.remove()                    
           itemToRemove.remove(function(err, data){
                if (err) return next(err);
                res.status(200).json(data);
            });                    
          / *
          if(itemToRemove)
          {
                order.items.remove(itemToRemove);
          }        
          order.save(function(err,order){
            if (err) return next(err);
            res.status(200).json(order);
          });
          * /
        }
    );
});
*/

module.exports = router;