const express = require("express");
const mongodb = require("mongodb");
const path = require("path");
const bodyParser = require("body-parser");

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const expressApp = express();

const dbUsername = process.env.MONGODB_USER_NAME;
const dbPassword = process.env.MONGODB_USER_PASSWORD;

const mongoURL = `mongodb+srv://${dbUsername}:${dbPassword}@starwarscrud.txzc8qa.mongodb.net/?retryWrites=true&w=majority`;
const mongoClient = new mongodb.MongoClient(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongodb.ServerApiVersion.v1});

expressApp.set("view engine", "ejs");
expressApp.use("/static", express.static(path.join(__dirname, "public")));
expressApp.use(bodyParser.urlencoded({extended: true}));

async function main() {
    await mongoClient.connect();
    console.log("Connected to MongoDB database.");

    const quotesDB = mongoClient.db("starWarsQuotes");
    const quotesCollection = quotesDB.collection("starWarsQuotesCollection");

    expressApp.listen(PORT, function() {
        console.log(`Listening on port ${PORT}.`);
    });

    expressApp.get("/", async (req, res) => {
        const cursor = quotesCollection.find();
        const quotesArray = await cursor.toArray();
        res.render(path.join(__dirname, "views", "quotes.ejs"), {
            quotes: quotesArray,
        });
    });

    expressApp.post("/sendQuote", async (req, res) => {
        const result = await quotesCollection.insertOne(req.body);
        res.redirect("/");
    });
}

main();