const express = require("express");
const router = express.Router();

const {
    createDonation,
    getDonations,
    acceptDonation,
    markDelivered,
    getRestaurantDonations,
    getNgoDonations,
} = require("../controllers/donationController");

const { protect, authorize } = require("../middleware/authMiddleware");

// 📝 Restaurant posts donation
router.post(
  "/",
  protect,
  authorize("restaurant"),
  createDonation
);

// 📋 NGO views available donations
router.get(
  "/",
  protect,
  authorize("ngo"),
  getDonations
);

// ✅ NGO accepts donation
router.put(
  "/accept/:id",
  protect,
  authorize("ngo"),
  acceptDonation
);

// 🚚 Mark delivered (NGO only for MVP)
router.put(
  "/deliver/:id",
  protect,
  authorize("ngo"),
  markDelivered
);

// 🍽 Restaurant history
router.get(
  "/restaurant/history",
  protect,
  authorize("restaurant"),
  getRestaurantDonations
);

// 🏢 NGO history
router.get(
  "/ngo/history",
  protect,
  authorize("ngo"),
  getNgoDonations
);

module.exports = router;
