const { User, Post } = require("../models");

const signUp = async (email, password, name, group) => {
  const user = await User.create({
    email: email,
    password: password,
    name: name,
    group: group,
  });
};

const apply = async (email, postId) => {
  // 지원자 회원여부 확인
  // 지원자 이미 공고한 이력이 있는지 확인
  // 존재하는 공고인지 확인
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  const post = await Post.findOne({
    where: {
      id: postId,
    },
  });

  if (!user) {
    const error = new Error("UnAuthenticated");
    error.message = "Invalid_User";
    error.statusCode = 401;
    throw error;
  }
  if (user.group !== 1) {
    const error = new Error("Forbidden");
    error.message = "Forbidden_Request";
    error.statusCode = 403;
    throw error;
  }
  if (!post) {
    const error = new Error("NotFound");
    error.message = "Not_Found";
    error.statusCode = 404;
    throw error;
  }
  await User.addApply({
    postId: post,
  });
};
module.exports = {
  signUp,
  apply,
};
