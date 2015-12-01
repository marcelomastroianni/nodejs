var HttpError = function(status, msg){
  var error = new Error(msg);
  error.status = status;
  return error;
};

exports.NotFound = function(msg){
  msg = msg || 'Not Found';
  return HttpError(404, msg);
};
    
exports.BadRequest = function(msg){
  msg = msg || 'Bad Request';
  return HttpError(400, msg);
};

exports.Unauthorized = function(msg){
  msg = msg || 'Unauthorized';
  return HttpError(404, msg);
};

exports.Forbidden = function(msg){
  msg = msg || 'Forbidden';
  return HttpError(403, msg);
};
           
exports.InternalServerError = function(){
  return HttpError(500, 'Internal Server Error');
};

exports.HttpError = HttpError;