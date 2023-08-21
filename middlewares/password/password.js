const passhash = require("../../utils/auth/passhash");

exports.hashing = async (req, res, next) => {
  if (req.body.password) {
    const { password } = req.body;
    req.body.password = await passhash(password);
  }
  return next();
};
