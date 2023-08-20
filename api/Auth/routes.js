const express = require("express");
const {
  getUsers,
  signup,
  signin,
  updateUser,
  deleteUser,
  fetchUser,
} = require("./controllers");
const {
  imageConditional,
} = require("../../middlewares/Images/imageConditional");
const { hashing } = require("../../middlewares/password/password");
const router = express.Router();
const passport = require("passport");
const upload = require("../../middlewares/Images/uploader");

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

router.get("/", getUsers);
router.post(
  "/signup",
  upload.single("image"),
  imageConditional,
  hashing,
  signup
);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  hashing,
  updateUser
);
router.delete(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

module.exports = router;
