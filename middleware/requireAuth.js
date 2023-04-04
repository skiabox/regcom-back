const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Obligation = require("../models/obligationModel");

const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    //get the user from the database and attach it to the request for the next middleware
    //we get only the id of the document and not the email or the hashed password
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
