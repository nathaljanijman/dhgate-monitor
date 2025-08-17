#!/bin/bash

echo "🚀 DHgate Monitor - Complete Deployment Script"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Railway Deployment${NC}"
echo "1. Go to https://railway.app"
echo "2. Login/Signup" 
echo "3. Click 'Deploy from GitHub'"
echo "4. Select: nathaljanijman/dhgate-monitor"
echo "5. Set environment variables:"
echo "   - ENVIRONMENT=production"
echo "   - PORT=8080"
echo "6. Note the Railway URL (e.g. https://dhgate-monitor-production.up.railway.app)"
echo ""

echo -e "${BLUE}Step 2: Update Backend URL${NC}"
read -p "Enter your Railway app URL: " RAILWAY_URL

if [ ! -z "$RAILWAY_URL" ]; then
    # Update wrangler.toml with the actual Railway URL
    sed -i '' "s|BACKEND_URL = \"https://dhgate-monitor-production.up.railway.app\"|BACKEND_URL = \"$RAILWAY_URL\"|g" wrangler.toml
    echo -e "${GREEN}✅ Updated wrangler.toml with Railway URL${NC}"
fi

echo ""
echo -e "${BLUE}Step 3: Cloudflare Workers Deployment${NC}"
echo "Installing Wrangler CLI..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "Installing wrangler..."
    npm install -g wrangler
fi

echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Run: wrangler login"
echo "2. Run: wrangler publish"
echo "3. Go to Cloudflare Dashboard → Workers → dhgate-monitor"
echo "4. Add custom domain: dhgate-monitor.com"
echo ""

echo -e "${GREEN}🎉 Setup complete! Your app will be available at:${NC}"
echo -e "${GREEN}   - Railway Backend: $RAILWAY_URL${NC}"
echo -e "${GREEN}   - Cloudflare Frontend: https://dhgate-monitor.com${NC}"

# Commit the updated configuration
if [ ! -z "$RAILWAY_URL" ]; then
    git add wrangler.toml
    git commit -m "Update backend URL to Railway: $RAILWAY_URL"
    git push origin main
    echo -e "${GREEN}✅ Changes pushed to GitHub${NC}"
fi