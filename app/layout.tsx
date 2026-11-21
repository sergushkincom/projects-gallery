import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { topics } from "@/data/projects";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-newsreader",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} · Live prototypes`,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: "https://sergushkin.com" }],
  creator: siteName,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteName} · Live prototypes`,
    description: siteDescription,
    url: "/",
    siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} · Live prototypes`,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3efe4" },
    { media: "(prefers-color-scheme: dark)", color: "#161411" },
  ],
  colorScheme: "light dark",
};

const allowedTopics = JSON.stringify(
  Object.fromEntries(topics.map((topic) => [topic.id, 1])),
);

const filterBoot = `(function(){try{var ok=${allowedTopics};var picked=[];var all=new URLSearchParams(location.search).getAll("topic");for(var i=0;i<all.length;i++){if(ok[all[i]]&&picked.indexOf(all[i])<0)picked.push(all[i])}if(!picked.length)return;document.documentElement.setAttribute("data-topics",picked.join(" "))}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Script
          id="topic-filter-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: filterBoot }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
