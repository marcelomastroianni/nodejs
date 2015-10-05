/*******************
*
*CALLBACK PATTERN
*
*Continuation Passing Style (Asincrónico)
*
********************/

function add(a, b, callback){
    setTimeout(function(){
        callback(a + b);
    }, 100);
}

console.log("Antes");
add(10,10, function(r){
    console.log(r);
});
console.log("Despues");
