// Imports

const mongoose = require("mongoose");

// Code

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  auth: {
    password: { type: String, required: true, select: false },
  },
  username: { type: String, required: true },
  description: { type: String, required: false },
  pfp: {
    extension: { type: String, required: false },
    path: { type: String, required: false },
  },
  banner: {
    extension: { type: String, required: false },
    link: { type: String, required: false },
  },
  likes: {
    count: { type: Number, default: 0 },
    collection: { type: Array, default: [] },
  },
  comments: {
    count: { type: Number, default: 0 },
    collection: { type: Array, default: [] },
  },
  posts: {
    count: { type: Number, default: 0 },
    collection: { type: Array, default: [] },
  },
  views: {
    count: { type: Number, default: 0 },
    collection: { type: Array, default: 0 },
  },
  events: { type: Array, default: [] },
  groups: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now() },
});

// Exports

const UserModel = mongoose.model("User", UserSchema, "users");

const getUsers = () => UserModel.find();

const getUserByEmail = (email) => UserModel.findOne({ email });
const getUserBySessionToken = (sessionToken) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
const getUserById = (id) => UserModel.findById(id);
const createUser = (values) =>
  new UserModel(values).save().then((user) => user.toObject());
const deleteUserById = (id) => UserModel.findOneAndDelete({ _id: id });
const updateUserById = (id, values) => UserModel.findByIdAndUpdate(id, values);

module.exports = {
  getUsers,
  getUserByEmail,
  getUserBySessionToken,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
