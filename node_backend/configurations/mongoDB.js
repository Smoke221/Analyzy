const mongoose = require("mongoose");
require("dotenv").config();

const connectionToMongo = mongoose.connect(process.env.MONGOURL);

module.exports = { connectionToMongo };
