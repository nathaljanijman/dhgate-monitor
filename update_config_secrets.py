#!/usr/bin/env python3
"""
Update config.json with GitHub Secrets for cloud deployment
"""

import json
import os

def update_config_with_secrets():
    """Update config.json with environment variables from GitHub Secrets"""
    
    config_file = 'config.json'
    
    # Load existing config
    if os.path.exists(config_file):
        with open(config_file, 'r', encoding='utf-8') as f:
            config = json.load(f)
    else:
        config = {}
    
    # Update email settings from environment variables
    if 'email' not in config:
        config['email'] = {}
    
    # Update from GitHub Secrets
    config['email']['sender_email'] = os.getenv('SENDER_EMAIL', config['email'].get('sender_email', 'nathaljanijman@gmail.com'))
    config['email']['sender_password'] = os.getenv('SENDER_PASSWORD', config['email'].get('sender_password', ''))
    config['email']['recipient_email'] = os.getenv('RECIPIENT_EMAIL', config['email'].get('recipient_email', 'nathaljanijman@hotmail.com'))
    
    # Keep other settings
    config['email']['smtp_server'] = config['email'].get('smtp_server', 'smtp.gmail.com')
    config['email']['smtp_port'] = config['email'].get('smtp_port', 587)
    
    # Default sellers if none exist
    if 'sellers' not in config:
        config['sellers'] = [
            {
                "name": "spider_jerseys",
                "search_url": "https://www.dhgate.com/store/21168508"
            },
            {
                "name": "shirts", 
                "search_url": "https://www.dhgate.com/store/20231890"
            }
        ]
    
    # Default schedule and filters
    config['schedule'] = config.get('schedule', {'time': '09:00'})
    config['filters'] = config.get('filters', {'keywords': ['kids'], 'case_sensitive': False})
    config['max_products_to_check'] = config.get('max_products_to_check', 50)
    
    # Save updated config
    with open(config_file, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=4, ensure_ascii=False)
    
    print("✅ Config updated with GitHub Secrets")
    print(f"📧 Sender: {config['email']['sender_email']}")
    print(f"📬 Recipient: {config['email']['recipient_email']}")
    print(f"🏪 Shops: {len(config['sellers'])}")

if __name__ == "__main__":
    update_config_with_secrets()