var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var authService = require('./lib/services/auth');
//load db settings
var db = require('./lib/models/db');
var error = require('./lib/helpers/error');
var errorHandler = require('./lib/middlewares/error');

var userRouter = require('./lib/routes/user');
var productRouter = require('./lib/routes/product');
var orderRouter = require('./lib/routes/order');

var app = express();

app.use(bodyParser.json());
app.use(authService.configure('Secret Phrease', db.User));
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.get('/', function(req, res){
  res.json({
    message : "NODE Simple API",
  })
});

app.get('*', function(req, res, next){
  next(error.NotFound('Resource Not Found'));
});

app.use(errorHandler.clientErrorHandler);
app.use(errorHandler.serverErrorHandler);

var server = app.listen(3000, function(){
  console.log('Server running at http://localhost:' + server.address().port);
});