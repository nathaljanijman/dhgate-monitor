#!/bin/bash

# DHgate Monitor Automation Setup Script
echo "🚀 DHgate Monitor - Automation Setup"
echo "=================================="

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ Dit script is alleen voor macOS. Voor andere systemen, zie README.md"
    exit 1
fi

# Get current directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
echo "📁 Working directory: $SCRIPT_DIR"

# Create LaunchAgents directory if it doesn't exist
mkdir -p ~/Library/LaunchAgents

# Copy plist file
echo "📄 Installing launch agent..."
cp "$SCRIPT_DIR/com.nathalja.dhgate-monitor.plist" ~/Library/LaunchAgents/

# Load the launch agent
echo "⏰ Setting up daily schedule (09:00)..."
launchctl unload ~/Library/LaunchAgents/com.nathalja.dhgate-monitor.plist 2>/dev/null || true
launchctl load ~/Library/LaunchAgents/com.nathalja.dhgate-monitor.plist

# Verify it's loaded
if launchctl list | grep -q "com.nathalja.dhgate-monitor"; then
    echo "✅ Automation successfully set up!"
    echo ""
    echo "📋 Status:"
    echo "   • Monitor will run daily at 09:00"
    echo "   • Logs saved to: $SCRIPT_DIR/monitor.log"
    echo "   • Error logs: $SCRIPT_DIR/monitor_error.log"
    echo ""
    echo "🎯 Commands:"
    echo "   • Test now: python3 $SCRIPT_DIR/run_monitor.py"
    echo "   • Check logs: tail -f $SCRIPT_DIR/monitor.log"
    echo "   • Stop automation: launchctl unload ~/Library/LaunchAgents/com.nathalja.dhgate-monitor.plist"
    echo "   • Start automation: launchctl load ~/Library/LaunchAgents/com.nathalja.dhgate-monitor.plist"
else
    echo "❌ Failed to set up automation"
    exit 1
fi

echo ""
echo "🎉 Setup complete! Your DHgate monitor will now run automatically every day at 09:00."