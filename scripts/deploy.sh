#!/bin/bash

# 🚀 DHgate Monitor Deployment Script
# Dit script zorgt ervoor dat changes eerst naar development gaan

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Function to check if we're on the right branch
check_branch() {
    local target_env=$1
    local current_branch=$(git branch --show-current)
    
    if [ "$target_env" = "production" ] && [ "$current_branch" != "main" ]; then
        print_error "Production deployment kan alleen vanaf 'main' branch!"
        print_error "Huidige branch: $current_branch"
        print_warning "Gebruik: git checkout main && git pull origin main"
        exit 1
    fi
    
    if [ "$target_env" = "development" ] && [ "$current_branch" != "develop" ]; then
        print_warning "Development deployment wordt aanbevolen vanaf 'develop' branch"
        print_warning "Huidige branch: $current_branch"
        read -p "Doorgaan? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Function to run tests
run_tests() {
    print_status "Running tests..."
    
    if ! npm run test; then
        print_error "Tests failed! Deployment aborted."
        exit 1
    fi
    
    print_success "All tests passed!"
}

# Function to check development environment
check_dev_environment() {
    print_status "Checking development environment..."
    
    if ! curl -f -s https://dev.dhgate-monitor.com/health > /dev/null; then
        print_error "Development environment is not accessible!"
        print_error "Please check: https://dev.dhgate-monitor.com"
        exit 1
    fi
    
    print_success "Development environment is healthy!"
}

# Function to deploy to development
deploy_development() {
    print_status "🚀 Deploying to DEVELOPMENT environment..."
    
    check_branch "development"
    run_tests
    
    print_status "Deploying to dev.dhgate-monitor.com..."
    if ! npm run deploy:dev; then
        print_error "Development deployment failed!"
        exit 1
    fi
    
    print_status "Verifying deployment..."
    sleep 10  # Wait for deployment to complete
    
    if ! curl -f -s https://dev.dhgate-monitor.com/health > /dev/null; then
        print_error "Development deployment verification failed!"
        exit 1
    fi
    
    print_success "✅ Development deployment successful!"
    print_success "🌐 URL: https://dev.dhgate-monitor.com"
    
    # Start monitoring logs
    print_status "Starting development log monitoring..."
    print_warning "Press Ctrl+C to stop monitoring"
    npm run tail:dev
}

# Function to deploy to production
deploy_production() {
    print_status "🚀 Deploying to PRODUCTION environment..."
    
    check_branch "production"
    
    # Check if development is stable
    print_status "Checking development environment stability..."
    check_dev_environment
    
    # Run full test suite
    print_status "Running full test suite..."
    if ! npm run test:qa; then
        print_error "QA tests failed! Production deployment aborted."
        exit 1
    fi
    
    # Final confirmation
    print_warning "⚠️  You are about to deploy to PRODUCTION!"
    print_warning "This will affect live users on dhgate-monitor.com"
    read -p "Are you sure? Type 'DEPLOY' to confirm: " -r
    if [ "$REPLY" != "DEPLOY" ]; then
        print_error "Production deployment cancelled."
        exit 1
    fi
    
    print_status "Deploying to dhgate-monitor.com..."
    if ! npm run deploy; then
        print_error "Production deployment failed!"
        exit 1
    fi
    
    print_status "Verifying deployment..."
    sleep 15  # Wait for deployment to complete
    
    if ! curl -f -s https://dhgate-monitor.com/health > /dev/null; then
        print_error "Production deployment verification failed!"
        exit 1
    fi
    
    print_success "✅ Production deployment successful!"
    print_success "🌐 URL: https://dhgate-monitor.com"
    
    # Start monitoring logs
    print_status "Starting production log monitoring..."
    print_warning "Press Ctrl+C to stop monitoring"
    npm run tail
}

# Function to show help
show_help() {
    echo "🚀 DHgate Monitor Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev, development    Deploy to development environment"
    echo "  prod, production    Deploy to production environment"
    echo "  test                Run tests only"
    echo "  check-dev           Check development environment health"
    echo "  help                Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 dev              Deploy to development"
    echo "  $0 production       Deploy to production"
    echo "  $0 test             Run tests"
    echo ""
    echo "Environment URLs:"
    echo "  Development:  https://dev.dhgate-monitor.com"
    echo "  Production:   https://dhgate-monitor.com"
}

# Main script logic
case "${1:-}" in
    "dev"|"development")
        deploy_development
        ;;
    "prod"|"production")
        deploy_production
        ;;
    "test")
        run_tests
        ;;
    "check-dev")
        check_dev_environment
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    "")
        print_error "No command specified!"
        echo ""
        show_help
        exit 1
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
