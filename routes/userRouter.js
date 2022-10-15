const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/apply", userController.apply); //회사 지원
module.exports = router;
