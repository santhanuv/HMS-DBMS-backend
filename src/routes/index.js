const patientRouter = require("../routes/patient.route");
const userRouter = require("../routes/user.route");
const sessionRouter = require("../routes/session.route");
const staffRouter = require("../routes/staff.route");

module.exports = (app) => {
  app.use("/patients", patientRouter);
  app.use("/users", userRouter);
  app.use("/sessions", sessionRouter);
  app.use("/staffs", staffRouter);
};
