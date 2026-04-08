const jwt = require("jsonwebtoken");
require("dotenv").config();

/** Sets req.userID when a valid JWT cookie is present; otherwise continues as guest. */
function optionalAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return next();
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err && decoded?.userID) {
      req.userID = decoded.userID;
    }
    next();
  });
}

module.exports = { optionalAuth };
