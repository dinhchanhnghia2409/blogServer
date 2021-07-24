const express = require("express");
const route = express.Router();
const authentication = require("../middleware/Authentication");
const postController = require("../controllers/post.controller");

route.post("/create-post", authentication, (req, res) => {
  const { title, content } = req.body;
  const author = req.user;
  postController.createPost(title, content, author, res);0
});

route.get("/allpost", authentication, (req, res) => {
  postController.getAllPost(res);
});

route.get("/my-post",authentication,(req,res)=>{
  const authorId = req.user._id;
  postController.getPostByAuthor(authorId,res);
})

route.delete("/delete-post/:postId",authentication,(req,res)=>{
  const idPost = req.params.postId;
  postController.deletePost(idPost,res);
})

module.exports = route;
