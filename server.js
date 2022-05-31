const path = require("path");
const {mongoClient, expressApp} = require("./config");


async function main() {
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
        // bodyParser.URLencoded extended parses form data and converts it into an object
        const result = await quotesCollection.insertOne(req.body);
        res.redirect("/");
    });

    expressApp.put("/updateQuote", async (req, res) => {
        // bodyParser.json converts json into an object
        console.log(req.body);
        try {
            const result = await quotesCollection.findOneAndUpdate({name: "Yoda"}, {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote,
                }
            }, {upsert: true});
            res.send({
                success: true,
            });
        } catch (e) {
            res.send(JSON.stringify({
                success: false,
                message: e.message
            }));
        }
    });

    expressApp.delete("/deleteAllQuotes", async (req, res) => {
        try {
            const result = await quotesCollection.deleteMany({});
            res.send(JSON.stringify({
                success: true,
                deletedCount: result.deletedCount,
            }))
        } catch (e) {
            res.send(JSON.stringify({
                success: false,
                deletedCount: 0,
                message: e.message
            }));
        }
    });

    expressApp.delete("/deleteOneQuote", async (req, res) => {
        console.log(req.body);
        try {
            const result = await quotesCollection.deleteOne({name: req.body.name});
            res.send(JSON.stringify({
                success: true,
                deletedCount: result.deletedCount,
            }));
        } catch (e) {
            res.send(JSON.stringify({
                success: false,
                deletedCount: 0,
                message: e.message
            }));
        }
    });
}

main();