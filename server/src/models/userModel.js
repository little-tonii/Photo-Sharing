const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required."],
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Email is not valid."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    select: false,
    minlength: [8, "Password length must be equal or greater than 8."],
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[a-z0-9]{1,36}$/.test(value);
      },
      message:
        "Username must contain only letters a-z and numbers 0-9 with maximum length of 36 characters.)",
    },
    required: [true, "Username is required."],
  },
  firstName: {
    type: String,
    required: [true, "First name is required."],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required."],
    trim: true,
  },
  followers: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  followings: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  refreshToken: {
    type: String,
    select: false,
  },
  avatar: {
    type: String,
    trim: true,
    default: "avatar.png",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
