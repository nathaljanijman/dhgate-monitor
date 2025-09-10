/**
 * Bundle Analyzer Configuration for DHgate Monitor
 * 
 * Analyzes bundle size and identifies optimization opportunities
 */

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackConfig = require('./webpack.config.js');

module.exports = {
  ...webpackConfig,
  
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'bundle-stats.json',
      logLevel: 'info'
    })
  ]
};