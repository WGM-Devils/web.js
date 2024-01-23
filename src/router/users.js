// Project-Imports

const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controller/users");

// Exports

module.exports = (router) => {
  router.get("/api/users/all", getAllUsers);
  router.get("/api/users/get/id=:id/type=:type", getUser);
  router.delete("/api/users/delete/id=:id", deleteUser);
  router.patch("/api/users/update/id=:id/type=:type", updateUser);
};
