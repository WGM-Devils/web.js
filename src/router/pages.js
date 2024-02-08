// Imports

const express = require("express");

// Constants

const router = express.Router();
// Exports

module.exports = (router) => {
  router.get("/", (req, res) => {
    res.render("index");
  });
  router.get("/login", (req, res) => {
    res.render("login");
  });
  router.get("/register", (req, res) => {
    res.render("signup");
  });
  router.get("/chats", (req, res) => {
    res.render("chats");
  });
  router.get("/post?postId=:postId", (req, res) => {
    res.render("post");
  });
  router.get("/user?userId=:userId", (req, res) => {
    res.render("post");
  });
  router.get("/settings", (req, res) => {
    res.render("settings");
  });
  router.get("/search", (req, res) => {
    res.render("search");
  });
  router.get("/discover", (req, res) => {
    res.render("discover");
  });
};
