const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A comment must belong to a user."],
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: [true, "A comment must belong to a post."],
  },
  comment: {
    type: String,
    required: [true, "Comment is required."],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

commentSchema.index({ user: 1 });
commentSchema.index({ post: 1 });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
