import mongoose from "mongoose";
import bCrypt from "bcryptjs";
import * as authServices from "#services/auth/index.js";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  verificationToken: {
    type: String,
    default: null,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  avatarURL: String,
});

userSchema.methods.setAvatar = function ({ avatarURL }) {
  this.avatarURL = avatarURL;
};
userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};
userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};
userSchema.methods.generateToken = async function () {
  const payload = {
    id: this["_id"],
    username: this.username || "You",
  };
  const token = await authServices.createToken(payload);
  this.token = token;
  return token;
};
userSchema.methods.generateVerificationToken = async function () {
  const token = await authServices.createVerificationToken();
  this.verificationToken = token;
  return token;
};
userSchema.methods.deleteToken = async function () {
  this.token = null;
  return;
};
userSchema.methods.verify = async function () {
  this.verificationToken = null;
  this.verified = true;
  return;
};

export const User = mongoose.model("user", userSchema);
