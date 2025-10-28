const { StatusCodes } = require("http-status-codes");
const controllerAsyncWrapper = require("../helpers/controllerAsyncWrapper");
const responseMessage = require("../helpers/responseMessageHandler");
const authService = require("../services/auth.service");

const authController = {
  register: controllerAsyncWrapper(async (req, res) => {
    await authService.register(req, res);
    responseMessage(
      res,
      "User registered successfully.",
      null,
      StatusCodes.CREATED
    );
  }),

  login: controllerAsyncWrapper(async (req, res) => {
    const result = await authService.login(req, res);
    responseMessage(
      res,
      "Login successful. Token generated.",
      result,
      StatusCodes.OK
    );
  }),
};

module.exports = authController;
