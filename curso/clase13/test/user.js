var expect = require('chai').expect;
var userModel = require('../lib/models/db').User;
var request  = require('superagent');
var server = require('../index'); //Ya por incluir este modulo estamos levantando el servidor.
/*
    var server = app.listen(3000, function(){
      console.log('Server running at http://localhost:' + server.address().port);
    });

*/




describe("User API", function(){
    
    
    var userData = {
        firstName : "User",
        lastName : "One",
        userName : "userone",
        password : "userone",
        email : "userone@mail.com"                
    };
    
    var adminData = {
        firstName : "Admin",
        lastName : "Admin",
        userName : "admin",
        password : "admin",
        email : "admin@mail.com"   
        
    };
    
   it("should works..." ,function(){
       expect(1).to.be.equal(1);
   });
    
    //Si nuestro codigo es asincronico le tenemos que avisar a mocha que termino.

    before(function(done){
        var user = new userModel(adminData);
        user.save(function(err,data){
            //Si hay un error lo lanzamos, porque mocha esta a la espera de errores para mostrarlos por consola.
            if(err) throw err;
            console.log("Created user " + adminData.userName);
            done();             


        });
    });

    //El usuario que insertamos deberiamos borrarlo.
    //De esta forma vamos a poder correr muchas veces nuestros test
    after(function(done){
        userModel.remove({userName: adminData.userName},function(err,data){
            if(err) throw err;
            console.log("Deleted user " + adminData.userName);
            done();           
        });

    });
    
     it("should return a token in a succesfull login" ,function(done){
       request.post('http://localhost:3000/users/login')
            .send({
                userName:adminData.userName,
                password:adminData.password
            })
            .end(function(err,res){
                expect(res.body.token).to.be.ok;//Es algo que es evaluable como true: existe, es distinto de vacio, es distinto de null
                token = res.body.token;
                done();
            })
   });
    
       it("should return a 404 when login fails" ,function(done){
       request.post('http://localhost:3000/users/login')
            .send({
                userName: 'wrongUser',
                password: 'wrongPassword'
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(404);
                done();
            })
   });
    
});



