/**
 * @type {import("next/dist/server/config-shared").NextConfig}
 */
module.exports = {
  productionBrowserSourceMaps: true,
  images: {
    domains: ["static1.qmusic.medialaancdn.be"],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "react/jsx-runtime.js": "preact/compat/jsx-runtime",
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      };
    }

    return config;
  },
  experimental: {
    turboMode: true,
  },
};
