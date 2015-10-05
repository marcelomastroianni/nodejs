var express = require('express');
var fs = require("fs");
var app = express();





app.get('/users/',function(req,res,next){

    
    fs.readFile('data.json','utf8',function(err,data){       
        
        jsonData = JSON.parse(data);                
        res.json(jsonData);                                
    });
    
});

app.get('/user/:id', function(req,res){
    
    fs.readFile('data.json','utf8',function(err,data){       
        
        jsonData = JSON.parse(data);                                                        
        jsonData.forEach(function(item){
            if (item._id == req.params.id)
            {
                res.json(item);
            }                        
        });
        
        
    });
    
});





var server = app.listen(3000, function(){
    console.log('Server running at http://localhost:' + server.address().port );
});
