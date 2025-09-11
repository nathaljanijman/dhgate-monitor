#!/bin/bash

# 🔐 DHgate Monitor - Admin Password Reset Script
# Dit script reset het admin wachtwoord in de D1 database

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
    echo "Example: $0 'Marese2906'"
    echo ""
    exit 1
fi

NEW_PASSWORD="$1"

print_status "Resetting admin password in D1 database..."

# Reset password in production database
print_status "Updating production database..."
npx wrangler d1 execute dhgate-monitor --command "
UPDATE admin_users 
SET password_hash = '$NEW_PASSWORD', updated_at = CURRENT_TIMESTAMP 
WHERE username = 'admin';
"

if [ $? -eq 0 ]; then
    print_success "Production database updated!"
else
    print_warning "Production database update failed - may not exist yet"
fi

# Reset password in dev database  
print_status "Updating development database..."
npx wrangler d1 execute dhgate-monitor-dev --command "
UPDATE admin_users 
SET password_hash = '$NEW_PASSWORD', updated_at = CURRENT_TIMESTAMP 
WHERE username = 'admin';
"

if [ $? -eq 0 ]; then
    print_success "Development database updated!"
else
    print_warning "Development database update failed - may not exist yet"
fi

print_success "✅ Admin password reset completed!"
print_status "Username: admin"
print_status "New password: $NEW_PASSWORD"
print_warning "⚠️  Please test login at: /admin/login"

echo ""
print_status "If the admin user doesn't exist, the script will create it..."

# Try to insert admin user if it doesn't exist
npx wrangler d1 execute dhgate-monitor --command "
INSERT OR IGNORE INTO admin_users (username, password_hash, email, full_name, role, is_active, created_at, updated_at)
VALUES ('admin', '$NEW_PASSWORD', 'admin@dhgate-monitor.com', 'System Administrator', 'super_admin', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
" 2>/dev/null

npx wrangler d1 execute dhgate-monitor-dev --command "
INSERT OR IGNORE INTO admin_users (username, password_hash, email, full_name, role, is_active, created_at, updated_at) 
VALUES ('admin', '$NEW_PASSWORD', 'admin@dhgate-monitor.com', 'System Administrator', 'super_admin', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
" 2>/dev/null

print_success "Admin user creation attempted (if not exists)"