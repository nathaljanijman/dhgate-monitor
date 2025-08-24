#!/bin/bash

# DHgate Monitor QA Setup Script
# This script sets up the QA testing environment

set -e

echo "🧪 Setting up DHgate Monitor QA Testing Environment"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ️${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node --version)"
    exit 1
fi

print_status "Node.js $(node --version) detected"

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    print_info "Installing dependencies..."
    npm install
else
    print_info "Updating dependencies..."
    npm ci
fi

# Install Playwright browsers
print_info "Installing Playwright browsers..."
npx playwright install

print_status "Dependencies installed successfully"

# Create .env file for QA testing if it doesn't exist
if [ ! -f ".env.qa" ]; then
    print_info "Creating QA environment configuration..."
    cat > .env.qa << EOF
# DHgate Monitor QA Configuration
BASE_URL=http://localhost:3000
NODE_ENV=qa

# Test tokens (replace with actual test tokens)
TEST_DASHBOARD_TOKEN=test-dashboard-token-123
TEST_UNSUBSCRIBE_TOKEN=test-unsubscribe-token-123

# Email reporting (optional)
SEND_EMAIL_REPORTS=false
QA_REPORT_EMAIL=qa@example.com
SMTP_SERVER=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Slack notifications (optional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
EOF
    print_warning "Created .env.qa file - please update with your actual configuration"
else
    print_status ".env.qa already exists"
fi

# Create test results directory
mkdir -p test-results
print_status "Created test-results directory"

# Create screenshots directory for failures
mkdir -p test-results/screenshots
print_status "Created screenshots directory"

# Check if the development server is running
print_info "Checking if development server is accessible..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    print_status "Development server is running at http://localhost:3000"
    SERVER_RUNNING=true
else
    print_warning "Development server is not running"
    print_info "You can start it with: npm run dev"
    SERVER_RUNNING=false
fi

# Run a quick test to verify setup
print_info "Running setup verification test..."
if $SERVER_RUNNING; then
    if npx playwright test tests/e2e/core/landingPage.test.js --project=chromium --reporter=line; then
        print_status "Setup verification test passed!"
    else
        print_warning "Setup verification test failed - but QA system is configured"
        print_info "This may be due to server not running or configuration issues"
    fi
else
    print_info "Skipping verification test - server not running"
fi

echo ""
echo "🎉 QA Testing Environment Setup Complete!"
echo "=========================================="
echo ""
echo "📋 Next Steps:"
echo "   1. Start the development server: npm run dev"
echo "   2. Update .env.qa with your configuration"
echo "   3. Run all QA tests: npm run test:qa"
echo "   4. Run specific tests: npm run test:accessibility"
echo "   5. Use interactive mode: npm run test:e2e:ui"
echo ""
echo "📚 Documentation:"
echo "   - QA Guide: tests/QA-TESTING-GUIDE.md"
echo "   - Test Results: test-results/"
echo "   - Configuration: .env.qa"
echo ""
echo "🚀 Available Commands:"
echo "   npm run test:qa              # Run full QA suite"
echo "   npm run test:e2e             # Run all e2e tests"
echo "   npm run test:accessibility   # WCAG compliance tests"
echo "   npm run test:performance     # SEO & performance tests"
echo "   npm run test:e2e:ui          # Interactive test runner"
echo ""
echo "⏰ Automated Schedule:"
echo "   Daily tests run at 06:00 UTC (08:00 Nederlandse tijd)"
echo "   Email reports sent to configured personal address"
echo ""
print_status "QA system is ready for testing!"