/*
Imprimir en consola el resultado de concatenar el campo
txt de cada uno de los archivos .json en orden
*/
var fs = require('fs');
var async = require('async');

var listaArchivos = ['uno.json','dos.json','tres.json','cuatro.json'];

var iterator = function(file,callback){
    fs.readFile(file,'utf8',function(err,data){
        if(err){
            callback(err);
        }
        jsonData = JSON.parse(data);
        var txt = jsonData.txt;
        callback(null,txt);
    });
};

async.map(listaArchivos,iterator,function(err,results){
    console.log(results.join(" "));
});




/*

    fs.readFile('uno.json','utf8',function(err,data)
    {
        //data = string
        jsonData = JSON.parse(data);
        var txt1 = jsonData.txt;
        
        fs.readFile('dos.json','utf8',function(err,data)
        {
            //data = string
            jsonData = JSON.parse(data);
            var txt2 = jsonData.txt;
            
            fs.readFile('tres.json','utf8',function(err,data)
            {
                //data = string
                jsonData = JSON.parse(data);
                var txt3 = jsonData.txt;
                
                
                fs.readFile('cuatro.json','utf8',function(err,data)
                {        
                    //data = string
                    jsonData = JSON.parse(data);
                    var txt4 = jsonData.txt;


                    console.log(txt1 +' ' + txt2 + ' ' + txt3 + ' ' + txt4); 
                });
            });
            
        });

    });
    




*/
