#!/usr/bin/env python3
"""
DHgate Monitor - Railway Web Interface
Lightweight version without Selenium dependencies
"""

import os
import json
import qrcode
from io import BytesIO
import base64
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'dhgate-monitor-railway-2025')

# Production configuration
if os.getenv('ENVIRONMENT') == 'production':
    app.config['DEBUG'] = False
else:
    app.config['DEBUG'] = True

def load_config():
    """Load configuration from config.json"""
    config_file = 'config.json'
    if os.path.exists(config_file):
        with open(config_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    else:
        # Default configuration for Railway
        default_config = {
            "email": {
                "smtp_server": "smtp.gmail.com",
                "smtp_port": 587,
                "sender_email": "nathaljanijman@gmail.com",
                "sender_password": "ndox avht yqcp maak",
                "recipient_email": "nathaljanijman@gmail.com"
            },
            "sellers": [
                {
                    "name": "spider_jerseys",
                    "search_url": "https://www.dhgate.com/wholesale/search.do?act=search&sus=&searchkey=kids+jersey&catalog=#hpsearch1808"
                }
            ],
            "schedule": {"time": "09:00"},
            "filters": {"keywords": ["kids"], "case_sensitive": False}
        }
        return default_config

def save_config(config):
    """Save configuration to config.json"""
    with open('config.json', 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=4, ensure_ascii=False)

def generate_qr_code(url):
    """Generate QR code for mobile access"""
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(url)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Convert to base64 for embedding in HTML
    buffer = BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)
    
    return base64.b64encode(buffer.getvalue()).decode()

@app.route('/')
def index():
    """Main dashboard"""
    config = load_config()
    
    # Generate QR code for mobile access
    base_url = request.url_root.rstrip('/')
    qr_code = generate_qr_code(base_url)
    
    return render_template('index.html', 
                         config=config, 
                         qr_code=qr_code,
                         base_url=base_url)

@app.route('/add_shop', methods=['GET', 'POST'])
def add_shop():
    """Add new shop to monitor"""
    if request.method == 'POST':
        config = load_config()
        
        new_shop = {
            'name': request.form['name'],
            'search_url': request.form['search_url']
        }
        
        config['sellers'].append(new_shop)
        save_config(config)
        
        flash(f'✅ Shop "{new_shop["name"]}" toegevoegd!', 'success')
        return redirect(url_for('index'))
    
    return render_template('add_shop.html')

@app.route('/remove_shop/<int:shop_index>')
def remove_shop(shop_index):
    """Remove shop from monitoring"""
    config = load_config()
    
    if 0 <= shop_index < len(config['sellers']):
        removed_shop = config['sellers'].pop(shop_index)
        save_config(config)
        flash(f'❌ Shop "{removed_shop["name"]}" verwijderd', 'info')
    else:
        flash('❌ Ongeldige shop selectie', 'error')
    
    return redirect(url_for('index'))

@app.route('/settings', methods=['GET', 'POST'])
def settings():
    """Application settings"""
    if request.method == 'POST':
        config = load_config()
        
        # Update email settings
        config['email']['sender_email'] = request.form['sender_email']
        config['email']['recipient_email'] = request.form['recipient_email']
        config['email']['sender_password'] = request.form['sender_password']
        
        # Update schedule
        config['schedule']['time'] = request.form['schedule_time']
        
        # Update filters
        keywords = [kw.strip() for kw in request.form['keywords'].split(',') if kw.strip()]
        config['filters']['keywords'] = keywords
        config['filters']['case_sensitive'] = 'case_sensitive' in request.form
        
        save_config(config)
        flash('✅ Instellingen opgeslagen!', 'success')
        return redirect(url_for('settings'))
    
    config = load_config()
    return render_template('settings.html', config=config)

@app.route('/api/status')
def api_status():
    """API endpoint for status check"""
    return jsonify({
        'status': 'online',
        'service': 'DHgate Monitor Web Interface',
        'version': '2.0.0',
        'platform': 'Railway',
        'environment': os.getenv('ENVIRONMENT', 'development')
    })

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': '2025-08-17T12:00:00Z'
    })

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=app.config['DEBUG'])