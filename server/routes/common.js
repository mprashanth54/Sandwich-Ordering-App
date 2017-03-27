var express = require('express');
var router = express.Router();
var passport = require('passport');
var ObjectId = require('mongodb').ObjectID;
var Category = require('../models/category.js');
var Item = require('../models/item.js');

function isLoggedin(req, res, next){
	if(req.user){
		next();
	}
	else{
		res.redirect('login');
	}
}


router.get('/category',isLoggedin, function(req,res){
	Category.find({},function(err, docs){
		res.json(docs);
	})
})


router.get('/items',isLoggedin, function(req,res){
	Item.find({},function(err, docs){
		res.json(docs);
	})
})


module.exports = router;