const path = require('path');

module.exports = {
    entry: {
        main: "./src/mainScript.js",
    },
    output: {
        filename: "index.js",
        path: path.join(__dirname, "public", "js"),
    },
    watch: true,
};