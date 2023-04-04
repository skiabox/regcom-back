const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//create token helper function
const createToken = _id => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  //grab email and password from req.body
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);
    const userRole = user.role;

    res.status(200).json({ email, token, role: userRole });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  //grab email and password from req.body
  const { email, password, role } = req.body;

  try {
    const user = await User.signup(email, password, role);

    // create a token
    const token = createToken(user._id);

    res.status(201).json({ email, token, role });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser
};
