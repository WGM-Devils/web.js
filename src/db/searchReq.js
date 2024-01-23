// Imports

const mongoose = require("mongoose");

// Code

const SearchReqSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true,
  },
  search: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now() },
});

// Exports

const SearchReqModel = mongoose.model(
  "SearchReq",
  SearchReqSchema,
  "searchReqs"
);

const getAll = async () => SearchReqModel.find();
const getAllByCreator = async (creator) => SearchReqModel.find({ creator });
const create = async (values) => SearchReqModel.create(values);
const deleteById = async (id) => SearchReqModel.findByIdAndDelete(id);
const updateById = async (id, values) =>
  SearchReqModel.findByIdAndUpdate(id, values);
const getById = async (id) => SearchReqModel.findById(id);

module.exports = {
  getAll,
  getAllByCreator,
  create,
  deleteById,
  updateById,
  getById,
};
