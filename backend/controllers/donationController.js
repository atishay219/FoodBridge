const Donation = require("../models/Donation");
const User = require("../models/User");

const calculateDistance = require("../utils/calculateDistance");
const { findSmartDonations } = require("../services/matchingService");


// 📝 Create Donation (Restaurant Only)
exports.createDonation = async (req, res) => {
  try {
    const { foodType, quantity, expiryTime } = req.body;

    const donation = await Donation.create({
      restaurant: req.user.id,
      foodType,
      quantity,
      expiryTime,
      location: req.user.location,
    });

    res.status(201).json(donation);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📋 Get All Donations (NGO View)

// exports.getDonations = async (req, res) => {
//   try {
//     const ngo = req.user;

//     if (!ngo.location || !ngo.location.coordinates) {
//       return res.status(400).json({
//         message: "NGO location not set",
//       });
//     }

//     const donations = await findSmartDonations(ngo);

//     res.json(donations);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.getDonations = async (req, res, next) => {
  try {
    const ngo = req.user;

    if (!ngo.location || !ngo.location.coordinates) {
      const error = new Error("NGO location not set");
      error.statusCode = 400;
      throw error;
    }

    const donations = await findSmartDonations(ngo);

    res.json(donations);
  } catch (error) {
    next(error);
  }
};



// ✅ Accept Donation (NGO Only)
exports.acceptDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    if (donation.status !== "posted") {
      return res.status(400).json({ message: "Donation already processed" });
    }

    donation.status = "accepted";
    donation.acceptedBy = req.user.id;
    donation.acceptedAt = new Date();

    await donation.save();

    res.json({ message: "Donation accepted", donation });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🚚 Mark Delivered
exports.markDelivered = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // Must be accepted first
    if (donation.status !== "accepted") {
      return res.status(400).json({ message: "Donation not accepted yet" });
    }

    // Only NGO who accepted can deliver
    if (donation.acceptedBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to deliver this donation",
      });
    }

    donation.status = "delivered";
    await donation.save();

    res.json({ message: "Donation delivered", donation });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📜 Restaurant Donation History
exports.getRestaurantDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      restaurant: req.user.id,
    })
      .populate("acceptedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(donations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🏢 NGO Accepted Donations History
exports.getNgoDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      acceptedBy: req.user.id,
    })
      .populate("restaurant", "name email")
      .sort({ createdAt: -1 });

    res.json(donations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


