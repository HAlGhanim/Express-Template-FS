const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const TempSchema = new Schema({
  name: String,
});

module.exports = model("Temp", TempSchema);
