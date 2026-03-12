import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function TopNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const name = user?.name || "User";
  const role = user?.role;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={topbarStyle}>
      {/* Empty Left Side (Provides visual "breathing room") */}
      <div />

      {/* Right Side: Profile & Logout aligned together */}
      <div style={profileSectionStyle}>
        
        {/* User Details */}
        <div style={userInfoStyle}>
          <div style={nameStyle}>{name}</div>
          <div style={roleTagStyle}>
            {role === "restaurant" ? "Restaurant Partner" : "NGO Partner"}
          </div>
        </div>

        {/* Squircle Avatar - Synced with Sidebar Icons */}
        <div style={avatarStyle}>
          {name?.charAt(0).toUpperCase()}
        </div>

        {/* Separator Line */}
        <div style={verticalDivider} />

        {/* Integrated Logout Button */}
        <button onClick={handleLogout} style={logoutButtonStyle}>
          Logout
        </button>
      </div>
    </div>
  );
}

/* --- SYNCED DESIGN SYSTEM --- */

const topbarStyle = {
  height: "72px",
  backgroundColor: "rgba(255, 255, 255, 0.95)", // Slightly transparent
  backdropFilter: "blur(8px)", // Blurs the content passing underneath
  padding: "0 32px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  
  // THE KEY CHANGES:
  borderBottom: "1px solid #e2e8f0", 
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)", // Subtle "lift" shadow
  
  position: "sticky",
  top: 0,
  zIndex: 100,
};

const profileSectionStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const userInfoStyle = {
  textAlign: "right",
};

const nameStyle = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#111827",
  marginBottom: "2px",
};

const roleTagStyle = {
  fontSize: "11px",
  fontWeight: "600",
  color: "#059669", // Brand Green
  textTransform: "uppercase",
  letterSpacing: "0.6px",
};

const avatarStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "12px",
  backgroundColor: "#f1f5f9", // Light contrast for the squircle
  color: "#0f172a", // Dark text to match Sidebar color
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "700",
  border: "1px solid #e2e8f0",
};

const verticalDivider = {
  width: "1px",
  height: "24px",
  backgroundColor: "#f3f4f6",
  margin: "0 8px",
};

const logoutButtonStyle = {
  padding: "8px 16px",
  backgroundColor: "#fff1f2",
  color: "#e11d48",
  border: "1px solid #ffe4e6",
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer",
};

export default TopNavbar;