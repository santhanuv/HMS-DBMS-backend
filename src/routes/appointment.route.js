const appointmentController = require("../controllers/appointment.controller");
const router = require("express").Router();

router.post("/", appointmentController.createAppointmentHandler);

module.exports = router;
