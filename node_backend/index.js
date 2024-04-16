const express = require("express");
const { connectionToMongo } = require("./configurations/mongoDB");

require("dotenv").config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Homepage");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  try {
    await connectionToMongo;
    console.log("Connected to database");
  } catch (err) {
    console.log(err.message);
  }
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
