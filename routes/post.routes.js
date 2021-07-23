const express = require("express");
const route = express.Router();
const authentication = require("../middleware/Authentication");
const postController = require("../controllers/post.controller");

route.post("/create-post", authentication, (req, res) => {
  const { title, content } = req.body;
  const author = req.user;
  postController.createPost(title, content, author, res);
});

route.get("/allpost", authentication, (req, res) => {
  postController.getAllPost(res);
});

module.exports = route;
