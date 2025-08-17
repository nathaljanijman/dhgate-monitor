#!/usr/bin/env python3
"""
DHgate Monitor - Automated Daily Runner
Runs selenium monitoring automatically via macOS LaunchDaemon
"""

import os
import sys
import logging
from datetime import datetime

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Setup logging
log_dir = os.path.join(os.path.dirname(__file__), 'logs')
os.makedirs(log_dir, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(log_dir, 'monitor.log')),
        logging.StreamHandler()
    ]
)

def main():
    """Run automated DHgate monitoring"""
    try:
        logging.info("🤖 Starting automated DHgate monitoring...")
        logging.info(f"⏰ Timestamp: {datetime.now()}")
        logging.info(f"📁 Working directory: {os.getcwd()}")
        
        # Import and run selenium monitor
        from selenium_monitor import DHgateSeleniumMonitor
        
        monitor = DHgateSeleniumMonitor()
        logging.info("📦 Monitor instance created")
        
        # Run the check
        new_products = monitor.check_for_new_products()
        
        if new_products:
            total_new = sum(len(products) for products in new_products.values())
            logging.info(f"🎉 Found {total_new} new kids products!")
            
            # Products will be automatically emailed by check_for_new_products()
            for seller_name, products in new_products.items():
                logging.info(f"📦 {seller_name}: {len(products)} products")
                for product in products:
                    logging.info(f"   - {product['title'][:50]}...")
        else:
            logging.info("ℹ️  No new kids products found")
        
        logging.info("✅ Automated monitoring completed successfully")
        
    except Exception as e:
        logging.error(f"❌ Error during automated monitoring: {e}")
        logging.exception("Full error traceback:")
        sys.exit(1)

if __name__ == "__main__":
    main()