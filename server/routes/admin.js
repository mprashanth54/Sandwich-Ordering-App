var express = require('express');
var router = express.Router();
var passport = require('passport');
var ObjectId = require('mongodb').ObjectID;
var Category = require('../models/category.js');
var Item = require('../models/item.js');
var Invoice = require('../models/invoice.js');
var User = require('../models/user.js');

function isLoggedin(req, res, next){
	if(req.user && req.user.role =='admin'){
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

router.post('/category',isLoggedin, function(req,res){
	Category.find({name:req.body.name},function(err, docs){
		console.log(docs);
		if(docs.length==0){
			var cat = new Category({name:req.body.name, date: new Date()});
			cat.isNew = true;
			console.log(cat);
			delete cat._id;
			cat.save(function(err){
				if(!err){
					res.status(200).json({
			        	status: 'Category has been added!'
			     	});
				}
				else{
					res.status(400).json({
			        status: 'Cannot Insert Category'
			});
				}
			})
		}
		else{
			console.log("Inside else");
			res.status(400).json({
			        status: 'Cannot Insert Category'
			});
		}
	})
})




router.get('/items',isLoggedin, function(req,res){
	Item.find({},function(err, docs){
		res.json(docs);
	})
})


router.get('/invoices',isLoggedin, function(req,res){
	Invoice.find({},function(err, docs){
		res.json(docs);
	})
})


router.get('/invoices_placed',isLoggedin, function(req,res){
	Invoice.find({status:'Placed'},function(err, docs){
		res.json(docs);
	})
})

router.get('/items_count',isLoggedin, function(req,res){
	Invoice.find({status:'Placed'},function(err, docs){
		console.log(docs);
		res.json({length:docs.length});
	})
})

router.get('/invoices_all',isLoggedin, function(req,res){
	Invoice.find(function(err, docs){
		res.json(docs);
	})
})



router.get('/user_count',isLoggedin, function(req,res){
	User.find({role:'user'},function(err, docs){
		console.log(docs);
		res.json({length:docs.length});
	})
})



router.put('/invoices',isLoggedin, function(req,res){
  var id = req.body.id;
  Invoice.findOne({date:req.body.date},function(err,doc){
  	console.log(doc);
  	doc.status='Completed';
  	doc.save(function(err){
  		if(!err){
	      res.status(200).json({
	          status: 'Invoice Updated'
	      });
	    }
    else{
	      res.status(400).json({
	        status: 'Cannot create invoice'
	      });
	    }
  	});
  })

})



router.post('/items',isLoggedin, function(req,res){
	Category.find({name:req.body.name},function(err, docs){
		console.log(docs);
		if(docs.length==0){
			var item = new Item({name:req.body.name, category: req.body.category, amount: req.body.amount, description:req.body.description, type:req.body.type, date: new Date()});
			item.isNew = true;
			console.log(item);
			item.save(function(err){
				if(!err){
					res.status(200).json({
			        	status: 'Item has been added!'
			     	});
				}
				else{
					res.status(400).json({
			        	status: 'Cannot Insert Item'
					});
				}
			})
		}
		else{
			console.log("Inside else");
			res.status(400).json({
			        status: 'Cannot Insert Item'
			});
		}
	})
})


router.delete('/items/:id',isLoggedin, function(req,res){
	console.log(req.params.id);
	Item.remove({_id: ObjectId(req.params.id)},function(err, docs){
		if(!err){
			res.status(200).json({
				status: 'Item has been added!'
			});
		}
	})
})



module.exports = router;