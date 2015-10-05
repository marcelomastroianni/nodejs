/*******************
*
*CALLBACK PATTERN
*
*Non Continuation Passing Style
*
* Ejemplo de una función (metodo map) que utiliza callbacks
* sin usar CPS (el resultado de la operación se retorna usando return
* directamente, en lugar de llamar al callback con el resultado. El callback
* se usa para obtener el nuevo valor de cada uno de los indices del nuevo array)
*
********************/

var r = [1,2,3].map(function(item){
    return item*3;
});

console.log(r);
