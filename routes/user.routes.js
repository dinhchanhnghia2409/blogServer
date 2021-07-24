const express = require("express");
const route = express.Router();
require("dotenv").config();
const Authentication = require("../middleware/Authentication");
const userController = require("../controllers/user.controller");

route.post("/user/signup", async (req, res) => {
  const { username, password } = req.body;

  userController.validateInputs(username, password, res);
  userController.createAccount(username, password, res);
});

route.post("/user/signin", async (req, res) => {
  const { username, password } = req.body;

  userController.validateInputs(username, password, res);
  userController.loginAccount(username, password, res);
});

route.patch("/user/change-password", Authentication, (req, res) => {
  const idUser = req.user._id.toString();

  const password = req.user.password;
  const { currentPassword, newPassword, confirmPassword } = req.body;
  userController.changePassword(
    password,
    currentPassword,
    newPassword,
    confirmPassword,
    idUser,
    res
  );
});

route.get("/user/me", Authentication, (req, res) => {
  console.log(req.user);
  res.send(req.user._id);
});

module.exports = route;
