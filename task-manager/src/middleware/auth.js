const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "");
    const decoded = await jwt.verify(token, "hii");
    console.log(decoded);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      throw new Error();
    }
    req.user = { ...user, token };
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
