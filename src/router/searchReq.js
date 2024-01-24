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
  router.get("/api/searchReqs/all", getAllSearchReqs);
  router.get("/api/searchReqs/get/id=:id/type=:type", getSearchReq);
  router.get("/api/searchReqs/get/creator=:creator", getAllSearchReqsByCreator);
  router.delete("/api/searchReqs/delete/id=:id", deleteSearchReq);
  router.patch("/api/searchReqs/update/id=:id/type=:type", updateSearchReq);
  router.post("/api/searchReqs/create/type=:type", createSearchReq);
};
