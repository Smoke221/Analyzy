const express = require("express");
const { connectionToMongo } = require("./configurations/mongoDB");
const { userRouter } = require("./routes/userRoute");
const { authenticate } = require("./middlewares/authenticate");
const { analyzeFileRouter } = require("./routes/analyzeFile");
const { googleRouter } = require("./routes/googleOauth");
const cors = require("cors")

require("dotenv").config();
const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/auth", userRouter);
app.use("/auth/google", googleRouter)

app.use(authenticate);

app.get("/s", (req, res) => {
  res.send("Secured page.");
});

app.use(analyzeFileRouter)

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
