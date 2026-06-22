import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rodrigo Peralta | Senior React & React Native Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#111111",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top — logo + label */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0px" }}>
            <span style={{ color: "#00FFFF", fontSize: 48, fontWeight: 700, letterSpacing: "-2px" }}>R</span>
            <span style={{ color: "#E5E4E2", fontSize: 48, fontWeight: 700, letterSpacing: "-2px" }}>P</span>
          </div>
          <div
            style={{
              color: "#00FFFF",
              fontSize: 12,
              letterSpacing: "0.2em",
              border: "1px solid rgba(0,255,255,0.3)",
              padding: "6px 14px",
            }}
          >
            AVAILABLE_FOR_HIRE
          </div>
        </div>

        {/* Center — main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ color: "#00FFFF", fontSize: 14, letterSpacing: "0.25em" }}>
            // SENIOR_ENGINEER
          </div>
          <div
            style={{
              color: "#E5E4E2",
              fontSize: 80,
              fontWeight: 700,
              letterSpacing: "-4px",
              lineHeight: 0.9,
            }}
          >
            Rodrigo
            <br />
            Peralta
          </div>
          <div style={{ color: "#00FFFF", fontSize: 28, fontWeight: 500, letterSpacing: "-0.5px", marginTop: "8px" }}>
            React & React Native Engineer
          </div>
        </div>

        {/* Bottom — stack tags + domain */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["React Native", "Next.js", "TypeScript", "Python", "RAG / AI"].map((tag) => (
              <div
                key={tag}
                style={{
                  color: "rgba(229,228,226,0.5)",
                  fontSize: 12,
                  border: "1px solid rgba(229,228,226,0.1)",
                  padding: "5px 12px",
                  letterSpacing: "0.1em",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ color: "rgba(229,228,226,0.3)", fontSize: 14, letterSpacing: "0.1em" }}>
            rodrigoperalta.ar
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
