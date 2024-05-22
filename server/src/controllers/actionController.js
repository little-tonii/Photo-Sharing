const Post = require("../models/postModel");
const User = require("../models/userModel");
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

exports.followUser = catchError(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(
      new AppError(`No user found with id ${req.params.userId}.`, 404)
    );
  }

  if (user.followers.includes(req.user._id)) {
    return next(new AppError("Your already follow this user.", 400));
  }

  user.followers.push(req.user._id);
  await user.save();

  const thisUser = await User.findById(req.user._id);
  thisUser.followings.push(req.params.userId);
  await thisUser.save();

  res.status(200).json(thisUser);
});

exports.unfollowUser = catchError(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(
      new AppError(`No user found with id ${req.params.userId}.`, 404)
    );
  }

  if (!user.followers.includes(req.user._id)) {
    return next(new AppError("Your did not follow this user.", 400));
  }

  user.followers = user.followers.filter((e) => !e.equals(req.user._id));
  await user.save();

  const thisUser = await User.findById(req.user._id);
  thisUser.followings = thisUser.followings.filter(
    (e) => !e.equals(req.params.userId)
  );
  await thisUser.save();

  res.status(200).json(thisUser);
});
