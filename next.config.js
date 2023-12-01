/** @type {import('next').NextConfig} */

const webpack = require("webpack");

const nextConfig = {
  images: {
    domains: ["ibkcwuenycxzhdzotcgt.supabase.co"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.svg$/,
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      });
      // config.plugins.push(new webpack.ProvidePlugin({ p5: "p5" }));
    }
    return config;
  },
};

module.exports = nextConfig;
