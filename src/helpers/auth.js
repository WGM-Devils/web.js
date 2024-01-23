// Imports

const crypto = require("crypto");

// Presets

const SECRET = process.env.ENCRYPTSECRET;

// Code

const random = () => crypto.randomBytes(128).toString("base64");
const authentication = (salt, password) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

// Exports

module.exports = {
  random,
  authentication,
};
