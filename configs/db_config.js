const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = () => {
  const DB_URL = process.env.DB_URL;

  // Connect to MongoDB
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connectToDatabase;
