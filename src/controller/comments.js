// Project-Imports

const {
  getAll,
  getAllByCreator,
  create,
  deleteById,
  updateCById,
  getByCId,
} = require("../db/comments");
const { getById, updateById } = require("../db/posts");
const { getUserById, updateUserById } = require("../db/users");
const sendAPIResponse = require("../helpers/sendAPIResponse");
const validateAccess = require("../helpers/validateAccess");

// Code

const createComment = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { postId } = req.params;
    const post = await getById(postId);
    if (!post) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "Kein Post mit dieser postId gefunden.",
            null,
            null
          )
        )
        .end();
    }

    const { userId, content } = req.body;

    if (!userId || !content) {
      return res
        .status(400)
        .json(
          sendAPIResponse(
            400,
            "Im Request Body muss eine userId Eigenschaft sowie eine content Eigenschaft vorhanden sein.",
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
        .json(
          sendAPIResponse(
            404,
            "Kein Nutzer mit der angegeben Id gefunden.",
            null,
            null
          )
        )
        .end();
    }

    if (!post.comments.allowed) {
      return res
        .status(403)
        .json(
          sendAPIResponse(
            403,
            "Die Kommentare unter diesem Code sind deaktiviert.",
            null,
            null
          )
        )
        .end();
    }

    const comment = {
      creator: userId,
      content,
      postId,
    };
    const createdComment = await create(comment);
    const commentId = createdComment._id;

    post.comments.collection.push(commentId);
    post.comments.count++;
    await updateById(postId, post);

    user.comments.collection.push(commentId);
    user.posts.count++;
    await updateUserById(userId, user);

    return res
      .status(201)
      .json(sendAPIResponse(201, "Kommentiert.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Unser Fehler...", null, null))
      .end();
  }
};
const deleteComment = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { commentId, postId, userId } = req.params;

    const comment = await getCById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json(
          sendAPIResponse(404, "Dieser Kommentar existiert nicht.", null, null)
        )
        .end();
    }

    const post = await getById(postId);
    if (!post) {
      return res
        .status(404)
        .json(
          sendAPIResponse(404, "Der Post ist nicht auffindbar.", null, null)
        )
        .end();
    }

    const user = await getUserById(userId);
    if (!user) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "Hinter dieser Id steckt kein Nutzer",
            null,
            null
          )
        )
        .end();
    }
    if (comment.creator !== userId) {
      return res
        .status(403)
        .json(
          sendAPIResponse(
            403,
            "Die Id des Kommentar Autors stimmt nicht mit der angegeben Id überein.",
            null,
            null
          )
        )
        .end();
    }

    await deleteById(commentId);

    post.comments.count--;
    post.comments.collection = post.comments.collection.filter(
      (c) => c !== commentId
    );
    await updateById(postId, post);

    user.comments.count--;
    user.comments.collection = user.comments.collection.filter(
      (c) => c !== commentId
    );
    await updateUserById(userId, user);

    return res
      .status(204)
      .json(sendAPIResponse(204, "Der Kommentar wurde gelöscht.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Unser Fehler.", null, null))
      .end();
  }
};
const updateComment = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { commentId, userId } = req.params;

    const comment = await getCById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "Der Kommentar konnte nicht gefunden werden.",
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
        .json(
          sendAPIResponse(
            404,
            "Hinter dieser Id steckt leider kein Nutzer.",
            null,
            null
          )
        )
        .end();
    }
    if (comment.creator !== userId) {
      return res
        .status(403)
        .json(
          sendAPIResponse(
            403,
            "Die Id, die Sie gegeben haben, ist nicht die selbe wie die des Autors.",
            null,
            null
          )
        )
        .end();
    }

    const { content } = req.body;
    comment.content = content;
    await updateCById(commentId, comment);

    return res
      .status(204)
      .json(sendAPIResponse(204, "Kommentar überarbeitet.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Unser Fehler.", null, null))
      .end();
  }
};
const getComment = async (req, res) => {
  try {
    const { commentId, type } = req.params;

    const comment = await getCById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "Dein Kommentar konnte nicht gefunden werden.",
            null,
            null
          )
        )
        .end();
    }

    if (type === "json") {
      return res
        .status(200)
        .json(sendAPIResponse(200, "Hier ist dein Kommentar.", comment, "json"))
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Hier ist dein Kommentar.",
            { comments: [comment] },
            null
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
const getAllComments = async (req, res) => {
  try {
    const comments = await getAll();
    if (!comments) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "Unsere Datenbank scheint leer zu sein.",
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
          "Alle Kommentare für sie bereit.",
          { comments: comments },
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
const getAllCommentsByCreator = async (req, res) => {
  try {
    const { userId } = req.params;

    const comments = await getAllByCreator(userId);
    if (!comments) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "Kommentare des Nutzers nicht gefunden.",
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
          "Hier sind alle Kommentare des Nutzers.",
          { comments: comments },
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
const getAllCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await getAllByPostId(postId);
    if (!comments) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "Unter diesem Post scheinen keine Kommentare sein.",
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
          "Alle Kommentare unter Ihrem Post.",
          { comments: comments },
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
const likeComment = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { commentId, userId } = req.params;

    const comment = await getCById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "Kommentar konnte nicht gefunden werden.",
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
        .json(
          sendAPIResponse(
            404,
            "Der Autor scheint nicht zu existieren.",
            null,
            null
          )
        )
        .end();
    }

    comment.likes.count++;
    comment.likes.collection.push(userId);
    await updateCById(commentId, comment);

    user.likes.count++;
    user.likes.collection.push({ id: commentId, type: "comment" });
    await updateUserById(userId, user);

    return res
      .status(204)
      .json(sendAPIResponse(204, "Kommentar wurde geliked.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Unser Fehler.", null, null))
      .end();
  }
};
const unlikeComment = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { commentId, userId } = req.params;

    const comment = await getCById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "Kommentar scheint nicht zu existieren.",
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
        .json(
          sendAPIResponse(
            404,
            "Nutzer konnte nicht gefunden werden.",
            null,
            null
          )
        )
        .end();
    }

    comment.likes.count--;
    comment.likes.collection = comment.likes.collection.filter(
      (c) => c !== userId
    );
    await updateCById(commentId, comment);

    user.likes.count--;
    user.likes.collection = user.likes.collection.filter(
      (c) => c.id !== commentId && c.type === "comment"
    );
    await updateUserById(userId, user);

    return res
      .status(204)
      .json(sendAPIResponse(204, "Kommentar unliked.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Unser Fehler.", null, null))
      .end();
  }
};

// Exports

module.exports = {
  createComment,
  deleteComment,
  updateComment,
  getComment,
  getAllComments,
  getAllCommentsByCreator,
  getAllCommentsByPostId,
  likeComment,
  unlikeComment,
};
