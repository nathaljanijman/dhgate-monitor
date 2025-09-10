/**
 * Webpack Configuration for DHgate Monitor
 * 
 * Optimizes bundle size and performance for Cloudflare Workers
 */

const path = require('path');

module.exports = {
  target: 'webworker',
  entry: {
    // Main worker entry point
    worker: './src/index.js',
    
    // Code-split chunks for large modules
    security: './src/utils/security.js',
    database: './src/utils/database.js',
    monitoring: './src/utils/monitoring.js'
  },
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    library: {
      type: 'module'
    },
    clean: true
  },
  
  experiments: {
    outputModule: true
  },
  
  mode: 'production',
  
  optimization: {
    minimize: true,
    usedExports: true,
    sideEffects: false,
    
    splitChunks: {
      chunks: 'all',
      minSize: 1000,
      cacheGroups: {
        utilities: {
          test: /[\\/]src[\\/]utils[\\/]/,
          name: 'utils',
          chunks: 'all',
          priority: 10
        },
        
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: 5
        }
      }
    }
  },
  
  resolve: {
    extensions: ['.js', '.mjs'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@components': path.resolve(__dirname, 'src/components')
    }
  },
  
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  chrome: "80"  // Cloudflare Workers V8 version
                },
                modules: false
              }]
            ]
          }
        }
      }
    ]
  },
  
  // Performance budgets
  performance: {
    maxEntrypointSize: 512000, // 500KB
    maxAssetSize: 256000,      // 250KB
    hints: 'warning'
  },
  
  // Source maps for debugging
  devtool: 'source-map'
};