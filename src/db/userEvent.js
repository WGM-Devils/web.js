// Imports

const mongoose = require("mongoose");

// Code

const UserEventSchema = new mongoose.Schema({
  creator: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  logo: {
    type: { type: String, required: true },
    link: { type: String, required: true },
  },
  website: { type: String, required: false },
  date: { type: Date, required: true },
  city: {
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now() },
});

// Code

const UserEventModel = mongoose.model(
  "UserEvent",
  UserEventSchema,
  "UserEvents"
);

const getAll = () => UserEventModel.find();
const getById = (id) => UserEventModel.findById(id);
const create = (values) => UserEventModel.create(values);
const getAllByCreator = (creator) => UserEventModel.find({ creator });
const updateById = (id, values) => UserEventModel.findByIdAndUpdate(id, values);
const deleteById = (id) => UserEventModel.findByIdAndDelete(id);

// Exports

module.exports = {
  getAll,
  getById,
  create,
  getAllByCreator,
  updateById,
  deleteById,
};
