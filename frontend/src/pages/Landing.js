// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function Landing() {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:5000/api/stats/global"
//         );
//         setStats(data);
//       } catch (error) {
//         console.log("Error fetching global stats");
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div style={{ padding: "40px", backgroundColor: "#f9fafb" }}>
      
//       {/* Hero Section */}
//       <div style={{ textAlign: "center", marginBottom: "60px" }}>
//         <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
//           Reduce Food Waste. Feed More Lives.
//         </h1>
//         <p style={{ color: "#6b7280", marginBottom: "30px" }}>
//           Smart geo-based surplus food redistribution platform
//           connecting restaurants and NGOs.
//         </p>

//         <Link to="/register">
//           <button style={buttonStyle}>Get Started</button>
//         </Link>
//       </div>

//       {/* Impact Section */}
//       <div style={{ textAlign: "center", marginBottom: "50px" }}>
//         <h2 style={{ marginBottom: "30px" }}>Our Impact</h2>

//         {stats ? (
//           <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
            
//             <StatCard label="Restaurants" value={stats.totalRestaurants} />
//             <StatCard label="NGOs" value={stats.totalNgos} />
//             <StatCard label="Donations" value={stats.totalDonations} />
//             <StatCard label="Meals Delivered" value={stats.totalMeals} />

//           </div>
//         ) : (
//           <p>Loading impact data...</p>
//         )}
//       </div>

//     </div>
//   );
// }

// function StatCard({ label, value }) {
//   return (
//     <div style={{
//       backgroundColor: "white",
//       padding: "25px",
//       borderRadius: "10px",
//       boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
//       minWidth: "150px"
//     }}>
//       <h2>{value}</h2>
//       <p style={{ color: "#6b7280" }}>{label}</p>
//     </div>
//   );
// }

// const buttonStyle = {
//   padding: "12px 20px",
//   backgroundColor: "#10b981",
//   color: "white",
//   border: "none",
//   borderRadius: "6px",
//   cursor: "pointer"
// };

// export default Landing;

// ************************

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function Landing() {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:5000/api/stats/global");
//         setStats(data);
//       } catch (error) {
//         console.log("Error fetching global stats");
//       }
//     };
//     fetchStats();
//   }, []);

//   return (
//     <div style={containerStyle}>
//       {/* --- NAVBAR --- */}
//       <nav style={navStyle}>
//         <div style={logoStyle}>🥗 FoodBridge</div>
//         <div style={navLinksStyle}>
//           <span>Welcome</span>
//           <span>NGOs</span>
//           <span>Donors</span>
//           <span>Contact</span>
//         </div>
//       </nav>

//       {/* --- HERO SECTION --- */}
//       <section style={heroSectionStyle}>
//         <div style={heroImageWrapper}>
//           <img 
//             src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000" 
//             alt="Chefs and children" 
//             style={heroImageStyle} 
//           />
//         </div>
//         <div style={heroContentStyle}>
//           <h1 style={headlineStyle}>
//             Nourishing Communities. Bridge the Gap between Surplus and Need.
//           </h1>
//           <p style={subTextStyle}>
//             FoodBridge connects hotels and restaurants with local NGOs to feed those in need, 
//             reducing waste and building a stronger community.
//           </p>
//           <div style={buttonGroupStyle}>
//             <Link to="/login"><button style={loginButtonStyle}>Log in</button></Link>
//             <Link to="/register"><button style={registerButtonStyle}>Register</button></Link>
//           </div>
//         </div>
//       </section>

//       {/* --- IMPACT NUMBERS --- */}
//       <section style={impactGridStyle}>
//         <StatItem icon="👨‍🍳" value={stats?.totalNgos || "500+"} label="NGOs Joined" />
//         <StatItem icon="🤝" value={stats?.totalMeals || "1,000,000+"} label="Meals Donated" />
//         <StatItem icon="❤️" value={stats?.totalDonations || "5,000,000+"} label="Community Members Helped" />
//       </section>

//       {/* --- ROLE CARDS --- */}
//       <section style={cardSectionStyle}>
//         <RoleCard 
//           title="For Restaurants" 
//           desc="Donate surplus food effortlessly" 
//           img="https://cdn-icons-png.flaticon.com/512/3063/3063822.png"
//         />
//         <RoleCard 
//           title="For NGOs" 
//           desc="Discover and accept food for your programs" 
//           img="https://cdn-icons-png.flaticon.com/512/2583/2583118.png"
//         />
//         <RoleCard 
//           title="Our Impact" 
//           desc="See the quantifiable difference we make" 
//           img="https://cdn-icons-png.flaticon.com/512/3361/3361815.png"
//         />
//       </section>
//     </div>
//   );
// }

// /* --- SUB-COMPONENTS --- */

// function StatItem({ icon, value, label }) {
//   return (
//     <div style={{ textAlign: 'center' }}>
//       <div style={{ fontSize: '40px' }}>{icon}</div>
//       <h2 style={{ fontSize: '28px', margin: '10px 0 5px 0' }}>{value}</h2>
//       <p style={{ color: '#6b7280', fontWeight: '500' }}>{label}</p>
//     </div>
//   );
// }

// function RoleCard({ title, desc, img }) {
//   return (
//     <div style={roleCardStyle}>
//       <img src={img} alt={title} style={{ width: '80px', marginBottom: '15px' }} />
//       <h3 style={{ marginBottom: '10px' }}>{title}</h3>
//       <p style={{ color: '#6b7280', fontSize: '14px' }}>{desc}</p>
//     </div>
//   );
// }

// /* --- STYLES --- */

// const containerStyle = {
//   fontFamily: "'Inter', sans-serif",
//   color: '#111827',
//   backgroundColor: '#f9fafb',
//   minHeight: '100vh',
//   padding: '0 10%'
// };

// const navStyle = {
//   display: 'flex',
//   justifyContent: 'space-between',
//   padding: '20px 0',
//   alignItems: 'center'
// };

// const logoStyle = { fontSize: '24px', fontWeight: 'bold', color: '#059669' };

// const navLinksStyle = { display: 'flex', gap: '25px', color: '#4b5563', fontSize: '14px' };

// const heroSectionStyle = {
//   display: 'flex',
//   alignItems: 'center',
//   gap: '50px',
//   marginTop: '40px',
//   flexWrap: 'wrap'
// };

// const heroImageWrapper = { flex: 1, minWidth: '350px' };

// const heroImageStyle = {
//   width: '100%',
//   borderRadius: '0 150px 150px 0',
//   height: '400px',
//   objectFit: 'cover'
// };

// const heroContentStyle = { flex: 1, minWidth: '350px' };

// const headlineStyle = { fontSize: '42px', lineHeight: '1.2', marginBottom: '20px' };

// const subTextStyle = { color: '#4b5563', fontSize: '18px', marginBottom: '30px', lineHeight: '1.6' };

// const buttonGroupStyle = { display: 'flex', gap: '15px' };

// const loginButtonStyle = {
//   padding: '12px 30px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer'
// };

// const registerButtonStyle = {
//   padding: '12px 30px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer'
// };

// const impactGridStyle = {
//   display: 'flex',
//   justifyContent: 'space-around',
//   padding: '80px 0',
//   borderBottom: '1px solid #e5e7eb'
// };

// const cardSectionStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   gap: '30px',
//   padding: '60px 0'
// };

// const roleCardStyle = {
//   backgroundColor: 'white',
//   padding: '30px',
//   borderRadius: '16px',
//   textAlign: 'center',
//   width: '280px',
//   boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//   border: '1px solid #f3f4f6'
// };

// export default Landing;

//***********************

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function Landing() {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:5000/api/stats/global");
//         setStats(data);
//       } catch (error) {
//         console.log("Error fetching global stats", error);
//       }
//     };
//     fetchStats();
//   }, []);

//   return (
//     <div style={containerStyle}>
//       {/* --- NAVIGATION BAR --- */}
//       <nav style={navStyle}>
//         <div style={logoStyle}>🥗 FoodBridge</div>
//         <div style={navLinksStyle}>
//           <span style={linkStyle}>Welcome</span>
//           <span style={linkStyle}>NGOs</span>
//           <span style={linkStyle}>Donors</span>
//           <span style={linkStyle}>Contact</span>
//         </div>
//       </nav>

//       {/* --- HERO SECTION --- */}
//       <section style={heroSectionStyle}>
//         <div style={heroContentStyle}>
//           <h1 style={headlineStyle}>
//             Nourishing Communities. Bridge the Gap between Surplus and Need.
//           </h1>
//           <p style={subTextStyle}>
//             FoodBridge connects hotels and restaurants with local NGOs to feed those in need, 
//             reducing waste and building a stronger community.
//           </p>
//           <div style={buttonGroupStyle}>
//             <Link to="/login"><button style={loginButtonStyle}>Log in</button></Link>
//             <Link to="/register"><button style={registerButtonStyle}>Register</button></Link>
//           </div>
//         </div>
//         <div style={heroImageWrapper}>
//           <img 
//             src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000" 
//             alt="Chefs working together" 
//             style={heroImageStyle} 
//           />
//         </div>
//       </section>

//       {/* --- IMPACT NUMBERS (Now with 4 stats) --- */}
//       <section style={impactGridStyle}>
//         <StatItem 
//           icon="🏨" 
//           value={stats?.totalRestaurants || "200+"} 
//           label="Hotels Partnered" 
//         />
//         <StatItem 
//           icon="🤝" 
//           value={stats?.totalNgos || "500+"} 
//           label="NGOs Joined" 
//         />
//         <StatItem 
//           icon="🍱" 
//           value={stats?.totalMeals?.toLocaleString() || "1,000,000+"} 
//           label="Meals Donated" 
//         />
//         <StatItem 
//           icon="🌎" 
//           value={stats?.totalDonations || "5,000+"} 
//           label="Impact Created" 
//         />
//       </section>

//       {/* --- ROLE CALL-TO-ACTION CARDS --- */}
//       <section style={cardSectionStyle}>
//         <RoleCard 
//           title="For Restaurants" 
//           desc="Donate surplus food effortlessly and track your CO2 savings." 
//           img="https://cdn-icons-png.flaticon.com/512/3063/3063822.png"
//         />
//         <RoleCard 
//           title="For NGOs" 
//           desc="Discover available donations nearby and accept them instantly." 
//           img="https://cdn-icons-png.flaticon.com/512/2583/2583118.png"
//         />
//         <RoleCard 
//           title="Our Impact" 
//           desc="See the quantifiable difference we make in real-time." 
//           img="https://cdn-icons-png.flaticon.com/512/3361/3361815.png"
//         />
//       </section>
//     </div>
//   );
// }

// /* --- REUSABLE COMPONENTS --- */

// function StatItem({ icon, value, label }) {
//   return (
//     <div style={statItemStyle}>
//       <div style={{ fontSize: '42px', marginBottom: '10px' }}>{icon}</div>
//       <h2 style={{ fontSize: '32px', margin: '0', fontWeight: '800' }}>{value}</h2>
//       <p style={{ color: '#6b7280', fontWeight: '500', marginTop: '5px' }}>{label}</p>
//     </div>
//   );
// }

// function RoleCard({ title, desc, img }) {
//   return (
//     <div style={roleCardStyle}>
//       <img src={img} alt={title} style={{ width: '70px', height: '70px', marginBottom: '20px' }} />
//       <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>{title}</h3>
//       <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.5' }}>{desc}</p>
//     </div>
//   );
// }

// /* --- STYLES (Modern UI Constants) --- */

// const containerStyle = {
//   fontFamily: "'Inter', system-ui, sans-serif",
//   color: '#111827',
//   backgroundColor: '#ffffff',
//   minHeight: '100vh',
//   padding: '0 8%',
//   maxWidth: '1400px',
//   margin: '0 auto'
// };

// const navStyle = {
//   display: 'flex',
//   justifyContent: 'space-between',
//   padding: '30px 0',
//   alignItems: 'center'
// };

// const logoStyle = { fontSize: '24px', fontWeight: '800', color: '#059669', cursor: 'pointer' };

// const navLinksStyle = { display: 'flex', gap: '30px', color: '#4b5563', fontSize: '15px', fontWeight: '500' };

// const linkStyle = { cursor: 'pointer' };

// const heroSectionStyle = {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   gap: '60px',
//   padding: '60px 0',
//   flexWrap: 'wrap-reverse' // Ensures text stays on top on mobile
// };

// const heroContentStyle = { flex: '1', minWidth: '400px' };

// const heroImageWrapper = { flex: '1.2', minWidth: '400px' };

// const heroImageStyle = {
//   width: '100%',
//   borderRadius: '40px 180px 180px 40px', // Unique modern shape
//   height: '450px',
//   objectFit: 'cover',
//   boxShadow: '20px 20px 60px #d1d9e6'
// };

// const headlineStyle = { fontSize: '48px', fontWeight: '900', lineHeight: '1.1', marginBottom: '25px', color: '#1f2937' };

// const subTextStyle = { color: '#4b5563', fontSize: '19px', marginBottom: '40px', lineHeight: '1.6' };

// const buttonGroupStyle = { display: 'flex', gap: '20px' };

// const loginButtonStyle = {
//   padding: '14px 35px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: '600', transition: '0.3s'
// };

// const registerButtonStyle = {
//   padding: '14px 35px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: '600', transition: '0.3s'
// };

// const impactGridStyle = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//   gap: '40px',
//   padding: '100px 0',
//   borderTop: '1px solid #f3f4f6',
//   borderBottom: '1px solid #f3f4f6'
// };

// const statItemStyle = { textAlign: 'center' };

// const cardSectionStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   flexWrap: 'wrap',
//   gap: '40px',
//   padding: '100px 0'
// };

// const roleCardStyle = {
//   backgroundColor: '#ffffff',
//   padding: '40px 30px',
//   borderRadius: '24px',
//   textAlign: 'center',
//   width: '300px',
//   boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
//   border: '1px solid #f3f4f6',
//   transition: 'transform 0.3s ease'
// };

// export default Landing;

//**************************

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
      {/* --- NAVIGATION --- */}
      <nav style={navStyle}>
        <div style={logoStyle}>FoodBridge</div>
      </nav>

      {/* --- HERO SECTION --- */}
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

      {/* --- CONSOLIDATED IMPACT CARD (Now follows Hero directly) --- */}
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

      {/* --- FOOTER --- */}
      <footer style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af', fontSize: '14px' }}>
        © 2026 FoodBridge. All rights reserved.
      </footer>
    </div>
  );
}

/* --- STYLES --- */

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