const requestIp = require("request-ip");

function logIpAddress(req, res, next) {
  const ipAddress = req.clientIp;
  next();
}

module.exports = { logIpAddress };
