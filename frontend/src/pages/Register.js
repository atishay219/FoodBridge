import { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") || "restaurant";
  const [role, setRole] = useState(defaultRole);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      setMessage("Geolocation is not supported by your browser.");
      setError(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setLatitude(lat);
      setLongitude(lng);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );

        const data = await res.json();

        setMessage(`Location detected: ${data.display_name}`);
        setError(false);

        setAddress(data.display_name);

      } catch (error) {
        setMessage("Location detected but address unavailable.");
      }

    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!latitude || !longitude) {
      setMessage("Please detect your location before registering.");
      setError(true);
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
          role,
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          address,
        }
      );

      login(data);
      navigate("/dashboard");

    } catch (error) {
      setMessage("Registration failed. Please try again.");
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
            Join the movement. Whether you're a kitchen with surplus or an organization with reach,
            your journey to impact starts here.
          </p>

          <p style={hinglishTag}>
            "Zaya nahi, Zariya bano."
          </p>
        </div>
      </div>

      <div style={rightPanel}>
        <div style={registerCard}>
          <h2 style={formTitle}>Create Account</h2>

          {message && (
            <div style={error ? errorBox : successBox}>
              {message}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <input
              style={inputStyle}
              type="text"
              placeholder="Organization / Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              style={inputStyle}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              style={inputStyle}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div style={roleContainer}>
              <label style={labelStyle}>Register as:</label>
              <select
                style={selectStyle}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="restaurant">Restaurant / Hotel</option>
                <option value="ngo">NGO / Food Bank</option>
              </select>
            </div>

            <button
              type="button"
              style={locationButton}
              onClick={detectLocation}
            >
              Detect My Location
            </button>

            {latitude && (
              <p style={locationText}>
                
              </p>
            )}

            <button style={registerButton} type="submit">
              Register Now
            </button>
          </form>

          <p style={loginText}>
            Already have an account?{" "}
            <span style={loginLink} onClick={() => navigate("/login")}>
              Login
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

const leftContent = {
  position: "relative",
  textAlign: "center",
  padding: "40px",
  maxWidth: "450px"
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
  marginBottom: "30px"
};

const hinglishTag = {
  marginTop: "40px",
  color: "#10b981",
  fontWeight: "500",
  fontStyle: "italic",
  fontSize: "20px"
};

const rightPanel = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f9fafb"
};

const registerCard = {
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "14px",
  width: "400px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.08)"
};

const formTitle = {
  marginBottom: "5px",
  fontSize: "24px",
  fontWeight: "700"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px"
};

const roleContainer = { marginBottom: "15px" };

const labelStyle = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#374151",
  marginBottom: "5px",
  display: "block"
};

const selectStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px"
};

const locationButton = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#215acb",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  cursor: "pointer",
  marginBottom: "10px",
  fontWeight: "700",
  fontSize : "15px",
};

const locationText = {
  fontSize: "13px",
  color: "#10b981",
  marginBottom: "15px"
};

const registerButton = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#10b981",
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "16px"
};

const loginText = {
  marginTop: "20px",
  textAlign: "center",
  fontSize: "14px",
  color: "#6b7280"
};

const loginLink = {
  color: "#10b981",
  fontWeight: "600",
  cursor: "pointer"
};

const errorBox = {
  backgroundColor: "#fee2e2",
  color: "#991b1b",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "15px",
  fontSize: "14px"
};

const successBox = {
  backgroundColor: "#dcfce7",
  color: "#166534",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "15px",
  fontSize: "14px"
};

export default Register;