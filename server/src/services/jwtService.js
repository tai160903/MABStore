const jwt = require("jsonwebtoken");
const genneralAccessToken = (payload) => {
  const accessToken = jwt.sign(
    {
      payload,
    },
    process.env.ACCESSTOKEN,
    { expiresIn: "1h" }
  );
  return accessToken;
};
const genneralRefreshToken = (payload) => {
  console.log("payload", payload);
  const refreshToken = jwt.sign(
    {
      payload,
    },
    process.env.REFRESHTOKEN,
    { expiresIn: "365d" }
  );
  return refreshToken;
};
module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
};
