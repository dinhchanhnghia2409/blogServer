const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.createAccount = async (username, password, res) => {
  const checkExitsUsername = await User.findOne({ username: username });

  if (checkExitsUsername) {
    return res.status(400).json({ error: "Opps.. User already exits!" });
  } else {
    bcrypt.hash(password, 10).then((hashedPassword) => {
      const user = new User({
        username,
        password: hashedPassword,
      });
      user.save().then(() => {
        res.status(201).json({ message: "Sign Up success!" });
      });
    });
  }
};

exports.loginAccount = (username, password, res) => {
  User.findOne({ username: username }).then((savedUser) => {
    if (!savedUser) {
      return res.status(400).json({ error: "Opps.. User already not exits" });
    }
    bcrypt.compare(password, savedUser.password).then((doMatch) => {
      if (doMatch) {
        const token = jwt.sign({ _id: savedUser._id }, process.env.SERECT_KEY, {
          expiresIn: "1h",
        });
        return res.status(200).json({ token });
      } else
        return res
          .status(400)
          .json({ error: "Opps.. Password is not correct" });
    });
  });
};

exports.validateInputs = (username, password, res) => {
  if (!username && !password) {
    return res.status(400).json({ error: "Can't blank username and password" });
  } else if (!username) {
    return res.status(400).json({ error: "Can't blank username" });
  } else if (!password) {
    return res.status(400).json({ error: "Can't blank password" });
  }
};
