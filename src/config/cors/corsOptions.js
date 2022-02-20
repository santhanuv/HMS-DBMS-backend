const whiteList = require("./whiteList");
const corsOptions = {
  origin: (origin, callback) => {
    console.log("origin: ", origin);
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

module.exports = corsOptions;
