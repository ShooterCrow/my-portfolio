const { allowedOrigins } = require("./allowedOrigins");

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not Allowed by cors"))
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}

module.exports = corsOptions