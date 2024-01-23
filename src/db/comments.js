// Imports

const mongoose = require("mongoose");

// Code

const CommentSchema = new mongoose.Schema({
  creator: { type: String, required: true },
  postId: { type: String, required: true },
  content: { type: String, required: true },
  likes: {
    count: { type: Number, default: 0 },
    collection: { type: [String], default: [] },
  },
  createdAt: { type: Date, default: Date.now() },
});

// Exports

const CommentModel = mongoose.model("Comment", CommentSchema, "Comments");
const getAll = () => CommentModel.find();
const getCById = (id) => CommentModel.findById(id);
const getAllByPostId = (postId) => CommentModel.find({ postId });
const create = (values) => CommentModel.create(values);
const getAllByCreator = (creator) => CommentModel.find({ creator });
const updateCById = (id, values) => CommentModel.findByIdAndUpdate(id, values);
const deleteById = (id) => CommentModel.findByIdAndDelete(id);
