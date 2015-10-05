var util = require('util');

function Persona(name){    
    this.name = name;    
    
    /*this.saludar = function(){
    console.log('Hola, soy ', this.name);            
    }*/ 
}


Persona.prototype.saludar = function(){
    console.log('Hola, soy ', this.name);            
} 



function Cliente(name,id){    
    Persona.call(this,name);//new Persona(name);
    this.id = id;
}



util.inherits(Cliente,Persona);

Cliente.prototype.mostrarID = function()
{
    console.log("Mi ID es ", this.id);
}

var persona = new Persona('Juan');
persona.saludar();


var cliente = new Cliente('Pedro',44);
cliente.saludar();
cliente.mostrarID();
