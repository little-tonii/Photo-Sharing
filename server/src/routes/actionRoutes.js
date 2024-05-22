const express = require("express");
const actionController = require("../controllers/actionController");
const protectRoute = require("../middlewares/protectRoute");

const router = express.Router();

router.use(protectRoute);

router.post("/follow/:userId", actionController.followUser);

router.delete("/unfollow/:userId", actionController.unfollowUser);

router
  .route("/like/:postId")
  .post(actionController.likePost)
  .delete(actionController.removeLikePost);

module.exports = router;
