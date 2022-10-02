const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// routes

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
