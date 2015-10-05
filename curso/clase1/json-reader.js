/*******************
*
*Ejercicio Callbacks resuelto
*
*Manejo de errores en un escenario CPS
*
********************/

var fs = require('fs');


function readJSON(filename, callback){
	var dataParsed;
    
	fs.readFile(filename, 'utf8', function(err, data){		
		if(err){
			return callback(err);
		}

		try{
			dataParsed = JSON.parse(data);
		}catch(e){
			return callback(e);
		}
	
		return callback(false, dataParsed);
    });
}

//Archivo data.json contiene json valido
readJSON('data.json', function(err, data){
	if(err){
		console.log("Error leyendo 'data.json': " + err);
	}else{
		console.log(data);
	}
});

//Archivo data.txt no contiene json valido
readJSON('data.txt', function(err, data){
	if(err){
		console.log("Error leyendo 'data.txt': " + err);
	}else{
		console.log(data);
	}
});

//Archivo undefined.json inexistente
readJSON('undefined.json', function(err, data){
	if(err){
		console.log("Error leyendo 'undefined.json': " + err);
	}else{
		console.log(data);
	}
});
