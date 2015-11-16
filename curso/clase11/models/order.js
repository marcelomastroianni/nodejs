var mongoose = require('mongoose');

var userDataSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  userName : String,
  email: String
});

var orderItemSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : String,
  price: String,
});

var orderSchema = new mongoose.Schema({
    user: userDataSchema,
    items: [orderItemSchema]
});

module.exports = mongoose.model('Order', orderSchema);
