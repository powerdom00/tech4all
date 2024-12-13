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
          transpileOnly: true, // Consente una compilazione più veloce senza verifica dei tipi
        },
      },
    });
    return config;
  },
};

export default nextConfig;
