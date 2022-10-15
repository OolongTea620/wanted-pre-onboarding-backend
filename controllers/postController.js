const { postService } = require("../services");

const writePost = async (req, res) => {
  const { position, description, heagin, skill, companyId } = req.body;
  if (!description || !companyId || !position) {
    const error = new Error("Key_Error");
    error.statusCode = 400;
    throw error;
  }

  const result = await postService.create(
    position,
    description,
    heagin,
    skill,
    companyId
  );
  return res.status(201).json({ message: result });
};

const getPostlist = async (req, res) => {
  const queries = { ...req.query };

  const posts = await postService.getPostList(queries);
  return res.status(200).json(posts);
};

const getPostDetail = async (req, res) => {
  const { postId } = req.params;

  const { post, others } = await postService.getPostOne(postId);
  return res.status(200).json({
    post,
    others,
  });
};

const update = async (req, res) => {
  const { id, ...values } = req.body;

  if (!id) {
    error = new Error("Key_Error");
    error.statusCode = 400;
    throw error;
  }

  const editPost = await postService.updatePost(id, values);
  return res.status(201).json({
    message: "success",
    result: editPost,
  });
};

const deletePost = async (req, res) => {
  const { postId } = req.params;

  const result = await postService.deletePostOne(postId);

  if (!result) {
    return res.status(404).json({
      result: "fail",
      message: "없거나 존재하지 않는 게시글 입니다.",
    });
  }

  return res.status(200).json({
    result: "success",
  });
};
module.exports = {
  writePost,
  getPostlist,
  getPostDetail,
  update,
  deletePost,
};
