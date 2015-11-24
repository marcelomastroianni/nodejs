var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    firstName: { 
      type: String, 
      required: true
    },
  
    lastName: { 
      type: String, 
      required: true
    },
  
    userName : { 
      type: String, 
      //unique: true,
      required: true
    },
  
    password : { 
      type: String, 
      required: true
    },
  
    email: { 
      type: String, 
      //unique: true,
      required: true
    },
  
    createdOn: { 
      type: Date, 
      default: Date.now 
    }
});

userSchema.pre('save', function(next){
  var user = this;
  if (this.isModified('password') || this.isNew ) {
    bcrypt.genSalt(10, function (err, salt){
      if(err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash){
        if(err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  }else{
    return next();
  }
});

userSchema.methods.comparePassword = function(psw, cb){
  bcrypt.compare(psw, this.password, function(err, isMatch) {
    if(err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model( 'User', userSchema );