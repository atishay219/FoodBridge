import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";

function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          "http://localhost:5000/api/donations/restaurant/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDonations(data);
      } catch (error) {
        console.log("Error fetching donations");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const total = donations.length;
  const delivered = donations.filter(d => d.status === "delivered").length;
  const accepted = donations.filter(d => d.status === "accepted").length;
  const pending = donations.filter(d => d.status === "posted").length;

  return (
    <DashboardLayout>
      <div style={containerStyle}>

        {/* Header */}
        <div style={headerStyle}>
          <h2 style={titleStyle}>Donation History</h2>
          <p style={subtitleStyle}>
            Track all your previous food contributions.
          </p>
        </div>

        {/* Summary Strip */}
        <div style={summaryGrid}>
          <SummaryCard label="Total" value={total} />
          <SummaryCard label="Delivered" value={delivered} />
          <SummaryCard label="Accepted" value={accepted} />
          <SummaryCard label="Pending" value={pending} />
        </div>

        {/* Table Section */}
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
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Accepted By</th>
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
                        <StatusBadge status={donation.status} />
                      </td>
                      <td style={tdStyle}>
                        {donation.acceptedBy?.name || "-"}
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

/* ========================= */
/* ===== SUB COMPONENTS ==== */
/* ========================= */

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
    posted: { bg: "#fef3c7", text: "#92400e" },
    expired: { bg: "#fee2e2", text: "#991b1b" }
  };

  const color = colors[status] || colors.posted;

  return (
    <span
      style={{
        backgroundColor: color.bg,
        color: color.text,
        padding: "4px 10px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "600"
      }}
    >
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div style={emptyStateStyle}>
      <h3>No Donations Yet</h3>
      <p style={{ color: "#6b7280" }}>
        Start by creating your first donation.
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

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
  marginBottom: "40px"
};

const summaryCard = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "18px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
  border: "1px solid #f3f4f6"
};

const summaryLabel = {
  fontSize: "13px",
  color: "#6b7280",
  margin: 0
};

const summaryValue = {
  fontSize: "22px",
  fontWeight: "800",
  marginTop: "6px",
  color: "#111827"
};

const tableCard = {
  backgroundColor: "#ffffff",
  padding: "28px",
  borderRadius: "24px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
  border: "1px solid #f1f5f9"
};

const tableWrapper = { overflowX: "auto" };

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center"
};

const tableHeaderRow = {
  borderBottom: "1px solid #f3f4f6"
};

const thStyle = {
  padding: "12px",
  fontSize: "13px",
  color: "#6b7280",
  fontWeight: "600"
};

const rowStyle = {
  borderBottom: "1px solid #f9fafb"
};

const tdStyle = {
  padding: "14px 12px",
  fontSize: "14px",
  color: "#374151"
};

const emptyStateStyle = {
  textAlign: "center",
  padding: "40px"
};

export default MyDonations;