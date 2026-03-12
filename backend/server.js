require("dotenv").config();   // ✅ MUST be first

const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const statsRoutes = require("./routes/statsRoutes");


connectDB();   // ✅ now env variables are available

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/stats", statsRoutes);

const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Smart Surplus API Running...");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
