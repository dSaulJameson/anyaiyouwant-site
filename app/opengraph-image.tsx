import { ImageResponse } from "next/og";

export const alt = "Any AI You Want — Custom AI Solutions & Fractional CTO Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#07080a",
          color: "#e8e8ec",
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Glow effects */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -120,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.25), transparent 60%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.22), transparent 60%)",
            display: "flex",
          }}
        />

        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            color: "#7a8290",
            letterSpacing: 4,
            textTransform: "uppercase",
            fontFamily: "ui-monospace, Menlo, monospace",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#4ade80", display: "flex" }} />
          ANYAIYOUWANT.COM
        </div>

        {/* Main headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 48,
            fontSize: 60,
            fontWeight: 600,
            letterSpacing: -1.5,
            lineHeight: 1.1,
          }}
        >
          <div style={{ display: "flex" }}>Custom AI when you need it shipped.</div>
          <div
            style={{
              display: "flex",
              backgroundImage: "linear-gradient(135deg, #22d3ee 0%, #a78bfa 60%, #fb923c 100%)",
              backgroundClip: "text",
              color: "transparent",
              marginTop: 12,
            }}
          >
            Fractional CTO when you need a partner.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#7a8290",
              fontFamily: "ui-monospace, Menlo, monospace",
            }}
          >
            $1B+ revenue processed · 9 years of ML / AI
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              color: "#22d3ee",
              fontFamily: "ui-monospace, Menlo, monospace",
            }}
          >
            D. Saul Jameson →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
