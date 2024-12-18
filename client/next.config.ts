import path from "path";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.tsx?$/, // Gestisce i file TypeScript
      include: [path.resolve(__dirname, "../server/src")], // Includi la directory del server
      use: {
        loader: "ts-loader",
        options: {
          transpileOnly: true, // Compilazione più veloce senza verifica dei tipi
        },
      },
    });
    return config;
  },

  // Aggiungi riscritture per proxy
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Indirizza tutte le richieste che iniziano con /api/
        destination: "http://localhost:5000/:path*", // Proxy al server Express
      },
    ];
  },
};

export default nextConfig;
