const mongooes = require("mongoose");
const { ObjectId } = mongooes.Schema.Types;
const postSchema = new mongooes.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    author: {
      type: ObjectId,
      ref: "User",
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [
      {
        text: String,
        commentBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongooes.model("Post", postSchema);

module.exports = Post;
