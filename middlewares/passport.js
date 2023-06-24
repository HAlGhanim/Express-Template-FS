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
