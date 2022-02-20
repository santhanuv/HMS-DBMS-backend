const appointmentController = require("../controllers/appointment.controller");
const router = require("express").Router();

// router.get("/", appointmentController.getAllAppointmentsHandler);
router.post("/", appointmentController.createAppointmentHandler);
router.delete("/:id", appointmentController.deleteAppointmentHandler);

module.exports = router;
