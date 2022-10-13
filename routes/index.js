const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");

// 여기에 하나씩 만들고 미들웨어 장착할 것!
router.use("/users", userRouter);
router.use("/posts", postRouter);
module.exports = router;
