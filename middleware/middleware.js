const jwt = require("jsonwebtoken");
const User = require("../Schema/user");
const authenticate = async (req, res, next) => {
  try {
    var token = req.cookies.Leaders;

    const verifyToken = jwt.verify(token, process.env.TOKEN_KEY);

    const userFound = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!userFound) {
      throw new Error("User Not Found");
    }
    req.token = token;
    req.userFound = userFound;
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = authenticate;
