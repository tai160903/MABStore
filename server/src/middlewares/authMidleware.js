const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authMidleware = (req, res, next) => {
  const tokenHeader = req.headers.token;
  if (!tokenHeader || typeof tokenHeader !== "string") {
    return res.status(401).json({
      message: "Authentication failed: No token provided.",
      status: "FAILED",
    });
  }

  const token = tokenHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Authentication failed: Invalid token format.",
      status: "FAILED",
    });
  }

  jwt.verify(token, process.env.ACCESSTOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authentication failed.",
        status: "FAILED",
      });
    }
    const { payload } = user;
    if (payload?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "The authentication failed.",
        status: "FAILED",
      });
    }
  });
};

module.exports = authMidleware;
