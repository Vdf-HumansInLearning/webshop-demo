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

router.delete('/:id', function (req, res) {
  res.send(`Deleting user ${req.params.id}`);
  axios.delete(`http://localhost:3001/users/${req.params.id}`, { data: req.params.id })
    .then(() => console.log('User has been deleted'))
    .catch(() => console.error('Failed to delete user with id ' + req.params.id));
});

module.exports = router;
