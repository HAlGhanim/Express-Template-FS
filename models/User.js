const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  image: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: Number, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = model("User", UserSchema);
