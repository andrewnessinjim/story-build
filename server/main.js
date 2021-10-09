const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.end("Hello from within docker-compose!");
});

app.listen(3001, () => {
    console.log(`Mode: ${process.env.NODE_ENV}`);
    console.log("Listening on port 3001...")
});