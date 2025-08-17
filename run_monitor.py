#!/usr/bin/env python3
"""
DHgate Monitor Runner - Automated Daily Execution
Runs the monitor automatically and handles scheduling
"""

import os
import sys
import logging
from datetime import datetime
import subprocess

# Setup logging
log_file = os.path.join(os.path.dirname(__file__), 'monitor.log')
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file),
        logging.StreamHandler(sys.stdout)
    ]
)

def run_monitor():
    """Run the DHgate monitor with error handling"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Try selenium version first (more robust), fallback to requests version
    monitors = [
        ('selenium_monitor.py', 'Selenium Monitor'),
        ('dhgate_monitor.py', 'Basic Monitor')
    ]
    
    for script, name in monitors:
        script_path = os.path.join(script_dir, script)
        
        if not os.path.exists(script_path):
            logging.warning(f"Script not found: {script_path}")
            continue
            
        try:
            logging.info(f"Starting {name}...")
            
            # Run the monitor script in automated mode (option 1 = single check)
            result = subprocess.run([
                sys.executable, script_path
            ], 
            input='1\n',  # Choose option 1 (single check)
            text=True, 
            capture_output=True, 
            timeout=600  # 10 minutes timeout
            )
            
            if result.returncode == 0:
                logging.info(f"{name} completed successfully")
                logging.info(f"Output: {result.stdout}")
                return True
            else:
                logging.error(f"{name} failed with return code {result.returncode}")
                logging.error(f"Error: {result.stderr}")
                
        except subprocess.TimeoutExpired:
            logging.error(f"{name} timed out after 10 minutes")
        except Exception as e:
            logging.error(f"Error running {name}: {e}")
            continue
    
    logging.error("All monitor scripts failed")
    return False

def main():
    logging.info("=== DHgate Monitor Daily Run Started ===")
    logging.info(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    try:
        success = run_monitor()
        if success:
            logging.info("Monitor run completed successfully")
        else:
            logging.error("Monitor run failed")
            
    except Exception as e:
        logging.error(f"Unexpected error in main: {e}")
    
    logging.info("=== DHgate Monitor Daily Run Finished ===\n")

if __name__ == "__main__":
    main()