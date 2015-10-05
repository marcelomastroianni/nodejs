var fs = require("fs");
var stream = require('stream');
var util = require('util');






function Uppercase()
{
    stream.Transform.call(this);
    
    
}

util.inherits(Uppercase,stream.Transform);

Uppercase.prototype._transform = function(chunk,enconding,callback){
    this.push(chunk.toString().toUpperCase());
    callback();
}


var inputStream = process.stdin;
var outputStream = fs.createWriteStream('output.txt');
var upperStream = new Uppercase();

inputStream.pipe(upperStream);
upperStream.pipe(outputStream);
