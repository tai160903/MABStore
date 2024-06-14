const jwt = require("jsonwebtoken");
const genneralAccessToken = async (payload) => {
  const accessToken = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESSTOKEN,
    { expiresIn: "30s" }
  );
  return accessToken;
};

const genneralRefreshToken = async (payload) => {
  const refreshToken = jwt.sign(
    {
      ...payload,
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
            status: "ERR",
            message: "THe authemtication",
          });
        }
        const accessToken = await genneralAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
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
        status: "ERR",
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
