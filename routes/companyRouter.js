const express = require("express");
const { companyController } = require("../controllers");
const router = express.Router();

router.post("/signup", companyController.signUp);

module.exports = router;
