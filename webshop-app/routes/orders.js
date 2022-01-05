const express = require('express');
const axios = require('axios').default;
const router = express.Router();

router.get('/', function (req, res, next) {
  axios.get(`http://localhost:3001/orders/user/${req.cookies.user_id}`)
    .then(function (response) {
      res.render('orders', {
        title: 'Webstore - Order History',
        css: 'stylesheets/orders-style.css',
        navHtml: '',
        admin: res.locals.admin,
        logged_in: res.locals.loggedIn,
        user: res.locals.user,
        orders: response.data
      });
    })
    .catch(function (error) {
      res.status(400).send({ message: "Bad request" });
    });
});

router.post("/", function (req, res, next) {
  axios.post('http://localhost:3001/orders', {
    data: req.body
  }, {
    "headers": {
      "content-type": "application/json",
    }
  }).then(function (response) {
    res.status(200).send(`Adding order`);
  }).catch(function (error) {
    res.status(400).send({ message: "Bad request" });
  });
});

module.exports = router;