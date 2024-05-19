module.exports = (err, req, res, next) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    if (err.name === "ValidationError") {
      const messages = [];
      Object.values(err.errors).map((error) => messages.push(error.message));
      res.status(400).json({ messages });
    } else if (err.code === 11000) {
      res.status(400).json({
        message: `Duplicate value ${
          Object.values(err.keyValue)[0]
        }. Please use another value.`,
      });
    } else if (err.name === "JsonWebTokenError") {
      res.status(401).json({
        message: "Invalid token, please login again.",
      });
    } else if (err.name === "TokenExpiredError") {
      res.status(401).json({
        message: "Token has expired, please login again.",
      });
    } else if (err.name === "CastError") {
      res.status(400).json({
        message: `Invalid ${err.path}: ${err.value}.`,
      });
    } else {
      res.status(500).json({
        message: err.message,
        name: err.name,
        code: err.code,
      });
      // res.status(500).json({
      //   message: "Something went wrong, try again later.",
      // });
    }
  }
};
