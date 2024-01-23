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
  router.get("/userEvents/all", getAllUserEvents);
  router.get("/userEvents/all/creator=:creator", getAllUserEventsByCreator);
  router.get("/userEvents/get/id=:id/type=:type", getUserEvent);
  router.delete("/userEvents/delete/id=:id", deleteUserEvent);
  router.patch("/userEvents/update/id=:id/type=:type", updateUserEvent);
  router.post("/userEvents/create", createUserEvent);
};
