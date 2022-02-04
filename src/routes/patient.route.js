const patientController = require("../controllers/patient.controller");
const router = require("express").Router();
const createUser = require("../middleware/createUserMiddleware");

router.post("/", createUser, patientController.createPatientHandler);

module.exports = router;
