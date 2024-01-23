// Project-Imports

const {
  getAll,
  getAllByCreator,
  create,
  deleteById,
  updateById,
  getById,
} = require("../db/searchReq");
const sendAPIResponse = require("../helpers/sendAPIResponse");
const validateAccess = require("../helpers/validateAccess");

// Code

const getAllSearchReqs = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const searchReqs = await getAll();
    if (!searchReqs) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "None found.", null, null))
        .end();
    }

    return res
      .status(200)
      .json(
        sendAPIResponse(
          200,
          "Enjoy the contents you requested",
          { searchReqs: searchReqs },
          "json"
        )
      )
      .end();
    return res
      .status(200)
      .json({
        searchReqs: searchReqs,
      })
      .end();
  } catch (error) {
    console.log(error);
    return res.status(500).json(sendAPIResponse(500, "Our fault.", null, null));
  }
};
const getAllSearchReqsByCreator = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const searchReqs = await getAllByCreator(req.params.creator);
    if (!searchReqs) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "None found.", null, null))
        .end();
    }

    return res
      .status(200)
      .json(
        sendAPIResponse(
          200,
          "Enjoy the contents you requested",
          { searchReqs: searchReqs },
          "json"
        )
      )
      .end();
  } catch (error) {
    console.log(error);
    return res.status(500).json(sendAPIResponse(500, "Our fault.", null, null));
  }
};
const getSearchReq = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { id, type } = req.params;
    const searchReq = await getById(id);
    if (!searchReq) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Not found.", null, null))
        .end();
    }
    if (type === "json") {
      return res
        .status(200)
        .json(
          sendAPIResponse(200, "Your requested resource.", searchReq, "json")
        )
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Your requested resource.",
            { searchReq: Object.values(searchReq) },
            "arr"
          )
        )
        .end();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(sendAPIResponse(500, "Our fault.", null, null));
  }
};
const createSearchReq = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { type } = req.params;

    const searchReq = await create(req.body);
    if (!searchReq) {
      return res
        .status(400)
        .json(
          sendAPIResponse(400, "Check your request body once more.", null, null)
        )
        .end();
    }

    if (type === "json") {
      return res
        .status(200)
        .json(sendAPIResponse(200, "Created.", searchReq, "json"))
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Created.",
            { searchReq: Object.values(searchReq) },
            "arr"
          )
        )
        .end();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(sendAPIResponse(500, "Our fault.", null, null));
  }
};
const updateSearchReq = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { id, type } = req.params;

    const gSearchReq = await getById(id);
    if (!gSearchReq) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Not found.", null, null))
        .end();
    }

    const searchReq = await updateById(id, req.body);
    if (!searchReq) {
      return res
        .status(400)
        .json(
          sendAPIResponse(400, "Check your request body once more.", null, null)
        )
        .end();
    }

    if (type === "json") {
      return res
        .status(200)
        .json(sendAPIResponse(200, "Updated.", searchReq, "json"))
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Updated.",
            { searchReq: Object.values(searchReq) },
            "arr"
          )
        )
        .end();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(sendAPIResponse(500, "Our fault.", null, null));
  }
};
const deleteSearchReq = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { id } = req.params;

    const searchReq = await deleteById(id);
    if (!searchReq) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Not found.", null, null))
        .end();
    }

    return res
      .status(204)
      .json(sendAPIResponse(204, "Deleted.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res.status(500).json(sendAPIResponse(500, "Our fault.", null, null));
  }
};

// Exports

module.exports = {
  getAllSearchReqs,
  getAllSearchReqsByCreator,
  getSearchReq,
  createSearchReq,
  updateSearchReq,
  deleteSearchReq,
};
