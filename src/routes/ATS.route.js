const ATSController = require("../controllers/ATS.controller");
const router = require("express").Router();

router.get("/available", ATSController.getAvailableATSHandler);

module.exports = router;
