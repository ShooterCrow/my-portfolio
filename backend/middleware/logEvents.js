const fsPromises = require("fs/promises");
const fs = require("fs");
const { format } = require("date-fns");
const {v4: uuid} = require("uuid");
const path = require("path");

const logEvents = async (msg, fileInfo) => {
  const date = format(Date.now(), "dd/MM/yyyy HH:mm")
  const logInfo = `${date}\t${uuid()}\t${msg}\n`
  if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
    await fsPromises.mkdir(path.join(__dirname, "..", "logs"))
  }
  await fsPromises.appendFile(path.join(__dirname, "..", "logs", fileInfo), logInfo)
};

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}\t${req.ip}`, "reqLog.txt")
    next()
}

module.exports = {logEvents, logger}