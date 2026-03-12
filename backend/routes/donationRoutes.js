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


router.post(
  "/",
  protect,
  authorize("restaurant"),
  createDonation
);

router.get(
  "/",
  protect,
  authorize("ngo"),
  getDonations
);

router.put(
  "/accept/:id",
  protect,
  authorize("ngo"),
  acceptDonation
);

router.put(
  "/deliver/:id",
  protect,
  authorize("ngo"),
  markDelivered
);

router.get(
  "/restaurant/history",
  protect,
  authorize("restaurant"),
  getRestaurantDonations
);


router.get(
  "/ngo/history",
  protect,
  authorize("ngo"),
  getNgoDonations
);

module.exports = router;
