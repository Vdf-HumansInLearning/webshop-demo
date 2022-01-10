const express = require('express');
const axios = require('axios').default;
const router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login', { 
    title: 'Webstore - Login',
    css: 'stylesheets/login-style.css',
    logged_in: res.locals.loggedIn,
  });
});

router.post('/login', function(req, res, next) {
  axios.post(`${process.env.API_HOST}:${process.env.API_PORT}/auth/login`, {
    email : req.body.email,
    password : req.body.password
  },{
    "headers": {
      "content-type": "application/json",
    }})
    .then(function (response) {
      // handle success
      const user = response.data;
      if(user){
        res.cookie('user_id', user.id).cookie('user_role', user.role).send('cookie set');
      } else {
        res.clearCookie('user_id');
        res.clearCookie('user_role');
        res.send('cookie user cleared');
      }

    })
    .catch(function (error) {
      // handle error
      res.clearCookie('user_id');
      res.clearCookie('user_role');
      res.status(400).send({ message: "Bad request" });
    });
  
});

router.get('/register', function(req, res, next) {
    let registered = false;
    if(req.cookies.user_role && req.cookies.user_id){
      registered = true;
    }
    res.render('register', { 
      title: 'Webstore - Register',
      css: 'stylesheets/register-style.css',
      registered : registered
    });
  });
  
router.post('/register', function(req, res, next) {
    axios.post(`${process.env.API_HOST}:${process.env.API_PORT}/auth/register`, {
      name: req.body.first_name + " " + req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    },{
    "headers": {
      "content-type": "application/json",
    }})
    .then(function (response) {
      // handle success
      res.send("Successfully registered");
    })
    .catch(function (error) {
      // handle error
      res.status(400).send({ message: "Bad request" });
    });
    
});

router.get('/logout', function(req, res, next) {
    res.clearCookie('user_id');
    res.clearCookie('user_role');
    res.render("logout",{});
});

module.exports = router;