require('dotenv').config();

const express = require("express");
const mongodb = require("mongodb");
const path = require("path");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;
const expressApp = express();

const dbUsername = process.env.MONGODB_USER_NAME;
const dbPassword = process.env.MONGODB_USER_PASSWORD;

const mongoURL = `mongodb+srv://${dbUsername}:${dbPassword}@starwarscrud.txzc8qa.mongodb.net/?retryWrites=true&w=majority`;
const mongoClient = new mongodb.MongoClient(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: mongodb.ServerApiVersion.v1,
});

expressApp.set("view engine", "ejs");
expressApp.use("/static", express.static(path.join(__dirname, "public")));
// These functions returns the actual parser functions used by ExpressJS.
expressApp.use(bodyParser.urlencoded({extended: true}));
expressApp.use(bodyParser.json());
expressApp.listen(PORT, function() {
    console.log(`Listening on port ${PORT}.`);
});

module.exports = {expressApp, mongoClient};