export default function Health() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: 24,
      textAlign: "center",
      flexDirection: "column",
      gap: 8,
    }}>
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>Health Check</h1>
      <p>Status: OK</p>
      <small>{new Date().toLocaleString()}</small>
    </div>
  )
}