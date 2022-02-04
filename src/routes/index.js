const patientRouter = require("../routes/patient.route");
const userRouter = require("../routes/user.route");
const sessionRouter = require("../routes/session.route");

module.exports = (app) => {
  app.use("/patients", patientRouter);
  app.use("/users", userRouter);
  app.use("/sessions", sessionRouter);
};
