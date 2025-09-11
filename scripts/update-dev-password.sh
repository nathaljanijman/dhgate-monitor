#!/bin/bash

# 🔐 DHgate Monitor - Development Password Update Script
# Dit script helpt je om het development password te wijzigen

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if password is provided
if [ -z "$1" ]; then
    print_error "Geen password opgegeven!"
    echo ""
    echo "Usage: $0 <new-password>"
    echo ""
    echo "Example: $0 'myNewDevPassword123!'"
    echo ""
    echo "Requirements:"
    echo "- Minimaal 8 karakters"
    echo "- Bevat letters, cijfers en speciale karakters"
    echo "- Geen spaties"
    exit 1
fi

NEW_PASSWORD="$1"
CLOUDFLARE_APP_FILE="cloudflare_app.js"

# Validate password strength
if [ ${#NEW_PASSWORD} -lt 8 ]; then
    print_error "Password moet minimaal 8 karakters lang zijn!"
    exit 1
fi

if [[ ! $NEW_PASSWORD =~ [A-Za-z] ]]; then
    print_error "Password moet letters bevatten!"
    exit 1
fi

if [[ ! $NEW_PASSWORD =~ [0-9] ]]; then
    print_error "Password moet cijfers bevatten!"
    exit 1
fi

if [[ ! $NEW_PASSWORD =~ [^A-Za-z0-9] ]]; then
    print_error "Password moet speciale karakters bevatten!"
    exit 1
fi

if [[ $NEW_PASSWORD == *" "* ]]; then
    print_error "Password mag geen spaties bevatten!"
    exit 1
fi

# Check if cloudflare_app.js exists
if [ ! -f "$CLOUDFLARE_APP_FILE" ]; then
    print_error "cloudflare_app.js niet gevonden!"
    exit 1
fi

# Create backup
print_status "Creating backup of cloudflare_app.js..."
cp "$CLOUDFLARE_APP_FILE" "${CLOUDFLARE_APP_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
print_success "Backup created!"

# Update password in file
print_status "Updating development password..."
if sed -i.tmp "s/const devPassword = '[^']*';/const devPassword = '$NEW_PASSWORD';/" "$CLOUDFLARE_APP_FILE"; then
    rm "${CLOUDFLARE_APP_FILE}.tmp"
    print_success "Password updated successfully!"
else
    print_error "Failed to update password!"
    exit 1
fi

# Verify the change
if grep -q "const devPassword = '$NEW_PASSWORD';" "$CLOUDFLARE_APP_FILE"; then
    print_success "Password verification successful!"
else
    print_error "Password verification failed!"
    exit 1
fi

print_success "✅ Development password updated!"
print_warning "⚠️  Remember to:"
print_warning "   1. Deploy to development: npm run deploy:dev"
print_warning "   2. Test login with new password"
print_warning "   3. Update team members with new password"
print_warning "   4. Update documentation if needed"

echo ""
print_status "New development password: $NEW_PASSWORD"
print_status "Backup file: ${CLOUDFLARE_APP_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
