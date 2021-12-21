const express = require('express');
const axios = require('axios').default;
const router = express.Router();

/* GET Phones home page. */
router.get('/', function (req, res, next) {
  let admin = false;
  let loggedIn = false;
  if (req.cookies.user_role === "admin") {
    admin = true;
  }
  if (req.cookies.user_role && req.cookies.user_id) {
    loggedIn = true;
  }
  axios.get(`${process.env.API_HOST}:${process.env.API_PORT}/phones`, { params: req.query })
    .then(function (response) {
      // send phones and filters to render method
      res.render('phones', {
        title: 'Phones',
        css: 'stylesheets/phones-style.css',
        products: response.data.products,
        filters: response.data.filters,
        selectedFilters: response.data.selectedFilters,
        admin: admin,
        logged_in: loggedIn
      });
    })
    .catch(function (error) {
      // handle error
      res.status(404).send("404 Not Found");
    });

});

router.post("/", function (req, res, next) {
  axios.post(`${process.env.API_HOST}:${process.env.API_PORT}/phones`, {
    name: req.body.name,
    brand: req.body.brand,
    operating_system: req.body.os,
    price: Number(req.body.price),
    discount: Number(req.body.discount),
    quantity: Number(req.body.quantity),
    availability_date: req.body.date,
    rating: Number(req.body.rating),
    image: req.body.imgUrl
  }, {
    "headers": {
      "content-type": "application/json",
    }
  })
    .then(function (response) {
      res.status(200).send(`Adding phone ${req.body.name}`);
    })
    .catch(function (error) {
      res.status(400).send({ message: "Bad request" });
    });

});

router.get('/:phone', function (req, res, next) {
  let admin = false;
  let loggedIn = false;
  if (req.cookies.user_role === "admin") {
    admin = true;
  }
  if (req.cookies.user_role && req.cookies.user_id) {
    loggedIn = true;
  }

  axios.get(`${process.env.API_HOST}:${process.env.API_PORT}/phones`)
    .then(function (response) {
      // handle success
      let products = response.data.products;
      let phone = products.find(item => item["name"] === req.params.phone);

      let average = parseFloat(products.filter(product => product.brand === phone.brand && product.rating > 0).reduce((previous, current, index, array) => {
        let calcSum = previous + current.rating;
        if (index === array.length - 1) {
          return calcSum / array.length;
        }
        return calcSum;
      }, 0).toFixed(1));

      res.render('details', {
        title: 'Details',
        css: 'stylesheets/details-style.css',
        navHtml: '',
        phone: phone,
        average: average,
        admin: admin,
        logged_in: loggedIn
      });
    })
    .catch(function (error) {
      // handle error
      res.status(404).send("404 Not Found");
    });

});

router.put("/:id", function (req, res, next) {
  axios.put(`${process.env.API_HOST}:${process.env.API_PORT}/phones/${req.params.id}`, {
    name: req.body.name,
    brand: req.body.brand,
    operating_system: req.body.os,
    price: Number(req.body.price),
    discount: Number(req.body.discount),
    quantity: Number(req.body.quantity),
    availability_date: req.body.date,
    rating: Number(req.body.rating),
    image: req.body.imgUrl
  }, {
    "headers": {
      "content-type": "application/json",
    }
  })
    .then(function (response) {
      res.status(200).send(`Updating phone ${req.body.name}`);
    })
    .catch(function (error) {
      res.status(400).send({ message: "Bad request" });
    });

});

router.delete('/:id', function (req, res) {
  console.log(req.params.id);
  res.send(`Deleting phone ${req.params.id}`);
  axios.delete(`${process.env.API_HOST}:${process.env.API_PORT}/phones/${req.params.id}`, { data: req.params.id })
    .then(() => console.log('Phone has been deleted'))
    .catch(() => console.error('Failed to delete phone with id ' + req.params.id));
});

module.exports = router;
