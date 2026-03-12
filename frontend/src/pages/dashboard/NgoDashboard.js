import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layout/DashboardLayout";

function NgoDashboard() {
  const [stats, setStats] = useState(null);
  const name = localStorage.getItem("name") || "NGO";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          "http://localhost:5000/api/stats/ngo",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStats(data);
      } catch (error) {
        console.log("Error fetching NGO stats");
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div style={contentContainer}>
        {/* Decorative Background */}
        <div style={decorativeCircle}></div>

        {/* Welcome Section */}
        <div style={headerSection}>
          <h2 style={welcomeTitle}>
            Welcome back,{" "}
            <span style={{ color: "#10b981" }}>{name}</span> 👋
          </h2>
          <p style={welcomeSub}>
            Here's the impact your organization has created.
          </p>
        </div>

        {/* Stats Cards */}
        <div style={statsGrid}>
          <ImpactCard
            title="Donations Accepted"
            value={stats?.totalAccepted || 0}
            icon="📦"
            color="#3b82f6"
          />

          <ImpactCard
            title="Meals Distributed"
            value={stats?.totalMeals || 0}
            icon="🍱"
            color="#10b981"
          />

          <ImpactCard
            title="Deliveries Completed"
            value={stats?.deliveredCount || 0}
            icon="🚚"
            color="#f59e0b"
          />
        </div>

        {/* Visual Fill Section */}
        <div style={illustrationSection}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046750.png"
            alt="Food Distribution"
            style={illustrationStyle}
          />

          <div style={{ maxWidth: "500px" }}>
            <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>
              Delivering hope through food.
            </h3>

            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
              By collecting surplus meals from restaurants and delivering them
              to communities in need, your organization plays a crucial role
              in reducing hunger and food waste.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ========================= */
/* ===== COMPONENTS ======== */
/* ========================= */

function ImpactCard({ title, value, icon, color }) {
  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0px)")
      }
    >
      <div
        style={{
          ...iconCircle,
          backgroundColor: `${color}15`,
          color: color,
        }}
      >
        {icon}
      </div>

      <div>
        <p style={cardLabel}>{title}</p>
        <h3 style={cardValue}>{value.toLocaleString()}</h3>
      </div>
    </div>
  );
}

/* ========================= */
/* ===== STYLES ============ */
/* ========================= */

const contentContainer = {
  maxWidth: "1100px",
  margin: "0 auto",
  position: "relative",
  zIndex: 1,
  paddingBottom: "60px",
};

const decorativeCircle = {
  position: "absolute",
  width: "400px",
  height: "400px",
  background:
    "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
  top: "-120px",
  right: "-120px",
  zIndex: 0,
};

const headerSection = {
  marginBottom: "40px",
};

const welcomeTitle = {
  fontSize: "30px",
  fontWeight: "800",
  color: "#111827",
  margin: 0,
  letterSpacing: "-0.5px",
};

const welcomeSub = {
  color: "#6b7280",
  marginTop: "6px",
  fontSize: "16px",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "28px",
  marginBottom: "60px",
};

const cardStyle = {
  background: "linear-gradient(145deg, #ffffff, #f8fafc)",
  padding: "30px",
  borderRadius: "24px",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.06)",
  border: "1px solid rgba(255,255,255,0.8)",
  transition: "all 0.25s ease",
};

const iconCircle = {
  width: "60px",
  height: "60px",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "26px",
};

const cardLabel = {
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: "500",
  margin: 0,
};

const cardValue = {
  fontSize: "32px",
  fontWeight: "800",
  color: "#111827",
  margin: "6px 0 0 0",
};

/* Illustration Section */

const illustrationSection = {
  display: "flex",
  alignItems: "center",
  gap: "40px",
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "28px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
  border: "1px solid #f1f5f9",
};

const illustrationStyle = {
  width: "120px",
  opacity: 0.85,
};

export default NgoDashboard;