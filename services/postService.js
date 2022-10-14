const { Op } = require("sequelize");
const { Post, Company } = require("../models");

const create = async (position, description, heagin, skill, companyId) => {
  const post = await Post.create({
    position: position,
    description: description,
    haegin: heagin,
    skill: skill,
    recruiter: companyId,
  });
  return post;
};

const updatePost = async (id, values) => {
  query = { where: { id: id } };
  const result = await Post.update(values, query);
  if (!result) {
    error = new Error("NotFound");
    error.statusCode = 404;
    throw error;
  }
  const editPost = Post.findOne(query);

  return editPost;
};

const deletePost = async (postId) => {
  // hard Delete
  const post = await Post.destroy({
    where: {
      id: postId,
    },
  });
};

const getPostList = async (queries, companyId = undefined) => {
  let query = {
    attributes: { exclude: ["description"] },
    include: [{ model: Company, attributes: ["name", "address"] }],
    order: [["createdAt", "DESC"]],
  };

  if (companyId) {
    delete query.include;
    query.where = { recruiter: companyId };
  }

  if ("search" in queries && queries.search) {
    console.log("search");
    query.where = {
      [Op.or]: [
        { position: { [Op.like]: `%${queries.search}%` } },
        { skill: { [Op.like]: `%${queries.search}%` } },
      ],
    };
  }

  const posts = await Post.findAll(query);

  if (companyId) {
    const others = posts.map(({ id }) => id);
    return others;
  }

  return posts;
};

const getPostOne = async (postId) => {
  const post = await Post.findOne({
    include: [{ model: Company, attributes: ["name", "address"] }],
    where: {
      id: postId,
    },
  });

  if (!post) {
    const error = new Error("Not_Found");
    error.ststusCode = 404;
    throw error;
  }

  const others = await getPostList({}, post.recruiter);

  return { post, others };
};

const deletePostOne = async (postId) => {
  const result = await Post.destroy({
    where: {
      id: postId,
    },
  });
  return result;
};
module.exports = { create, getPostList, getPostOne, updatePost, deletePostOne };
