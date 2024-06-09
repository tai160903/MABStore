const userModel = require("../models/user");
const userService = {
  updateUser: (id, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checkUser = await userModel.findOne({ _id: id });
        console.log("checkUser", checkUser);
        if (checkUser === null) {
          return resolve({
            status: "FAILED",
            message: "Wrong username or password!",
          });
        }
        const updateUser = await userModel.findOneAndUpdate({ _id: id }, data, {
          new: true,
        });
        return resolve({
          status: "OK",
          message: "SUCCESS",
          data: updateUser,
        });
      } catch (error) {
        return reject({
          status: "FAILED",
          message: "An error occurred!",
          error: error.message,
        });
      }
    });
  },
};
module.exports = userService;
