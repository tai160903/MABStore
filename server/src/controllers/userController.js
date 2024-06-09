const userService = require("../services/userService");

const userController = {
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const data = req.body;
      if (!userId) {
        return res.json({
          status: "FAILED",
          message: "The userId is required",
        });
      }
      const response = await userService.updateUser(userId, data);
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
module.exports = userController;
