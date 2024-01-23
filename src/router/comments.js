// Project-Imports

const {
  createComment,
  getAllComments,
  getComment,
  getAllCommentsByPostId,
  getAllCommentsByCreator,
  updateComment,
  deleteComment,
  likeComment,
} = require("../controller/comments");

// Exports

module.exports = (router) => {
  router.post("/api/comments/create", createComment);
  router.get("/api/comments/all/", getAllComments);
  router.get("/api/comments/get/commentId=:commentId/type=:type/", getComment);
  router.get("/api/comments/all/post/postId=:postId", getAllCommentsByPostId);
  router.get(
    "/api/comments/all/creator/creator=:userId",
    getAllCommentsByCreator
  );
  router.patch(
    "/api/comments/update/commentId=:commentId/userId=:userId",
    updateComment
  );
  router.delete(
    "/api/comments/delete/commentId=:commentId/postId=:postId/user=:userId",
    deleteComment
  );
  router.post(
    "/api/comments/like/commentId=:commentId/userId=:userId",
    likeComment
  );
  router.delete(
    "/api/comments/unlike/commentId=:commentId/userId=:userId",
    likeComment
  );
};
