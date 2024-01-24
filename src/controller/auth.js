// Project-Imports

const { createUser, getUserByEmail } = require("../db/users");
const { authentication, random } = require("../helpers/auth");
const sendAPIResponse = require("../helpers/sendAPIResponse");
const validateAccess = require("../helpers/validateAccess");

// Code

const login = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json(sendAPIResponse(400, "Check your request once more.", null, null))
        .end();
    }

    const user = await getUserByEmail(email).select("+auth.password");

    if (!user) {
      return res.sendStatus(400);
    }

    if (user.auth.password !== password) {
      return res.sendStatus(403);
    }

    return res
      .status(200)
      .json(sendAPIResponse(200, "Logged in.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).json(sendAPIResponse(500, "Our bad.", null, null)).end();
  }
};

const register = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const user = await createUser({
      email,
      username,
      auth: {
        password: password,
      },
    });

    return res
      .status(201)
      .json(
        sendAPIResponse(
          201,
          "User was created.",
          {
            users: Object.values(user),
          },
          "arr"
        )
      )
      .end();
  } catch (error) {
    console.log(error);
    return res.status(500).json(sendAPIResponse(500, "Our fault.", null, null));
  }
};

// Exports

module.exports = {
  login,
  register,
};
