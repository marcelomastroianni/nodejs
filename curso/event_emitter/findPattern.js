var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

function findPattern(files, regex){

}

findPattern(['./data1.txt', './data2.txt'], /hola \w+/g)
	.on("error", function(err){
		console.log(err);
	})
	.on("fileread", function(file){
		console.log('Leyendo archivo ' + file);
	})
	.on("found", function(file, elem){
		console.log('Match en archivo: ' + file);
		console.log('--->: ' + elem);
	})
