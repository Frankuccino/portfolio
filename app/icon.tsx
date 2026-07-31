import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#020617",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        border: "1px solid #1e293b",
      }}
    >
      <div
        style={{
          background: "linear-gradient(to bottom right, #1e3a8a, #020617)",
          width: "28px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
          border: "1px solid rgba(59, 130, 246, 0.5)",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 20,
            fontFamily: "monospace",
            fontWeight: 900,
            textShadow: "0px 0px 8px #60a5fa",
            marginTop: "-2px",
            marginLeft: "1px",
          }}
        >
          F
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
