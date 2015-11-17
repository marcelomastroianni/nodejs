var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var User = require('../models/db').User;


var opts = {};

opts.secretOrKey = 'Secret Phrase';

passport.use(new JwtStrategy(opts, function(jwt_payload, done){
  User.findOne({_id : jwt_payload.sub},function(err,user){
      if(err){
          return done(err,false);
      }
      if(user){
          done(null,user);
      } else{
            return done(null,false); //No hay error, pero tampoco hay usuario, y la libreria se encarga de lo que tenga que hacer
      }
  });  
    
}));
