var sax = require("sax"),
  strict = true, // set to false for html-mode 
  parser = sax.parser(strict);
 

var who1 = false;

parser.onerror = function (e) {
  // an error happened. 
     console.dir(e);
};
parser.ontext = function (t) {
  // got some text.  t is the string of text. 
    
    if (who1)
    {
        console.dir(t);
    }
};
parser.onopentag = function (node) {
  // opened a tag.  node has "name" and "attributes" 
    
    if (node.name=='who1')
        who1 = true;
    else
        who1 = false;
    
    //console.dir(node);
};
parser.onattribute = function (attr) {
  // an attribute.  attr has "name" and "value" 
    
     //console.dir(attr);
};
parser.onend = function () {
  // parser stream is done, and ready to have more stuff written to it. 
    
    console.log("Listo");
};
 

parser.write('<xml><who1>world</who1><who1>moon</who1><who2>sun</who2></xml>').close();

/*
// stream usage 
// takes the same options as the parser 
var saxStream = require("sax").createStream(strict, options)
saxStream.on("error", function (e) {
  // unhandled errors will throw, since this is a proper node 
  // event emitter. 
  console.error("error!", e)
  // clear the error 
  this._parser.error = null
  this._parser.resume()
})
saxStream.on("opentag", function (node) {
  // same object as above 
})
// pipe is supported, and it's readable/writable 
// same chunks coming in also go out. 
fs.createReadStream("file.xml")
  .pipe(saxStream)
  .pipe(fs.createWriteStream("file-copy.xml"))
  
  */