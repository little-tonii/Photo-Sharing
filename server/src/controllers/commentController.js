const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const AppError = require("../utils/appError");
const catchError = require("../utils/catchError");

exports.getAllCommentsOnPost = catchError(async (req, res, next) => {
  const post = await Post.findById(req.query.post);

  if (!post) {
    return next(new AppError(`No post found with id ${req.query.post}.`, 404));
  }

  const comments = await Comment.find({ post: req.query.post }).populate(
    "user"
  );

  res.status(200).json(comments);
});

exports.createCommentOnPost = catchError(async (req, res, next) => {
  const data = {
    user: req.user._id,
    post: req.body.post,
    comment: req.body.comment,
  };

  const post = await Post.findById(req.body.post);

  if (!post) {
    return next(new AppError(`No post found with id ${req.body.post}.`, 404));
  }

  const comment = await Comment.create(data);
  comment.user = req.user;

  res.status(201).json(comment);
});

exports.deleteComment = catchError(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.commentId);

  if (!comment) {
    return next(
      new AppError(`No comment found with id ${req.params.commentId}.`, 404)
    );
  }

  res.status(204).json({
    message: "Comment is successfully deleted.",
  });
});

exports.updateComment = catchError(async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      comment: req.body.comment,
    },
    { new: true }
  );

  if (!comment) {
    return next(
      new AppError(`No comment found with id ${req.params.commentId},`, 404)
    );
  }

  res.status(200).json(comment);
});
