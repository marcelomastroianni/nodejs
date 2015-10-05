var http = require("http"),
    fs = require("fs"),
    path = require("path"),
    url = require("url");
    

var publicPath = process.argv[2] || process.cwd();
publicPath = path.resolve(publicPath);

console.log(publicPath);


var getMimeType = function(extName){
    extName = extName.replace(".","");
    
    var mimeTypes = {
        "html" : "text/html",
        "jpeg" : "image/jpeg",
        "jpg" : "image/jpeg",
        "png" : "image/png",
        "css" : "text/css",
        "js" :  "text/javascript",
        "json" : "application/json"        
    };        
    if (mimeTypes[extName]){
        return mimeTypes[extName];
    }    
    return "text/plain";    
};

var sendNotFound = function(res){
    res.writeHead(404, {
       "content-type":"text/html"        
    });
    res.end("<h1>Not Found</h1>");    
};

var server = http.createServer(function(req,res){
   
    var parsedUrl = url.parse(req.url);
    var filePath = parsedUrl.pathname;
    
    if (filePath == "/")
        filePath = "index.html";
    
    var fullPath = path.join(publicPath,filePath);
    
    console.log(fullPath);
    
    fs.exists(fullPath,function(exits){
        if (!exits){
            return sendNotFound(res);
        } 
        var fileExt = path.extname(fullPath);
        
        console.log(fileExt);
        
        res.writeHead(200,{
            "content-type": getMimeType(fileExt) //"text/plain"
        });
        
        var inputStream = fs.createReadStream(fullPath);
    
        inputStream.pipe(res);
        
        //res.write("Hello World! \n");
        //res.end("Node Static Server");                   
    });            
  
    
}).listen(3000,function(){
 console.log("Server running at http://localhost:3000");   
    
});
