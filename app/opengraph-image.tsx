import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Luis Sosa — Frontend Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0D1117",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(77,166,255,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: "#8B949E",
            letterSpacing: "0.05em",
            marginBottom: 24,
          }}
        >
          Luis Sosa
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#F0F6FC",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 32,
          }}
        >
          Frontend engineer{"\n"}
          for{" "}
          <span style={{ color: "#4DA6FF" }}>dashboards</span>
          {"\n"}& data products
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "#8B949E",
            lineHeight: 1.5,
            maxWidth: 600,
          }}
        >
          Building fast, clear interfaces for remote teams.
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 100,
            border: "1px solid rgba(77,166,255,0.25)",
            background: "rgba(77,166,255,0.06)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#4DA6FF",
            }}
          />
          <span style={{ fontSize: 14, color: "#4DA6FF", fontWeight: 500 }}>
            Available for opportunities
          </span>
        </div>
      </div>
    ),
    size
  )
}
