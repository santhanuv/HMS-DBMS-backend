const patientController = require("../controllers/patient.controller");
const appointmentController = require("../controllers/appointment.controller");
const router = require("express").Router();
const createUser = require("../middleware/createUserMiddleware");

router.post("/", createUser, patientController.createPatientHandler);
router.get(
  "/appointments",
  appointmentController.getAllAppointmentsHandler("Patient")
);

module.exports = router;
