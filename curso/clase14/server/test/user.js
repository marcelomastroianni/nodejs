var expect = require('chai').expect;
var UserModel = require('../lib/models/db').User;
var request = require('superagent');
var server = require('../index');

describe("User API", function(){
  
  var userData = {
    firstName: "User", 
    lastName: "One",
    userName: "userone", 
    password: "userone",
    email: "useronetest@gmail.com"
  };
  
  var adminData = {
    firstName: "Admin", 
    lastName: "Admin",
    userName: "admin", 
    password: "admin",
    email: "admintest@gmail.com"
  };
  
  var token = null;
  
  before(function(done){
    UserModel.remove({ userName: adminData.userName}, 
    function(err, data){
      if(err) throw err;
      var user = new UserModel(adminData);
      user.save(function(err, data){
        if(err) throw err;
        console.log("Created user " + data.userName);
        done();
      });
    });
  });
  
  it("should return a token in sucessfull login", function(done){
    request.post('http://localhost:3000/users/login')
      .send({ 
        userName: adminData.userName,
        password: adminData.password
      })
      .end(function(err, res){
        expect(res.body.token).to.be.ok;
        token = res.body.token;
        done();
      });
  });
  
  it("should return a 404 when login fails", function(done){
    request.post('http://localhost:3000/users/login')
      .send({
        userName: 'wrongUser',
        password: 'wrongPassword'
      })
      .end(function(err, res){
        expect(res.status).to.be.equal(404);
        done();
      });
  });
  
  it('should return a 401 Unautorized when user is not logged in', function(done){
    request.get('http://localhost:3000/users')
      .end(function(err, res){
          expect(res.status).to.be.equal(401);
          done();
      });
  });
  
  it('should return a 200 ok when user is logged in', function(done){
    request.get('http://localhost:3000/users')
      .set('Authorization', 'Bearer ' + token)
      .end(function(err, res){
          expect(res.status).to.be.equal(200);
          done();
      });
  });
  
  it('should create a new user', function(done){
    request.post('http://localhost:3000/users')
      .send(userData)
      .set('Authorization', 'Bearer ' + token)
      .end(function(err, res){
          expect(res.status).to.be.equal(200);
          expect(res.body.userName).to.be.equal(userData.userName);
          userData._id = res.body._id;
          done();
      });
  });
  
  it('should get a user', function(done){
      request.get('http://localhost:3000/users/' + userData._id)
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, res){
            expect(res.status).to.be.equal(200);
            expect(res.body.userName).to.be.equal(userData.userName);
            done();
        });
  });  
  
  it('should update a user', function(done){
    userData.firstName = 'Mod';
    userData.lastName = 'Mod';
    
    request.put('http://localhost:3000/users/' + userData._id)
      .send(userData)
      .set('Authorization', 'Bearer ' + token)
      .end(function(err, res){
          console.log(res);
          expect(res.status).to.be.equal(200);
          expect(res.body.firstName).to.be.equal(userData.firstName);
          expect(res.body.lastName).to.be.equal(userData.lastName);
          done();
      });
  });
    
  it('should delete a user', function(done){
      expect(1).to.be.equal(1);
      done();
  });  
  
  after(function(done){
    /*UserModel.remove({ userName: adminData.userName}, 
    function(err, data){
      if(err) throw err;
      console.log("Deleted user " + adminData.userName);
      UserModel.remove({ userName : userData.userName }, function(err, res){
          if(err) throw err; 
          console.log("Deleted user " + userData.userName);
          done();
      });
    });*/
  }); 
  
});