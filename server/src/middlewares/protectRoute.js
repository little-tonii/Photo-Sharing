const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchError = require("../utils/catchError");
const jwt = require("jsonwebtoken");

module.exports = catchError(async (req, res, next) => {
  let accessToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    accessToken = req.headers.authorization.split(" ")[1];
  }

  if (!accessToken) {
    return next(new AppError("You are not logged in.", 401));
  }

  const key = process.env.ACCESS_TOKEN_KEY;

  const decodedPayload = jwt.verify(accessToken, key);

  const user = await User.findOne({ _id: decodedPayload._id });

  if (!user) {
    return next(
      new AppError("User belonging to this token does not exist.", 401)
    );
  }

  req.user = user;
  next();
});
