const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const responseMessage = require('../helpers/responseMessageHandler');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return responseMessage(res, 'Authorization header missing or invalid', null, StatusCodes.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];


    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        
        req.user = decoded; 
        
        next(); 
    } catch (err) {
        return responseMessage(res, 'Token is not valid or has expired.', null, StatusCodes.UNAUTHORIZED);
    }
};

module.exports = authMiddleware;