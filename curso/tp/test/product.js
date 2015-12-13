var expect = require('chai').expect;
//var userModel = require('../lib/models/db').User;
var request  = require('superagent');
//var server = require('../index'); //Ya por incluir este modulo estamos levantando el servidor.




describe("Product API", function(){
    
  
   it("should works..." ,function(){
       expect(1).to.be.equal(1);
   });
   

    
    it("should  return 200 when consult product list" ,function(done){
       request.get('http://localhost:3000/products/')
            .send()
            //.set('Authorization','JWT ' + token)
            //.set('Accept','application/json')
            .end(function(err,res){
                //console.log(err);
                expect(res.status).to.be.equal(200);
                done();
            })
   });
    
    
    
     it("should  return a product list whene request it" ,function(done){
       request.get('http://localhost:3000/products/')
            .send()
            //.set('Authorization','JWT ' + token)
            //.set('Accept','application/json')
            .end(function(err,res){
                console.log(res);
                expect(res.status).to.be.equal(200);
                done();
            })
   });
    
    
});



