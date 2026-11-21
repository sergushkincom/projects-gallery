export const siteName = "Denys Sergushkin";

export const siteDescription =
  "Live prototypes by Denys Sergushkin. Filter agentic UI, 3D, ERP and B2B, and small tools, then open the demo or the repo.";

export function getSiteUrl() {
  const host =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (host) return `https://${host}`;
  return "http://localhost:3000";
}
