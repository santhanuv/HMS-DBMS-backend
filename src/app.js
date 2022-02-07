process.env.NODE_ENV !== "production" && require("dotenv").config();
const express = require("express");
const logger = require("./utils/logger");
const dbConnect = require("./db/dbConnect");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const cors = require("cors");
const corsOptions = require("./config/cors/corsOptions");

const app = express();
const env = process.env;

async function start() {
  try {
    app.listen(env.PORT || 5000, () =>
      logger.info(`Server started at http://${env.HOST}:${env.PORT}`)
    );
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(credentials);
    app.use(cors(corsOptions));
    app.use(require("./middleware/deSerializeUser"));

    require("./routes/index")(app);
  } catch (e) {
    logger.fatal(`SERVER CRASHED - ERROR: ${e.message}\n ${e.stack}`);
  }
}

start();
