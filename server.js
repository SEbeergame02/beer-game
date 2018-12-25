const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const routes = require("./utils/router");

var app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views"));
//connect to MongoDB
mongoose.connect(
    "mongodb://localhost:27017/data",
    { useNewUrlParser: true }
);
var db = mongoose.connection;

//use sessions for tracking logins
app.use(
    session({
        secret: "work hard",
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: db
        })
    })
);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);

module.exports = app;
