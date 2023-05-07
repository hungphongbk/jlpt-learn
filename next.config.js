/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  webpack: (config, options) => {
    config.module.rules.push(
      ...[
        {
          test: /\.graphql/,
          oneOf: [
            {
              test: /schema\.graphql/,
              exclude: /node_modules/,
              loader: "raw-loader",
            },
            {
              test: /\.graphql/,
              exclude: /node_modules/,
              loader: "graphql-tag/loader",
            },
          ],
        },
      ]
    );

    return config;
  },
};

module.exports = nextConfig;
