const patientRouter = require("../routes/patient.route");
const userRouter = require("../routes/user.route");
const sessionRouter = require("../routes/session.route");
const staffRouter = require("../routes/staff.route");
const districtRotuer = require("../routes/district.route");
const genderRouter = require("../routes/gender.route");
const rolesRouter = require("../routes/roles.route");
const atsRouter = require("../routes/ATS.route");
const appointmentRouter = require("../routes/appointment.route");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("Welcome To HMS-DBMS");
  });
  app.use("/patients", patientRouter);
  app.use("/users", userRouter);
  app.use("/sessions", sessionRouter);
  app.use("/staffs", staffRouter);
  app.use("/districts", districtRotuer);
  app.use("/genders", genderRouter);
  app.use("/roles", rolesRouter);
  app.use("/ats", atsRouter);
  app.use("/appointments", appointmentRouter);
};
