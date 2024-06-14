const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

const userService = {
  updateUser: (id, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checkUser = await userModel.findOne({ _id: id });
        console.log("checkUser", checkUser);
        if (checkUser === null) {
          return resolve({
            status: "ERR",
            message: "Wrong username or password!",
          });
        }
        const updateUser = await userModel.findByIdAndUpdate(
          { _id: id },
          data,
          {
            new: true,
          }
        );
        return resolve({
          status: "OK",
          message: "SUCCESS",
          data: updateUser,
        });
      } catch (error) {
        return reject({
          status: "ERR",
          message: "An error occurred!",
          error: error.message,
        });
      }
    });
  },

  deleteUser: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checkUser = await userModel.findOne({ _id: id });
        console.log("checkUser", checkUser);
        if (checkUser === null) {
          return resolve({
            status: "ERR",
            message: "Wrong username or password!",
          });
        }
        await userModel.findByIdAndDelete(
          { _id: id },
          {
            new: true,
          }
        );
        return resolve({
          status: "OK",
          message: "SUCCESS",
        });
      } catch (error) {
        return reject({
          status: "ERR",
          message: "An error occurred!",
          error: error.message,
        });
      }
    });
  },

  getAllUser: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allUser = await userModel.find();
        return resolve({
          status: "OK",
          message: "SUCCESS",
          data: allUser,
        });
      } catch (error) {
        return reject({
          status: "ERR",
          message: "An error occurred!",
          error: error.message,
        });
      }
    });
  },

  detailUser: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await userModel.findOne({ _id: id });
        if (user === null) {
          return resolve({
            status: "ERR",
            message: "Can not find user!",
          });
        }

        return resolve({
          status: "OK",
          message: "SUCCESS",
          data: user,
        });
      } catch (error) {
        return reject({
          status: "ERR",
          message: "An error occurred!",
          error: error.message,
        });
      }
    });
  },
};
module.exports = userService;
