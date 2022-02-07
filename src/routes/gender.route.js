const genderRouter = require("../controllers/gender.controller");
const router = require("express").Router();

router.get("/", genderRouter.getAllGenderHandler);

module.exports = router;
