const User = require("../model/User");
const asyncHandler = require("express-async-handler");

const getUser = asyncHandler(async (req, res) => {
  const {id} = req.params
  if (!id) return res.status(400).json({message: "Incomplete"})
  const users = await User.findById(id).exec()
  return res.status(200).json(users);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().exec()
  return res.status(200).json(users);
});

module.exports = { getAllUsers, getUser };
