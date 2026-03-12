import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
         `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      login(data);
      navigate("/dashboard");

    } catch (error) {
      setMessage("Invalid Credentials");
      setError(true);
    }
  };

  return (
  <div style={pageContainer}>
    
<div style={leftPanel}>
  <div style={gradientOverlay}></div>

  <div style={leftContent}>
    <h1 style={brandTitle}>FoodBridge</h1>

    <p style={brandSubtitle}>
      Your gateway to a waste-free community.
    </p>

    
    <p style={{ marginTop: '40px', color: '#10b981', fontWeight: '500' ,fontSize: '20px'}}>
      "Zaya nahi, Zariya bano."
    </p>
  </div>
</div>

    <div style={rightPanel}>
      <div style={loginCard}>
        <h2 style={loginTitle}>Login to Continue</h2>
        {message && (
          <div style={error ? errorBox : successBox}>
            {message}
          </div>
        )}
        <p style={loginSubtitle}> </p>

        <form onSubmit={handleLogin}>
          <input
            style={inputStyle}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={loginButton} type="submit">
            Login
          </button>
        </form>

        <p style={registerText}>
          Don't have an account?{" "}
          <span
            style={registerLink}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>

  </div>
);
}

const pageContainer = {
  display: "flex",
  height: "100vh",
  fontFamily: "Inter, sans-serif"
};

const errorBox = {
  backgroundColor: "#fee2e2",
  color: "#991b1b",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "15px",
  fontSize: "14px",
};

const successBox = {
  backgroundColor: "#dcfce7",
  color: "#166534",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "15px",
  fontSize: "14px",
};

const leftPanel = {
  flex: 1,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  overflow: "hidden"
};

const gradientOverlay = {
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)" 
};

const brandTitle = {
  fontSize: "42px",
  fontWeight: "800",
  marginBottom: "15px",
  color: "#10b981", 
  letterSpacing: "-1px"
};

const brandSubtitle = {
  fontSize: "17px",
  lineHeight: "1.6",
  opacity: 0.85,
  color: "#f3f4f6",
  marginBottom: "30px"
};


const leftContent = {
  position: "relative",
  textAlign: "center",
  padding: "40px",
  maxWidth: "420px"
};

const illustration = {
  width: "120px",
  opacity: 0.9
};

const rightPanel = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f9fafb"
};

const loginCard = {
  backgroundColor: "white",
  padding: "45px",
  borderRadius: "14px",
  width: "360px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.08)"
};

const loginTitle = {
  marginBottom: "5px"
};

const loginSubtitle = {
  marginBottom: "25px",
  color: "#6b7280",
  fontSize: "14px"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px"
};

const loginButton = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#10b981",
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "10px"
};

const registerText = {
  marginTop: "20px",
  textAlign: "center",
  fontSize: "14px"
};

const registerLink = {
  color: "#10b981",
  fontWeight: "600",
  cursor: "pointer"
};

export default Login;
