const express = require('express');
const axios = require('axios').default;
const router = express.Router();

router.get('/', function(req, res, next) {
  let admin = false;
  let loggedIn = false;
  let user = [];
  if(req.cookies.user_role === "admin"){
    admin = true;
  }
  if(req.cookies.user_role && req.cookies.user_id){
    loggedIn = true;
    
    axios.get(`http://localhost:3001/users/${req.cookies.user_id}`)
    .then(function (response) {
      // handle success
      const user = response.data;
      username = user.username;

      res.render('profile', { 
        title: 'Profile',
        css: 'stylesheets/profile-style.css',
        navHtml: '',
        logged_in : loggedIn,
        user : user,
        admin : admin
      });
    })
    .catch(function (error) {
      // handle error
      res.status(400).send("404 Not Found");
    });
  } else {
    res.render('profile', { 
      title: 'Profile',
      css: 'stylesheets/profile-style.css',
      navHtml: '',
      logged_in : loggedIn,
      user : user,
      admin : admin
    });
  }
  
});

router.get('/edit', function(req, res, next) {
  let admin = false;
  let loggedIn = false;
  let user = [];
  if(req.cookies.user_role === "admin"){
    admin = true;
  }
  if(req.cookies.user_role && req.cookies.user_id){
    loggedIn = true;
    
    axios.get(`http://localhost:3001/users/${req.cookies.user_id}`)
    .then(function (response) {
      // handle success
      const user = response.data;
      username = user.username;

      res.render('edit_profile', { 
        title: 'Edit Profile',
        css: 'stylesheets/profile-style.css',
        navHtml: '',
        logged_in : loggedIn,
        user : user,
        admin : admin
      });
    })
    .catch(function (error) {
      // handle error
      res.status(400).send("404 Not Found");
    });
  } else {
    res.render('edit_profile', { 
      title: 'Edit Profile',
      css: 'stylesheets/profile-style.css',
      navHtml: '',
      logged_in : loggedIn,
      user : user,
      admin : admin
    });
  }
  
});

module.exports = router;