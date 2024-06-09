const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./jwtService");
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

  login: (userLogin) => {
    return new Promise(async (resolve, reject) => {
      var { username, password } = userLogin;

      try {
        const checkUser = await userModel.findOne({ username: username });
        if (checkUser === null) {
          return resolve({
            status: "FAILED",
            message: "Wrong username or password!",
          });
        }
        const comparePassword = bcrypt.compareSync(
          password,
          checkUser.password
        );
        if (!comparePassword) {
          return resolve({
            status: "FAILED",
            message: "Wrong username or password!",
          });
        }
        const accessToken = await genneralAccessToken({
          id: checkUser._id,
          isAdmin: checkUser.isAdmin,
        });
        const refreshToken = await genneralRefreshToken({
          id: checkUser._id,
          isAdmin: checkUser.isAdmin,
        });
        console.log("accessToken", accessToken);
        return resolve({
          status: "OK",
          message: "SUCCESS",
          accessToken,
          refreshToken,
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

module.exports = homeService;
