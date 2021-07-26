const express = require("express");
const route = express.Router();
require("dotenv").config();
const Authentication = require("../middleware/Authentication");
const userController = require("../controllers/user.controller");

route.post("/user/signup", async (req, res) => {
  const { email, username, password } = req.body;

  userController.validateInputs(username, password, res);
  userController.createAccount(email, username, password, res);
});

route.post("/user/signin", async (req, res) => {
  const { username, password } = req.body;

  userController.validateInputs(username, password, res);
  userController.loginAccount(username, password, res);
});

route.post("/token", Authentication, (req, res) => {
  const idUser = req.user._id;
  const { refreshToken } = req.body;
  userController.newTokenJwtExpired(idUser, refreshToken, req, res);
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

route.put("/follow", Authentication, (req, res) => {
  const idFollow = req.body.followId;
  userController.followUser(idFollow, req, res);
});

route.put("/unfollow", Authentication, (req, res) => {
  const idUnFollow = req.body.unFollowId;
  userController.unFollowUser(idUnFollow, req, res);
});

route.get("/user/me", Authentication, (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

module.exports = route;
