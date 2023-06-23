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
