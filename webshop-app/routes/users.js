const { response } = require('express');
const express = require('express');
const axios = require('axios').default;
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  axios.get('http://localhost:3001/users')
    .then(function (response) {
      // handle success
      res.render('users', {
        title: 'Users',
        css: 'stylesheets/users-style.css',
        navHtml: '',
        users: response.data,
        admin: res.locals.admin,
        logged_in: res.locals.loggedIn,
        user: res.locals.user
      });
    })
    .catch(function (error) {
      // handle error
      res.status(400).send("404 Not Found");
    });

});

router.put('/:id', function (req, res, next) {
  axios.put(`http://localhost:3001/users/${req.params.id}`, {
    street: req.body.street,
    suite: req.body.suite,
    city: req.body.city,
    zipcode: req.body.zipcode,
    phone: req.body.phone,
  }, {
    "headers": {
      "content-type": "application/json",
    }
  })
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
