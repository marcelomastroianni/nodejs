var mongoose = require('mongoose');


//No es necesario definir el nombre de la conexion
//Cuando creo el Schema se va a crear la collecion con el nombre del Schema
//El modelo se basa en el Schema
//El modelo es un contructor de un objeto de un tipo de un Schema particular
//Un objeto es una instancia del modelo, que tambien tiene metodos CRUD del objeto, y no de todo el modelo.

//La parte de la conexion se maneja en segundo plano, yo defino el schema y mongoose se va a encargar de la conexion y ejecutar los 
//comandos correspondientes.

//va a necesitar una definicion de las properties que va a tener nuestra colleccion.
var userSchema = new mongoose.Schema({
   
    /*
    lo que le estoy pasando es el constructor nativo de Javascript
    firstName: String,
    */
    firstName : {
       type: String,
       require: true
    },
    lastName : {
       type: String,
       require: true
    },
    userName : {
       type: String,
       require: true
    },
    /*
    Se comporta como un id, si inserto un email que ya fue ingresado va a explotar.
    Y tambien crea un indice para el campo email.
    Esto por tener la propiedad unique en true.
    */
    email : {
       type: String,
       unique: true,
       require: true
    },
    createdOn : {
       type: Date,
       default: Date.now
    }
    
    
});

//Ahora que tengo el Schema puedo crear el modelo.

//Esto lo que me devuelve es un constructor de User
//Tiene metodos estaticos.
//El schema no lo uso mas en ningun lado

//exports = mongoose.model('User',userSchema);


/*
exports apuntaba a:

module = {
    exports: ,
    otras variables : 
}

exports = module.exports

Si yo lo que quiero es exportar un objeto que tenga muchos metodos lo que hago es,

exports.User = mongoose.model('User',userSchema);

pero en este caso agregamos un nivel mas que no es necesario.

module.exports
*/

module.exports = mongoose.model('User',userSchema);
