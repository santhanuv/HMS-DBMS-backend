const sessionController = require("../controllers/session.controller");
const router = require("express").Router();

router.post("/", sessionController.createSessionHandler);
router.get("/refresh-token", sessionController.refreshTokenHandler);
router.delete("/", sessionController.delteSessionHandler);

module.exports = router;
