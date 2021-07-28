/**
 * @type {import("next/dist/next-server/server/config-shared").NextConfig}
 */
module.exports = {
  images: {
    domains: ["static1.qmusic.medialaancdn.be"],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
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
