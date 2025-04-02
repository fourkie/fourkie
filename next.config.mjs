/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kcvtuvflabmysoqvvany.supabase.co",
        pathname: "/storage/v1/object/public/emotion-img/**",
      },
    ],
  },
};

export default nextConfig;
