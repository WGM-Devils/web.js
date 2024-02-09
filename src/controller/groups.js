// Project-Imports

const {
  create,
  getAll,
  deleteById,
  updateById,
  getById,
  getByCreator,
} = require("../db/groups");
const { getUserById, updateUserById } = require("../db/users");
const sendAPIResponse = require("../helpers/sendAPIResponse");
const validateAccess = require("../helpers/validateAccess");

// Code

const createGroup = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { name, creator, description, members, slogan, city } = req.body;
    const { type } = req.params;

    const group = await create({
      name,
      creator,
      description,
      members,
      slogan,
      city,
    });

    if (!group) {
      return res
        .status(500)
        .json(sendAPIResponse(500, "Unser Fehler.", null, null))
        .end();
    }

    if (type === "json") {
      return res
        .status(201)
        .json(sendAPIResponse(201, "Gruppe wurde erstellt.", group, "json"))
        .end();
    } else {
      return res
        .status(201)
        .json(
          sendAPIResponse(201, "Gruppe erstellt.", { groups: [group] }, "arr")
        )
        .end();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Unser Fehler.", null, null))
      .end();
  }
};
const getAllGroups = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const groups = await getAll();
    if (!groups) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Keine Gruppe gefunden.", null, null))
        .end();
    }
    return res
      .status(200)
      .json(
        sendAPIResponse(
          200,
          "Hier sind alle unsere Gruppen.",
          {
            groups: groups,
          },
          "arr"
        )
      )
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Unser Fehler.", null, null))
      .end();
  }
};
const getGroup = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { id, type } = req.params;

    let group = await getById(id);

    if (!group) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "Keine Gruppe unter der Id gefunden.",
            null,
            null
          )
        )
        .end();
    }

    if (type === "json") {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Ihre angefragte Gruppe ist bereit.",
            group,
            "json"
          )
        )
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Ihre angefragte Gruppe...",
            { groups: [group] },
            "arr"
          )
        )
        .end();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Unser Fehler.", null, null))
      .end();
  }
};
const getGroupByCreator = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { creator } = req.params;

    let user = await getUserById(creator);

    if (!user) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "Der Autor konnte nicht gefunden werden.",
            null,
            null
          )
        )
        .end();
    }

    let groups = getByCreator(creator);

    if (!groups) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "Der Nutzer scheint keine Gruppe zu besitzen.",
            null,
            null
          )
        )
        .end();
    }

    return res
      .status(200)
      .json(
        sendAPIResponse(
          200,
          "Alle Gruppen, die Ihr Nutzer erstellt hat.",
          groups,
          "arr"
        )
      )
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Unser Fehler.", null, null))
      .end();
  }
};
const joinGroup = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { id, userId } = req.body;

    let group = await getById(id);

    if (!group) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "Die Gruppe scheint nicht zu existieren.",
            null,
            null
          )
        )
        .end();
    }

    const user = await getUserById(userId);

    if (!user) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Kein Nutzer gefunden.", null, null))
        .end();
    }

    group.members.push(user);
    await updateById(id, group);
    user.groups.push(group);
    await updateUserById(userId, user);

    return res
      .status(204)
      .json(sendAPIResponse(204, "Gruppe beigetreten.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Unser Fehler.", null, null))
      .end();
  }
};
const leaveGroup = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { id, userId } = req.body;

    let group = await getById(id);

    if (!group) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Keine Gruppe gefunden.", null, null))
        .end();
    }

    const user = await getUserById(userId);

    if (!user) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "Kein Nutzer steht hinter dieser Id.",
            null,
            null
          )
        )
        .end();
    }

    group.members = group.members.filter((member) => member.id !== userId);
    await updateById(id, group);
    user.groups = user.groups.filter((group) => group.id !== id);
    await updateUserById(userId, user);

    return res
      .status(204)
      .json(sendAPIResponse(204, "Gruppe wurde verlassen.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Unser Fehler.", null, null))
      .end();
  }
};
const deleteGroup = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { id } = req.params;

    const deletedGroup = await deleteById(id);

    if (!deletedGroup) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Keine Gruppe gefunden.", null, null))
        .end();
    }

    return res
      .status(204)
      .json(sendAPIResponse(204, "Gruppe wurde gelöscht.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Unser Fehler.", null, null))
      .end();
  }
};
const updateGroup = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { id, type } = req.params;

    let group = await getById(id);

    if (!group) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Keine Gruppe gefunden.", null, null))
        .end();
    }

    const { name, creator, description, members, slogan, city } = req.body;

    if (!name || !creator || !description || !members || !slogan || !city) {
      return res
        .status(400)
        .json(
          sendAPIResponse(
            400,
            "Bitte überprüfen Sie Ihren Request Body nochmal",
            null,
            null
          )
        )
        .end();
    }
    group.name = name;
    group.creator = creator;
    group.description = description;
    group.members = members;
    group.slogan = slogan;
    group.city = city;
    await updateById(id, group);

    if (type === "json") {
      return res
        .status(200)
        .json(sendAPIResponse(200, "Gruppe überarbeitet.", group, "json"))
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Gruppe wurde überarbeitet.",
            { groups: [group] },
            "arr"
          )
        )
        .end();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "unser Fehler.", null, null))
      .end();
  }
};

// Exports

module.exports = {
  createGroup,
  getAllGroups,
  getGroup,
  getGroupByCreator,
  joinGroup,
  leaveGroup,
  deleteGroup,
  updateGroup,
};
