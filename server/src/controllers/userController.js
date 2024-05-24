const catchError = require("../utils/catchError");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const accessTokenFactory = require("../utils/accessTokenFactory");
const refreshTokenFactory = require("../utils/refreshTokenFactory");
const AppError = require("../utils/appError");
const generateRandomUsername = require("../utils/generateRandomUsername");

exports.updateUser = catchError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new AppError(`No user found with id ${req.params.userId}.`, 404)
    );
  }

  res.status(200).json(user);
});

exports.getSuggestUsers = catchError(async (req, res, next) => {
  const users = await User.find({
    _id: { $nin: [req.user.id, ...req.user.followings] },
  })
    .sort({ createdAt: -1 })
    .limit(5);

  res.status(200).json(users);
});

exports.register = catchError(async (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    username: generateRandomUsername(),
  };

  const newUser = await User.create(data);

  const { accessToken } = accessTokenFactory.generate({ _id: newUser._id });
  const { refreshToken, refreshTokenHashed } = refreshTokenFactory.generate({
    _id: newUser._id,
  });

  newUser.refreshToken = refreshTokenHashed;
  newUser.password = await bcrypt.hash(req.body.password, 12);
  await newUser.save();

  newUser.password = undefined;
  newUser.refreshToken = undefined;

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    maxAge: Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRES) * 60 * 1000,
    secure: true,
  });

  res.status(201).json({
    user: newUser,
    access_token: accessToken,
  });
});

exports.login = catchError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required.", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect email or password.", 401));
  }

  const { accessToken } = accessTokenFactory.generate({ _id: user._id });
  const { refreshToken, refreshTokenHashed } = refreshTokenFactory.generate({
    _id: user._id,
  });

  user.refreshToken = refreshTokenHashed;
  await user.save();

  user.password = undefined;
  user.refreshToken = undefined;

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    maxAge:
      Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRES) * 24 * 60 * 60 * 1000,
    secure: true,
  });

  res.status(200).json({
    access_token: accessToken,
    user,
  });
});

exports.logout = catchError(async (req, res, next) => {
  const user = req.user;

  user.refreshToken = undefined;

  await user.save();

  res.cookie("refresh_token", "", {
    httpOnly: true,
    maxAge: 0,
    secure: true,
  });

  res.status(200).json({
    message: "Logout successfully.",
  });
});

exports.getUser = catchError(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(
      new AppError(`No user found with id ${req.params.userId}.`, 404)
    );
  }

  user.password = undefined;
  user.refreshToken = undefined;

  res.status(200).json(user);
});

exports.getAccessToken = catchError(async (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return next(new AppError("Refresh token is required.", 400));
  }

  const user = await User.findOne({ refreshToken });

  if (!user) {
    return next(
      new AppError(
        `No user found with refresh token ${req.cookies.refreshToken}.`,
        404
      )
    );
  }

  const { accessToken } = accessTokenFactory.generate({ _id: user._id });

  res.status(200).json({
    access_token: accessToken,
  });
});
