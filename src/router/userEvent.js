// Project-Imports

const {
  getAllUserEvents,
  getAllUserEventsByCreator,
  getUserEvent,
  deleteUserEvent,
  updateUserEvent,
  createUserEvent,
} = require("../controller/userEvent");

// Code + Exports

module.exports = (router) => {
  router.get("/api/userEvents/all", getAllUserEvents);
  router.get("/api/userEvents/all/creator=:creator", getAllUserEventsByCreator);
  router.get("/api/userEvents/get/id=:id/type=:type", getUserEvent);
  router.delete("/api/userEvents/delete/id=:id", deleteUserEvent);
  router.patch("/api/userEvents/update/id=:id/type=:type", updateUserEvent);
  router.post("/api/userEvents/create", createUserEvent);
};
