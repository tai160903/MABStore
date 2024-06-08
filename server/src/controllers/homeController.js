const homeService = require("../services/homeService");

const homeController = {
  register: async (req, res) => {
    try {
      console.log(res.body);
      const res = await homeService.register;
      return res.status(200).json(res.body);
    } catch (error) {
      return res.status(404).json(error);
    }
  },
};

module.exports = homeController;
