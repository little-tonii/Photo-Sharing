const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const actionRouter = require("./routes/actionRoutes");
const commentRouter = require("./routes/commentRoutes");

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(morgan("dev"));
app.use("/public", express.static("public"));

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/action", actionRouter);
app.use("/api/comment", commentRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server.`, 404));
});

app.use(errorHandler);

module.exports = app;
