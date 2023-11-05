module.exports = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
};
