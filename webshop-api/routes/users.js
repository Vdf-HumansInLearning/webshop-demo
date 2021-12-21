const { response } = require("express");
let express = require("express");
const fs = require("fs");
let router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  let users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).send({ message: "404 Not Found" });
  }
});

router.get("/:id", function (req, res, next) {
  let users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
  let user = users.find((user) => user.id == req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send({ message: "404 Not Found" });
  }
});

router.delete("/:id", function (req, res) {
  let users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
  let user = users.find((user) => user.id == req.params.id);
  if (user) {
    let updatedUsers = users.filter((user) => user.id != req.params.id);
    fs.writeFile(
      "./data/users.json",
      JSON.stringify(updatedUsers),
      function (err) {
        if (err) {
          throw err;
        } else {
          res.status(200).send({ message: `Deleting user ${req.params.id}` });
        }
      }
    );
  }
});

router.put("/:id", function (req, res, next) {
  let users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));

  // loop through all users
  // find the user with the id received in the request
  // modify the user in place
  // validate the user
  let user = users.find((user) => user.id == req.params.id);

  if (user) {
    user.name = req.body.name;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password; // remove if not used

    if (validateUser(user)) {
      fs.writeFile("./data/users.json", JSON.stringify(users), function (err) {
        if (err) {
          throw err;
        } else {
          res.send({ message: "Successfully updated" });
        }
      });
    } else {
      res.status(400).send({ message: "Bad request" });
    }
  } else {
    res.status(400).send({ message: "Please complete all fields" });
  }
});

function validateUser(user) {
  let regexLetters = /(^[A-Za-z]{2,30})([ ]{0,1})([A-Za-z]{2,30})/;
  let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  let regexUsername = /^[a-z0-9_-]{3,16}$/gim;

  return (
    user.name &&
    user.username &&
    user.email &&
    user.password &&
    user.name.match(regexLetters) &&
    user.username.match(regexUsername) &&
    user.email.match(regexEmail) &&
    user.password.match(regexPassword)
  );
}

module.exports = router;
