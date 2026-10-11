import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Script Forge — Learn JavaScript and TypeScript",
    short_name: "Script Forge",
    description: "Mobile-first JavaScript and TypeScript lessons, projects, and roadmap. Works offline.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#F59E0B",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}