const Donation = require("../models/Donation");
const calculateDistance = require("../utils/calculateDistance");

async function findSmartDonations(ngo) {
  const rawDonations = await Donation.find({
    status: "posted",
    location: {
      $near: {
        $geometry: ngo.location,
        $maxDistance: 10000,
      },
    },
  }).populate("restaurant", "name email");

  const now = new Date();

  const donationsWithScore = rawDonations
    .map((donation) => {
      const [lng, lat] = donation.location.coordinates;
      const [ngoLng, ngoLat] = ngo.location.coordinates;

      const distanceInKm = calculateDistance(
        ngoLat,
        ngoLng,
        lat,
        lng
      );

      const timeLeftHours = (new Date(donation.expiryTime) - now) / (1000 * 60 * 60);

      if (timeLeftHours <= 0) return null;

      const score = (distanceInKm * 0.7) + ((1 / timeLeftHours) * 0.3);

      return {
        ...donation.toObject(),
        distanceInKm: parseFloat(distanceInKm.toFixed(2)),
        timeLeftHours: parseFloat(timeLeftHours.toFixed(2)),
        score,
      };
    })
    .filter(Boolean);

  return donationsWithScore.sort((a, b) => a.score - b.score);
}

module.exports = {
  findSmartDonations,
};