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
  router.get("/api/posts/all", getAllPosts);
  router.get("/api/posts/get/id=:id/type=:type", getPost);
  router.delete("/api/posts/delete/postId=:postId/userId=:userId", deletePost);
  router.patch("/api/posts/update/id=:id/type=:type", updatePost);
  router.post("/api/posts/create", createPost);
  router.post("/api/posts/like/postId=:postId/userId=:userId", likePost);
  router.delete("/api/posts/unlike/postId=:postId/userId=:userId", unlikePost);
  router.post("/api/posts/viewed/postId=:postId/userId=:userId", viewedPost);
};
