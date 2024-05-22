const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A post must belong to a user."],
  },
  content: {
    type: String,
    trim: true,
    required: [true, "Content is required."],
  },
  photos: {
    type: [
      {
        type: String,
        trim: true,
        required: [true, "A post must have at least one photo."],
      },
    ],
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

postSchema.index({ user: 1 });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
