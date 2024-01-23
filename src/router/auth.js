// Project-Imports

import { login, register } from "../controller/auth";

// Exports

export default (router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
