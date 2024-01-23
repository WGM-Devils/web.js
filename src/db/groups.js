// Imports

const mongoose = require("mongoose");

// Code

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  description: { type: String, required: true },
  members: { type: Array, default: [] },
  slogan: { type: String, required: false },
  city: {
    latitude: { type: String, required: false },
    longitude: { type: String, required: false },
  },
});

// Exports

const GroupModel = mongoose.model("Group", GroupSchema, "groups");

const getAll = async () => GroupModel.find();
const getById = async (id) => GroupModel.findById(id);
const getByCreator = async (creator) => GroupModel.find({ creator: creator });
const deleteById = async (id) => GroupModel.findByIdAndDelete(id);
const updateById = async (id, values) =>
  GroupModel.findByIdAndUpdate(id, values);
const create = async (values) => GroupModel.create(values);

module.exports = {
  getAll,
  getById,
  getByCreator,
  deleteById,
  updateById,
  create,
};
