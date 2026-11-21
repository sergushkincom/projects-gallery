import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#241f1a",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 104,
            height: 52,
            borderRadius: 10,
            background: "#f3efe4",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
