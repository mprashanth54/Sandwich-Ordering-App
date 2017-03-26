// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Item = new Schema({
  name: {
  	type:String,
  	unique:true
  },
  amount:Number,
  category : String,
  description:String,
  type: String,
  date: String
});

module.exports = mongoose.model('items', Item);