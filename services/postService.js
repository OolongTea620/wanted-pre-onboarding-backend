const { Post } = require("../models");

const writePost = async () => {
  const post = await Post.create({
    postion: postion,
    description: description,
    haegin: heagin,
    skill: skill,
    writer: userId,
  });
};

const updatePost = async () => {
  const post = Post.update();
};

const deletePost = async () => {
  // hard Delete
  const post = await Post.delete();
};

const getPostList = async () => {
  // 포스트 리스트 반환함
};

const getPostOne = async () => {
  //포스트 디테일 반환
};

module.exports = { writePost };
