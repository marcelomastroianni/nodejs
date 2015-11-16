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
      required: true
    },
    email: { 
      type: String, 
      required: true
    },
    createdOn: { 
      type: Date, 
      default: Date.now 
    },
    password: { 
      type: String, 
      required: true
    }
});


//me deja poner distintos handlers para distintos enventos del ciclo de vida de moongoze
//antes del save:
//next es lo que sigue del save
userSchema.pre('save',function(next){
    
    //el modelo seria la instancia del schema
    var user = this;
    
    //isNew existe en el caso de que this sea un nuevo obejto que todavia no fue cargado en la base
    //isModified se aplica a una campo del objeto
    if (this.isModified('password') || this.isNew){
        
        bcrypt.genSalt(10,function(err,salt){
            if(err){
                return next(err);
            }
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err){
                    return next(err);
                }
                user.password = hash;
                return next();
            });
        });
    }else{
        return next();
    }
    
});


userSchema.methods.comparePassword = function(psw,cb){
    bcrypt.compare(psw,this.password, function(err,isMatch){
        if(err){
            return cb(err);
        }
        cb(null,isMatch);
    }
    );
};

/* La forma de usarlo seria la siguiente.
user.comparePassword('qww123',function(err,isMatch){
        
});
*/
                   
module.exports = mongoose.model( 'User', userSchema );
