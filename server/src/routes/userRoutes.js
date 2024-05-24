const express = require("express");
const userController = require("../controllers/userController");
const protectRoute = require("../middlewares/protectRoute");

const router = express.Router();

router.route("/register").post(userController.register);

router.route("/login").post(userController.login);

router.route("/refresh").post(userController.getAccessToken);

router.use(protectRoute);

router.route("/suggestion").get(userController.getSuggestUsers);

router.route("/logout").delete(userController.logout);

router.route("/:userId").get(userController.getUser).patch(userController.updateUser);

module.exports = router;
