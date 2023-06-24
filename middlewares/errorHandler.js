module.exports = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
};
