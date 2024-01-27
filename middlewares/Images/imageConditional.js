exports.imageConditional = (req, res, next) => {
  if (req.file) {
    req.body.image = `media/${req.file.filename}`;
    next();
  } else {
    return res.status(400).json({ error: "No image uploaded" });
  }
};
