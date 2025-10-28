const { StatusCodes } = require("http-status-codes");
const responseMessage = require("../helpers/responseMessageHandler");

const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    console.log(error.name === "ZodError");
    if (
      error.name === "ZodError" ||
      error instanceof z.ZodError
    ) {
      const errorMessages = JSON.parse(error).map((issue) => issue.message);

      return res.status(StatusCodes.BAD_REQUEST).json({
        isSuccess: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Validation failed`,
        details: errorMessages
      });
    }

    next(error);
  }
};

module.exports = validateSchema;
