const mongoose = require("mongoose");
const config = require("./config/keys");

const connectDB = async () => {
  const conn = await mongoose.connect(config.MONGO_DB_URL);
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
