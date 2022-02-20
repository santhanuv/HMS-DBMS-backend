const transport = {
  options: {
    colorize: true,
    translateTime: true,
  },
};
process.env.NODE_ENV !== "production" && (transport.target = "pino-pretty");

const logger = require("pino")({
  transport,
});
module.exports = logger;
