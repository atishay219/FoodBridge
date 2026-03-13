import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "../context/AuthContext";

function AvailableDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchDonations = useCallback(async () => {
    if (!user?.token) return;
    
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/donations`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setDonations(data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  const acceptDonation = async (id) => {
    if (submitting) return;
    
    try {
      setSubmitting(id);
      const token = user?.token;
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/donations/accept/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDonations((prev) => prev.filter((donation) => donation._id !== id));
      navigate("/ngo-history");
    } catch (error) {
      console.error("Error accepting donation:", error);
      alert("Error accepting donation. Please try again.");
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <DashboardLayout>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Available Donations</h2>
          <p style={subtitleStyle}>
            Donations near your location waiting to be collected.
          </p>
        </div>

        <div style={summaryCard}>
          <h3 style={{ margin: 0 }}>
            {donations.length} Available Nearby
          </h3>
        </div>

        {loading ? (
          <p>Loading available donations...</p>
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
                  <strong>Expires:</strong>{" "}
                  {donation.expiryTime 
                    ? new Date(donation.expiryTime).toLocaleString() 
                    : "No expiry set"}
                </p>

                <p style={metaText}>
                  <strong>Restaurant:</strong>{" "}
                  {donation.restaurant?.name || "Partner Restaurant"}
                </p>

                <p style={metaText}>
                  <strong>Distance:</strong>{" "}
                  {donation.distanceInKm !== undefined ? donation.distanceInKm.toFixed(2) + " km" : "N/A"}
                </p>

                {donation.location?.coordinates && (
                  <div style={{ marginTop: "8px" }}>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${donation.location.coordinates[1]},${donation.location.coordinates[0]}`}
                      target="_blank"
                      rel="noreferrer"
                      style={mapLink}
                    >
                      📍 View on Maps
                    </a>
                  </div>
                )}

                <button
                  style={{
                    ...acceptButton,
                    opacity: submitting === donation._id ? 0.7 : 1,
                    cursor: submitting === donation._id ? "not-allowed" : "pointer"
                  }}
                  onClick={() => acceptDonation(donation._id)}
                  disabled={submitting === donation._id}
                >
                  {submitting === donation._id ? "Processing..." : "Accept Donation"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

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


const containerStyle = { maxWidth: "1100px", margin: "0 auto", paddingBottom: "60px" };
const headerStyle = { marginBottom: "30px" };
const titleStyle = { fontSize: "28px", fontWeight: "800", margin: 0, color: "#111827" };
const subtitleStyle = { color: "#6b7280", marginTop: "6px" };
const summaryCard = { backgroundColor: "#ffffff", padding: "20px", borderRadius: "18px", boxShadow: "0 8px 20px rgba(0,0,0,0.04)", border: "1px solid #f3f4f6", marginBottom: "30px" };
const cardGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" };
const donationCard = { backgroundColor: "#ffffff", padding: "24px", borderRadius: "20px", boxShadow: "0 12px 30px rgba(0,0,0,0.05)", border: "1px solid #f1f5f9", display: "flex", flexDirection: "column", gap: "10px" };
const cardHeader = { display: "flex", justifyContent: "space-between", alignItems: "center" };
const metaText = { fontSize: "14px", color: "#374151", margin: "4px 0" };
const statusBadge = { backgroundColor: "#dbeafe", color: "#1e40af", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" };
const acceptButton = { marginTop: "12px", padding: "12px", borderRadius: "10px", border: "none", backgroundColor: "#10b981", color: "white", fontWeight: "600" };
const mapLink = { color: "#2563eb", fontWeight: "600", fontSize: "14px", textDecoration: "none", display: "inline-flex", alignItems: "center" };
const emptyStyle = { textAlign: "center", padding: "40px" };

export default AvailableDonations;