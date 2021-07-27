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

exports.unLikePost = (idPost, idUser, res) => {
  Post.findByIdAndUpdate(
    idPost,
    {
      $pull: { likes: idUser },
    },
    {
      new: true,
    }
  ).exec((errors, result) => {
    if (errors) {
      return res.status(422).json({ error: errors });
    } else {
      re.json(result);
    }
  });
};

exports.commentPost = (content, idUser, idPost, res) => {
  const comment = {
    text: content,
    commentBy: idUser,
  };
  Post.findByIdAndUpdate(
    idPost,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.commentBy", "_id username")
    .populate("author", "_id name")
    .exec((errors, result) => {
      if (errors) {
        return res.status(422).json({ error: err });
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
