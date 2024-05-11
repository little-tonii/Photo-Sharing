const catchError = require("../utils/catchError");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const accessTokenFactory = require("../utils/accessTokenFactory");
const refreshTokenFactory = require("../utils/refreshTokenFactory");
const AppError = require("../utils/appError");

exports.register = catchError(async (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.first_name,
    lastName: req.body.last_name,
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
