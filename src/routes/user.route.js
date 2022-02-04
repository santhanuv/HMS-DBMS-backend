const userController = require("../controllers/user.controller");
const router = require("express").Router();

router.get("/healthcheck", (req, res) => res.sendStatus(200));
router.get("/:id", userController.getUserByIdHandler);
router.post("/", userController.createUserHandler);

module.exports = router;
