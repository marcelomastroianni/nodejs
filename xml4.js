// stream usage 
// takes the same options as the parser 
var strict = true; // set to false for html-mode 
var options = {};
var saxStream = require("sax").createStream(strict, options);
var fs = require("fs");


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
    console.log(node);
})
saxStream.on("text", function (t) {
  // same object as above 
    console.log(t);
    t = 'cambiado';
})
// pipe is supported, and it's readable/writable 
// same chunks coming in also go out. 
fs.createReadStream("a.xml")
  .pipe(saxStream)
  .pipe(fs.createWriteStream("file-copy.xml"))