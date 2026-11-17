import { ImageResponse } from "next/og";

export const runtime = "edge";

// 48px is the size Google asks for; 32px renders soft in the search result.
export const size = {
  width: 48,
  height: 48,
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
        borderRadius: 12,
        border: "2px solid #1e293b",
      }}
    >
      <div
        style={{
          background: "linear-gradient(to bottom right, #1e3a8a, #020617)",
          width: 42,
          height: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 9,
          border: "2px solid rgba(59, 130, 246, 0.5)",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 30,
            fontFamily: "monospace",
            fontWeight: 900,
            textShadow: "0px 0px 12px #60a5fa",
            marginTop: "-3px",
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
