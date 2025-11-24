import Link from "next/link"

export default function NotFoundView() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: 24,
      textAlign: "center",
      flexDirection: "column",
      gap: 12,
    }}>
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>Page not found</h1>
      <p style={{ color: "#666" }}>The page you are looking for does not exist.</p>
      <div style={{ display: "flex", gap: 8 }}>
        <Link href="/" style={{ padding: "8px 16px", borderRadius: 8, background: "#111", color: "#fff" }}>Go home</Link>
        <Link href="/health" style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #ccc" }}>Health</Link>
      </div>
    </div>
  )
}