const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    foodType: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    expiryTime: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["posted", "accepted", "delivered", "expired"],
      default: "posted",
    },

    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    acceptedAt: {
      type: Date,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
  },


  },
  { timestamps: true }
);

donationSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Donation", donationSchema);
