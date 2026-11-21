import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#241f1a",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: 18,
            height: 9,
            borderRadius: 2,
            background: "#f3efe4",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
