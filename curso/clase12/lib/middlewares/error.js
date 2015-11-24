exports.clientErrorHandler = function (err,req,res,next) {
 
    console.log('Bad Request');
    
    //Si status no esta definido, o el codigo es 500 no muestro el error, y llamo al siguiente callback de manejo de errores
    if (!err.status || err.status == 500){
        return next(err);
    }
    
    return res.status(err.status).json({
        message: err.message 
        
    });        
}

exports.serverErrorHandler = function (err,req,res,next) {
 
    console.log(err.message || "Internal Server Error");
    
    //Si llegamos hasta aca asumimos que es un error 500, un error interno del servidor.
    
    return res.status(err.status).json({
        message: err.message 
        
    });        
}