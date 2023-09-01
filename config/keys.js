require("dotenv").config();

const config = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_TOKEN_EXP: process.env.JWT_TOKEN_EXP,
  MONGO_DB_URL: process.env.MONGO_DB_URL,
};

for (const key in config) {
  if (!config[key]) {
    throw new Error(`Environment variable ${key} is missing`);
  }
}
module.exports = config;
