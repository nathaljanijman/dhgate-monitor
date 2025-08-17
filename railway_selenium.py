#!/usr/bin/env python3
"""
Railway Selenium Monitor - Cloud version with scheduler
"""

import os
import time
import schedule
from selenium_monitor import DHgateSeleniumMonitor

def run_monitoring():
    """Run DHgate monitoring in Railway cloud environment"""
    try:
        print("🌩️ Railway Cloud Monitoring Starting...")
        
        # Set environment to production
        os.environ['ENVIRONMENT'] = 'production'
        
        monitor = DHgateSeleniumMonitor()
        new_products = monitor.check_for_new_products()
        
        if new_products:
            total_new = sum(len(products) for products in new_products.values())
            print(f"🎉 Found {total_new} new kids products!")
        else:
            print("ℹ️  No new kids products found")
            
        print("✅ Railway monitoring completed")
        
    except Exception as e:
        print(f"❌ Railway monitoring error: {e}")

def start_scheduler():
    """Start the daily scheduler"""
    print("🚀 Starting Railway Selenium Scheduler...")
    print("⏰ Scheduled for daily 09:00 monitoring")
    
    # Schedule daily at 09:00
    schedule.every().day.at("09:00").do(run_monitoring)
    
    # Run immediately for testing
    if os.getenv('RUN_IMMEDIATELY', '').lower() == 'true':
        print("🧪 Running immediate test...")
        run_monitoring()
    
    # Keep scheduler running
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute

if __name__ == "__main__":
    start_scheduler()