const districtController = require("../controllers/district.controller");
const router = require("express").Router();

router.get("/", districtController.getAllDistrictHandler);

module.exports = router;
