import { createFileRoute, redirect } from "@tanstack/react-router";

// Phase 1 of the NEMPO migration: only the feed is moved so far, so the
// home address opens it. Replace with the real home page when it migrates.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/nempo-feed" });
  },
  head: () => ({
    meta: [
      { title: "Nempo Garut — Nempo Feed" },
      { name: "description", content: "Koleksi slide, animasi dan konten kreatif Nempo Organizer Garut." },
      { property: "og:title", content: "Nempo Garut — Nempo Feed" },
      { property: "og:description", content: "Koleksi slide, animasi dan konten kreatif Nempo Organizer Garut." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
