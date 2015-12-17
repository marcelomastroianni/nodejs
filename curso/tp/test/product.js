var expect = require('chai').expect;
var userModel = require('../lib/models/db').User;
var productModel = require('../lib/models/db').Product;

var request  = require('superagent');
var server = require('../index'); //Ya por incluir este modulo estamos levantando el servidor.




describe("Product API", function(){
    
  
    
    var productData = {
        name : "Detergente B",
        price : "12",
        desc : "5",
        category : "Limpieza",        
    };
    
    var adminData = {
        firstName : "Admin",
        lastName : "Admin",
        userName : "admin",
        password : "admin",
        email : "admin@mail.com"   
        
    };
   

     before(function(done){
        var user = new userModel(adminData);
        user.save(function(err,data){
            //Si hay un error lo lanzamos, porque mocha esta a la espera de errores para mostrarlos por consola.
            if(err) throw err;
            //console.log("Created user " + adminData.userName);
            done();             


        });
    });

    it("should login succesfully " ,function(done){
       request.post('http://localhost:3000/users/login')
            .send({
                userName:adminData.userName,
                password:adminData.password
            })
            .end(function(err,res){
                expect(res.body.token).to.be.ok;//Es algo que es evaluable como true: existe, es distinto de vacio, es distinto de null
                token = res.body.token;
                //console.log(token);
                done();
            })
   });
    
    
    it("should get product list when user logged" ,function(done){
       request.get('http://localhost:3000/products/')
            .send()
            .set('Authorization','JWT ' + token)
            //.set('Accept','application/json')
            .end(function(err,res){
                //console.log(err);
                expect(res.status).to.be.equal(200);
                done();
            })
   });
    
    
     it("should add a product " ,function(done){
       request.post('http://localhost:3000/products/')
            .send(productData)
            .set('Authorization','JWT ' + token)
            //.set('Accept','application/json')
            .end(function(err,res){
                //console.log(err);
                //console.log(res);
                //console.log(err);           
                expect(res.status).to.be.equal(200);
                expect(res.body.name).to.be.equal(productData.name);
                productData._id = res.body._id;
                done();
            })
   });
    
    
     it("should get a product " ,function(done){
       request.get('http://localhost:3000/products/' + productData._id)
            .send()
            .set('Authorization','JWT ' + token)
            //.set('Accept','application/json')
            .end(function(err,res){
                //console.log(err);
                //console.log(res);
                //console.log(err);           
                expect(res.status).to.be.equal(200);
                expect(res.body.name).to.be.equal(productData.name);
                expect(res.body._id).to.be.equal(productData._id);
                
                done();
            })
   });
    
    
    
    it("should update a product " ,function(done){
            var nameNewValue ="Detergente H";
            productData.name = nameNewValue;
         
            request.put('http://localhost:3000/products/' + productData._id)
                .send(productData)
                .set('Authorization','JWT ' + token)
                //.set('Accept','application/json')
                .end(function(err,res){

                    expect(res.status).to.be.equal(200);

                    productModel.findById(productData._id, function(err, product){
                        if (err) throw err;
                        expect(product.name).to.be.equal(nameNewValue);
                        done();                    
                    });                                
            })
   });
    
    
    
      it("should delete a product " ,function(done){
       request.del('http://localhost:3000/products/' + productData._id)
            .send()
            .set('Authorization','JWT ' + token)
            //.set('Accept','application/json')
            .end(function(err,res){
                      
                expect(res.status).to.be.equal(200);
        
                productModel.findById(productData._id, function(err, product){
                    if (err) throw err;
                    expect(product).to.be.null;
                    done();
                    
                });
                
                
            })
   });
    
    
    
    after(function(done){
        userModel.remove({userName: adminData.userName},function(err,data){
            if(err) throw err;
            //console.log("Deleted user " + adminData.userName);
            
            /*
            userModel.remove({userName: userData.userName},function(err,data){
                if(err) throw err;
                console.log("Deleted user " + userData.userName);
                done();
            });
            */
            
              done();
            
        });

    });
    

    
    
});



