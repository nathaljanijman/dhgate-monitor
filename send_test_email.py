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
    # Sample products from both shops
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
            }
        ],
        "shirts": [
            {
                'id': 'test5',
                'title': 'Kids Cotton T-Shirt Summer Collection 2025 Comfortable Fit',
                'link': 'https://www.dhgate.com/product/test-product-5.html',
                'price': '$12.99',
                'found_at': datetime.now().isoformat()
            },
            {
                'id': 'test6',
                'title': 'Youth Basketball Jersey Kids Sports Wear Premium Quality',
                'link': 'https://www.dhgate.com/product/test-product-6.html',
                'price': '$16.75',
                'found_at': datetime.now().isoformat()
            },
            {
                'id': 'test7',
                'title': 'Children Polo Shirt Kids Fashion 2025 School Uniform Style',
                'link': 'https://www.dhgate.com/product/test-product-7.html',
                'price': '$14.50',
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
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0; background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%); font-family: 'Raleway', Arial, sans-serif;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%); min-height: 100vh;">
            <tr>
                <td align="center" style="padding: 40px 20px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; margin: 0 auto; border-radius: 16px; box-shadow: 0 20px 40px rgba(71, 85, 105, 0.1); overflow: hidden;">
                        
                        <!-- Header -->
                        <tr>
                            <td style="background-color: #ffffff; padding: 60px 40px; text-align: center;">
                                <h1 style="margin: 0 0 20px 0; color: #1e40af; font-size: 32px; font-weight: 700; letter-spacing: 2px;">
                                    DHGate monitor
                                </h1>
                                <div style="background-color: #f8fafc; border-left: 4px solid #ff6b35; padding: 20px 30px; margin: 30px auto 0 auto; max-width: 400px; text-align: left;">
                                    <h2 style="margin: 0 0 8px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                                        {total_new} nieuwe kids producten
                                    </h2>
                                    <p style="margin: 0; color: #64748b; font-size: 14px; font-weight: 400;">
                                        Ontdekt op {datetime.now().strftime('%d %B %Y')}
                                    </p>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Products Section -->
                        <tr>
                            <td style="padding: 30px;">"""
    
    for seller_name, products in test_products.items():
        html += f"""
                                <!-- Seller Section -->
                                <div style="margin-bottom: 50px;">
                                    <div style="text-align: center; margin-bottom: 30px;">
                                        <h2 style="margin: 0 0 10px 0; color: #1e3a8a; font-size: 24px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                                            {seller_name}
                                        </h2>
                                        <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #ff6b35, #ff8c00); margin: 0 auto 20px auto; border-radius: 2px;"></div>
                                        <p style="margin: 0; color: #64748b; font-size: 14px; font-weight: 500;">
                                            {len(products)} nieuwe producten ontdekt
                                        </p>
                                    </div>
                                    
                                    <div style="background-color: #ffffff;">"""
        
        for i, product in enumerate(products):
            margin_bottom = "margin-bottom: 25px;" if i < len(products) - 1 else ""
            
            html += f"""
                                        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; {margin_bottom} box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: all 0.3s ease;">
                                            <div style="margin-bottom: 15px;">
                                                <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: #1e293b; line-height: 1.4; font-family: 'Raleway', Arial, sans-serif;">
                                                    {product['title']}
                                                </h3>
                                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                                                    <div style="background: linear-gradient(45deg, #ff6b35, #ff8c00); color: white; padding: 8px 16px; border-radius: 20px; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">
                                                        {product['price'] if product.get('price') else 'Prijs op aanvraag'}
                                                    </div>
                                                    <div style="background-color: #eff6ff; color: #1e40af; padding: 6px 12px; border-radius: 15px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                                        KIDS COLLECTIE
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="text-align: center;">
                                                <a href="{product['link']}" style="display: inline-block; background: linear-gradient(135deg, #1e3a8a, #2563eb); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease; font-family: 'Raleway', Arial, sans-serif;">
                                                    Bekijk Nu
                                                </a>
                                            </div>
                                        </div>"""
        
        html += """
                                    </div>
                                </div>"""
    
    html += f"""
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 40px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                                <div style="margin-bottom: 25px;">
                                    <a href="https://dhgate-monitor.com/add_shop" style="display: inline-block; color: #ff6b35; text-decoration: none; font-weight: 600; margin: 0 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; font-family: 'Raleway', Arial, sans-serif;">
                                        Shop toevoegen
                                    </a>
                                    <span style="color: #cbd5e1; margin: 0 5px; font-size: 16px;">•</span>
                                    <a href="https://dhgate-monitor.com/settings" style="display: inline-block; color: #1e40af; text-decoration: none; font-weight: 600; margin: 0 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; font-family: 'Raleway', Arial, sans-serif;">
                                        Instellingen
                                    </a>
                                </div>
                                <div style="border-top: 1px solid #e2e8f0; padding-top: 25px;">
                                    <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.6; font-family: 'Raleway', Arial, sans-serif;">
                                        <strong style="color: #374151;">DHGATE TENUE MONITOR</strong><br>
                                        Automatisch gegenereerd door Nathalja Nijman<br>
                                        Volgende scan: morgen om 09:00
                                    </p>
                                </div>
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
        subject = "TEST: 6 kids producten gevonden - Meerdere shops"
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