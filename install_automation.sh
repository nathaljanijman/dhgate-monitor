#!/bin/bash

echo "🤖 DHgate Monitor - Automation Installer"
echo "========================================"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Get current directory
CURRENT_DIR="$(pwd)"
PLIST_FILE="com.dhgate.monitor.plist"
LAUNCH_AGENTS_DIR="$HOME/Library/LaunchAgents"

echo -e "${BLUE}Step 1: Setup LaunchAgent for daily monitoring${NC}"

# Create LaunchAgents directory if it doesn't exist
mkdir -p "$LAUNCH_AGENTS_DIR"

# Copy plist file to LaunchAgents
echo "📁 Copying $PLIST_FILE to $LAUNCH_AGENTS_DIR"
cp "$PLIST_FILE" "$LAUNCH_AGENTS_DIR/"

# Load the launch agent
echo "🔄 Loading LaunchAgent..."
launchctl load "$LAUNCH_AGENTS_DIR/$PLIST_FILE"

# Check if loaded successfully
if launchctl list | grep -q "com.dhgate.monitor"; then
    echo -e "${GREEN}✅ LaunchAgent loaded successfully!${NC}"
else
    echo -e "${YELLOW}⚠️  LaunchAgent may not be loaded. Check manually with: launchctl list | grep dhgate${NC}"
fi

echo ""
echo -e "${BLUE}Step 2: Test automation${NC}"
echo "Testing run_monitor.py..."
python3 run_monitor.py

echo ""
echo -e "${GREEN}🎉 Automation Setup Complete!${NC}"
echo ""
echo "📋 What's configured:"
echo "✅ Daily monitoring at 09:00"
echo "✅ Automatic email notifications"
echo "✅ Logging to logs/monitor.log"
echo "✅ Error logging to logs/monitor_error.log"
echo ""
echo "🔧 Management commands:"
echo "View status:    launchctl list | grep dhgate"
echo "Stop monitoring: launchctl unload ~/Library/LaunchAgents/$PLIST_FILE"
echo "Start monitoring: launchctl load ~/Library/LaunchAgents/$PLIST_FILE"
echo "View logs:      tail -f logs/monitor.log"
echo ""
echo -e "${YELLOW}Note: Your Mac needs to be awake at 09:00 for monitoring to run${NC}"