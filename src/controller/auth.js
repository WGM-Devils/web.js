// Project-Imports

const { createUser, getUserByEmail } = require("../db/users");
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
        .json(
          sendAPIResponse(
            400,
            "Im Request Body muss eine email Eigenschaft sowie eine password Eigenschaft vorhanden sein.",
            null,
            null
          )
        )
        .end();
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "Diese E-Mail gehört zu keinem Nutzer Account in unserer Datenbank.",
            null,
            null
          )
        )
        .end();
    }

    if (user.auth.password !== password) {
      return res
        .status(403)
        .json(
          sendAPIResponse(
            403,
            "Bitte überprüfen Sie das Passwort nochmal.",
            null,
            null
          )
        );
    }

    return res
      .status(200)
      .json(sendAPIResponse(200, "Eingeloggt.", { users: [user] }, "arr"))
      .end();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(sendAPIResponse(500, "Unser Fehler...", null, null))
      .end();
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
      return res
        .status(400)
        .json(
          sendAPIResponse(
            400,
            "E-Mail, username or password is not definded.",
            null,
            null
          )
        )
        .end();
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res
        .status(400)
        .json(sendAPIResponse(400, "User exists.", null, null))
        .end();
    }

    const user = await createUser({
      email,
      username,
      auth: {
        password: password,
      },
    });
    return res
      .status(200)
      .json(
        sendAPIResponse(
          200,
          "User was created.",
          {
            users: [user],
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
