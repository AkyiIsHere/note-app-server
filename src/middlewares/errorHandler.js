const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message || 'Something went wrong on the server.';

    if (err.name === 'ValidationError') {
        statusCode = StatusCodes.BAD_REQUEST;
        const validationErrors = err.errors || {}; 
        message = `Validation failed: ${Object.values(validationErrors)
            .map(el => el.message)
            .join(', ')}`;
    } else if (err.name === 'CastError') {
        statusCode = StatusCodes.BAD_REQUEST;
        message = `Invalid format for ${err.path}: ${err.value}`;
    }

    if (process.env.NODE_ENV === 'production' && statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
        message = 'A critical server error occurred.';
    }
    console.log(message)
    res.status(statusCode).json({
        isSuccess: false,
        statusCode: statusCode,
        message: message,
    });
};

module.exports = errorHandler
