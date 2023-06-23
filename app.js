const express = require("express");
const connectDb = require("./database");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const notFound = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const tempRoutes = require("./api/temp/temp.routes");
require("dotenv").config();

app.use(cors());
connectDb();
app.use(express.json());
app.use(morgan("dev"));

// Everything with the word temp is a placeholder that you'll change in accordance with your project
app.use("/temp", tempRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`The application is running on ${process.env.PORT}`);
});

module.exports = app;
