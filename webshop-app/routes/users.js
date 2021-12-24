const { response } = require('express');
const express = require('express');
const axios = require('axios').default;
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  let admin = false;
  let loggedIn = false;
  if (req.cookies.user_role === "admin") {
    admin = true;
  }
  if (req.cookies.user_role && req.cookies.user_id) {
    loggedIn = true;
  }
  axios.get('http://localhost:3001/users')
    .then(function (response) {
      // handle success
      res.render('users', {
        title: 'Users',
        css: 'stylesheets/users-style.css',
        navHtml: '',
        users: response.data,
        admin: admin,
        logged_in: loggedIn
      });
    })
    .catch(function (error) {
      // handle error
      res.status(400).send("404 Not Found");
    });

});

router.get('/register', function(req, res, next) {
  let registered = false;
  if(req.cookies.user_role && req.cookies.user_id){
    registered = true;
  }
  res.render('register', { 
    title: 'Register',
    css: 'stylesheets/register-style.css',
    registered : registered
  });
});

router.put('/:id', function(req, res, next) {
  console.log(req.body);
  axios.put(`http://localhost:3001/users/${req.params.id}`, {
    street : req.body.street,
    suite : req.body.suite,
    city : req.body.city,
    zipcode : req.body.zipcode,
    phone : req.body.phone,
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

router.delete('/:id', function (req, res) {
  res.send(`Deleting user ${req.params.id}`);
  axios.delete(`http://localhost:3001/users/${req.params.id}`, { data: req.params.id })
    .then(() => console.log('User has been deleted'))
    .catch(() => console.error('Failed to delete user with id ' + req.params.id));
});

module.exports = router;
