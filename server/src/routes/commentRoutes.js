const express = require("express");
const protectRoute = require("../middlewares/protectRoute");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.use(protectRoute);

router
  .route("/")
  .post(commentController.createCommentOnPost)
  .get(commentController.getAllCommentsOnPost);

router
  .route("/:commentId")
  .delete(commentController.deleteComment)
  .patch(commentController.updateComment);

module.exports = router;
