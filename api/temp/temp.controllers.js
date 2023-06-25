const Temp = require("../../models/Temp");
const passHash = require("../../utils/auth/passhash");
const generateToken = require("../../utils/auth/generateToken");

// Everything with the word temp is a placeholder that you'll change in accordance with your project

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

exports.createTemp = async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = await passHash(password);
    const newTemp = await Temp.create(req.body);
    const token = generateToken(newTemp);
    res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

exports.signin = async (req, res) => {
  try {
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json(err.message);
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
