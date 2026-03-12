import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div
      style={{
        backgroundColor: "#007bff",
        padding: "15px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h3
        style={{ margin: 0, cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}
      >
        FoodBridge
      </h3>

      <button
        style={{
          background: "white",
          color: "#007bff",
          border: "none",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;