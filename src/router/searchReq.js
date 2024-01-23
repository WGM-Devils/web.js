// Project-Imports

const {
  getAllSearchReqs,
  createSearchReq,
  deleteSearchReq,
  getSearchReq,
  getAllSearchReqsByCreator,
  updateSearchReq,
} = require("../controller/searchReq");
// Exports

module.exports = (router) => {
  router.get("/searchReqs/all", getAllSearchReqs);
  router.get("/searchReqs/get/id=:id/type=:type", getSearchReq);
  router.get("/searchReqs/get/creator=:creator", getAllSearchReqsByCreator);
  router.delete("/searchReqs/delete/id=:id", deleteSearchReq);
  router.patch("/searchReqs/update/id=:id/type=:type", updateSearchReq);
  router.post("/searchReqs/create/type=:type", createSearchReq);
};
