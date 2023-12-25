const createHttpError = require("http-errors");
const UserModal = require("../../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../../services/token");
require("dotenv").config({ path: ".env" });

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // basic auth

    if (!email || !password) {
      throw createHttpError.NotFound("Required Fields not Found");
    }

    const users = await UserModal.find({ email: email });

    if (users.length === 0) {
      throw createHttpError.NotFound("Not Registered");
    }

    // const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));

    let user = users[0];
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw createHttpError.NotFound("Password is Wrong");
    }

    let response = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const { accessToken, refreshToken } = generateToken(response);

    res.status(200).json({
      success: true,
      message: "User logged in Succuesfully",
      data: response,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
