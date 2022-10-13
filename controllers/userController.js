const { userService } = require("../services");

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const accessToken = await userService.signIn(email, password);

  res.status(200).json({ accessToken });
};

const signUp = async (req, res) => {
  try {
    const { email, password, name, group } = req.body;

    if (!name || !email || !password || !group) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }
    if (group === 1 || group === 2) {
      const error = new Error("INVALID_VALUE");
      error.statusCode = 409;
      throw error;
    }

    await userService.signUp(name, email, password, group);

    return res.status(201).json({ message: "회원가입 완료!" });
  } catch (err) {
    console.log(err);
    return res.status(statusCode || 500).json({ message: err.message });
  }
};

const apply = async (req, res) => {
  try {
    const { email, postId } = req.params;

    if (!email || !postId) {
      const err = new Error("Key Error");
      err.statusCode = 400;
      throw err;
    }
    await userService.apply(email, postId);

    return res.status(201).json({ message: "지원 성공" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signIn,
  signUp,
};
