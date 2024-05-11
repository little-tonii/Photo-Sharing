const express = require("express");
const postController = require("../controllers/postController");
const protectRoute = require("../middlewares/protectRoute");
const imageHandler = require("../middlewares/imageHandler");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.use(protectRoute);

router
  .route("/")
  .post(imageHandler, postController.createPost)
  .get(postController.getAllPost);

router.route("/:postId").delete(postController.deletePost);

module.exports = router;
