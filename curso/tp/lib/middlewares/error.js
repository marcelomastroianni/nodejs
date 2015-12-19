exports.clientErrorHandler = function(err, req, res, next){
  //console.log(err.message);
  if(!err.status || err.status == 500) {
    return next(err);
  }
  return res.status(err.status).json({
    message: err.message
  });
};

exports.serverErrorHandler = function(err, req, res, next){
  var msg = err.message || 'Internal Server Error';
  console.log(msg);
  return res.status(500).json({
    message: msg
  });
};