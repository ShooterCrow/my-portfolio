const { logEvents } = require("./logEvents");
const limiter = require("express-rate-limit")

const loginLimter = limiter({
    windowMs: 60*1000,
    max: 5,
    message:  { message: 'Too many login attempts from this IP, please try again after a 60 second pause' },
    handler: (req, res, next, options) => {
        logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true,
    legacyHeader: false
})

module.exports = loginLimter