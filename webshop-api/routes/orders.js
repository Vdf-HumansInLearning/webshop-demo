const express = require("express");
const fs = require("fs");
const router = express.Router();
const uuid = require("uuid");

router.get("/", function (req, res, next) {
  let orders = JSON.parse(fs.readFileSync("./data/orders.json", "utf8"));
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404).send({ message: "404 Not Found" });
  }
});

router.get("/:id", function (req, res, next) {
  let orders = JSON.parse(fs.readFileSync("./data/orders.json", "utf8"));
  let order = orders.find((order) => order.id == req.params.id);
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).send("404 Not Found");
  }
});

router.get("/user/:id", function (req, res, next) {
  let orders = JSON.parse(fs.readFileSync("./data/orders.json", "utf8"));
  let userOrders = orders.filter((order) => order["user_id"] == req.params.id);
  res.status(200).json(userOrders);
});

router.post("/", function (req, res, next) {
  let orders = JSON.parse(fs.readFileSync("./data/orders.json", "utf8"));
  let users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
  let products = JSON.parse(fs.readFileSync("./data/phones.json", "utf8"));
  let user = users.find((user) => user.id == req.body.data.user);
  // let today = new Date();
  // let date =
  //   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  if (user && req.body.data) {
    let order = {
      id: uuid.v1(),
      user_id: user.id,
      name: user.name,
      email: user.email,
      delivery_address: {
        street: req.body.data.delivery_address.street,
        suite: req.body.data.delivery_address.suite,
        city: req.body.data.delivery_address.city,
        zipcode: req.body.data.delivery_address.zipcode,
      },
      billing_address: {
        street: req.body.data.billing_address.street,
        suite: req.body.data.billing_address.suite,
        city: req.body.data.billing_address.city,
        zipcode: req.body.data.billing_address.zipcode,
      },
      phone: user.phone,
      order: req.body.data.items,
      payment: "card",
      date: Date.now(),
      total: req.body.data.total,
    };

    orders.push(order);
    for (let i = 0; i < req.body.data.items.length; i++) {
      let phone = products.find(
        (item) => `${item.brand} ${item.name}` == req.body.data.items[i].name
      );

      if (phone) {
        if (phone.quantity > 1) {
          phone.quantity = phone.quantity - req.body.data.items[i].quantity;
        } else {
          phone.quantity = 0;
        }
      }
    }
    fs.writeFile("./data/orders.json", JSON.stringify(orders), function (err) {
      if (err) {
        throw err;
      } else {
        fs.writeFile(
          "./data/phones.json",
          JSON.stringify(products),
          function (err) {
            if (err) {
              throw err;
            } else {
              res.status(200).send({ message: "Successfully registered" });
            }
          }
        );
      }
    });
  } else {
    res.status(400).send({ message: "Please complete all fields" });
  }
});

router.delete("/:id", function (req, res) {
  let orders = JSON.parse(fs.readFileSync("./data/orders.json", "utf8"));
  let order = orders.find((order) => order.id == req.params.id);
  if (order) {
    let updatedOrders = orders.filter((order) => order.id != req.params.id);
    fs.writeFile(
      "./data/orders.json",
      JSON.stringify(updatedOrders),
      function (err) {
        if (err) {
          throw err;
        } else {
          res.status(200).send({ message: `Deleting order ${req.params.id}` });
        }
      }
    );
  }
});

module.exports = router;
