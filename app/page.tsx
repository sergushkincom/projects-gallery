import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { Gallery, GalleryFallback } from "@/components/gallery";
import { Header } from "@/components/header";
import { projects } from "@/data/projects";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `${siteName} · Live prototypes`,
  description: siteDescription,
  url: getSiteUrl(),
  author: {
    "@type": "Person",
    name: siteName,
    url: "https://sergushkin.com",
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.name,
      url: project.liveUrl,
    })),
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <a
        href="#prototypes"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground focus:outline-2 focus:outline-offset-2"
      >
        Skip to prototypes
      </a>
      <Header />
      <main
        id="prototypes"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-4 pt-6 sm:px-6"
      >
        <Suspense fallback={<GalleryFallback />}>
          <Gallery />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
