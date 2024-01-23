// Imports

const express = require("express");

// Project-Imports

const {
  getAll,
  create,
  deleteById,
  updateById,
  getById,
} = require("../db/posts");
const { getUserById, updateUserById } = require("../db/users");
const sendAPIResponse = require("../helpers/sendAPIResponse");
const validateAccess = require("../helpers/validateAccess");

// Code

const getAllPosts = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const posts = await getAll();

    return res
      .status(200)
      .json(
        sendAPIResponse(
          200,
          "Enjoy the contents you requested",
          {
            posts: posts,
          },
          "json"
        )
      )
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our fault.", null, null))
      .end();
  }
};
const createPost = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { title, content, embed, userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json(sendAPIResponse(400, "You need a user!", null, null))
        .end();
    }

    if (!title || !content || !embed) {
      return res
        .status(400)
        .json(
          sendAPIResponse(
            400,
            "Check your request once more please.",
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
        .json(sendAPIResponse(404, "User not found.", null, null))
        .end();
    }

    const post = await create({
      user: userId,
      title: title,
      content: content,
      embed: embed,
    });
    if (!post) {
      return res
        .status(400)
        .json(
          sendAPIResponse(400, "Check your request body once more.", null, null)
        )
        .end();
    }

    user.posts.count++;
    user.posts.collection.push(post._id);
    return res
      .status(201)
      .json(
        sendAPIResponse(
          201,
          "Post created.",
          { posts: Object.values(post) },
          "arr"
        )
      )
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "We ran into an issue.", null, null));
  }
};
const deletePost = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { postId, userId } = req.params;

    const user = await getUserById(userId);
    if (!user) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "User not found.", null, null))
        .end();
    }
    const deletedPost = await deleteById(postId);
    if (!deletedPost) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Post not found.", null, null))
        .end();
    }

    user.posts.count--;
    user.posts.collection = user.posts.collection.filter((id) => id !== postId);
    await updateUserById(userId, user);

    return res
      .status(201)
      .json(sendAPIResponse(201, "Deleted your post.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "We ran into an issue.", null, null));
  }
};
const getPost = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { id, type } = req.params;

    const post = await getById(id);

    if (!post) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "There is no post connected to the given id",
            null,
            null
          )
        );
    }

    if (type === "json") {
      return res
        .status(200)
        .json(sendAPIResponse(200, "Your requested resource.", post, "json"))
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Your requested resource.",
            { posts: Object.values(post) },
            "arr"
          )
        )
        .end();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(sendAPIResponse(500, "Our bad.", null, null));
  }
};
const updatePost = async (req, res) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { id, type } = req.params;
    const { title, content, embed } = req.body;

    const post = await getById(id);

    if (!post) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "There is no post.", null, null))
        .end();
    }

    if (!title || !content || !embed) {
      return res
        .status(400)
        .json(
          sendAPIResponse(
            400,
            "Please give all the necessary values.",
            null,
            null
          )
        );
    }

    post.title = title;
    post.content = content;
    post.embed = embed;
    await updateById(id, post);

    if (type === "json") {
      return res
        .status(200)
        .json(sendAPIResponse(200, "Your updated post.", post, "json"))
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Your updated post.",
            { posts: Object.values(post) },
            "arr"
          )
        )
        .end();
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
const viewedPost = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    const post = await getById(postId);
    if (!post) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "There is no post.", null, null))
        .end();
    }

    const user = await getUserById(userId);
    if (!user) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "There is no user.", null, null))
        .end();
    }
    post.views.count++;
    post.views.collection.push(userId);
    await updateById(postId, post);

    user.views.count++;
    user.views.collection.push({ type: "post", id: postId, date: Date.now() });
    await updateUserById(userId, user);
    return res
      .status(204)
      .json(sendAPIResponse(204, "This user viewed this post.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res.status(500).json(sendAPIResponse(500, "Our bad.", null, null));
  }
};
const likePost = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    const post = await getById(postId);
    if (!post) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "There is no post.", null, null))
        .end();
    }

    const user = await getUserById(userId);
    if (!user) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "There is no user.", null, null))
        .end();
    }

    post.likes.count++;
    post.likes.collection.push(userId);
    await updateById(postId, post);

    user.likes.count++;
    user.likes.collection.push({ type: "post", id: postId, date: Date.now() });
    await updateUserById(userId, user);
    return res
      .status(204)
      .json(sendAPIResponse(204, "This user liked this post.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res.status(500).json(sendAPIResponse(500, "Our bad.", null, null));
  }
};
const unlikePost = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    const post = await getById(postId);
    if (!post) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "There is no post.", null, null))
        .end();
    }

    const user = await getUserById(userId);
    if (!user) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "There is no user.", null, null))
        .end();
    }

    post.likes.count--;
    post.likes.collection = post.likes.collection.filter((id) => id !== userId);
    await updateById(postId, post);

    user.likes.count--;
    user.likes.collection = user.likes.collection.filter(
      (like) => like.id !== postId
    );
    await updateUserById(userId, user);
    return res
      .status(204)
      .json(sendAPIResponse(204, "This user unliked this post.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res.status(500).json(sendAPIResponse(500, "Our bad.", null, null));
  }
};

// Exports

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  getPost,
  updatePost,
  viewedPost,
  likePost,
  unlikePost,
};
