/*
  Para cada lenguaje en languages.json, crear un archivo en el directorio
  actual llamado [nombre del lenguaje].txt y cuyo contenido sea la descripcion del 
  lenguaje.
  Mostrar un mensaje en la consola una vez que todos los archivos se hallan creado.
*/
var fs = require('fs');
var archivos = 0;
fs.readFile('languages.json','utf8',function(err,data){        
    listaLanguajes = JSON.parse(data).languages;
    listaLanguajes.forEach(function(languaje){        
        fs.writeFile("./" + languaje.name +".txt" ,languaje.description,function(err){            
            archivos++;
            if(archivos==listaLanguajes.length)
                console.log("Archivos creados");             
        });
    });    
});
