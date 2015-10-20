var express = require('express');
var bodyParser = require('body-parser');
var userModel = require("./models/user");

var fs = require('fs');
var app = express();

app.use(bodyParser.json());




/*
var getUsers = function(callback){
  if(users){
    process.nextTick(function(){
      callback(false, users);
    })
  }else{
    fs.readFile('./data.json', 'utf8', function(err, data){
      users = JSON.parse(data);
      callback(null, users);
    });
  }
};
*/

app.get("/",function(req,res){
    
    res.json({
        mensaje: "NODE Simple API",
        uris:[
            {
                uri : '/users'
            },
            {
                uri : '/users/:id'
            }
        ]
    });
    
});

app.post('/echo', function(req, res){  

    res.json(req.body);  
});


app.post('/users', function(req, res){    
    userModel.create(req.body,function(err,data){
       res.json(data); 
    });    
});


app.get('/users', function(req, res){
   userModel.list(function(err,data){
       res.json(data); 
    });    
});

app.get('/users/:id', function(req, res){
  userModel.get(req.params.id,function(err,data){
       res.json(data); 
    });    
});


app.delete('/users/:id', function(req, res){
  userModel.delete(req.params.id,function(err,data){
       res.json(data); 
    });    
});




app.put('/users/', function(req, res){
  userModel.update(req.body,function(err,data){
       res.json(data); 
    });    
});



var server = app.listen(3000, function(){
  console.log('Server running at http://localhost:' + server.address().port);
});
