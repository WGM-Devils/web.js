// Imports

const mongoose = require("mongoose");

// Code

const PostSchema = new mongoose.Schema({
  user: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  embed: {
    type: { type: String, required: false },
    link: { type: String, required: false },
  },
  comments: {
    allowed: { type: Boolean, default: true },
    count: { type: Number, default: 0 },
    collection: { type: Array, default: [] },
  },
  likes: {
    count: { type: Number, default: 0 },
    collection: { type: Array, default: [] },
  },
  views: {
    count: { type: Number, default: 0 },
    collection: { type: Array, default: [] },
  },
  createdAt: { type: Date, default: Date.now() },
  lastUpdated: { type: Date, default: Date.now() },
});

const PostModel = mongoose.model("Post", PostSchema, "posts");

// Exports

const getAll = () => PostModel.find();

const getById = (id) => PostModel.findById(id);
const create = (values) =>
  new PostModel(values).save().then((post) => post.toObject());
const deleteById = (id) => PostModel.findOneAndDelete({ _id: id });
const updateById = (id, values) => PostModel.findByIdAndUpdate(id, values);

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
