const sessionController = require("../controllers/session.controller");
const router = require("express").Router();

router.get("/healthcheck", (req, res) => res.sendStatus(200));
router.get("/refresh-token", sessionController.refreshTokenHandler);
router.post("/", sessionController.createSessionHandler);

module.exports = router;
