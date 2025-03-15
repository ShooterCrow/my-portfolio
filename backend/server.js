require("dotenv").config();
const express = require("express");
const { logger } = require("./middleware/logEvents");
const { errorHandler } = require("./middleware/errorHandler");
const dbConn = require("./config/dbConn");
const { default: mongoose } = require("mongoose");
const corsOptions = require("./config/corsOptions");
const cors = require("cors")
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3500;

app.use(logger);
//CONNECT TO DATABASE
dbConn();

app.use(cookieParser())

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")))

// app.use("/", require("./routes/userRoutes"));
app.use("/", (req, res) => {
    res.status(200)
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "index.html"))
    } else if (req.accepts("json")) {
        res.json({message: "Victor Onyekwere"})
    }
});
app.use("/auth", require("./routes/authRoutes"));
app.use("/refresh", require("./routes/refreshRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/projects", require("./routes/projectRoutes"));
app.use("/contact", require("./routes/contactRoutes"));
app.use("/services", require("./routes/serviceRoutes"));

//UNKNOW ROUTES
app.all("*", (req, res) => {
    res.status(400)
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"))
    } else if (req.accepts("json")) {
        res.json({message: "404 Not Found"})
    }
})

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to Database ✅");
  app.listen(PORT, () => {
    console.log("🙂‍↕️ Listening on PORT", PORT);
  });
});
