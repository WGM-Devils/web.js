// Imports

const express = require("express");

// Constants

const router = express.Router();
// Exports

module.exports = (router) => {
  router.get("/", (req, res) => {
    res.render();
  });
};
