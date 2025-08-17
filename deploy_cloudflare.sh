#!/bin/bash

echo "🌩️  DHgate Monitor - Pure Cloudflare Deployment"
echo "=============================================="

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}Step 1: Install Wrangler CLI${NC}"
echo "Installing Wrangler via npm..."

# Try different Node.js installation methods
if command -v npm &> /dev/null; then
    echo "✅ npm found, installing wrangler..."
    npm install -g wrangler
elif command -v npx &> /dev/null; then
    echo "✅ npx found, will use npx wrangler..."
    echo "export WRANGLER_CMD='npx wrangler'" >> ~/.bashrc
else
    echo "⚠️  Node.js not found. Installing via curl..."
    curl -fsSL https://nodejs.org/dist/v20.11.0/node-v20.11.0-darwin-x64.tar.gz -o node.tar.gz
    tar -xzf node.tar.gz
    export PATH=$PWD/node-v20.11.0-darwin-x64/bin:$PATH
    npm install -g wrangler
fi

echo ""
echo -e "${BLUE}Step 2: Login to Cloudflare${NC}"
echo "Run: wrangler login"
echo "This will open your browser to authenticate with Cloudflare"

echo ""
echo -e "${BLUE}Step 3: Create KV Namespace${NC}"
echo "Run: wrangler kv:namespace create DHGATE_MONITOR_KV"
echo "Copy the namespace ID and update wrangler.toml"

echo ""
echo -e "${BLUE}Step 4: Deploy Worker${NC}"
echo "Run: wrangler publish"

echo ""
echo -e "${BLUE}Step 5: Configure Custom Domain${NC}"
echo "1. Go to Cloudflare Dashboard"
echo "2. Workers & Pages → dhgate-monitor"
echo "3. Settings → Triggers → Custom Domains"
echo "4. Add: dhgate-monitor.com"

echo ""
echo -e "${GREEN}🎉 Pure Cloudflare Features:${NC}"
echo "✅ Workers: Serverless application hosting"
echo "✅ KV Storage: Data persistence for shops/settings"
echo "✅ Custom Domain: dhgate-monitor.com"
echo "✅ Global CDN: Lightning fast worldwide"
echo "✅ Zero Infrastructure: No servers to manage"

echo ""
echo -e "${YELLOW}Next Commands:${NC}"
echo "1. wrangler login"
echo "2. wrangler kv:namespace create DHGATE_MONITOR_KV"
echo "3. Update wrangler.toml with KV namespace ID"
echo "4. wrangler publish"