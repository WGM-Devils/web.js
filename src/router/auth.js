// Project-Imports

const { register, login } = require("../controller/auth");

// Exports

module.exports = (router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
