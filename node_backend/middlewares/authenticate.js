const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to authenticate incoming requests using JWT.
const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ msg: "Invalid token, please login again" });
      } else {
        const userID = decoded.userID;

        // Attach the userID to the request object for use in subsequent middleware/routes.
        req.userID = userID;

        // Proceed to the next middleware/route.
        next();
      }
    });
  } else {
    res.status(401).json({ msg: "Authorization token required" });
  }
};

module.exports = { authenticate };
