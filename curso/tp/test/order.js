var expect = require('chai').expect;
var userModel = require('../lib/models/db').User;
var productModel = require('../lib/models/db').Product;
var orderModel = require('../lib/models/db').Order;
var request  = require('superagent');
var server = require('../index'); //Ya por incluir este modulo estamos levantando el servidor.
var mongo = require("mongodb");

describe("Order API", function(){
    
    var orderData = {
        user : {
          _id : new mongo.ObjectID("566e144ed47998d20e000145"),
          userName : "Juan",
          email: "Juan@mail.com"
        },
        items : [{_id : new mongo.ObjectID("566e144ed47998d20e0001f9"),
                  name : "Detergente A",
                  price: "12"}
        ],
    };
    var orderItemData = {_id : new mongo.ObjectID("566e144ed47998d20e000127"),
                  name : "Detergente B",
                  pricet: "12"};
    
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
                done();
            })
   });
    
    it("should get order list when user logged" ,function(done){
       request.get('http://localhost:3000/orders/')
            .send()
            .set('Authorization','JWT ' + token)           
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
   });
    
    it("should add an order " ,function(done){
       request.post('http://localhost:3000/orders/')
            .send(orderData)
            .set('Authorization','JWT ' + token)  
            .end(function(err,res){               
                expect(res.status).to.be.equal(200);
                expect(res.body.user.userName).to.be.equal(orderData.user.userName);               
                orderData._id = res.body._id;           
                orderData.items[0]._id = res.body.items[0]._id;           
                done();
            })
   });
    
    it("should get an order " ,function(done){
       request.get('http://localhost:3000/orders/' + orderData._id)
            .send()
            .set('Authorization','JWT ' + token)   
            .end(function(err,res){     
                expect(res.status).to.be.equal(200);
                expect(res.body.user.userName).to.be.equal(orderData.user.userName);
                expect(res.body._id).to.be.equal(orderData._id);                                
                done();
            })
    });
    
    
    it("should update an order " ,function(done){
            var nameNewValue ="Juan 2";
            orderData.user.userName = nameNewValue;
            request.put('http://localhost:3000/orders/' + orderData._id)
                .send(orderData)
                .set('Authorization','JWT ' + token)
                //.set('Accept','application/json')
                .end(function(err,res){
                    expect(res.status).to.be.equal(200);
                    orderModel.findById(orderData._id, function(err, order){
                        if (err) throw err;
                        expect(order.user.userName).to.be.equal(nameNewValue);
                        done();                    
                    });                                
            })
   });
    
    it("should add items to an order " ,function(done){
       request.post('http://localhost:3000/orders/' + orderData._id + '/items/')
            .send(orderItemData)
            .set('Authorization','JWT ' + token)
            .end(function(err,res){               
                expect(res.status).to.be.equal(200);                           
                expect(res.body.items.length).to.be.equal(2);        
                //orderData._id = res.body._id;
                done();
            })
   });
    
      
     it("should delete an item to order " ,function(done){
       request.del('http://localhost:3000/orders/' + orderData._id + '/items/' + orderData.items[0]._id )
            .send()
            .set('Authorization','JWT ' + token)
            //.set('Accept','application/json')
            .end(function(err,res){                      
                expect(res.status).to.be.equal(200);        
                orderModel.findById(orderData._id, function(err, order){
                    if (err) throw err;                    
                    expect(order.items.length).to.be.equal(1);                    
                    done();                    
                });                                
            })
   });
        
    it("should delete an order " ,function(done){
       request.del('http://localhost:3000/orders/' + orderData._id)
            .send()
            .set('Authorization','JWT ' + token)
            //.set('Accept','application/json')
            .end(function(err,res){
                      
                expect(res.status).to.be.equal(200);
        
                orderModel.findById(orderData._id, function(err, order){
                    if (err) throw err;
                    expect(order).to.be.null;
                    done();                    
                });                                
            })
   });
    
    after(function(done){
        userModel.remove({userName: adminData.userName},function(err,data){
            if(err) throw err;
             //console.log("Deleted user " + adminData.userName);                        
              done();            
        });
    });
    
});



