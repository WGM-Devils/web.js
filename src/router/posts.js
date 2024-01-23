// Project-Imports

const {
  getAllPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
  viewedPost,
  likePost,
  unlikePost,
} = require("../controller/posts");

// Exports
module.exports = (router) => {
  router.get("/posts/all", getAllPosts);
  router.get("/posts/get/id=:id/type=:type", getPost);
  router.delete("/posts/delete/postId=:postId/userId=:userId", deletePost);
  router.patch("/posts/update/id=:id/type=:type", updatePost);
  router.post("/posts/create", createPost);
  router.post("/posts/like/postId=:postId/userId=:userId", likePost);
  router.delete("/posts/unlike/postId=:postId/userId=:userId", unlikePost);
  router.post("/posts/viewed/postId=:postId/userId=:userId", viewedPost);
};
