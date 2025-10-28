const signToken = require("../helpers/signToken");
const User = require("../models/User");
const serviceAsyncWrapper = require("../helpers/serviceAsyncWrapper");
const AppError = require("../utils/AppError");
const StatusCodes = require("http-status-codes");
const bcrypt = require("bcrypt");
const responseMessage = require('../helpers/responseMessageHandler')

const authService = {
  register: serviceAsyncWrapper(async (req, res) => {
    const { email, password } = req.body;

    if (await User.findOne({ email })) {
      throw new AppError(
        "User with this email already exists.",
        StatusCodes.CONFLICT
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = User.create({email, password:hashedPassword});

    return newUser;
  }),

  login: serviceAsyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return responseMessage(
        res,
        "Invalid credentials.",
        null,
        StatusCodes.UNAUTHORIZED
      );
    }

    const token = await signToken({ id: user._id });
    const result = { token, userId: user._id };
    responseMessage(
      res,
      "Login successful. Token generated.",
      result,
      StatusCodes.OK
    );

    return { token, userId: user._id };
  }),
};

module.exports = authService;
