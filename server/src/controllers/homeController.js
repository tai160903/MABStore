// const bcrypt = require("bcrypt");
const homeService = require("../services/homeService");
// const userModel = require("../models/user");
const homeController = {
  register: async (req, res) => {
    try {
      var { username, password, confirmPassword, email } = req.body;
      username = username.trim();
      password = password.trim();
      confirmPassword = confirmPassword.trim();
      email = email.trim();
      if (!/^[a-zA-Z0-9]*$/.test(username)) {
        res.json({
          status: "FAILED",
          message: "Invalid username fields!",
        });
      } else if (!/^[\w-\.]+@([\w-]+\.+[\w-]{2,4})$/.test(email)) {
        res.json({
          status: "FAILED",
          message: "Invalid email!",
        });
      } else if (password !== confirmPassword) {
        res.json({
          status: "FAILED",
          message: "Password and confirm password are not match!",
        });
      }
      const respone = await homeService.register(req.body);
      return res.status(200).json(respone);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // login: async (req, res) => {
  //   try {
  //     var { username, password, confirmPassword, email } = req.body;
  //     username = username.trim();
  //     password = password.trim();
  //     confirmPassword = confirmPassword.trim();
  //     email = email.trim();
  //     if (!/^[a-zA-Z0-9]*$/.test(username)) {
  //       res.json({
  //         status: "FAILED",
  //         message: "Invalid username fields!",
  //       });
  //     } else if (!/^[\w-\.]+@([\w-]+\.+[\w-]{2,4})$/.test(email)) {
  //       res.json({
  //         status: "FAILED",
  //         message: "Invalid email!",
  //       });
  //     } else if (password !== confirmPassword) {
  //       res.json({
  //         status: "FAILED",
  //         message: "Password and confirm password are not match!",
  //       });
  //     }
  //     const respone = await homeService.login(req.body);
  //     return res.status(200).json(respone);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },

  login: async (req, res) => {
    try {
      var { username, password } = req.body;
      username = username.trim();
      password = password.trim();

      if (!/^[a-zA-Z0-9]*$/.test(username)) {
        return res.json({
          status: "FAILED",
          message: "Invalid username fields!",
        });
      }

      const response = await homeService.login({ username, password });
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: "FAILED",
        message: "An error occurred!",
        error: err.message,
      });
    }
  },
};

module.exports = homeController;
