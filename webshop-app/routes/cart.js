var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let admin = false;
  let loggedIn = false;
  if(req.cookies.user_role === "admin"){
    admin = true;
  }
  if(req.cookies.user_role && req.cookies.user_id){
    loggedIn = true;
  }
  res.render('cart', { 
    title: 'Cart',
    css: 'stylesheets/cart-style.css',
    navHtml: '',
    logged_in : loggedIn,
    admin : admin
  });
});

module.exports = router;