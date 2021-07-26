const Post = require("../models/post.model");

exports.createPost = (title, content, author, res) => {
  const post = new Post({
    title,
    content,
    author: author,
  });
  post
    .save()
    .then(() => {
      res.status(201).json({ message: "Created post succes!" });
    })
    .catch((errors) => {
      res
        .status(400)
        .json({ error: "Opps... Request fail... Reason: " + errors });
    });
};

exports.getAllPost = (res) => {
  Post.find()
    .populate()
    .sort("-createdAt")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((errors) => {
      res
        .status(400)
        .json({ error: "Opps.. Request Failed... Reason: " + errors });
    });
};

exports.likePost = (idPost, idUser, res) => {
  Post.findByIdAndUpdate(
    idPost,
    {
      $push: { likes: idUser },
    },
    {
      new: true,
    }
  ).exec((errors, result) => {
    if (errors) {
      return res.status(422).json({ error: errors });
    } else {
      res.json(result);
    }
  });
};

exports.getPostByAuthor = (authorId, res) => {
  Post.find({ author: authorId })
    .populate("author", "_id username")
    .then((myPost) => {
      res.json({ myPost });
    })
    .catch((errors) => {
      res
        .status(400)
        .json({ error: "Opps.. Request Failed... Reason: " + errors });
    });
};

exports.deletePost = (idPost, res) => {
  Post.findByIdAndRemove({ _id: idPost })
    .then(() => {
      res.status(200).json({ message: "Delete post Success!" });
    })
    .catch((errors) => {
      res
        .status(400)
        .json({ error: "Opps.. Request Failed... Reason: " + errors });
    });
};
