const UserModal = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../../services/token");
require("dotenv").config({ path: ".env" });

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Encyption and Hashing
    // password as hashing

    // basic auth

    if (!firstName || !lastName || !email || !password) {
      throw createHttpError.NotFound("Required Fields not Found");
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));

    const newPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModal({
      firstName,
      lastName,
      email,
      password: newPassword,
    });

    const user = await newUser.save();

    let response = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const { accessToken, refreshToken } = generateToken(response);

    res.status(200).json({
      success: true,
      message: "User registered",
      data: response,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
