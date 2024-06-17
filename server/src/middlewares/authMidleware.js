const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authMidleware = {
  // admin: (req, res, next) => {
  //   const token = req.headers.token?.split(" ")[1];
  //   jwt.verify(token, process.env.ACCESSTOKEN, function (err, user) {
  //     if (err) {
  //       return res.status(404).json({
  //         message: "The authentication failed.",
  //         status: "FAILED",
  //       });
  //     }
  //     if (user?.isAdmin) {
  //       next();
  //     } else {
  //       return res.status(404).json({
  //         message: "The authentication failed.",
  //         status: "FAILED",
  //       });
  //     }
  //   });
  // },
  // admin: (req, res, next) => {
  //   const token = req.headers.token?.split(" ")[1];
  //   if (!token) {
  //     return res.status(401).json({
  //       message: "No token provided.",
  //       status: "FAILED",
  //     });
  //   }

  //   jwt.verify(token, process.env.ACCESSTOKEN, (err, user) => {
  //     if (err) {
  //       return res.status(401).json({
  //         message: "Invalid token.",
  //         status: "FAILED",
  //       });
  //     }
  //     if (user?.isAdmin) {
  //       next();
  //     } else {
  //       return res.status(403).json({
  //         message: "Access denied.",
  //         status: "FAILED",
  //       });
  //     }
  //   });
  // },

  admin: (req, res, next) => {
    const token = req.headers.token?.split(" ")[1]; // Kiểm tra header 'token'
    if (!token) {
      return res.status(401).json({
        message: "No token provided.",
        status: "FAILED",
      });
    }

    jwt.verify(token, process.env.ACCESSTOKEN, (err, user) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token.",
          status: "FAILED",
        });
      }
      if (user?.isAdmin) {
        next();
      } else {
        return res.status(403).json({
          message: "Access denied.",
          status: "FAILED",
        });
      }
    });
  },

  user: (req, res, next) => {
    const userId = req.params.id;
    const token = req.headers.token?.split(" ")[1];
    jwt.verify(token, process.env.ACCESSTOKEN, function (err, user) {
      if (err) {
        return res.status(404).json({
          message: "The authentication failed.",
          status: "ERR",
        });
      }
      if (user?.isAdmin || user?.id === userId) {
        next();
      } else {
        return res.status(404).json({
          message: "The authentication failed.",
          status: "ERR",
        });
      }
    });
  },
};

module.exports = authMidleware;
