// Project-Imports

const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controller/users");

// Exports

module.exports = (router) => {
  router.get("/users/all", getAllUsers);
  router.get("/users/get/id=:id/type=:type", getUser);
  router.delete("/users/delete/id=:id", deleteUser);
  router.patch("/users/update/id=:id/type=:type", updateUser);
};
