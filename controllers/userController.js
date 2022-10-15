const { userService } = require("../services");

const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!name || !email || !password) {
      const error = new Error("Key_Error");
      error.statusCode = 400;
      throw error;
    }

    await userService.signUp(name, email, password);

    return res.status(201).json({ message: "회원가입 완료!" });
  } catch (err) {
    console.log(err);
    return res.status(statusCode || 500).json({ message: err.message });
  }
};

const apply = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    if (!userId || !postId) {
      const err = new Error("Key Error");
      err.statusCode = 400;
      throw err;
    }

    const result = await userService.apply(userId, postId);
    if (!result) {
      const err = new Error("Not_Found");
      err.statusCode = 404;
      throw err;
    }
    return res.status(201).json({
      message: "지원에 성공했습니다.",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  apply,
};
