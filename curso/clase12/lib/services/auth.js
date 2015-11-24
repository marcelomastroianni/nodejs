var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var jwt = require('jsonwebtoken');

var opts = {};


//Se va a llamar desde index.js, donde ya voy a tener cargada la base de datos

//La misma funcion configura el passport, y devuelve un middleware para que lo usemos desde index.js
exports.configure = function(secretPhrase,UserModel){
    opts.secretOrKey = secretPhrase;    
    
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
      User.findOne( { _id : jwt_payload.sub }, function(err, user){
        if(err){
          return done(err, false);
        }
        if(user){
          return done(null, user);
        }
        done(null, false);
      });
    }));
    
    
    return passport.initialize();// devuelve un middleware
};


exports.getToken = function(data,expires){
     return jwt .sign(
        data,         
        opts.secretOrKey,
        {
          expiresIn : expires//'2m'
        }
      );     
}


//mi funcion authenticate devuelve el mismo middleware
exports.authenticate = function (){
    return passport.authenticate('jwt', { session : false });//toma una configuracion y devuelve un middleware
}
