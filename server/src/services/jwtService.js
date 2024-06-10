const jwt = require("jsonwebtoken");
const genneralAccessToken = async (payload) => {
  const accessToken = jwt.sign(
    {
      payload,
    },
    process.env.ACCESSTOKEN,
    { expiresIn: "1d" }
  );
  return accessToken;
};

const genneralRefreshToken = async (payload) => {
  const refreshToken = jwt.sign(
    {
      payload,
    },
    process.env.REFRESHTOKEN,
    { expiresIn: "365d" }
  );
  return refreshToken;
};

const refreshToken = async (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("token", token);
      jwt.verify(token, process.env.REFRESHTOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: "FAILED",
            message: "THe authemtication",
          });
        }
        const { payload } = user;
        const accessToken = await genneralAccessToken({
          id: payload?.id,
          isAdmin: payload?.isAdmin,
        });
        console.log("accessToken", accessToken);
        resolve({
          status: "OK",
          message: "SUCCESS",
          accessToken: accessToken,
        });
      });
    } catch (error) {
      reject({
        status: "FAILED",
        message: "An error occurred!",
        error: error.message,
      });
    }
  });
};
module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
  refreshToken,
};
