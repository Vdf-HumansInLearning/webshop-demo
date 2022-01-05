const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {

  res.render('profile', {
    title: 'Webstore - Profile',
    css: 'stylesheets/profile-style.css',
    navHtml: '',
    admin: res.locals.admin,
    logged_in: res.locals.loggedIn,
    user: res.locals.user
  });

});

router.get('/edit', function (req, res, next) {
  res.render('edit_profile', {
    title: 'Edit Profile',
    css: 'stylesheets/profile-style.css',
    navHtml: '',
    admin: res.locals.admin,
    logged_in: res.locals.loggedIn,
    user: res.locals.user
  });

});

module.exports = router;