// Imports

const express = require("express");

// Project-Imports

const users = require("./users");
const auth = require("./auth");
const posts = require("./posts");
const groups = require("./groups");
const userEvents = require("./userEvent");
const comments = require("./comments");
const searchReq = require("./search");

// Constants

const router = express.Router();

// Exports

module.exports = () => {
  users(router);
  auth(router);
  posts(router);
  groups(router);
  userEvents(router);
  comments(router);
  searchReq(router);
  return router;
};
