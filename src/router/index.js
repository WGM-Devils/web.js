// Imports

const express = require("express");

// Project-Imports

import auth from "./auth";
import users from "./users";
import groups from "./groups";
import posts from "./posts";
import userEvents from "./userEvents";
import comments from "./comments";
import searchReq from "./searchReq";

// Constants

const router = express.Router();

// Exports

export default () => {
  users(router);
  auth(router);
  posts(router);
  groups(router);
  userEvents(router);
  comments(router);
  searchReq(router);
  return router;
};
