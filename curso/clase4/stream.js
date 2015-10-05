var fs = require("fs");
var zlib = require("zlib");
var file = process.argv[2];


//var inputStream = process.stdin;
//var outputStream = fs.createWriteStream('output.txt');

/*
inputStream.on("readable",function(){
    
    var chunk = null;
    
    while(chunk = process.stdin.read()){
        //console.log("Leyendo: "+ chunk.toString());
        outputStream.write(chunk);
        
    }
    
});
*/


var inputStream = fs.createReadStream('poo.js');
var transformStream = zlib.createGzip()//stream.Transform
var outputStream = fs.createWriteStream('poo.js.gz');

inputStream.pipe(transformStream);
transformStream.pipe(outputStream);

/*
inputStream.on("end",function(){
   outputStream.end();
    
    //console.log("End.");
    
});
*/

/*
fs.readFile(file,function(err,buffer){
   
    zlib.gzip(buffer,function(err,buffer){
       
        fs.writeFile(file + '.gz', buffer,function(err){
           
            console.log("done");
        });
    });
    
});

*/
