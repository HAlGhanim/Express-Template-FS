const express = require("express");
const {
  getTemp,
  updateTemp,
  deleteTemp,
  fetchTemp,
  signin,
  signup,
} = require("./temp.controllers");
const router = express.Router();
const passport = require("passport");

// Everything with the word temp is a placeholder that you'll change in accordance with your project

router.param("tempId", async (req, res, next, tempId) => {
  try {
    const foundTemp = await fetchTemp(tempId);
    if (!foundTemp) return next({ status: 404, message: "Temp not found" });
    req.temp = foundTemp;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", getTemp);
router.post("/signup", signup);
router.put("/:tempId", updateTemp);
router.delete("/:tempId", deleteTemp);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
