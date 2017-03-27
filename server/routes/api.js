var express = require('express');
var app = express();
var router = express.Router();
var passport = require('passport');
var ObjectId = require('mongodb').ObjectID;
var Invoice = require('../models/invoice.js');
var User = require('../models/user.js');


function isLoggedin(req, res, next){
  if(req.user && req.user.role =='user'){
    next();
  }
  else{
    res.redirect('login');
  }
}

router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username, role:'user' }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!',
        role:req.user.role
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true,
    role:req.user.role
  });
});


router.get('/invoices/:invoice_no',isLoggedin, function(req,res){
  Invoice.find({_id:ObjectId(req.params.invoice_no),username:req.user.username},function(err, docs){
    console.log(docs);
    res.json(docs);
  })
})


router.get('/invoices_user',isLoggedin, function(req,res){
  Invoice.find({username:req.user.username},function(err, docs){
    console.log(docs);
    res.json(docs);
  })
})



router.post('/invoices',isLoggedin, function(req,res){
  console.log(req.body);

  var invoice = new Invoice({item:req.body.name, category: req.body.category, amount: req.body.amount, description:req.body.description, type:req.body.type, username:req.user.username, status:'Placed', date: new Date()});
  invoice.save(function(err,docs){
    if(!err){
      res.status(200).json({
          status: 'Invoice Created',
          invoice_no:docs._id
      });
    }
    else{
      res.status(400).json({
        status: 'Cannot create invoice'
      });
    }
  })

})


module.exports = router;