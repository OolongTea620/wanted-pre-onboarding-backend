const express = require("express");
const { postController } = require("../controllers");
const router = express.Router();

router.post("/write", postController.writePost);
router.patch("/edit", postController.update);
router.delete("/delete/:postId", postController.deletePost);
router.get("/:postId", postController.getPostDetail); // detail조회
router.get("/", postController.getPostlist); //list 조회 //or search 기능 넣기

module.exports = router;
