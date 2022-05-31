const path = require("path");
const {mongoClient, expressApp} = require("./config");


async function main() {
    console.log("Connecting!");
    await mongoClient.connect();
    console.log("Connected to MongoDB database.");

    const quotesDB = mongoClient.db("starWarsQuotes");
    const quotesCollection = quotesDB.collection("starWarsQuotesCollection");

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