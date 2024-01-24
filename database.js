const mongoose = require("mongoose");
const config = require("./config/keys");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_DB_URL);
    console.log(`mongo connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Database connection could not be established");
    console.log(error.message);
  }
};

module.exports = connectDB;
