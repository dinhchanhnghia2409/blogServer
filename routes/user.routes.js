const express = require("express");
const route = express.Router();
require("dotenv").config();
const Authentication = require("../middleware/Authentication");
const userController = require("../controllers/user.controller");

route.post("/user/signup", async (req, res) => {
  const { username, password } = req.body;

  userController.validatorField(username, password, res);
  userController.createAccount(username, password, res);
});

route.post("/user/signin", async (req, res) => {
  const { username, password } = req.body;

  userController.validatorField(username, password, res);
  userController.loginAccount(username, password, res);
});

route.get("/user/me", Authentication, (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

module.exports = route;
