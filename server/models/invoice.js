// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Invoice = new Schema({
  item:String,
  amount:Number,
  category : String,
  description:String,
  type: String,
  date: String,
  username:String,
  status:String
});

module.exports = mongoose.model('invoice', Invoice);