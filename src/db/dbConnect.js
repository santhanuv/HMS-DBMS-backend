const { Sequelize } = require("sequelize");
const NODE_ENV = process.env.NODE_ENV || "development";
const config = require("./config")[NODE_ENV];
const logger = require("../utils/logger");

const checkConnection = async (sequelize) => {
  try {
    await sequelize.authenticate();
    logger.info("Connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
};

module.exports = function dbConnect() {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.options
  );
  return sequelize;
};
