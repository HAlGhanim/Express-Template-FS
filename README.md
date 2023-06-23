# Express-Template-FS

In this package, you will be able to set up your express app automatically which saves time for you to do your project so you don't have to worry about going through the same process of installing packages, creating folders for middleware, API, and models, creating the `database.js` file, and creating a `.env` file.

You will have to use `npm install` to install node modules.
Anything with the word `temp` is meant to be changed in accordance with your project.

## Middleware folder

* `errorHandler`

```javascript
module.exports = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
};
```

* `notFoundHandler`

```javascript
module.exports = (req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
};

```
## database.js
```javascript
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_DB_URL);
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
```

## Models folder
`Temp.js`: Change the name of the file and its content in accordance with your project

```javascript
const { model, Schema } = require("mongoose");

const TempSchema = new Schema({
  // your schema keys here along with their associated values
});

module.exports = model("Temp", TempSchema);
```

## api/temp folders
* `temp.controllers.js`
  
  ```javascript
  const Temp = require("../../models/Temp");

  // Everything with the word temp is a placeholder that you'll change in accordance with your project
  
  exports.fetchTemp = async (tempId, next) => {
    try {
      const temp1 = await Temp.findById(tempId).select("-__v");
      return temp1;
    } catch (error) {
      return next(error);
    }
  };
  
  exports.getTemp = async (req, res, next) => {
    try {
      const temps = await Temp.find().select("-__v");
      return res.status(200).json(temps);
    } catch (error) {
      return next(error);
    }
  };
  
  exports.createTemp = async (req, res, next) => {
    try {
      const newTemp = await Temp.create(req.body).select("-__v");
      return res.status(201).json(newTemp);
    } catch (error) {
      return next(error);
    }
  };
  
  exports.updateTemp = async (req, res, next) => {
    try {
      await Temp.findByIdAndUpdate(req.temp.id, req.body).select("-__v");
      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  };
  
  exports.deleteTemp = async (req, res, next) => {
    try {
      await Temp.findByIdAndRemove({ _id: req.temp.id }).select("-__v");
      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  };
  ```
  
* `temp.routes.js`
  
  ```javascript
  const express = require("express");
  const {
    getTemp,
    createTemp,
    updateTemp,
    deleteTemp,
  } = require("./temp.controllers");
  const router = express.Router();
  
  // Everything with the word temp is a placeholder that you'll change in accordance with your project
  
  router.param("tempId", async (req, res, next, tempId) => {
    try {
      const foundTemp = await fetchTemp(tempId);
      if (!foundTemp) return next({ status: 404, message: "Temp not found" });
      req.temp = foundTemp;
      next();
    } catch (error) {
      return next(error);
    }
  });
  
  router.get("/", getTemp);
  router.post("/", createTemp);
  router.put("/:tempId", updateTemp);
  router.delete("/:tempId", deleteTemp);
  
  module.exports = router;
  ```

## app.js 
```javascript
const express = require("express");
const connectDb = require("./database");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const notFound = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const tempRoutes = require("./api/temp.routes");
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
```
## package.json stuff
### Installed packages
* `express`
* `mongoose`
* `dotenv`
* `morgan`
* `cors`
 
```json
{
  "name": "express-template-package",
  "version": "1.0.0",
  "description": "In this package, you will be able to set up your express app automatically which saves time for you to do your project so you don't have to worry about going through the same process of installing packages, creating folders for middleware, API, and models, creating the `database.js` file, and creating a `.env` file.",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app.js",
    "devStart": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongoose": "^7.3.1",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}

```

## .env 
```javascript
PORT = 8000
MONGO_DB_URL = "YOUR MONGODB URL"
```

## .gitignore 
```javascript
node_modules
```
* NOTE: don't forget to include your `.env` file in `.gitignore`
