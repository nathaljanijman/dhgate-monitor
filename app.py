#!/usr/bin/env python3
"""
DHgate Monitor - Production Web Interface
Cloudflare Pages compatible version
"""

import os
from web_interface import app

# Production configuration
if os.getenv('ENVIRONMENT') == 'production':
    app.config['DEBUG'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dhgate-monitor-production-key-2025')
else:
    app.config['DEBUG'] = True

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=app.config['DEBUG'])