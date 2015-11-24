var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name : String,
    price: String,
    desc: Number,
    category : [String],
    createdOn: { 
      type: Date, 
      default: Date.now 
    }
});

module.exports = mongoose.model('Product', productSchema);