const db = require("../models/connectDB");
const { User } = require("../models");
const Apply = db.sequelize.models.Apply;

const signUp = async (email, password, name) => {
  const user = await User.create({
    email: email,
    password: password,
    name: name,
  });
};

const checkApply = async (userId) => {
  const applies = await Apply.count({
    where: {
      UserId: userId,
    },
  });

  return applies;
};

const apply = async (userId, postId) => {
  // Apply UserId 컬럼 유무로 유저가 지원한 이력이 있는지 확인
  const applyCount = await checkApply(userId);
  if (applyCount) {
    const err = new Error("이미 다른 곳에 지원하셨습니다.");
    err.statusCode = 401;
    throw err;
  }
  const applied = await Apply.create({
    UserId: userId,
    PostId: postId,
  });

  return applied;
};

module.exports = {
  signUp,
  apply,
};
