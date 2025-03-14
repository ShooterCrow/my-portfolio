const asyncHandler = require("express-async-handler");
const Contact = require("../model/Contact");

const createContactMsg = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ message: "All fields required" });
  const contactMessage = await Contact.create({ name, email, message });
  if (contactMessage) {
    return res.status(200).json(contactMessage);
  } else {
    return res.status(500).json({ message: "Failed to create message" });
  }
});

const getContactMsgs = asyncHandler(async (req, res) => {
  const contactMsgs = await Contact.find()
  if (!contactMsgs) return res.status(404).json({message: "404 Not Found"});
  return res.status(200).json(contactMsgs)
})

module.exports = { createContactMsg, getContactMsgs };
