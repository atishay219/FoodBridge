import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Landing() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/stats/global`);
        setStats(data);
      } catch (error) {
        console.log("Error fetching global stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div style={containerStyle}>
      <nav style={navStyle}>
        <div style={logoStyle}>FoodBridge</div>
      </nav>

      <section style={heroSectionStyle}>
        <div style={heroContentStyle}>
          <h1 style={headlineStyle}>
            Bridging Surplus Food with Real Need.
          </h1>
          <p style={subTextStyle}>
            Connecting hotels and restaurants with local NGOs to feed those in need, 
            reducing waste and building a stronger community.
          </p>
          <div style={buttonGroupStyle}>
            <Link to="/login"><button style={loginButtonStyle}>Log in</button></Link>
            <Link to="/register"><button style={registerButtonStyle}>Register</button></Link>
          </div>
        </div>
        <div style={heroImageWrapper}>
          <img 
            src="/LandingPage.png" 
            alt="Chefs and community" 
            style={heroImageStyle} 
          />
        </div>
      </section>

      <section style={impactCardSection}>
        <div style={fullImpactCard}>
          <div style={{ marginBottom: '30px' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/3361/3361815.png" alt="Impact" style={{ width: '80px' }} />
            <h2 style={{ fontSize: '32px', marginTop: '15px' }}>Our Real-Time Impact</h2>
            <p style={{ color: '#6b7280' }}>The quantifiable difference we make together every single day.</p>
          </div>

          <div style={innerStatsGrid}>
            <div style={innerStatBox}>
              <span style={innerEmoji}>🏨</span>
              <div style={innerTextWrap}>
                <h4 style={innerNumber}>{stats ? stats.totalRestaurants : "..."}</h4>
                <p style={innerLabel}>Active Restaurants</p>
              </div>
            </div>

            <div style={innerStatBox}>
              <span style={innerEmoji}>🤝</span>
              <div style={innerTextWrap}>
                <h4 style={innerNumber}>{stats?.totalNgos || "500+"}</h4>
                <p style={innerLabel}>NGO Partners</p>
              </div>
            </div>

            <div style={innerStatBox}>
              <span style={innerEmoji}>🍱</span>
              <div style={innerTextWrap}>
                <h4 style={innerNumber}>{stats?.totalMeals?.toLocaleString() || "1,500"}</h4>
                <p style={innerLabel}>Total Meals Distributed</p>
              </div>
            </div>

            <div style={innerStatBox}>
              <span style={innerEmoji}>🌎</span>
              <div style={innerTextWrap}>
                <h4 style={innerNumber}>{stats?.totalDonations || "5,000+"}</h4>
                <p style={innerLabel}>Total Donations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af', fontSize: '14px' }}>
        © 2026 FoodBridge. All rights reserved.
      </footer>
    </div>
  );
}


const containerStyle = {
  fontFamily: "'Inter', sans-serif",
  color: '#111827',
  backgroundColor: '#ffffff',
  padding: '0 8%',
  maxWidth: '1400px',
  margin: '0 auto'
};

const navStyle = { display: 'flex', justifyContent: 'center', padding: '30px 0', alignItems: 'center' };
const logoStyle = { fontSize: '24px', fontWeight: '800', color: '#059669' };
const navLinksStyle = { display: 'flex', gap: '30px', color: '#4b5563', fontSize: '15px' };

const heroSectionStyle = { display: 'flex', alignItems: 'center', padding: '60px 0', gap: '60px', flexWrap: 'wrap-reverse' };
const heroContentStyle = { flex: '1', minWidth: '400px' };
const heroImageWrapper = { flex: '1.2' };
const heroImageStyle = { width: '100%', borderRadius: '40px 150px 150px 40px', height: '400px', objectFit: 'cover', boxShadow: '20px 20px 60px #e5e7eb' };

const headlineStyle = { fontSize: '46px', fontWeight: '900', lineHeight: '1.1', marginBottom: '20px' };
const subTextStyle = { color: '#4b5563', fontSize: '18px', marginBottom: '35px', lineHeight: '1.6' };
const buttonGroupStyle = { display: 'flex', gap: '15px' };

const loginButtonStyle = { padding: '14px 35px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: '600' };
const registerButtonStyle = { padding: '14px 35px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: '600' };

const impactCardSection = { padding: '80px 0' };
const fullImpactCard = {
  backgroundColor: '#f9fafb',
  padding: '60px',
  borderRadius: '32px',
  textAlign: 'center',
  border: '1px solid #e5e7eb'
};

const innerStatsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '25px',
  marginTop: '40px'
};

const innerStatBox = {
  backgroundColor: '#ffffff',
  padding: '25px',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
  textAlign: 'left'
};

const innerEmoji = { fontSize: '32px' };
const innerTextWrap = { display: 'flex', flexDirection: 'column' };
const innerNumber = { fontSize: '24px', fontWeight: '800', margin: '0' };
const innerLabel = { fontSize: '14px', color: '#6b7280', margin: '0' };

export default Landing;