"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    try {
      const logger = require("../src/lib/logger").default
      logger.error("App Router Error Boundary:", error)
    } catch (_err) {
      console.error("App Router Error Boundary:", error)
    }
  }, [error]);

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
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>Something went wrong</h1>
      <p style={{ color: "#666" }}>
        If the issue persists, please try again or contact support.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: "8px 16px",
          borderRadius: 8,
          background: "#111",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}