var http = require("http");
var fs = require("fs");



var server = http.createServer(function(req,res){
   
    res.writeHead(200,{
        "content-type":"text/html"
    });
    
    var inputStream = fs.createReadStream('index.html');
    
    inputStream.pipe(res);
    
    
    

    //res.write("Hello World! \n");
    
    //res.end();
    
}).listen(3000,function(){
 console.log("Server running at http://localhost:3000");   
    
});
