const mongoose = require("mongoose")
const { logEvents } = require("../middleware/logEvents")

const dbConn = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        logEvents("Internal server error", "dbConnErr.txt")
    }
}

module.exports = dbConn