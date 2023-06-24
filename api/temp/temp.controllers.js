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
