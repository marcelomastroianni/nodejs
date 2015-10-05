/*
Mostrar en los nombres de las empresas 
cuyos usuarios se encuentran en el room 34
*/

var fs = require('fs');
//var listaArchivos = ['uno.json','dos.json','tres.json'];


fs.readFile('rooms.json','utf8',function(err,data){
    //data = string
    rooms = JSON.parse(data);
    rooms.forEach(function(room){
    if(room.id==34)
    {

        room.usuarios.forEach(function(usuarioRoom){

        fs.readFile('users.json','utf8',function(err,data)
        {        
            //data = string
            usuarios = JSON.parse(data);

            usuarios.forEach(function(usuario){
                //usuario.company
                if(usuarioRoom==usuario.id)
                {


                    fs.readFile('companies.json','utf8',function(err,data)
                    {        
                        //data = string
                        companies = JSON.parse(data);

                        companies.forEach(function(company){
                            if (company.id == usuario.company)
                            {
                                console.log(company.name);
                            }              
                        }
                        );


                    });
                }



            });







        });


        });            
    }        
    });


    
 

});
    

