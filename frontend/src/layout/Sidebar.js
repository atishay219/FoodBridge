import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <div style={sidebarStyle}>
      
      <div style={brandStyle}>  
        <span>FoodBridge</span>
      </div>

      <nav style={navStyle}>
        <SidebarLink to="/dashboard" label="My Impact" />

        {role === "restaurant" && (
          <>
            <SidebarLink to="/post-donation" label="Create Donation" />
            <SidebarLink to="/my-donations" label="Donation History" />
          </>
        )}

        {role === "ngo" && (
          <>
            <SidebarLink to="/available-donations" label="Available Donations" />
            <SidebarLink to="/ngo-history" label="Accepted Donations" />
          </>
        )}
      </nav>
    </div>
  );
}

function SidebarLink({ to, label }) {
  return (
    <NavLink to={to} style={linkStyle}>
      {label}
    </NavLink>
  );
}


const sidebarStyle = {
  width: "260px",
  backgroundColor: "#0f172a",
  padding: "32px 16px",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  position: "sticky",
  top: 0,
  color: "#ffffff"
};

const brandStyle = {
  fontSize: "20px",
  fontWeight: "800",
  marginBottom: "48px",
  color: "#10b981",
};

const logoIconStyle = {
  marginRight: "8px"
};

const navStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  color: isActive ? "#ffffff" : "#94a3b8",
  backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
  padding: "12px 16px",
  borderRadius: "12px",
  fontWeight: isActive ? "600" : "500",
  fontSize: "15px",
  borderLeft: isActive ? "4px solid #10b981" : "4px solid transparent",
});

export default Sidebar;