const passHash = require("../../utils/auth/passHash");

exports.hashing = async (req, res, next) => {
  if (req.body.password) {
    const { password } = req.body;
    req.body.password = await passHash(password);
  }
  return next();
};
