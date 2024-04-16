const express = require("express");
const { connectionToMongo } = require("./configurations/mongoDB");
const { userRouter } = require("./routes/userRoute");

require("dotenv").config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/auth", userRouter)

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
