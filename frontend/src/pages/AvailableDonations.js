import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

function AvailableDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/donations",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDonations(data);
    } catch (error) {
      console.log("Error fetching donations");
    } finally {
      setLoading(false);
    }
  };

  const acceptDonation = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/donations/accept/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Remove donation immediately from UI
      setDonations((prev) =>
        prev.filter((donation) => donation._id !== id)
      );

      // Redirect to accepted page
      navigate("/ngo-history");

    } catch (error) {
      alert("Error accepting donation");
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <DashboardLayout>
      <div style={containerStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h2 style={titleStyle}>Available Donations</h2>
          <p style={subtitleStyle}>
            Donations near your location waiting to be collected.
          </p>
        </div>

        {/* Summary */}
        <div style={summaryCard}>
          <h3 style={{ margin: 0 }}>
            {donations.length} Available Nearby
          </h3>
        </div>

        {/* Cards */}
        {loading ? (
          <p>Loading...</p>
        ) : donations.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={cardGrid}>
            {donations.map((donation) => (
              <div key={donation._id} style={donationCard}>
                <div style={cardHeader}>
                  <h4 style={{ margin: 0 }}>{donation.foodType}</h4>
                  <span style={statusBadge}>Available</span>
                </div>

                <p style={metaText}>
                  <strong>Quantity:</strong> {donation.quantity}
                </p>

                <p style={metaText}>
                  <strong>Restaurant:</strong>{" "}
                  {donation.restaurant?.name}
                </p>

                <p style={metaText}>
                  <strong>Expires:</strong>{" "}
                  {new Date(donation.expiryTime).toLocaleString()}
                </p>

                <button
                  style={acceptButton}
                  onClick={() => acceptDonation(donation._id)}
                >
                  Accept Donation
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

/* ========================= */
/* ===== COMPONENTS ======== */
/* ========================= */

function EmptyState() {
  return (
    <div style={emptyStyle}>
      <h3>No Donations Available</h3>
      <p style={{ color: "#6b7280" }}>
        Check back later for new contributions.
      </p>
    </div>
  );
}

/* ========================= */
/* ===== STYLES ============ */
/* ========================= */

const containerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  paddingBottom: "60px"
};

const headerStyle = { marginBottom: "30px" };

const titleStyle = {
  fontSize: "28px",
  fontWeight: "800",
  margin: 0,
  color: "#111827"
};

const subtitleStyle = {
  color: "#6b7280",
  marginTop: "6px"
};

const summaryCard = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "18px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
  border: "1px solid #f3f4f6",
  marginBottom: "30px"
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "24px"
};

const donationCard = {
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "20px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
  border: "1px solid #f1f5f9",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const metaText = {
  fontSize: "14px",
  color: "#374151",
  margin: "4px 0"
};

const statusBadge = {
  backgroundColor: "#dbeafe",
  color: "#1e40af",
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "600"
};

const acceptButton = {
  marginTop: "12px",
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#10b981",
  color: "white",
  fontWeight: "600",
  cursor: "pointer"
};

const emptyStyle = {
  textAlign: "center",
  padding: "40px"
};

export default AvailableDonations;