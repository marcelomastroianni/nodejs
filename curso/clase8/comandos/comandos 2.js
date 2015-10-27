

mongoimport --db test --collection products --file products.json



db.products.find({});


//trae todos los productos con el campo desc numerico superior a 10,
//trae solo el campo name de cada documento.
db.products.find({desc: {$gte : 10}},{name: 1});



//----------------------
//En SQL:
UPDATE users SET age = 33 WHERE name ='Bob' 
//----------------------



//----------------------
//En MongoDB:
//----------------------

//el primer selector es la query. que queres actualizar.
//el segundo parametro es lo que quiero modificar.
//en este caso setear la edad a 33.
//el tercer parametro es opcional  y hace que los cambios sean masivos a todos los registros
//q matcheen con el selector del primer parametro.

db.users.update({name: "Bob"}, {$set:{age: 33}}, {multi: true})

//Cuenta la cantidad de productos cuyo descuento es mayor o igual a 10

db.products.find({desc: {$gte: 10}}).count()





