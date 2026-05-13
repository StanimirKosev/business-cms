"use client";

import { AlertCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="bg">
      <body style={{ margin: 0, background: "#f5f5f5", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "24px" }}>
          <div style={{ maxWidth: "440px", width: "100%", textAlign: "center" }}>

            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(198,40,40,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <AlertCircle style={{ width: 28, height: 28, color: "#c62828" }} />
            </div>

            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", margin: "0 0 8px" }}>
              Нещо се обърка
            </h1>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.65, margin: "0 0 28px" }}>
              Възникна критична грешка. Моля, опреснете страницата.
            </p>

            {process.env.NODE_ENV === "development" && error.message && (
              <pre style={{ fontSize: 11, color: "#c62828", background: "rgba(198,40,40,0.05)", border: "1px solid rgba(198,40,40,0.15)", padding: "12px", borderRadius: 8, textAlign: "left", overflow: "auto", maxHeight: 120, marginBottom: 24 }}>
                {error.message}
              </pre>
            )}

            <button
              onClick={reset}
              style={{ padding: "10px 28px", background: "#c62828", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              Опитайте отново
            </button>

          </div>
        </div>
      </body>
    </html>
  );
}
