const express = require("express");
const axios = require("axios").default;
const router = express.Router();

/* GET Phones home page. */
router.get("/", function (req, res, next) {
  axios
    .get(`${process.env.API_HOST}:${process.env.API_PORT}/phones`, {
      params: req.query,
    })
    .then(function (response) {
      // send phones and filters to render method
      res.render("phones/list", {
        title: "Webstore - Phones",
        css: "stylesheets/phones-style.css",
        products: response.data.products,
        filters: response.data.filters,
        selectedFilters: response.data.selectedFilters,
        admin: res.locals.admin,
        logged_in: res.locals.loggedIn,
        user: res.locals.user,
        breadcrumbs: [{ link: "/", name: "Home" }, { name: "Phones" }],
      });
    })
    .catch(function (error) {
      // handle error
      res.status(404).send("404 Not Found");
    });
});

router.get("/:phone/details", function (req, res, next) {
  console.log(req.params.phone);
  axios
    .get(`${process.env.API_HOST}:${process.env.API_PORT}/phones`)
    .then(function (response) {
      // handle success
      let products = response.data.products;
      let phone = products.find((item) => item["name"] === req.params.phone);

      let average = parseFloat(
        products
          .filter(
            (product) => product.brand === phone.brand && product.rating > 0
          )
          .reduce((previous, current, index, array) => {
            let calcSum = previous + current.rating;
            if (index === array.length - 1) {
              return calcSum / array.length;
            }
            return calcSum;
          }, 0)
          .toFixed(1)
      );

      res.render("phones/details", {
        title: "Webstore - " + phone.brand + ' ' + phone.name,
        css: "stylesheets/details-style.css",
        navHtml: "",
        phone: phone,
        average: average,
        admin: res.locals.admin,
        logged_in: res.locals.loggedIn,
        user: res.locals.user,
        breadcrumbs: [{ link: "/", name: "Home" }, { link: "/phones", name: "Phones" }, { name: phone.name }],
      });
    })
    .catch(function (error) {
      // handle error
      res.status(404).send("404 Not Found");
    });
});

router.get("/add", function (req, res, next) {
  
  res.render("phones/create", {
    title: "Webstore - Phones",
    css: "stylesheets/details-style.css",
    navHtml: "",
    admin: res.locals.admin,
    logged_in: res.locals.loggedIn,
    user: res.locals.user,
    breadcrumbs: [{ link: "/", name: "Home" }, { link: "/phones", name: "Phones" }, { name: "Add" }],
  });
});

router.get("/:id/edit", function (req, res, next) {
  axios
    .get(`${process.env.API_HOST}:${process.env.API_PORT}/phones/${req.params.id}`)
    .then(function (response) {
      // handle success
      res.render("phones/edit", {
        title: "Webstore - " + response.data.brand + ' ' + response.data.name,
        css: "stylesheets/details-style.css",
        navHtml: "",
        phone: response.data,
        admin: res.locals.admin,
        logged_in: res.locals.loggedIn,
        user: res.locals.user,
        breadcrumbs: [{ link: "/", name: "Home" }, { link: "/phones", name: "Phones" }, { link: `/phones/${response.data.name}/details`, name: response.data.name }, {name: "Edit"}],
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      res.status(404).send("404 Not Found");
    });
});

router.post("/add", function (req, res, next) {
  axios
    .post(`${process.env.API_HOST}:${process.env.API_PORT}/phones`,
      {
        name: req.body.name,
        brand: req.body.brand,
        operating_system: req.body.os,
        price: Number(req.body.price),
        discount: Number(req.body.discount),
        quantity: Number(req.body.quantity),
        availability_date: req.body.date,
        rating: Number(req.body.rating),
        image: req.body.imgUrl,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then(function (response) {
      res.status(200).send(`Adding phone ${req.body.name}`);
    })
    .catch(function (error) {
      res.status(400).send({ message: "Bad request" });
    });
});

router.put("/:id/edit", function (req, res, next) {
  console.log(req.params.id);
  axios.put(`${process.env.API_HOST}:${process.env.API_PORT}/phones/${req.params.id}`,
      {
        name: req.body.name,
        brand: req.body.brand,
        operating_system: req.body.os,
        price: Number(req.body.price),
        discount: Number(req.body.discount),
        quantity: Number(req.body.quantity),
        availability_date: req.body.date,
        rating: Number(req.body.rating),
        image: req.body.imgUrl,
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

router.delete("/:id", function (req, res) {
  res.send(`Deleting phone ${req.params.id}`);
  axios
    .delete(
      `${process.env.API_HOST}:${process.env.API_PORT}/phones/${req.params.id}`,
      { data: req.params.id }
    )
    .then(() => console.log("Phone has been deleted"))
    .catch(() =>
      console.error("Failed to delete phone with id " + req.params.id)
    );
});

module.exports = router;
