const jwt = require("jsonwebtoken");
const { createError } = require("./createError");

const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  //  console.log('token: ', token);
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  jwt.verify(token, "shhhhh", (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid!"));
    }
    req.user = user;
    // console.log("user: ", user);
    return next();
  });
};

module.exports = { verifyUser };
