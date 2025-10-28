const jwt = require("jsonwebtoken");
const {
  jwt_token_secret,
  jwt_token_expiresIn,
} = require("../config/auth.config");


const signToken = async (data) => {
  return jwt.sign({ ...data }, jwt_token_secret, {
    expiresIn: jwt_token_expiresIn + "h",
  });
};

module.exports = signToken;
