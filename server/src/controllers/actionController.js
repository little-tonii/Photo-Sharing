const Post = require("../models/postModel");
const AppError = require("../utils/appError");
const catchError = require("../utils/catchError");

exports.likePost = catchError(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(
      new AppError(`No post found with id ${req.params.postId}.`, 404)
    );
  }

  if (post.likes.includes(req.user._id)) {
    return next(new AppError("Your already like this post.", 400));
  }

  post.likes.push(req.user._id);

  await post.save();

  res.status(200).json({
    message: "Like post successfully.",
  });
});

exports.removeLikePost = catchError(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(
      new AppError(`No post found with id ${req.params.postId}.`, 404)
    );
  }

  if (!post.likes.includes(req.user._id)) {
    return next(new AppError("Your did not like this post.", 400));
  }

  post.likes = post.likes.filter((e) => !e.equals(req.user._id));
  await post.save();

  res.status(200).json({
    message: "Remove like on post successfully.",
  });
});
