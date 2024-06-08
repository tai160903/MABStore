const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const homeService = {
  register: (newUser) => {
    return new Promise(async (resolve, reject) => {
      var { username, password, confirmPassword, email } = newUser;

      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createUser = await userModel.create({
          username,
          password: hashedPassword,
          confirmPassword,
          email,
        });
        if (createUser) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: createUser,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = homeService;
