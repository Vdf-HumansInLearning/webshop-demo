const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('cart', {
    title: 'Webstore Shopping Cart',
    css: 'stylesheets/cart-style.css',
    navHtml: '',
    admin: res.locals.admin,
    logged_in: res.locals.loggedIn,
    user: res.locals.user
  });
});

module.exports = router;