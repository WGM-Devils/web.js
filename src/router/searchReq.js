// Project-Imports

import {
  getAllSearchReqs,
  getAllSearchReqsByCreator,
  getSearchReq,
  updateSearchReq,
  createSearchReq,
  deleteSearchReq,
} from "../controller/searchReq";

// Exports

export default (router) => {
  router.get("/searchReqs/all", getAllSearchReqs);
  router.get("/searchReqs/get/id=:id/type=:type", getSearchReq);
  router.get("/searchReqs/get/creator=:creator", getAllSearchReqsByCreator);
  router.delete("/searchReqs/delete/id=:id", deleteSearchReq);
  router.patch("/searchReqs/update/id=:id/type=:type", updateSearchReq);
  router.post("/searchReqs/create/type=:type", createSearchReq);
};
