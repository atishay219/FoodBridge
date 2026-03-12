const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  getRestaurantStats,
  getNgoStats,
  getGlobalStats
} = require("../services/statsService");


router.get(
  "/restaurant",
  protect,
  authorize("restaurant"),
  async (req, res, next) => {
    try {
      const stats = await getRestaurantStats(req.user._id);
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/ngo",
  protect,
  authorize("ngo"),
  async (req, res, next) => {
    try {
      const stats = await getNgoStats(req.user._id);
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
);


router.get(
  "/global",
  async (req, res, next) => {
    try {
      const stats = await getGlobalStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;