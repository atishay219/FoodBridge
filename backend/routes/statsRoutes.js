const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getRestaurantStats, getNgoStats, getGlobalStats } = require("../services/statsService");

const router = express.Router();

router.get("/restaurant", protect, async (req, res, next) => {
  try {
    const stats = await getRestaurantStats(req.user._id);
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

router.get("/ngo", protect, async (req, res, next) => {
  try {
    const stats = await getNgoStats(req.user._id);
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

router.get("/global", async (req, res, next) => {
  try {
    const stats = await getGlobalStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;