const whiteList = require("../config/cors/whiteList");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (whiteList.indexOf(origin) > -1) {
    console.log("set cred");
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
