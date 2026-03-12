import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "../context/AuthContext";

function PostDonation() {
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!foodType || !quantity || !expiryTime) {
      return alert("Please fill all fields");
    }

    if (new Date(expiryTime) <= new Date()) {
      return alert("Expiry time must be in the future");
    }

    try {
      setLoading(true);
      const token = user?.token;

      await axios.post(
         `${process.env.REACT_APP_API_URL}/api/donations`,
        {
          foodType,
          quantity,
          expiryTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("🎉 Donation posted successfully!");

      setFoodType("");
      setQuantity("");
      setExpiryTime("");

      setTimeout(() => {
        navigate("/my-donations");
      }, 1500);

    } catch (error) {
      alert("Error posting donation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "20px" }}>Create New Donation</h2>

        {successMessage && (
          <div style={successStyle}>{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          
          <div>
            <label style={labelStyle}>Food Type</label>
            <input
              type="text"
              placeholder="e.g., Rice, Bread, Curry"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Quantity (Meals)</label>
            <input
              type="number"
              placeholder="Enter number of meals"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={inputStyle}
              min="1"
            />
          </div>

          <div>
            <label style={labelStyle}>Pickup Expiry Time</label>
            <input
              type="datetime-local"
              value={expiryTime}
              onChange={(e) => setExpiryTime(e.target.value)}
              style={inputStyle}
            />
            <small style={{ color: "#6b7280" }}>
              Select a realistic pickup time for NGOs.
            </small>
          </div>

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Posting..." : "Post Donation"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

const cardStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  maxWidth: "600px"
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "600"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #d1d5db"
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#10b981",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600"
};

const successStyle = {
  backgroundColor: "#ecfdf5",
  color: "#065f46",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "15px"
};

export default PostDonation;