const express = require("express");
const Auth = require("./controllers");
const {
  imageConditional,
} = require("../../middlewares/Images/imageConditional");
const { hashing } = require("../../middlewares/password/password");
const router = express.Router();
const passport = require("passport");
const upload = require("../../middlewares/Images/uploader");
const rateLimiter = require("../../middlewares/rates/rateLimiter");

router.param("userId", async (req, res, next, userId) => {
  try {
    const foundUser = await fetchUser(userId);
    if (!foundUser) return next({ status: 404, message: "User not found" });
    req.user = foundUser;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", Auth.getUsers);
router.post(
  "/signup",
  upload.single("image"),
  imageConditional,
  hashing,
  Auth.signup
);
router.post(
  "/signin",
  rateLimiter({ limit: 7, windowMs: 2 * 60 * 1000 }),
  passport.authenticate("local", { session: false }),
  Auth.signin
);
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  hashing,
  Auth.updateUser
);
router.delete(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  Auth.deleteUser
);

module.exports = router;
