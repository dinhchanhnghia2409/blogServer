const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();


const Authentication = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Opps.. You are not logged in..." });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.SERECT_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Opps.. You are not logged in" });
    }

    const { _id } = payload;
    User.findById(_id).then((userData) => {
      req.user = userData;
      next();
    });
  });
};

module.exports = Authentication;
