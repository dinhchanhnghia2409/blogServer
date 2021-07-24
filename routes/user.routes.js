const express = require("express");
const route = express.Router();
require("dotenv").config();
const Authentication = require("../middleware/Authentication");
const userController = require("../controllers/user.controller");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

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

route.put("/user/change-password", Authentication, (req, res) => {
  const idUser = req.user._id.toString();

  const password = req.user.password;
  const { currentPassword, newPassword, confirmPassword } = req.body;
  bcrypt.compare(currentPassword, password).then((doMatch) => {
    if (doMatch) {
      if (newPassword === confirmPassword) {
        bcrypt.hash(newPassword, 10).then((newHashedPassword) => {
          User.findByIdAndUpdate(idUser, {
            $set: { password: newHashedPassword },
          }).then(res.status(200).json({ message: "Success!" }));
        });
      }
    }
  });
});

route.get("/user/me", Authentication, (req, res) => {
  console.log(req.user);
  res.send(req.user._id);
});

module.exports = route;
