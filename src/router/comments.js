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
  router.post("/comments/create", createComment);
  router.get("/comments/all/", getAllComments);
  router.get("/comments/get/commentId=:commentId/type=:type/", getComment);
  router.get("/comments/all/post/postId=:postId", getAllCommentsByPostId);
  router.get("/comments/all/creator/creator=:userId", getAllCommentsByCreator);
  router.patch(
    "/comments/update/commentId=:commentId/userId=:userId",
    updateComment
  );
  router.delete(
    "/comments/delete/commentId=:commentId/postId=:postId/user=:userId",
    deleteComment
  );
  router.post(
    "/comments/like/commentId=:commentId/userId=:userId",
    likeComment
  );
  router.delete(
    "/comments/unlike/commentId=:commentId/userId=:userId",
    likeComment
  );
};
