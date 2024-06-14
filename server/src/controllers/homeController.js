const homeService = require("../services/homeService");
const homeController = {
  register: async (req, res) => {
    try {
      var { username, password, confirmPassword, email } = req.body;
      username = username.trim();
      password = password.trim();
      confirmPassword = confirmPassword.trim();
      email = email.trim();
      if (!/^[a-zA-Z0-9]*$/.test(username)) {
        zres.json({
          status: "ERR",
          message: "Invalid username fields!",
        });
      } else if (!/^[\w-\.]+@([\w-]+\.+[\w-]{2,4})$/.test(email)) {
        res.json({
          status: "ERR",
          message: "Invalid email!",
        });
      } else if (password !== confirmPassword) {
        res.json({
          status: "ERR",
          message: "Password and confirm password are not match!",
        });
      }
      const respone = await homeService.register(req.body);

      return res.status(200).json(respone);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  login: async (req, res) => {
    try {
      var { username, password } = req.body;
      username = username.trim();
      password = password.trim();

      if (!/^[a-zA-Z0-9]*$/.test(username)) {
        return res.json({
          status: "ERR",
          message: "Invalid username fields!",
        });
      }

      const response = await homeService.login({ username, password });
      const { refreshToken, ...newRespone } = response;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, //delop chuyen thanh true
        sameSite: "strict",
      });
      return res.status(200).json(newRespone);
    } catch (err) {
      return res.status(500).json({
        status: "ERR",
        message: "An error occurred!",
        error: err.message,
      });
    }
  },
};

module.exports = homeController;
