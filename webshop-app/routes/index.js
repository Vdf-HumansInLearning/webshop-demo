const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Webstore - Find your mobile',
    css: 'stylesheets/home-style.css',
    navHtml: '',
    admin: res.locals.admin,
    logged_in: res.locals.loggedIn,
    user: res.locals.user
  });
});

module.exports = router;
