const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: false,
    enum: ["editor", "simpleUser", "dpoUser"]
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  }
});

// static signup method
userSchema.statics.signup = async function (email, password, role) {
  //validation
  if (!email || !password || !role) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already in use");
  }

  // generate salt
  const salt = await bcrypt.genSalt(10);
  // hash password
  const hash = await bcrypt.hash(password, salt);

  // create user
  const user = await this.create({ email, password: hash, role });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email");
  }

  //compare the password passed in the form with the hashed password in the db
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
