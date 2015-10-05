/*******************
*
*CALLBACK PATTERN
*
*Continuation Passing Style (Sincrónico)
*
********************/

function add(a, b, callback){
    callback(a + b);
}

console.log("Antes");
add(10,10, function(r){
    console.log(r);
});
console.log("Despues");
