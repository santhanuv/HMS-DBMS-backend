const router = require("express").Router();
const staffController = require("../controllers/staff.controller");
const departmentController = require("../controllers/department.controller");
const appointmentController = require("../controllers/appointment.controller");
const createUser = require("../middleware/createUserMiddleware");
const validateNewStaff = require("../middleware/validateNewStaff");

router.post(
  "/",
  validateNewStaff,
  createUser,
  staffController.createStaffHandler
);
router.post("/invitation", staffController.InviteStaffHandler);
router.get("/confirmation/:token", staffController.confirmInvitation);
router.get("/departments", departmentController.getAllDepartmentsHandler);
router.get("/doctors", staffController.getDoctorsHandler);
router.get(
  "/doctors/appointments",
  appointmentController.getAllAppointmentsHandler("Doctor")
);
router.get(
  "/doctors/appointments/latest",
  appointmentController.getLatestAppointments("Doctor")
);

module.exports = router;
