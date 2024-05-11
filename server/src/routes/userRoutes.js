const express = require("express");
const userController = require("../controllers/userController");
const protectRoute = require("../middlewares/protectRoute");

const router = express.Router();

router.route("/register").post(userController.register);

router.route("/login").post(userController.login);

router.use(protectRoute);

router.route("/logout").delete(userController.logout);

module.exports = router;
