// Project-Imports

const { deleteUserById, getUserById, getUsers } = require("../db/users");
const sendAPIResponse = require("../helpers/sendAPIResponse");
const validateAccess = require("../helpers/validateAccess");

// Code

const getAllUsers = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const users = await getUsers();

    return res
      .status(200)
      .json(
        sendAPIResponse(200, "Here are all the users.", { users: users }, "arr")
      )
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our bad.", null, null))
      .end();
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "No user with this id found.", null, null))
        .end();
    }

    return res
      .status(204)
      .json(sendAPIResponse(204, "No Contents", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        sendAPIResponse(500, "There was an error, try again later.", null, null)
      );
  }
};

const getUser = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { id, type } = req.params;

    const user = await getUserById(id);

    if (!user) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "No user under this id found.", null, null))
        .end();
    }

    if (type === "json") {
      return res
        .status(200)
        .json(sendAPIResponse(200, "Your requested user...", user, "json"))
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Your requested user...",
            { users: Object.values(user) },
            "arr"
          )
        )
        .end();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Host's fault.", null, null))
      .end();
  }
};

const updateUser = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { id, type } = req.params;
    const { username, description, pfp, email, banner } = req.body;

    if (!username || !description || !pfp || !email || !banner) {
      return res
        .status(400)
        .json(
          sendAPIResponse(400, "Check your request body once more.", null, null)
        )
        .end();
    }

    const user = await getUserById(id);

    if (!user) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "User under this id not found. Check the id!",
            null,
            null
          )
        )
        .end();
    }

    user.username = username;
    user.email = email;
    user.banner = banner;
    user.pfp = pfp;
    user.description = description;
    await user.save();

    if (type === "json") {
      return res
        .status(200)
        .json(sendAPIResponse(200, "The updated user...", user, "json"))
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "The updated user...",
            { users: Object.values(user) },
            "arr"
          )
        )
        .end();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our fault. Try again later.", null, null))
      .end();
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
};
