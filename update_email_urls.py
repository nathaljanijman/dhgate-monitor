#!/usr/bin/env python3
"""
Update email templates with production or development URLs
"""

import os
import re

def update_email_templates(base_url):
    """Update all email templates with the correct base URL"""
    
    files_to_update = [
        'selenium_monitor.py',
        'send_test_email.py'
    ]
    
    old_pattern = r'http://localhost:5001'
    new_url = base_url
    
    for filename in files_to_update:
        if os.path.exists(filename):
            print(f"Updating {filename}...")
            
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace all localhost URLs with the new base URL
            updated_content = re.sub(old_pattern, new_url, content)
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            
            count = len(re.findall(old_pattern, content))
            if count > 0:
                print(f"  ✅ Updated {count} URLs in {filename}")
            else:
                print(f"  ℹ️  No URLs to update in {filename}")
        else:
            print(f"  ⚠️  File {filename} not found")

def main():
    """Main function to update URLs based on environment"""
    
    # Check environment
    environment = os.getenv('ENVIRONMENT', 'development')
    
    if environment == 'production':
        base_url = 'https://dhgate-monitor.com'
        print("🌐 Updating for PRODUCTION environment")
    else:
        base_url = 'http://localhost:5001'
        print("🏠 Updating for DEVELOPMENT environment")
    
    print(f"Base URL: {base_url}")
    print("-" * 50)
    
    update_email_templates(base_url)
    
    print("-" * 50)
    print("✅ Email template URLs updated!")

if __name__ == "__main__":
    main()