import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "../context/AuthContext";

function NgoHistory() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchDonations = useCallback(async () => {
    try {
      const token = user?.token;
      if (!token) return;

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/donations/ngo/history`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDonations(data);
    } catch (error) {
      console.log("Error fetching NGO history", error);
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  const markDelivered = async (id) => {
    try {
      const token = user?.token;

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/donations/deliver/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchDonations();
    } catch (error) {
      alert("Error marking delivered");
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  const total = donations.length;
  const delivered = donations.filter((d) => d.status === "delivered").length;
  const accepted = donations.filter((d) => d.status === "accepted").length;

  return (
    <DashboardLayout>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Accepted Donations</h2>
          <p style={subtitleStyle}>Track all donations you’ve collected.</p>
        </div>

        <div style={summaryGrid}>
          <SummaryCard label="Total Accepted" value={total} />
          <SummaryCard label="Delivered" value={delivered} />
          <SummaryCard label="Pending Delivery" value={accepted} />
        </div>

        <div style={tableCard}>
          {loading ? (
            <p>Loading...</p>
          ) : donations.length === 0 ? (
            <EmptyState />
          ) : (
            <div style={tableWrapper}>
              <table style={tableStyle}>
                <thead>
                  <tr style={tableHeaderRow}>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Food</th>
                    <th style={thStyle}>Quantity</th>
                    <th style={thStyle}>Restaurant</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation._id} style={rowStyle}>
                      <td style={tdStyle}>
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </td>
                      <td style={tdStyle}>{donation.foodType}</td>
                      <td style={tdStyle}>{donation.quantity}</td>
                      <td style={tdStyle}>
                        <div style={restroCell}>
                          {donation.restaurant?.name}
                          {donation.location?.coordinates && (
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${donation.location.coordinates[1]},${donation.location.coordinates[0]}`}
                              target="_blank"
                              rel="noreferrer"
                              style={iconLink}
                              title="View on Map"
                            >
                              📍
                            </a>
                          )}
                        </div>
                      </td>
                      <td style={tdStyle}>
                        <StatusBadge status={donation.status} />
                      </td>
                      <td style={tdStyle}>
                        {donation.status === "accepted" && (
                          <button
                            style={deliverBtn}
                            onClick={() => markDelivered(donation._id)}
                          >
                            Mark Delivered
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div style={summaryCard}>
      <p style={summaryLabel}>{label}</p>
      <h3 style={summaryValue}>{value}</h3>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    delivered: { bg: "#dcfce7", text: "#166534" },
    accepted: { bg: "#dbeafe", text: "#1e40af" },
  };

  const color = colors[status] || colors.accepted;

  return (
    <span
      style={{
        backgroundColor: color.bg,
        color: color.text,
        padding: "4px 10px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "600",
      }}
    >
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div style={emptyStateStyle}>
      <h3>No Accepted Donations</h3>
      <p style={{ color: "#6b7280" }}>
        Accept donations from the available section.
      </p>
    </div>
  );
}

const containerStyle = { maxWidth: "1100px", margin: "0 auto" };
const headerStyle = { marginBottom: "30px" };
const titleStyle = { fontSize: "28px", fontWeight: "800", margin: 0 };
const subtitleStyle = { color: "#6b7280", marginTop: "6px" };

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
  marginBottom: "40px",
};

const summaryCard = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "18px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
  border: "1px solid #f3f4f6",
};

const summaryLabel = { fontSize: "13px", color: "#6b7280" };
const summaryValue = { fontSize: "22px", fontWeight: "800" };

const tableCard = {
  backgroundColor: "#ffffff",
  padding: "28px",
  borderRadius: "24px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
  border: "1px solid #f1f5f9",
};

const tableWrapper = { overflowX: "auto" };
const tableStyle = { width: "100%", borderCollapse: "collapse", textAlign: "center" };
const tableHeaderRow = { borderBottom: "1px solid #f3f4f6" };
const thStyle = { padding: "12px", fontSize: "13px", color: "#6b7280" };
const rowStyle = { borderBottom: "1px solid #f9fafb" };
const tdStyle = { padding: "14px 12px", fontSize: "14px" };

const restroCell = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const iconLink = {
  textDecoration: "none",
  fontSize: "16px",
  cursor: "pointer",
};

const deliverBtn = {
  padding: "6px 12px",
  backgroundColor: "#10b981",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
};

const emptyStateStyle = { textAlign: "center", padding: "40px" };

export default NgoHistory;