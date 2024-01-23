// Project-Imports

const { register, login } = require("../controller/auth");

// Exports

module.exports = (router) => {
  router.post("/api/auth/register", register);
  router.post("/api/auth/login", login);
};
