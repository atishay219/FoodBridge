import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <Sidebar />

      <div style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
        <TopNavbar />
        <div style={{ padding: "20px" }}>
          {children}
        </div>
      </div>

    </div>
  );
}

export default DashboardLayout;