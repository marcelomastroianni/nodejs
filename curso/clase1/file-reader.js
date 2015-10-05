var fs = require('fs');

var cache = {};

function readerI(filename, callback){
    if(cache[filename]){
        //sincrónico
        callback(cache[filename]);
    }else{
        //asincrónico
        fs.readFile(filename, 'utf8', function(err, data){
            cache[filename] = data;
            callback(data);
        });
    }
}

function createFileReader(filename){

    var listeners = [];

    readerI(filename, function(data){
        listeners.forEach(function(listener){
            listener(data);
        });
    });
    
    return {
        onDataReady: function(listener){
            listeners.push(listener);
        }
    }
}

var reader1 = createFileReader('data.txt');

reader1.onDataReady(function(data){
    console.log("LISTENER 1 (reader1): " + data);
    
    var reader2 = createFileReader('data.txt');
    reader2.onDataReady(function(data){
        console.log("LISTENER 1 (reader2): " + data);
    });
});
