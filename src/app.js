process.env.NODE_ENV !== "production" && require("dotenv").config();
const express = require("express");
const logger = require("./utils/logger");
const dbConnect = require("./db/dbConnect");

const app = express();
const env = process.env;

// Connect to Database - mysql
async function start() {
  const sequelize = await dbConnect();

  try {
    app.listen(env.PORT || 5000, () =>
      logger.info(`Server started at http://${env.HOST}:${env.PORT}`)
    );
  } catch (e) {
    logger.fatal(`SERVER CRASHED - ERROR: ${e.message}`);
  }
  const models = require("./models")(sequelize);
}

start();
