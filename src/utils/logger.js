const transport = {
  options: {
    colorize: true,
    translateTime: true,
  },
};
process.env.NODE_ENV !== "production" && (transport.target = "pino-pretty");

const logger = require("pino")({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: true,
    },
  },
});
module.exports = logger;
