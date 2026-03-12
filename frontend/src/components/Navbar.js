import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) return null;

  return (
    <div style={{
      backgroundColor: "#007bff",
      padding: "15px",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h3 style={{ margin: 0, cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}>
        Smart Surplus
      </h3>

      <button
        style={{
          background: "white",
          color: "#007bff"
        }}
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
