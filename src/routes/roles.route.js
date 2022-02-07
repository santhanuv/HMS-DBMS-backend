const roleController = require("../controllers/roles.controller");
const router = require("express").Router();

router.get("/", roleController.getAllRolesHandler);

module.exports = router;
