// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Category = new Schema({
  name: {
  	type:String,
  	unique:true
  },
  date: String
});

module.exports = mongoose.model('category', Category);