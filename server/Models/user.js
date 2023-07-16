// import mongoose from "mongoose";
import { Schema, model, Mongoose } from "mongoose";
import bcrypt from "bcryptjs";
const { BCRYPT_WORK_FACTOR } = process.env;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

userSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, Number(BCRYPT_WORK_FACTOR));
  }
});

userSchema.methods.matchesPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export const User = model("User", userSchema);
