const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authMidleware = {
  admin: (req, res, next) => {
    const token = req.headers.token.split(" ")[1];
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
  },

  user: (req, res, next) => {
    const userId = req.params.id;
    const token = req.headers.token.split(" ")[1];
    jwt.verify(token, process.env.ACCESSTOKEN, function (err, user) {
      if (err) {
        return res.status(404).json({
          message: "The authentication failed.",
          status: "FAILED",
        });
      }
      const { payload } = user;
      if (payload?.isAdmin || payload?.id === userId) {
        next();
      } else {
        return res.status(404).json({
          message: "aaa .",
          status: "FAILED",
        });
      }
    });
  },
};

module.exports = authMidleware;
