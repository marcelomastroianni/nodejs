

mongoimport --db test --collection products --file products.json



db.products.find({});


trae todos los productos con el campo desc numerico superior a 10,
trae solo el campo name de cada documento.
db.products.find({desc: {$gte : 10}},{name: 1});
