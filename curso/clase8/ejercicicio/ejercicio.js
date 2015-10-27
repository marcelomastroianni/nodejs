var express = require('express');
var bodyParser = require('body-parser');
var userRouter = require("./routes/users");

var fs = require('fs');
var app = express();

app.use(bodyParser.json());
app.use('/users',userRouter);

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


var server = app.listen(3000, function(){
  console.log('Server running at http://localhost:' + server.address().port);
});
