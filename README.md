# Express-Template-FS

In this package, you will be able to set up your express app automatically which saves time for you to do your project so you don't have to worry about going through the same process of installing packages, creating folders for middleware, API, and models, creating the `database.js` file, and creating a `.env` file.

Template 2.0: made the template tailored to authorization and authentication

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

* `passport.js`

```javascript
const LocalStrategy = require("passport-local");
const Temp = require("../models/Temp");
const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(
  { usernameField: "name" },
  async (name, password, done) => {
    try {
      const temp = await Temp.findOne({ name: name});
      if (!temp) {
        return done(null, false);
      }
      const passwordMatch = await bcrypt.compare(password, temp.password);
      if (!passwordMatch) {
        return done(null, false);
      }
      return done(null, temp);
    } catch (error) {
      return done(error);
    }
  }
);

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
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const TempSchema = new Schema({
  name: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = model("Temp", TempSchema);
```

## api/temp folders
* `temp.controllers.js`
  
```javascript
const Temp = require("../../models/Temp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const passHash = async (password) => {
  const rounds = 10;
  const hashedPassword = await bcrypt.hash(password, rounds);
  return hashedPassword;
};

const generateToken = (temp) => {
  const payload = {
    _id: temp._id,
    name: temp.name,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXP,
  });
  return token;
};

exports.signin = async (req, res) => {
  try {
    console.log(req.user);
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.signup = async (req, res) => {
  try {
    const { password } = req.body;
    req.body.password = await passHash(password);
    const newTemp = await Temp.create(req.body);
    const token = generateToken(newTemp);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.fetchTemp = async (tempId, next) => {
  try {
    const temp1 = await Temp.findById(tempId);
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

exports.updateTemp = async (req, res, next) => {
  try {
    await Temp.findByIdAndUpdate(req.temp.id, req.body);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteTemp = async (req, res, next) => {
  try {
    await Temp.findByIdAndRemove({ _id: req.temp.id });
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
  updateTemp,
  deleteTemp,
  fetchTemp,
  signin,
  signup,
} = require("./temp.controllers");
const router = express.Router();
const passport = require("passport");

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
router.post("/signup", signup);
router.put("/:tempId", updateTemp);
router.delete("/:tempId", deleteTemp);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

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
const tempRoutes = require("./api/temp/temp.routes");
const passport = require("passport");
const { localStrategy } = require("./middlewares/passport");
require("dotenv").config();

app.use(cors());
connectDb();
app.use(express.json());
app.use(morgan("dev"));

app.use(passport.initialize());
passport.use("local", localStrategy);

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
* `bcrypt`
* `jsonwebtoken`
* `passport`
* `passport-local`
 
```json
{
  "name": "express-template-fs23",
  "version": "1.0.0",
  "description": "In this package, you will be able to set up your express app automatically which saves time for you to do your project so you don't have to worry about going through the same process of installing packages, creating folders for middleware, API, and models, creating the `database.js` file, and creating a `.env` file.",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app.js",
    "devStart": "nodemon app.js"
  },
  "keywords": [],
  "author": "HAlGhanim",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.3.1",
    "morgan": "^1.10.0",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}

```

## .env 
```javascript
PORT = 8000
JWT_SECRET = "secret"
JWT_TOKEN_EXP = "1h"
MONGO_DB_URL = "YOUR MONGODB URL"
```

## .gitignore 
```javascript
node_modules
```
* NOTE: don't forget to include your `.env` file in `.gitignore`
