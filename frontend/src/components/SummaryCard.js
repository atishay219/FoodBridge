function SummaryCard({ title, value }) {
  return (
    <div style={{
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      flex: 1,
      marginRight: "15px"
    }}>
      <h4 style={{ color: "#6b7280" }}>{title}</h4>
      <h2 style={{ marginTop: "10px" }}>{value}</h2>
    </div>
  );
}

export default SummaryCard;