var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var jwt = require('jsonwebtoken');


var opts = {};

exports.configure = function(secretPhrase, UserModel){
  opts.secretOrKey = secretPhrase;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done){
    UserModel.findOne( { _id : jwt_payload.sub }, function(err, user){
      if(err){
        return done(err, false);
      }
      if(user){
        return done(null, user);
      }
      done(null, false);
    });
  }));
  return passport.initialize();
};

exports.getToken = function(data, expires){
  return jwt .sign(
    data,
    opts.secretOrKey,
    { expiresIn: expires }
  );
};

exports.authenticate = function(){
  return passport.authenticate('jwt', { session : false });  
};









































