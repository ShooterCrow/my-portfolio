const express = require("express")
const router = express.Router()
const contactController = require("../controllers/contactController")
const verifyJWT = require("../middleware/verifyJWT")

router.route("/")
.post(contactController.createContactMsg)
.get(verifyJWT, contactController.getContactMsgs)

module.exports = router