const express = require("express");
const route = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require("../models/user.model");

route.post("/user/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username && !password) {
    return res.status(400).json({ error: "Can't blank username and password" });
  } else if (!username) {
    return res.status(400).json({ error: "Can't blank username" });
  } else if (!password) {
    return res.status(400).json({ error: "Can't blank password" });
  }

  const createAccount = () => {
    bcrypt.hash(password, 10).then((hashedPassword) => {
      const user = new User({
        username,
        password: hashedPassword,
      });
      user.save().then(() => {
        res.status(201).json({ message: "Sign Up success!" });
      });
    });
  };

  const checkExitUsername = await User.findOne({ username: username });

  if (checkExitUsername) {
    return res.status(400).json({ error: "Opps.. User already exits!" });
  } else {
    createAccount();
  }
});

route.post("/user/signin", async (req, res) => {
  const { username, password } = req.body;

  const checkAccountLogin = () => {
    User.findOne({username: username}).then((savedUser)=>{
      if(!savedUser){
        return res.status(400).json({ error: "Opps.. User already not exits" });
      }
        bcrypt.compare(password,savedUser.password).then((doMatch)=>{
          if(doMatch){
            const token = jwt.sign({ _id: savedUser._id }, process.env.SERECT_KEY,{ expiresIn: '1h' });
            return res.status(200).json({token});
          }
          else return res.status(400).json({ error: "Opps.. Password is not correct" });
      })
    })
  }

  checkAccountLogin();

});

module.exports = route;
