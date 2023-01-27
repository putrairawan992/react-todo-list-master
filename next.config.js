/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: true,
});

const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    modularizeImports: {
      'react-bootstrap': {
        transform: 'react-bootstrap/lib/{{member}}',
      },
    },
    forceSwcTransforms: true,
  },
  webpack: (
    config,
    {
      isServer,
    },
  ) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        mergeDuplicateChunks: true,
        chunkIds: 'named',
        minimize: true,
        minimizer: [new TerserPlugin()],
      };
      config.plugins.push(new DuplicatePackageCheckerPlugin());
      config.plugins.push(new CompressionPlugin());
      config.resolve.alias['react-is'] = path.resolve(
        __dirname,
        'node_modules',
        'react-is',
      );
      config.resolve.alias['@babel/runtime'] = path.resolve(
        __dirname,
        'node_modules',
        '@babel',
        'runtime',
      );
    }
    return config;
  },
});
