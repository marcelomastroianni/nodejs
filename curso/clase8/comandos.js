
db.users.insert({ nombre : "Un usuario", email : "ususuario@gmail.com", telefonos : ["35345","345345"] } );


db.users.find();






db.users.find({"email":"ususuario@gmail.com"});




> db.users.find();
{ "_id" : ObjectId("559406b344b04a518bd9a9a6"), "name" : "test" }

> db.users.find();
{ "_id" : ObjectId("559406b344b04a518bd9a9a6"), "name" : "test" }

> db.users.insert({ nombre : "Un usuario", email : "ususuario@gmail.com", telefonos : ["35345","345345"] } );

> db.users.find();
{ "_id" : ObjectId("559406b344b04a518bd9a9a6"), "name" : "test" }
{ "_id" : ObjectId("562f1cd8edac4a8a30a2c5f7"), "nombre" : "Un usuario", "email" : "ususuario@gmail.com", "telefonos" : [  "35345",  "345345" ] }

> db.users.find({email:"gma"});
> db.users.find({email:"usuario1@gmail.com"});
> db.users.find({email:"ususuario1@gmail.com"});


> db.users.find();
{ "_id" : ObjectId("559406b344b04a518bd9a9a6"), "name" : "test" }
{ "_id" : ObjectId("562f1cd8edac4a8a30a2c5f7"), "nombre" : "Un usuario", "email" : "ususuario@gmail.com", "telefonos" : [  "35345",  "345345" ] }

> db.users.find({"email":"ususuario1@gmail.com"});


> db.users.find({"email":"ususuario@gmail.com"});
{ "_id" : ObjectId("562f1cd8edac4a8a30a2c5f7"), "nombre" : "Un usuario", "email" : "ususuario@gmail.com", "telefonos" : [  "35345",  "345345" ] }


> db.users.find({"email":"ususuario@gmail.com"});
{ "_id" : ObjectId("562f1cd8edac4a8a30a2c5f7"), "nombre" : "Un usuario", "email" : "ususuario@gmail.com", "telefonos" : [  "35345",  "345345" ] }


> db.users.find({"email":"ususuario@gmail.com"},{nombre:1});
{ "_id" : ObjectId("562f1cd8edac4a8a30a2c5f7"), "nombre" : "Un usuario" }


> db.users.find({"email":"ususuario@gmail.com"},{nombre:1});
{ "_id" : ObjectId("562f1cd8edac4a8a30a2c5f7"), "nombre" : "Un usuario" }


> db.users.find({"email":"ususuario@gmail.com"},{nombre:1,_id:-1});
{ "_id" : ObjectId("562f1cd8edac4a8a30a2c5f7"), "nombre" : "Un usuario" }


> db.users.find({"email":"ususuario@gmail.com"},{nombre:1,_id:-1});
{ "_id" : ObjectId("562f1cd8edac4a8a30a2c5f7"), "nombre" : "Un usuario" }


> db.users.find({"email":"ususuario@gmail.com"},{nombre:1,_id:0});
{ "nombre" : "Un usuario" }
