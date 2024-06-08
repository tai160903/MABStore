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
};

module.exports = homeController;
