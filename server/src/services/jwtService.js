const jwt = require("jsonwebtoken");
const genneralAccessToken = (payload) => {
  console.log("payload", payload);
  const accessToken = jwt.sign(
    {
      payload,
    },
    "accessToken",
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
    "refreshToken",
    { expiresIn: "365d" }
  );
  return refreshToken;
};
module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
};
