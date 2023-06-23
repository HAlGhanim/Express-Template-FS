const express = require("express");
const {
  getTemp,
  createTemp,
  updateTemp,
  deleteTemp,
} = require("./temp.controllers");
const router = express.Router();

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
router.post("/", createTemp);
router.put("/:tempId", updateTemp);
router.delete("/:tempId", deleteTemp);

module.exports = router;
