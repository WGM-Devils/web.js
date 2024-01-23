// Project-Imports

const {
  createGroup,
  getGroup,
  deleteGroup,
  updateGroup,
  getGroupByCreator,
  joinGroup,
  leaveGroup,
} = require("../controller/groups");

// Exports

module.exports = (router) => {
  router.post("/api/groups/create/type=:type", createGroup);
  router.get("/api/groups/get/id=:id/type=:type", getGroup);
  router.get("/api/groups/all", getGroup);
  router.get("/api/groups/get/creator=:creator", getGroupByCreator);
  router.delete("/api/groups/delete/id=:id", deleteGroup);
  router.patch("/api/groups/update/id=:id/type=:type", updateGroup);
  router.post("/api/groups/join/id=:id/user=:userId", joinGroup);
  router.post("/api/groups/leave/id=:id/user=:userId", leaveGroup);
};
