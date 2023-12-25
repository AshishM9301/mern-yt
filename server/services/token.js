const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const generateToken = (payload) => {
  const accessToken = jwt.sign({ data: payload }, process.env.SECRET, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign({ data: payload }, process.env.SECRET, {
    expiresIn: "2d",
  });

  return { accessToken, refreshToken };
};

module.exports = generateToken;
