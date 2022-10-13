const express = require("express");
const { postController } = require("../controllers");

const router = express.Router();

router.post("/posting", postController.posting);
//router.get("/:id") // detail조회
//router.get("/") //list 조회 //or search 기능 넣기
module.exports = router;
