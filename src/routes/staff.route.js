const router = require("express").Router();
const staffController = require("../controllers/staff.controller");
const createUserMiddleware = require("../middleware/createUserMiddleware");

router.post("/", createUserMiddleware, staffController.createStaffHandler);

module.exports = router;
