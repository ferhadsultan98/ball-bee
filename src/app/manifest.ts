import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BalBee — Təbii bal",
    short_name: "BalBee",
    description: "Qarayazı meşəsindən saf təbii bal.",
    start_url: "/az",
    display: "standalone",
    background_color: "#fff8e1",
    theme_color: "#fff6dc",
    lang: "az",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
