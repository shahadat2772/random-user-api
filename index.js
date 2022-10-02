const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const fs = require("fs");

// middleware
app.use(express.json());
app.use(cors());

// routes
fs.readFile("./users.json", (err, data) => {
  console.log(JSON.parse(data));
});

// APIs
app.get("/", (req, res) => {
  res.status(200).send("HELLO!");
});

app.all("*", (req, res) => {
  res.status(404).send({
    success: false,
    message: "Route not found.",
  });
});

app.listen(PORT, () => {
  console.log("Listening to", PORT);
});
