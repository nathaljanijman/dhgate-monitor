#!/usr/bin/env python3
import json
import smtplib
from datetime import datetime
import email.mime.text
import email.mime.multipart

MimeText = email.mime.text.MIMEText
MimeMultipart = email.mime.multipart.MIMEMultipart

def test_email_functionality():
    """Test de email functionaliteit met mock data"""
    
    # Laad config
    try:
        with open('config.json', 'r', encoding='utf-8') as f:
            config = json.load(f)
    except FileNotFoundError:
        print("❌ config.json niet gevonden! Run eerst het hoofdscript.")
        return
    
    # Mock kids producten data
    mock_products = {
        "Jersey Verkoper": [
            {
                "id": "test123",
                "title": "Kids Football Jersey - Team Colors",
                "link": "https://www.dhgate.com/product/test/123.html",
                "found_at": datetime.now().isoformat()
            },
            {
                "id": "test456", 
                "title": "Youth Soccer Kit - Kids Size",
                "link": "https://www.dhgate.com/product/test/456.html",
                "found_at": datetime.now().isoformat()
            }
        ]
    }
    
    print("📧 Testen email functionaliteit met mock data...")
    print(f"📤 Versturen naar: {config['email']['recipient_email']}")
    
    try:
        # Email samenstellen
        total_new = sum(len(products) for products in mock_products.values())
        subject = f"🧪 TEST - {total_new} Kids Producten Gevonden - {datetime.now().strftime('%d-%m-%Y %H:%M')}"
        
        html_content = create_test_email_html(mock_products)
        
        msg = MimeMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = config['email']['sender_email']
        msg['To'] = config['email']['recipient_email']
        
        html_part = MimeText(html_content, 'html', 'utf-8')
        msg.attach(html_part)
        
        # Email versturen
        with smtplib.SMTP(config['email']['smtp_server'], config['email']['smtp_port']) as server:
            server.starttls()
            server.login(config['email']['sender_email'], config['email']['sender_password'])
            server.send_message(msg)
        
        print("✅ TEST EMAIL SUCCESVOL VERZONDEN!")
        print("📱 Check je inbox voor de test email met mock kids producten.")
        print("🎯 Als je deze email ontvangt, werkt de email functionaliteit perfect!")
        
    except Exception as e:
        print(f"❌ Fout bij versturen test email: {e}")
        
        # Specifieke Gmail errors
        if "Authentication failed" in str(e):
            print("🔑 Check je Gmail app password - mogelijk verkeerd ingevoerd")
        elif "SMTPAuthenticationError" in str(e):
            print("🔐 Gmail authenticatie fout - controleer email en app password")
        elif "SMTPConnectError" in str(e):
            print("🌐 Verbindingsprobleem met Gmail server")

def create_test_email_html(mock_products):
    """Maak test HTML email met nieuwe professionele styling"""
    total_new = sum(len(products) for products in mock_products.values())
    
    html = f"""
    <!DOCTYPE html>
    <html lang="nl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DHgate Kids Monitor - TEST EMAIL</title>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Raleway', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f6f9; padding: 30px 0;">
            <tr>
                <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
                        
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 40px 30px; text-align: center;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 300; letter-spacing: 1px;">
                                    🧪 TEST EMAIL
                                </h1>
                                <p style="margin: 10px 0 0 0; color: #ffe8e8; font-size: 16px; opacity: 0.9;">
                                    DHgate Kids Monitor
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Test Banner -->
                        <tr>
                            <td style="background-color: #e8f5e8; padding: 25px 30px; border-bottom: 1px solid #e9ecef;">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                    <tr>
                                        <td style="text-align: center;">
                                            <div style="display: inline-block; background: linear-gradient(45deg, #28a745, #20c997); color: white; padding: 15px 25px; border-radius: 25px; font-size: 18px; font-weight: 600;">
                                                ✅ Email Test Succesvol
                                            </div>
                                            <p style="margin: 15px 0 5px 0; color: #6c757d; font-size: 14px;">
                                                {total_new} mock producten ter demonstratie
                                            </p>
                                            <p style="margin: 0; color: #6c757d; font-size: 14px;">
                                                Test uitgevoerd op {datetime.now().strftime('%d %B %Y om %H:%M')}
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Products Section -->
                        <tr>
                            <td style="padding: 30px;">"""
    
    for seller_name, products in mock_products.items():
        html += f"""
                                <!-- Seller Section -->
                                <div style="margin-bottom: 35px;">
                                    <div style="background: linear-gradient(90deg, #ff6b6b, #ee5a24); color: white; padding: 15px 20px; border-radius: 8px 8px 0 0; margin-bottom: 0;">
                                        <h2 style="margin: 0; font-size: 20px; font-weight: 500;">
                                            {seller_name} (TEST DATA)
                                        </h2>
                                        <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;">
                                            {len(products)} test producten
                                        </p>
                                    </div>
                                    
                                    <div style="border: 1px solid #dee2e6; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden;">"""
        
        for i, product in enumerate(products):
            border_top = "border-top: 1px solid #f8f9fa;" if i > 0 else ""
            
            html += f"""
                                        <div style="padding: 20px; background-color: #ffffff; {border_top}">
                                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                <tr>
                                                    <td style="vertical-align: top; width: 70%;">
                                                        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #212529; line-height: 1.4;">
                                                            {product['title']}
                                                        </h3>
                                                        <p style="margin: 5px 0 0 0; color: #868e96; font-size: 12px;">
                                                            Mock data - gegenereerd: {datetime.fromisoformat(product['found_at']).strftime('%d-%m-%Y %H:%M')}
                                                        </p>
                                                    </td>
                                                    <td style="vertical-align: middle; text-align: right; width: 30%;">
                                                        <a href="{product['link']}" style="display: inline-block; background: linear-gradient(135deg, #007bff, #6610f2); color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">
                                                            Test Link
                                                        </a>
                                                        <div style="margin-top: 8px;">
                                                            <span style="background-color: #e7f3ff; color: #0066cc; padding: 4px 8px; border-radius: 12px; font-size: 10px; font-weight: 600; text-transform: uppercase; margin-right: 4px;">
                                                                KIDS
                                                            </span>
                                                            <span style="background-color: #fff3cd; color: #856404; padding: 4px 8px; border-radius: 12px; font-size: 10px; font-weight: 600; text-transform: uppercase;">
                                                                TEST
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
                        
                        <!-- Success Banner -->
                        <tr>
                            <td style="background: linear-gradient(45deg, #ffc107, #fd7e14); padding: 25px 30px; text-align: center;">
                                <h3 style="margin: 0 0 8px 0; color: white; font-size: 18px; font-weight: 500;">
                                    🎯 Email Systeem Operationeel
                                </h3>
                                <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                                    Test succesvol - nu ready voor echte DHgate monitoring!
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
                                <p style="margin: 0; color: #6c757d; font-size: 12px; line-height: 1.5;">
                                    🧪 Test email gegenereerd door DHgate Kids Monitor<br>
                                    Als je deze email ontvangt, werkt het systeem perfect!
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

def main():
    print("🧪 DHgate Kids Monitor - Email Test")
    print("===================================")
    print("Deze test controleert of je email configuratie werkt")
    print("met mock data, zodat we weten of het probleem bij DHgate ligt.")
    print()
    
    choice = input("Wil je een test email versturen? (y/n): ").strip().lower()
    
    if choice in ['y', 'yes', 'ja', 'j']:
        test_email_functionality()
    else:
        print("Test geannuleerd.")

if __name__ == "__main__":
    main()