const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const TempSchema = new Schema({
  name: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = model("Temp", TempSchema);
