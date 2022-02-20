process.env.NODE_ENV !== "production" && require("dotenv").config();
const logger = require("../utils/logger");
const env = process.env;

module.exports = {
  development: {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    options: {
      host: env.DB_HOST,
      dialect: "mysql",
      logging: (msg) => console.log(msg),
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  },
  production: {
    userName: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    options: {
      host: env.DB_HOST,
      dialect: "mysql",
      logging: (msg) => console.log(msg),
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  },
};
