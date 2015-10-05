console.log("------Ejemplo uso forEach-----------");

var lista = [1,2,3,4,5,6,7,8,9];

lista.forEach(function(item){
    console.log(item);
    
});

console.log("------Ejemplo uso map-----------");

//Devuelve una lista con la misma cantidad de elementos que la lista,
//pero en cada posicion va el valor de retorno de haber aplicado
//la funcion que le paso como parametro a map

//En el siguiente ejemplo multiplica por 2 a cada uno de los elementos
//de la lista.
var lista2 = lista.map(function(item){
    return item * 2;    
});

console.log(lista2);

console.log("-------Ejemplo uso filter----------");

//la funcion que le pasamos a filter debe devolver un booleano
//y ese booleano lo que indica es si el lemento de esa posicion
//va a estar en el array final.
//Por ejemplo si queremos devolver en la nueva lista los elementos
//que son menores a 5 debemos hacer.
var lista3 = lista.filter(function(item){
    return item <5;    
});



console.log(lista3);

console.log("-------Ejemplo map y filter  ----------");

//Menores a 5 multiplicados por 2
var lista4 = lista
        .filter(function(item){
            return item <5;    
        })
        .map(function(item){
            return item * 2;    
        });

console.log(lista4);

console.log("-------Ejemplo reduce ----------");
//Reduce es una transformacion que puede no devolver la misma
//cantidad de elementos
//Por ejemplo reduce puede devolver un promedio o una sumatoria

var res = lista.reduce(function(suma,item){
    return suma + item;
    
},0);

console.log(res);


console.log("-------Ejemplo reduce 2 ----------");

var suma2 = lista.reduce(function(suma,item){
    suma.suma = suma.suma + item;
    return suma;
    
},{suma:0});

console.log(suma2);
