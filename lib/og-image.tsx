import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";

export const alt =
  "Denys Sergushkin. Live prototypes: an agent does part of the work, and a person stays in charge.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const newsreaderFont = readFile(
  join(process.cwd(), "app/fonts/Newsreader.ttf"),
);
const plexFont = readFile(
  join(process.cwd(), "app/fonts/IBMPlexSans-Medium.ttf"),
);

export default async function OgImage() {
  const [newsreader, plex] = await Promise.all([newsreaderFont, plexFont]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f3efe4",
          color: "#241f1a",
          padding: "68px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {["#C9B6FF", "#FFD24D", "#FF6F61", "#62E3C8"].map((color) => (
              <div
                key={color}
                style={{
                  width: 36,
                  height: 18,
                  borderRadius: 4,
                  background: color,
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Plex",
                fontWeight: 500,
                fontSize: 22,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#5c564c",
              }}
            >
              Live prototypes
            </div>
            <div
              style={{
                fontFamily: "Newsreader",
                fontWeight: 500,
                fontSize: 84,
                lineHeight: 0.95,
                marginTop: 18,
                letterSpacing: -1.5,
              }}
            >
              Denys Sergushkin
            </div>
            <div
              style={{
                fontFamily: "Plex",
                fontWeight: 500,
                fontSize: 30,
                lineHeight: 1.35,
                marginTop: 28,
                maxWidth: 680,
                color: "#3c372f",
              }}
            >
              An agent does part of the work, and a person stays in charge.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Plex",
              fontWeight: 500,
              fontSize: 22,
              color: "#5c564c",
            }}
          >
            {projects.length} prototypes · sergushkin.com
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 16,
            width: 300,
          }}
        >
          {[
            ["#C9B6FF", "-4deg"],
            ["#FFD24D", "3deg"],
            ["#FF6F61", "-2deg"],
          ].map(([color, rotate]) => (
            <div
              key={color}
              style={{
                display: "flex",
                width: 280,
                height: 132,
                borderRadius: 18,
                background: color,
                transform: `rotate(${rotate})`,
                padding: 16,
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  width: 148,
                  height: 92,
                  borderRadius: 12,
                  background: "#1c1916",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Newsreader",
          data: newsreader,
          style: "normal",
          weight: 500,
        },
        {
          name: "Plex",
          data: plex,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
