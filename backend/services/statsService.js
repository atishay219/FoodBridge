const Donation = require("../models/Donation");
const User = require("../models/User");

async function getRestaurantStats(restaurantId) {
  const donations = await Donation.find({ restaurant: restaurantId });

  const totalDonations = donations.length;

  const deliveredCount = donations.filter(
    (d) => d.status === "delivered"
  ).length;

  const totalMeals = donations.reduce(
    (sum, d) => sum + d.quantity,
    0
  );

  // Example estimation
  const co2Saved = totalMeals * 0.5; // simple estimate

  return {
    totalDonations,
    deliveredCount,
    totalMeals,
    co2Saved,
  };
}

async function getNgoStats(ngoId) {
  const donations = await Donation.find({ acceptedBy: ngoId });

  const totalAccepted = donations.length;

  const deliveredCount = donations.filter(
    (d) => d.status === "delivered"
  ).length;

  const totalMeals = donations.reduce(
    (sum, d) => sum + d.quantity,
    0
  );

  const impactScore = totalMeals * 0.4; // simple impact estimate

  return {
    totalAccepted,
    deliveredCount,
    totalMeals,
    impactScore,
  };
}

async function getGlobalStats() {
  const totalRestaurants = await User.countDocuments({ role: "restaurant" });
  const totalNgos = await User.countDocuments({ role: "ngo" });

  const totalDonations = await Donation.countDocuments();

  const deliveredDonations = await Donation.find({ status: "delivered" });

  const totalMeals = deliveredDonations.reduce(
    (sum, d) => sum + d.quantity,
    0
  );

  const totalDelivered = deliveredDonations.length;

  return {
    totalRestaurants,
    totalNgos,
    totalDonations,
    totalMeals,
    totalDelivered,
  };
}

module.exports = {
  getRestaurantStats,
  getNgoStats,
  getGlobalStats
};