import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Smookie",
    short_name: "스무키",
    description: "감정에 맞는 음악을 들어보세요!",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/images/Fluffy.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/Fluffy.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
