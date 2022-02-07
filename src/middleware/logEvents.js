const logger = require("../utils/logger");

module.exports = (req, res, next) => {
  logger.info(
    `\nMethod:${req.method}\nOrigin:${req.headers.origin}\nURL:${req.url}`
  );
  next();
};
