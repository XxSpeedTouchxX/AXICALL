import { ImageResponse } from "next/og";
import { COMPANY } from "@/lib/company";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MonEstimationAuto — Estimation de véhicule gratuite";

/**
 * Social sharing image, generated at build time so there is no static asset to
 * maintain. Uses the AXICALL palette (black / bone / accent).
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0A0A0A",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-180px",
            right: "-140px",
            width: "700px",
            height: "700px",
            background: "radial-gradient(circle, rgba(255,74,28,0.35) 0%, rgba(255,74,28,0) 62%)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#FF4A1C",
            marginBottom: 28,
          }}
        >
          — Estimation gratuite
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 68,
            fontWeight: 700,
            color: "#F5F1EA",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          <span>Découvrez ce que vaut</span>
          <span>
            réellement <span style={{ color: "#FF4A1C" }}>votre voiture</span>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 26,
            color: "rgba(245,241,234,0.6)",
          }}
        >
          {COMPANY.publicName} — Rappel d&apos;un expert sous 24h, sans engagement
        </div>
      </div>
    ),
    size
  );
}
