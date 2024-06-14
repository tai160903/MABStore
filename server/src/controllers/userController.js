const userService = require("../services/userService");
const jwtService = require("../services/jwtService");
const userController = {
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const data = req.body;
      if (!userId) {
        return res.json({
          status: "ERR",
          message: "The userId is required",
        });
      }
      const response = await userService.updateUser(userId, data);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: "ERR",
        message: "An error occurred!",
        error: err.message,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        return res.json({
          status: "ERR",
          message: "The userId is required",
        });
      }
      const response = await userService.deleteUser(userId);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: "ERR",
        message: "An error occurred!",
        error: err.message,
      });
    }
  },

  getAllUser: async (req, res) => {
    try {
      const response = await userService.getAllUser();
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: "ERR",
        message: "An error occurred!",
        error: err.message,
      });
    }
  },

  detailUser: async (req, res) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        return res.json({
          status: "ERR",
          message: "The userId is required",
        });
      }
      const response = await userService.detailUser(userId);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: "ERR",
        message: "An error occurred!",
        error: err.message,
      });
    }
  },

  refreshToken: async (req, res) => {
    console.log("req.cookies.refreshToken", req.cookies.refreshToken);
    try {
      const token = req.cookies.refreshToken;
      if (!token) {
        return res.json({
          status: "ERR",
          message: "The token is required",
        });
      }
      const response = await jwtService.refreshToken(token);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: "ERR",
        message: "An error occurred!",
        error: err.message,
      });
    }
  },
};
module.exports = userController;
