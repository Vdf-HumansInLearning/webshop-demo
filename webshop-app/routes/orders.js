const express = require('express');
const axios = require('axios').default;
const router = express.Router();

router.get('/', function (req, res, next) {
  let admin = false;
  let loggedIn = false;
  if (req.cookies.user_role === "admin") {
    admin = true;
  }
  if (req.cookies.user_role && req.cookies.user_id) {
    loggedIn = true;
  }
  axios.get(`http://localhost:3001/orders/user/${req.cookies.user_id}`)
    .then(function (response) {
      res.render('orders', {
        title: 'Order History',
        css: 'stylesheets/orders-style.css',
        navHtml: '',
        logged_in: loggedIn,
        admin: admin,
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
  })
    .then(function (response) {
      console.log(response);
      res.status(200).send(`Adding order`);
    })
    .catch(function (error) {
      res.status(400).send({ message: "Bad request" });
    });
});

module.exports = router;