var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var db = require('./models/db');

var usersRouter = require('./routes/user');
var app = express();

app.use(bodyParser.json());
app.use('/users', usersRouter);

var logger = function(req, res, next){
  console.log("REQUEST BODY: \n");
  console.log(req.body);
  console.log("REQUEST PARAMS: \n");
  console.log(req.params);
  console.log("--------------- \n");
  next();
};

app.use(logger);

app.get('/', function(req, res){
  res.json({
    message : "NODE Simple API",
  })
});

var server = app.listen(3000, function(){
  console.log('Server running at http://localhost:' + server.address().port);
});
