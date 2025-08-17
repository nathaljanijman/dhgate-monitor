#!/usr/bin/env python3
"""
Test email sender with found products
"""
import json
import smtplib
from datetime import datetime
import email.mime.text
import email.mime.multipart

MimeText = email.mime.text.MIMEText
MimeMultipart = email.mime.multipart.MIMEMultipart

def load_config():
    with open('config.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def create_test_email_html():
    # Sample products from the recent run
    test_products = {
        "spider_jerseys": [
            {
                'id': 'test1',
                'title': 'XXXL 4XL 2025 2026 El Salvador National Team Soccer Jersey Kids',
                'link': 'https://www.dhgate.com/product/test-product-1.html',
                'price': '$19.99',
                'found_at': datetime.now().isoformat()
            },
            {
                'id': 'test2', 
                'title': 'XXXL 4XL 25 26 Albania National Men\'s Football Team Kids Jersey',
                'link': 'https://www.dhgate.com/product/test-product-2.html',
                'price': '$18.50',
                'found_at': datetime.now().isoformat()
            },
            {
                'id': 'test3',
                'title': 'XXXL 4XL 2025 2026 VfL WoLfSbUrG soccer jerseys Kids Size Available',
                'link': 'https://www.dhgate.com/product/test-product-3.html', 
                'price': '$22.00',
                'found_at': datetime.now().isoformat()
            },
            {
                'id': 'test4',
                'title': '24 25 Stade Brestois 29 Soccer Jerseys 2024 2025 Kids Youth',
                'link': 'https://www.dhgate.com/product/test-product-4.html',
                'price': '$20.75',
                'found_at': datetime.now().isoformat()
            }
        ]
    }
    
    total_new = sum(len(products) for products in test_products.values())
    
    html = f"""
    <!DOCTYPE html>
    <html lang="nl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DHgate Kids Monitor - Test Email</title>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Raleway', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f6f9; padding: 30px 0;">
            <tr>
                <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
                        
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 300; letter-spacing: 1px;">
                                    DHGate tenue monitor
                                </h1>
                                <p style="margin: 10px 0 0 0; color: #e8eaf6; font-size: 16px; opacity: 0.9;">
                                    TEST EMAIL - Email format controle
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Summary Banner -->
                        <tr>
                            <td style="background-color: #f8f9fa; padding: 25px 30px; border-bottom: 1px solid #e9ecef;">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                    <tr>
                                        <td style="text-align: center;">
                                            <div style="display: inline-block; background: linear-gradient(45deg, #28a745, #20c997); color: white; padding: 15px 25px; border-radius: 25px; font-size: 18px; font-weight: 600;">
                                                {total_new} kids producten (TEST)
                                            </div>
                                            <p style="margin: 15px 0 0 0; color: #6c757d; font-size: 14px;">
                                                Test email verstuurd op {datetime.now().strftime('%d %B %Y om %H:%M')}
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Products Section -->
                        <tr>
                            <td style="padding: 30px;">"""
    
    for seller_name, products in test_products.items():
        html += f"""
                                <!-- Seller Section -->
                                <div style="margin-bottom: 35px;">
                                    <div style="background: linear-gradient(90deg, #6c757d, #495057); color: white; padding: 15px 20px; border-radius: 8px 8px 0 0; margin-bottom: 0;">
                                        <h2 style="margin: 0; font-size: 20px; font-weight: 500;">
                                            {seller_name}
                                        </h2>
                                        <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;">
                                            {len(products)} test producten
                                        </p>
                                    </div>
                                    
                                    <div style="border: 1px solid #dee2e6; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden;">"""
        
        for i, product in enumerate(products):
            border_top = "border-top: 1px solid #f8f9fa;" if i > 0 else ""
            price_display = f'<div style="color: #28a745; font-weight: 600; font-size: 16px; margin: 8px 0;">{product["price"]}</div>' if product.get('price') else ''
            
            html += f"""
                                        <div style="padding: 20px; background-color: #ffffff; {border_top}">
                                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                <tr>
                                                    <td style="vertical-align: top; width: 70%;">
                                                        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #212529; line-height: 1.4;">
                                                            {product['title']}
                                                        </h3>
                                                        {price_display}
                                                        <p style="margin: 5px 0 0 0; color: #868e96; font-size: 12px;">
                                                            Test product #{i+1}
                                                        </p>
                                                    </td>
                                                    <td style="vertical-align: middle; text-align: right; width: 30%;">
                                                        <a href="{product['link']}" style="display: inline-block; background: linear-gradient(135deg, #007bff, #6610f2); color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500; transition: all 0.3s ease;">
                                                            Bekijk Product
                                                        </a>
                                                        <div style="margin-top: 8px;">
                                                            <span style="background-color: #e7f3ff; color: #0066cc; padding: 4px 8px; border-radius: 12px; font-size: 10px; font-weight: 600; text-transform: uppercase;">
                                                                KIDS
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>"""
        
        html += """
                                    </div>
                                </div>"""
    
    html += f"""
                            </td>
                        </tr>
                        
                        <!-- Action Buttons -->
                        <tr>
                            <td style="background-color: #e9ecef; padding: 25px 30px; text-align: center; border-top: 1px solid #dee2e6;">
                                <h6 style="margin: 0 0 15px 0; color: #495057; font-size: 16px;">
                                    🎯 Beheer je monitor
                                </h6>
                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                    <tr>
                                        <td style="text-align: center; padding: 0 10px;">
                                            <a href="http://localhost:5001/add_shop" style="display: inline-block; background: linear-gradient(45deg, #28a745, #20c997); color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500; margin: 5px;">
                                                <span style="margin-right: 5px;">🏪</span> Voeg Shop Toe
                                            </a>
                                        </td>
                                        <td style="text-align: center; padding: 0 10px;">
                                            <a href="http://localhost:5001/settings" style="display: inline-block; background: linear-gradient(45deg, #007bff, #6610f2); color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500; margin: 5px;">
                                                <span style="margin-right: 5px;">⚙️</span> Pas Zoekterm Aan
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                                <div style="margin-top: 15px;">
                                    <p style="margin: 0; color: #6c757d; font-size: 12px;">
                                        📱 Scan QR code op dashboard voor mobiele toegang
                                    </p>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
                                <p style="margin: 0; color: #6c757d; font-size: 12px; line-height: 1.5;">
                                    TEST EMAIL - Automatisch gegenereerd door Nathalja Nijman<br>
                                    Monitor actief - volgende scan morgen om 09:00
                                </p>
                            </td>
                        </tr>
                        
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """
    
    return html

def send_test_email():
    config = load_config()
    
    try:
        subject = "TEST: 4 kids producten gevonden - Format controle"
        html_content = create_test_email_html()
        
        msg = MimeMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = config['email']['sender_email']
        msg['To'] = config['email']['recipient_email']
        
        html_part = MimeText(html_content, 'html', 'utf-8')
        msg.attach(html_part)
        
        print("📧 Versturen test email...")
        
        with smtplib.SMTP(config['email']['smtp_server'], config['email']['smtp_port']) as server:
            server.starttls()
            server.login(config['email']['sender_email'], config['email']['sender_password'])
            server.send_message(msg)
        
        print("✅ Test email succesvol verzonden!")
        print(f"📬 Verzonden naar: {config['email']['recipient_email']}")
        
    except Exception as e:
        print(f"❌ Fout bij versturen test email: {e}")

if __name__ == "__main__":
    print("🧪 DHgate Monitor - Test Email Verzender")
    print("=========================================")
    send_test_email()