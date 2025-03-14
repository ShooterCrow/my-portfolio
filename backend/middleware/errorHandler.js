const {logEvents} = require("./logEvents")

exports.errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.ip}`, `errorLog.txt`);
  const status = res.statusCode ? res.statusCode : 500
  res.status(status)
  res.json({ message: err.message, isError: true });
  next() //NEXT IS OPTIONAL FOR ERROR HANDLES SINCE IT COMES LAST
};
