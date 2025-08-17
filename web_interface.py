#!/usr/bin/env python3
"""
DHgate Monitor Web Interface
Allows users to manage shops and settings via web interface
"""

from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import json
import os
import qrcode
import io
import base64
from datetime import datetime
import re

app = Flask(__name__)
app.secret_key = 'dhgate-monitor-secret-key-2024'

CONFIG_FILE = 'config.json'

def get_base_url():
    """Get the base URL for the application"""
    if os.getenv('ENVIRONMENT') == 'production':
        return 'https://dhgate-monitor.com'
    return 'http://localhost:5001'

def load_config():
    """Load configuration from JSON file"""
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def save_config(config):
    """Save configuration to JSON file"""
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=4, ensure_ascii=False)

def validate_dhgate_url(url):
    """Validate if URL is a valid DHgate URL"""
    dhgate_patterns = [
        r'https?://(www\.)?dhgate\.com/store/\d+',
        r'https?://(www\.)?dhgate\.com/wholesale/.*',
        r'https?://.*\.dhgate\.com/.*'
    ]
    
    return any(re.match(pattern, url) for pattern in dhgate_patterns)

def generate_qr_code(data):
    """Generate QR code as base64 image"""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Convert to base64
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)
    img_base64 = base64.b64encode(buffer.getvalue()).decode()
    
    return f"data:image/png;base64,{img_base64}"

@app.route('/')
def index():
    """Main dashboard page"""
    config = load_config()
    sellers = config.get('sellers', [])
    
    # Generate QR code for this page
    qr_data = request.url
    qr_code = generate_qr_code(qr_data)
    
    return render_template('index.html', 
                         sellers=sellers, 
                         config=config,
                         qr_code=qr_code)

@app.route('/add_shop', methods=['GET', 'POST'])
def add_shop():
    """Add new shop form and handler"""
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        url = request.form.get('url', '').strip()
        
        if not name or not url:
            flash('Naam en URL zijn verplicht!', 'error')
            return render_template('add_shop.html')
        
        if not validate_dhgate_url(url):
            flash('Ongeldige DHgate URL! Gebruik een store of wholesale URL.', 'error')
            return render_template('add_shop.html')
        
        # Load current config
        config = load_config()
        if 'sellers' not in config:
            config['sellers'] = []
        
        # Check for duplicates
        existing_urls = [s.get('search_url', '') for s in config['sellers']]
        if url in existing_urls:
            flash('Deze shop is al toegevoegd!', 'warning')
            return render_template('add_shop.html')
        
        # Add new seller
        new_seller = {
            'name': name,
            'search_url': url,
            'added_at': datetime.now().isoformat()
        }
        
        config['sellers'].append(new_seller)
        save_config(config)
        
        flash(f'Shop "{name}" succesvol toegevoegd!', 'success')
        return redirect(url_for('index'))
    
    # Generate QR code for this add form
    qr_data = request.url
    qr_code = generate_qr_code(qr_data)
    
    return render_template('add_shop.html', qr_code=qr_code)

@app.route('/remove_shop/<int:shop_index>')
def remove_shop(shop_index):
    """Remove shop by index"""
    config = load_config()
    sellers = config.get('sellers', [])
    
    if 0 <= shop_index < len(sellers):
        removed_shop = sellers.pop(shop_index)
        config['sellers'] = sellers
        save_config(config)
        flash(f'Shop "{removed_shop["name"]}" verwijderd!', 'success')
    else:
        flash('Shop niet gevonden!', 'error')
    
    return redirect(url_for('index'))

@app.route('/settings', methods=['GET', 'POST'])
def settings():
    """Settings page for keywords and schedule"""
    if request.method == 'POST':
        config = load_config()
        
        # Update keywords
        keywords = request.form.get('keywords', 'kids').strip()
        keyword_list = [k.strip() for k in keywords.split(',') if k.strip()]
        
        # Update schedule
        schedule_time = request.form.get('schedule_time', '09:00')
        
        # Update max products
        max_products = request.form.get('max_products', '50')
        try:
            max_products = int(max_products)
        except:
            max_products = 50
        
        # Update config
        config['filters'] = {
            'keywords': keyword_list,
            'case_sensitive': False
        }
        config['schedule'] = {'time': schedule_time}
        config['max_products_to_check'] = max_products
        
        save_config(config)
        flash('Instellingen opgeslagen!', 'success')
        return redirect(url_for('settings'))
    
    config = load_config()
    keywords = ', '.join(config.get('filters', {}).get('keywords', ['kids']))
    schedule_time = config.get('schedule', {}).get('time', '09:00')
    max_products = config.get('max_products_to_check', 50)
    
    return render_template('settings.html', 
                         keywords=keywords,
                         schedule_time=schedule_time,
                         max_products=max_products)

@app.route('/api/add_shop', methods=['POST'])
def api_add_shop():
    """API endpoint for adding shops (for direct integration)"""
    data = request.get_json()
    
    if not data or 'name' not in data or 'url' not in data:
        return jsonify({'error': 'Name and URL required'}), 400
    
    name = data['name'].strip()
    url = data['url'].strip()
    
    if not validate_dhgate_url(url):
        return jsonify({'error': 'Invalid DHgate URL'}), 400
    
    config = load_config()
    if 'sellers' not in config:
        config['sellers'] = []
    
    # Check for duplicates
    existing_urls = [s.get('search_url', '') for s in config['sellers']]
    if url in existing_urls:
        return jsonify({'error': 'Shop already exists'}), 409
    
    # Add new seller
    new_seller = {
        'name': name,
        'search_url': url,
        'added_at': datetime.now().isoformat()
    }
    
    config['sellers'].append(new_seller)
    save_config(config)
    
    return jsonify({'message': f'Shop "{name}" added successfully', 'seller': new_seller})

if __name__ == '__main__':
    # Check if templates directory exists
    if not os.path.exists('templates'):
        os.makedirs('templates')
    
    print("🌐 DHgate Monitor Web Interface")
    print("==============================")
    print("Starting on http://localhost:5001")
    print("📱 QR codes will be generated for mobile access")
    
    app.run(debug=True, host='0.0.0.0', port=5001)