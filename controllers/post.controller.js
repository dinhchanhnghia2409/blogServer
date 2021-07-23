const Post = require("../models/post.model");

exports.createPost = (title, content, author, res) => {
  const post = new Post({
    title,
    content,
    author: author,
  });
  post.save().then(() => {
    res.status(201).json({ message: "Created post succes!" });
  });
};

exports.getAllPost = (res) => {
  Post.find()
    .populate()
    .sort("-createdAt")
    .then((posts) => {
      res.json({ posts });
    });
};
