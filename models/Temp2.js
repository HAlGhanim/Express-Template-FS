const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const Temp2Schema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  // create relations in here and in the other model
});

module.exports = model("Temp2", Temp2Schema);
