var con = require('./connection');
var DB_COLLECTION = 'users';

exports.create = function(data, callback){
  con.connect(function(err, db){
    var collection = db.collection(DB_COLLECTION);
    collection.insertOne(data, function(err, result){
      console.log(result);
      callback(null, result);
    });
  });
};

exports.update = function(data, callback){
  data._id = con.ObjectID(data._id);
  con.connect(function(err, db){
    var collection = db.collection(DB_COLLECTION);
    collection.updateOne({ _id : data._id }, data, function(err, result){
      console.log(result);
      callback(null, result);
    });
  });
};

exports.delete = function(id, callback){
  var oid = con.ObjectID(id);
  con.connect(function(err, db){
    db.collection(DB_COLLECTION)
    .deleteOne({ _id : oid }, function(err, result){
      console.log(result);
      callback(null, result);
    });
  });
};

exports.list = function(callback){
  con.connect(function(err, db){
    db.collection(DB_COLLECTION)
    .find({}).toArray(function(err, result){
      console.log(result);
      callback(null, result);
    });
  });
};

exports.get = function(id, callback){
  var oid = con.ObjectID(id);
  con.connect(function(err, db){
    db.collection(DB_COLLECTION)
    .findOne({ _id : oid }, function(err, result){
      console.log(result);
      callback(null, result);
    });
  });
};
