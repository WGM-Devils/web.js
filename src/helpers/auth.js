// Imports

const crypto = require("crypto");

// Presets

const SECRET = process.env.SECRET;

// Code

const authentication = (password) => {
  return crypto.createHmac("sha256", password).update(SECRET).digest("hex");
};

// Exports

module.exports = {
  authentication,
};
