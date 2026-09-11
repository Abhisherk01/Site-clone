import { useState } from 'react'
import './index.css'

export default function App() {
  return (
    <main
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100dvh",
        textAlign: "center",
        padding: "1.5rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div>
        <h1 style={{ fontSize: "2rem", margin: 0 }}>Meridian</h1>
        <p style={{ color: "#555", marginTop: "0.5rem" }}>
          Step 1 complete — Vite + React dev server is running.
        </p>
      </div>
    </main>
  );
}