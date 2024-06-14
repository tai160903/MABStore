const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./jwtService");
const homeService = {
  register: (newUser) => {
    return new Promise(async (resolve, reject) => {
      var { username, password, email } = newUser;
      try {
        const checkUser = await userModel.findOne({ username: username });
        if (checkUser) {
          return resolve({
            status: "ERR",
            message: "Username is already exist",
          });
        }

        const checkUserEmail = await userModel.findOne({ email: email });
        if (checkUserEmail) {
          return resolve({
            status: "ERR",
            message: "Email is already exist",
          });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createUser = await userModel.create({
          username,
          password: hashedPassword,
          email,
        });
        if (createUser) {
          return resolve({
            status: "OK",
            message: "SUCCESS",
            data: createUser,
          });
        } else {
          return resolve({
            status: "ERR",
            message: "User creation failed",
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
            status: "ERR",
            message: "Wrong username or password!",
          });
        }
        const comparePassword = bcrypt.compareSync(
          password,
          checkUser.password
        );
        if (!comparePassword) {
          return resolve({
            status: "ERR",
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
        await userModel.findByIdAndUpdate(
          { _id: checkUser.id },
          { accessToken, refreshToken }
        );
        return resolve({
          status: "OK",
          message: "SUCCESS",
          accessToken,
          refreshToken,
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

module.exports = homeService;
