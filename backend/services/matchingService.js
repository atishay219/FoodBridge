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

  const donationsWithScore = rawDonations.map((donation) => {
    const distanceInKm = calculateDistance(
      ngo.location.coordinates[1],
      ngo.location.coordinates[0],
      donation.location.coordinates[1],
      donation.location.coordinates[0]
    );

    const timeLeftHours =
      (new Date(donation.expiryTime) - now) / (1000 * 60 * 60);

    const score = distanceInKm * 0.7 + timeLeftHours * 0.3;

    return {
      ...donation.toObject(),
      distanceInKm,
      timeLeftHours,
      score,
    };
  });

  donationsWithScore.sort((a, b) => a.score - b.score);

  return donationsWithScore;
}

module.exports = {
  findSmartDonations,
};