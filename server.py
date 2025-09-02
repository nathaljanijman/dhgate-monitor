#!/usr/bin/env python3
"""
DHgate Monitor Local Development Server
Simuleert alle routes van dhgate-monitor.com
"""

import http.server
import socketserver
import urllib.parse
import os
import json
from pathlib import Path

class DHgateMonitorHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse URL and query parameters
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        query_params = urllib.parse.parse_qs(parsed_url.query)
        
        print(f"🌐 Request: {path} with params: {query_params}")
        
        # Handle different routes
        if path == "/" or path == "":
            # Homepage
            self.serve_file("index.html")
        elif path == "/dashboard":
            # Dashboard page
            self.serve_dashboard(query_params)
        elif path == "/newsroom":
            # Newsroom page
            self.serve_newsroom(query_params)
        elif path == "/service":
            # Service page
            self.serve_service(query_params)
        elif path == "/contact":
            # Contact page
            self.serve_contact(query_params)
        elif path == "/privacy":
            # Privacy page
            self.serve_privacy(query_params)
        elif path == "/terms":
            # Terms page
            self.serve_terms(query_params)
        elif path == "/delete-data":
            # Delete data page
            self.serve_delete_data(query_params)
        elif path == "/add_shop":
            # Add shop page
            self.serve_add_shop(query_params)
        elif path == "/settings":
            # Settings page
            self.serve_settings(query_params)
        elif path == "/unsubscribe":
            # Unsubscribe page
            self.serve_unsubscribe(query_params)
        elif path.startswith("/assets/"):
            # Serve static assets
            self.serve_file(path[1:])  # Remove leading slash
        elif path == "/signup-widget.js":
            # Serve widget script
            self.serve_file("signup-widget.js")
        elif path == "/favicon.ico":
            # Serve favicon or return 404
            self.send_error(404, "Favicon not found")
        else:
            # Default: serve homepage
            print(f"⚠️ Unknown route: {path}, serving homepage")
            self.serve_file("index.html")
    
    def serve_file(self, filename):
        """Serve a static file"""
        try:
            with open(filename, 'rb') as f:
                content = f.read()
            
            # Determine content type
            if filename.endswith('.html'):
                content_type = 'text/html; charset=utf-8'
            elif filename.endswith('.js'):
                content_type = 'application/javascript; charset=utf-8'
            elif filename.endswith('.css'):
                content_type = 'text/css; charset=utf-8'
            elif filename.endswith('.png'):
                content_type = 'image/png'
            elif filename.endswith('.svg'):
                content_type = 'image/svg+xml'
            else:
                content_type = 'text/plain; charset=utf-8'
            
            self.send_response(200)
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', str(len(content)))
            self.end_headers()
            self.wfile.write(content)
            
        except FileNotFoundError:
            self.send_error(404, f"File not found: {filename}")
        except Exception as e:
            self.send_error(500, f"Server error: {str(e)}")
    
    def serve_dashboard(self, query_params):
        """Serve dashboard page"""
        lang = query_params.get('lang', ['en'])[0]
        theme = query_params.get('theme', ['light'])[0]
        
        dashboard_html = f"""
<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - DHgate Monitor</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; background: {'#1a1a1a' if theme == 'dark' else '#f5f5f5'}; color: {'#ffffff' if theme == 'dark' else '#333333'}; }}
        .container {{ max-width: 1200px; margin: 0 auto; }}
        .header {{ text-align: center; margin-bottom: 40px; }}
        .dashboard-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }}
        .card {{ background: {'#2a2a2a' if theme == 'dark' else '#ffffff'}; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
        .btn {{ display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 5px; }}
        .btn-secondary {{ background: #6c757d; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 DHgate Monitor Dashboard</h1>
            <p>Welcome to your monitoring dashboard</p>
            <a href="/?lang={lang}&theme={theme}" class="btn">← Back to Homepage</a>
        </div>
        
        <div class="dashboard-grid">
            <div class="card">
                <h3>📊 Monitoring Overview</h3>
                <p>Track your DHgate stores and products</p>
                <a href="#" class="btn">View Analytics</a>
            </div>
            
            <div class="card">
                <h3>🏪 Store Management</h3>
                <p>Manage your monitored stores</p>
                <a href="#" class="btn">Manage Stores</a>
            </div>
            
            <div class="card">
                <h3>📈 Reports</h3>
                <p>View detailed reports and insights</p>
                <a href="#" class="btn">View Reports</a>
            </div>
            
            <div class="card">
                <h3>⚙️ Settings</h3>
                <p>Configure your monitoring preferences</p>
                <a href="/settings?lang={lang}&theme={theme}" class="btn">Settings</a>
            </div>
        </div>
    </div>
</body>
</html>
        """
        
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(dashboard_html.encode('utf-8'))
    
    def serve_newsroom(self, query_params):
        """Serve newsroom page"""
        lang = query_params.get('lang', ['en'])[0]
        theme = query_params.get('theme', ['light'])[0]
        
        newsroom_html = f"""
<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsroom - DHgate Monitor</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; background: {'#1a1a1a' if theme == 'dark' else '#f5f5f5'}; color: {'#ffffff' if theme == 'dark' else '#333333'}; }}
        .container {{ max-width: 800px; margin: 0 auto; }}
        .header {{ text-align: center; margin-bottom: 40px; }}
        .article {{ background: {'#2a2a2a' if theme == 'dark' else '#ffffff'}; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
        .btn {{ display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 5px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📰 DHgate Monitor Newsroom</h1>
            <p>Latest updates and insights</p>
            <a href="/?lang={lang}&theme={theme}" class="btn">← Back to Homepage</a>
        </div>
        
        <div class="article">
            <h3>🚀 New Features Released</h3>
            <p>We've added exciting new monitoring capabilities to help you track DHgate stores more effectively.</p>
            <span class="date">September 2, 2025</span>
        </div>
        
        <div class="article">
            <h3>📊 Enhanced Analytics Dashboard</h3>
            <p>Our analytics dashboard now provides deeper insights into store performance and product trends.</p>
            <span class="date">August 28, 2025</span>
        </div>
        
        <div class="article">
            <h3>🔔 Improved Alert System</h3>
            <p>Get notified faster about price changes and new products with our enhanced alert system.</p>
            <span class="date">August 20, 2025</span>
        </div>
    </div>
</body>
</html>
        """
        
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(newsroom_html.encode('utf-8'))
    
    def serve_service(self, query_params):
        """Serve service page"""
        lang = query_params.get('lang', ['en'])[0]
        theme = query_params.get('theme', ['light'])[0]
        
        service_html = f"""
<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Service - DHgate Monitor</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; background: {'#1a1a1a' if theme == 'dark' else '#f5f5f5'}; color: {'#ffffff' if theme == 'dark' else '#333333'}; }}
        .container {{ max-width: 800px; margin: 0 auto; }}
        .header {{ text-align: center; margin-bottom: 40px; }}
        .service-card {{ background: {'#2a2a2a' if theme == 'dark' else '#ffffff'}; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
        .btn {{ display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 5px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛠️ DHgate Monitor Service</h1>
            <p>Our comprehensive monitoring solutions</p>
            <a href="/?lang={lang}&theme={theme}" class="btn">← Back to Homepage</a>
        </div>
        
        <div class="service-card">
            <h3>🏪 Store Monitoring</h3>
            <p>Monitor complete DHgate stores for price changes, new products, and inventory updates.</p>
            <a href="#" class="btn">Learn More</a>
        </div>
        
        <div class="service-card">
            <h3>📦 Product Tracking</h3>
            <p>Track individual products for price, stock, availability, and competition.</p>
            <a href="#" class="btn">Learn More</a>
        </div>
        
        <div class="service-card">
            <h3>💰 Margin Calculator</h3>
            <p>Calculate profit margins, optimize pricing, and analyze market competition.</p>
            <a href="#" class="btn">Learn More</a>
        </div>
    </div>
</body>
</html>
        """
        
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(service_html.encode('utf-8'))
    
    def serve_contact(self, query_params):
        """Serve contact page"""
        lang = query_params.get('lang', ['en'])[0]
        theme = query_params.get('theme', ['light'])[0]
        
        contact_html = f"""
<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - DHgate Monitor</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; background: {'#1a1a1a' if theme == 'dark' else '#f5f5f5'}; color: {'#ffffff' if theme == 'dark' else '#333333'}; }}
        .container {{ max-width: 600px; margin: 0 auto; }}
        .header {{ text-align: center; margin-bottom: 40px; }}
        .contact-form {{ background: {'#2a2a2a' if theme == 'dark' else '#ffffff'}; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
        .form-group {{ margin-bottom: 20px; }}
        label {{ display: block; margin-bottom: 5px; font-weight: bold; }}
        input, textarea {{ width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; background: {'#3a3a3a' if theme == 'dark' else '#ffffff'}; color: {'#ffffff' if theme == 'dark' else '#333333'}; }}
        .btn {{ display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; border: none; cursor: pointer; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📞 Contact Us</h1>
            <p>Get in touch with our team</p>
            <a href="/?lang={lang}&theme={theme}" class="btn">← Back to Homepage</a>
        </div>
        
        <div class="contact-form">
            <form>
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                
                <button type="submit" class="btn">Send Message</button>
            </form>
        </div>
    </div>
</body>
</html>
        """
        
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(contact_html.encode('utf-8'))
    
    def serve_privacy(self, query_params):
        """Serve privacy page"""
        lang = query_params.get('lang', ['en'])[0]
        theme = query_params.get('theme', ['light'])[0]
        
        privacy_html = f"""
<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - DHgate Monitor</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; background: {'#1a1a1a' if theme == 'dark' else '#f5f5f5'}; color: {'#ffffff' if theme == 'dark' else '#333333'}; }}
        .container {{ max-width: 800px; margin: 0 auto; }}
        .header {{ text-align: center; margin-bottom: 40px; }}
        .content {{ background: {'#2a2a2a' if theme == 'dark' else '#ffffff'}; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
        .btn {{ display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 5px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔒 Privacy Policy</h1>
            <p>How we protect your data</p>
            <a href="/?lang={lang}&theme={theme}" class="btn">← Back to Homepage</a>
        </div>
        
        <div class="content">
            <h2>Data Protection</h2>
            <p>We are committed to protecting your privacy and ensuring the security of your personal information.</p>
            
            <h2>Information We Collect</h2>
            <p>We collect only the information necessary to provide our monitoring services.</p>
            
            <h2>How We Use Your Data</h2>
            <p>Your data is used exclusively for providing DHgate monitoring services and improving our platform.</p>
            
            <h2>Data Security</h2>
            <p>We implement industry-standard security measures to protect your information.</p>
        </div>
    </div>
</body>
</html>
        """
        
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(privacy_html.encode('utf-8'))
    
    def serve_terms(self, query_params):
        """Serve terms page"""
        lang = query_params.get('lang', ['en'])[0]
        theme = query_params.get('theme', ['light'])[0]
        
        terms_html = f"""
<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms of Service - DHgate Monitor</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; background: {'#1a1a1a' if theme == 'dark' else '#f5f5f5'}; color: {'#ffffff' if theme == 'dark' else '#333333'}; }}
        .container {{ max-width: 800px; margin: 0 auto; }}
        .header {{ text-align: center; margin-bottom: 40px; }}
        .content {{ background: {'#2a2a2a' if theme == 'dark' else '#ffffff'}; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
        .btn {{ display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 5px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📋 Terms of Service</h1>
            <p>Our service terms and conditions</p>
            <a href="/?lang={lang}&theme={theme}" class="btn">← Back to Homepage</a>
        </div>
        
        <div class="content">
            <h2>Acceptance of Terms</h2>
            <p>By using our service, you agree to these terms and conditions.</p>
            
            <h2>Service Description</h2>
            <p>DHgate Monitor provides automated monitoring and tracking services for DHgate stores and products.</p>
            
            <h2>User Responsibilities</h2>
            <p>Users are responsible for ensuring their use of our service complies with applicable laws and regulations.</p>
            
            <h2>Service Availability</h2>
            <p>We strive to maintain high service availability but cannot guarantee uninterrupted access.</p>
        </div>
    </div>
</body>
</html>
        """
        
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(terms_html.encode('utf-8'))
    
    def serve_delete_data(self, query_params):
        """Serve delete data page"""
        lang = query_params.get('lang', ['en'])[0]
        theme = query_params.get('theme', ['light'])[0]
        
        delete_html = f"""
<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delete Data - DHgate Monitor</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; background: {'#1a1a1a' if theme == 'dark' else '#f5f5f5'}; color: {'#ffffff' if theme == 'dark' else '#333333'}; }}
        .container {{ max-width: 600px; margin: 0 auto; }}
        .header {{ text-align: center; margin-bottom: 40px; }}
        .content {{ background: {'#2a2a2a' if theme == 'dark' else '#ffffff'}; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
        .btn {{ display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 5px; }}
        .btn-danger {{ background: #dc3545; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🗑️ Delete My Data</h1>
            <p>Request data deletion</p>
            <a href="/?lang={lang}&theme={theme}" class="btn">← Back to Homepage</a>
        </div>
        
        <div class="content">
            <h2>Data Deletion Request</h2>
            <p>You can request the deletion of all your personal data from our system.</p>
            
            <h3>What happens when you delete your data:</h3>
            <ul>
                <li>All your account information will be permanently removed</li>
                <li>Your monitoring preferences will be deleted</li>
                <li>This action cannot be undone</li>
            </ul>
            
            <p><strong>⚠️ Warning: This action is irreversible!</strong></p>
            
            <button class="btn btn-danger">Delete All My Data</button>
        </div>
    </div>
</body>
</html>
        """
        
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(delete_html.encode('utf-8'))
    
    def serve_add_shop(self, query_params):
        """Serve add shop page"""
        lang = query_params.get('lang', ['en'])[0]
        theme = query_params.get('theme', ['light'])[0]
        
        add_shop_html = f"""
<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Shop - DHgate Monitor</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; background: {'#1a1a1a' if theme == 'dark' else '#f5f5f5'}; color: {'#ffffff' if theme == 'dark' else '#333333'}; }}
        .container {{ max-width: 600px; margin: 0 auto; }}
        .header {{ text-align: center; margin-bottom: 40px; }}
        .form {{ background: {'#2a2a2a' if theme == 'dark' else '#ffffff'}; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
        .form-group {{ margin-bottom: 20px; }}
        label {{ display: block; margin-bottom: 5px; font-weight: bold; }}
        input, select {{ width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; background: {'#3a3a3a' if theme == 'dark' else '#ffffff'}; color: {'#ffffff' if theme == 'dark' else '#333333'}; }}
        .btn {{ display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; border: none; cursor: pointer; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏪 Add New Shop</h1>
            <p>Start monitoring a new DHgate store</p>
            <a href="/?lang={lang}&theme={theme}" class="btn">← Back to Homepage</a>
        </div>
        
        <div class="form">
            <form>
                <div class="form-group">
                    <label for="shop_url">Shop URL:</label>
                    <input type="url" id="shop_url" name="shop_url" placeholder="https://www.dhgate.com/store/..." required>
                </div>
                
                <div class="form-group">
                    <label for="shop_name">Shop Name (optional):</label>
                    <input type="text" id="shop_name" name="shop_name" placeholder="Enter shop name">
                </div>
                
                <div class="form-group">
                    <label for="monitoring_type">Monitoring Type:</label>
                    <select id="monitoring_type" name="monitoring_type">
                        <option value="full">Full Store Monitoring</option>
                        <option value="products">Specific Products Only</option>
                        <option value="prices">Price Changes Only</option>
                    </select>
                </div>
                
                <button type="submit" class="btn">Add Shop</button>
            </form>
        </div>
    </div>
</body>
</html>
        """
        
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(add_shop_html.encode('utf-8'))
    
    def serve_settings(self, query_params):
        """Serve settings page"""
        lang = query_params.get('lang', ['en'])[0]
        theme = query_params.get('theme', ['light'])[0]
        
        settings_html = f"""
<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings - DHgate Monitor</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; background: {'#1a1a1a' if theme == 'dark' else '#f5f5f5'}; color: {'#ffffff' if theme == 'dark' else '#333333'}; }}
        .container {{ max-width: 600px; margin: 0 auto; }}
        .header {{ text-align: center; margin-bottom: 40px; }}
        .settings {{ background: {'#2a2a2a' if theme == 'dark' else '#ffffff'}; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
        .setting-group {{ margin-bottom: 20px; }}
        label {{ display: block; margin-bottom: 5px; font-weight: bold; }}
        input, select {{ width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; background: {'#3a3a3a' if theme == 'dark' else '#ffffff'}; color: {'#ffffff' if theme == 'dark' else '#333333'}; }}
        .btn {{ display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; border: none; cursor: pointer; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⚙️ Settings</h1>
            <p>Configure your monitoring preferences</p>
            <a href="/?lang={lang}&theme={theme}" class="btn">← Back to Homepage</a>
        </div>
        
        <div class="settings">
            <form>
                <div class="setting-group">
                    <label for="language">Language:</label>
                    <select id="language" name="language">
                        <option value="en" {'selected' if lang == 'en' else ''}>English</option>
                        <option value="nl" {'selected' if lang == 'nl' else ''}>Nederlands</option>
                    </select>
                </div>
                
                <div class="setting-group">
                    <label for="theme">Theme:</label>
                    <select id="theme" name="theme">
                        <option value="light" {'selected' if theme == 'light' else ''}>Light</option>
                        <option value="dark" {'selected' if theme == 'dark' else ''}>Dark</option>
                    </select>
                </div>
                
                <div class="setting-group">
                    <label for="notifications">Email Notifications:</label>
                    <select id="notifications" name="notifications">
                        <option value="all">All Updates</option>
                        <option value="important">Important Only</option>
                        <option value="none">None</option>
                    </select>
                </div>
                
                <button type="submit" class="btn">Save Settings</button>
            </form>
        </div>
    </div>
</body>
</html>
        """
        
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(settings_html.encode('utf-8'))
    
    def serve_unsubscribe(self, query_params):
        """Serve unsubscribe page"""
        lang = query_params.get('lang', ['en'])[0]
        theme = query_params.get('theme', ['light'])[0]
        token = query_params.get('token', [''])[0]
        
        unsubscribe_html = f"""
<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unsubscribe - DHgate Monitor</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; background: {'#1a1a1a' if theme == 'dark' else '#f5f5f5'}; color: {'#ffffff' if theme == 'dark' else '#333333'}; }}
        .container {{ max-width: 600px; margin: 0 auto; }}
        .header {{ text-align: center; margin-bottom: 40px; }}
        .content {{ background: {'#2a2a2a' if theme == 'dark' else '#ffffff'}; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }}
        .btn {{ display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 5px; }}
        .btn-danger {{ background: #dc3545; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 Unsubscribe</h1>
            <p>Manage your email preferences</p>
            <a href="/?lang={lang}&theme={theme}" class="btn">← Back to Homepage</a>
        </div>
        
        <div class="content">
            <h2>Unsubscribe from Emails</h2>
            <p>Are you sure you want to unsubscribe from our email notifications?</p>
            
            <p><strong>Token:</strong> {token}</p>
            
            <p>This will stop all email notifications from DHgate Monitor.</p>
            
            <button class="btn btn-danger">Unsubscribe</button>
            <a href="/?lang={lang}&theme={theme}" class="btn">Cancel</a>
        </div>
    </div>
</body>
</html>
        """
        
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(unsubscribe_html.encode('utf-8'))

def main():
    PORT = 3000
    
    # Check if port is available
    try:
        with socketserver.TCPServer(("", PORT), DHgateMonitorHandler) as httpd:
            print(f"🚀 DHgate Monitor Local Development Server gestart!")
            print(f"📍 URL: http://localhost:{PORT}")
            print(f"🏠  Hoofdpagina: http://localhost:{PORT}/")
            print(f"📊  Dashboard: http://localhost:{PORT}/dashboard")
            print(f"📰  Newsroom: http://localhost:{PORT}/newsroom")
            print(f"🛠️  Service: http://localhost:{PORT}/service")
            print(f"📞  Contact: http://localhost:{PORT}/contact")
            print(f"🔒  Privacy: http://localhost:{PORT}/privacy")
            print(f"📋  Terms: http://localhost:{PORT}/terms")
            print(f"🗑️  Delete Data: http://localhost:{PORT}/delete-data")
            print(f"🏪  Add Shop: http://localhost:{PORT}/add_shop")
            print(f"⚙️  Settings: http://localhost:{PORT}/settings")
            print(f"📧  Unsubscribe: http://localhost:{PORT}/unsubscribe")
            print(f"⏹️  Stop de server met Ctrl+C")
            
            httpd.serve_forever()
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Poort {PORT} is al in gebruik. Probeer een andere poort of stop andere servers.")
        else:
            print(f"❌ Fout bij starten server: {e}")
    except KeyboardInterrupt:
        print(f"\n⏹️ Server gestopt door gebruiker")

if __name__ == "__main__":
    main()

