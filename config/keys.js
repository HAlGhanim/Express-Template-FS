require("dotenv").config();

const config = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_TOKEN_EXP: process.env.JWT_TOKEN_EXP,
  MONGO_DB_URL: process.env.MONGO_DB_URL,
};

if (!config.JWT_TOKEN_EXP) {
  console.log("missing env values!");
  process.exit(1);
}
module.exports = config;
