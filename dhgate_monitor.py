#!/usr/bin/env python3
import requests
from bs4 import BeautifulSoup
import json
import time
import smtplib
import hashlib
import os
import schedule
import logging
import re
from datetime import datetime
import email.mime.text
import email.mime.multipart

MimeText = email.mime.text.MIMEText
MimeMultipart = email.mime.multipart.MIMEMultipart

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class DHgateKidsMonitor:
    def __init__(self, config_file='config.json'):
        self.config_file = config_file
        self.data_file = 'product_data.json'
        self.config = self.load_config()
        self.previous_data = self.load_previous_data()
        
        # Verbeterde headers voor Mac/Chrome
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Cache-Control': 'max-age=0'
        }

    def load_config(self):
        if os.path.exists(self.config_file):
            with open(self.config_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        else:
            default_config = {
                "email": {
                    "smtp_server": "smtp.gmail.com",
                    "smtp_port": 587,
                    "sender_email": "jouw_email@gmail.com",
                    "sender_password": "jouw_app_wachtwoord",
                    "recipient_email": "ontvanger@gmail.com"
                },
                "sellers": [
                    {
                        "name": "Jersey Verkoper",
                        "product_url": "https://m.dhgate.com/product/36-ncaa-7-dwayne-haskins-jr-jersey-97-nick/493478194.html",
                        "search_url": "https://www.dhgate.com/wholesale/search.do?act=search&searchkey=kids+jersey"
                    }
                ],
                "schedule": {"time": "09:00"},
                "filters": {"keywords": ["kids"], "case_sensitive": False},
                "max_products_to_check": 50
            }
            with open(self.config_file, 'w', encoding='utf-8') as f:
                json.dump(default_config, f, indent=4, ensure_ascii=False)
            print("⚠️  Config aangemaakt - pas je email gegevens aan!")
            return default_config

    def load_previous_data(self):
        if os.path.exists(self.data_file):
            with open(self.data_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}

    def save_data(self, data):
        with open(self.data_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

    def contains_kids_keyword(self, text):
        if not text:
            return False
        keywords = self.config['filters']['keywords']
        search_text = text.lower()
        return any(keyword.lower() in search_text for keyword in keywords)

    def get_seller_products(self, seller_config):
        try:
            search_url = seller_config.get('search_url', 'https://www.dhgate.com/wholesale/search.do?act=search&searchkey=kids')
            print(f"Zoeken naar kids producten op: {search_url}")
            
            # Probeer meerdere keren met verschillende timeouts
            for attempt in range(3):
                try:
                    timeout = 30 + (attempt * 15)  # 30, 45, 60 seconden
                    print(f"Poging {attempt + 1}/3 (timeout: {timeout}s)")
                    
                    # Voeg delay toe tussen requests
                    if attempt > 0:
                        time.sleep(5)
                    
                    response = requests.get(
                        search_url, 
                        headers=self.headers, 
                        timeout=timeout,
                        verify=True
                    )
                    response.raise_for_status()
                    
                    # Success! Break uit de retry loop
                    break
                    
                except (requests.exceptions.Timeout, requests.exceptions.ConnectTimeout):
                    print(f"Timeout bij poging {attempt + 1}")
                    if attempt == 2:  # Laatste poging
                        raise
                    continue
                except requests.exceptions.RequestException as e:
                    print(f"Request error bij poging {attempt + 1}: {e}")
                    if attempt == 2:
                        raise
                    continue
            
            soup = BeautifulSoup(response.text, 'html.parser')
            products = []
            
            print("HTML response ontvangen, aan het parsen...")
            
            # Verbeterde product selectors voor DHgate
            product_selectors = [
                'a[href*="/product/"]',  # Alle product links
                '.search-item a',
                '.pro-item a',
                '.list-item a'
            ]
            
            product_links = []
            for selector in product_selectors:
                links = soup.select(selector)
                if links:
                    product_links.extend(links)
                    print(f"Gevonden {len(links)} links met selector: {selector}")
            
            # Remove duplicates gebaseerd op href
            seen_hrefs = set()
            unique_links = []
            for link in product_links:
                href = link.get('href', '')
                if href and href not in seen_hrefs and '/product/' in href:
                    seen_hrefs.add(href)
                    unique_links.append(link)
            
            print(f"Totaal {len(unique_links)} unieke product links gevonden")
            
            for i, link_elem in enumerate(unique_links[:self.config['max_products_to_check']]):
                try:
                    # Titel ophalen uit verschillende bronnen
                    title = (
                        link_elem.get('title', '') or 
                        link_elem.get_text(strip=True) or
                        ''
                    )
                    
                    # Ook proberen titel te vinden in parent elementen
                    if not title:
                        parent = link_elem.parent
                        if parent:
                            title_elem = parent.find(['h1', 'h2', 'h3', 'h4', 'span', 'div'])
                            if title_elem:
                                title = title_elem.get_text(strip=True)
                    
                    if not title:
                        continue
                        
                    link = link_elem.get('href', '')
                    if link.startswith('/'):
                        link = 'https://www.dhgate.com' + link
                    elif link.startswith('//'):
                        link = 'https:' + link
                    
                    # Check of titel kids bevat
                    if self.contains_kids_keyword(title) and link:
                        product_id = hashlib.md5(link.encode()).hexdigest()
                        
                        product = {
                            'id': product_id,
                            'title': title,
                            'link': link,
                            'found_at': datetime.now().isoformat()
                        }
                        
                        products.append(product)
                        print(f"Kids product #{len(products)}: {title[:50]}...")
                        
                except Exception as e:
                    print(f"Fout bij verwerken product {i}: {e}")
                    continue
            
            print(f"✅ Gevonden {len(products)} kids producten van {len(unique_links)} totale producten")
            return products
            
        except Exception as e:
            print(f"❌ Fout bij ophalen producten: {e}")
            return []

    def check_for_new_products(self):
        all_new_products = {}
        
        for seller in self.config['sellers']:
            seller_name = seller['name']
            print(f"\n🔍 Controleren verkoper: {seller_name}")
            
            current_products = self.get_seller_products(seller)
            
            if not current_products:
                print(f"⚠️  Geen kids producten gevonden voor {seller_name}")
                continue
            
            previous_products = self.previous_data.get(seller_name, {})
            previous_ids = set(previous_products.keys())
            current_ids = {p['id']: p for p in current_products}
            
            new_product_ids = set(current_ids.keys()) - previous_ids
            
            if new_product_ids:
                new_products = [current_ids[pid] for pid in new_product_ids]
                all_new_products[seller_name] = new_products
                print(f"🎉 Gevonden {len(new_products)} nieuwe kids producten!")
                
                for product in new_products:
                    print(f"  ✨ {product['title'][:60]}...")
            else:
                print(f"ℹ️  Geen nieuwe kids producten voor {seller_name}")
            
            self.previous_data[seller_name] = current_ids
        
        self.save_data(self.previous_data)
        
        if all_new_products:
            self.send_notification(all_new_products)
        
        return all_new_products

    def send_notification(self, new_products):
        try:
            total_new = sum(len(products) for products in new_products.values())
            subject = f"👶 {total_new} Nieuwe Kids Producten - {datetime.now().strftime('%d-%m-%Y')}"
            
            html_content = self.create_email_html(new_products)
            
            msg = MimeMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = self.config['email']['sender_email']
            msg['To'] = self.config['email']['recipient_email']
            
            html_part = MimeText(html_content, 'html', 'utf-8')
            msg.attach(html_part)
            
            print("📧 Versturen email...")
            
            with smtplib.SMTP(self.config['email']['smtp_server'], self.config['email']['smtp_port']) as server:
                server.starttls()
                server.login(self.config['email']['sender_email'], self.config['email']['sender_password'])
                server.send_message(msg)
            
            print("✅ Email succesvol verzonden!")
            
        except Exception as e:
            print(f"❌ Fout bij versturen email: {e}")

    def create_email_html(self, new_products):
        total_new = sum(len(products) for products in new_products.values())
        
        html = f"""
        <html>
        <body style="font-family: Arial, sans-serif; margin: 20px; background: #f8f9fa;">
            <div style="max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px;">
                <h1 style="color: #e74c3c; text-align: center;">👶 Nieuwe Kids Producten!</h1>
                <div style="background: #ecf0f1; padding: 15px; border-radius: 5px; text-align: center; margin-bottom: 20px;">
                    <h3>🎉 {total_new} nieuwe kids producten gevonden</h3>
                    <p>Check uitgevoerd om {datetime.now().strftime('%d-%m-%Y om %H:%M')}</p>
                </div>
        """
        
        for seller_name, products in new_products.items():
            html += f"""
                <div style="margin-bottom: 30px; border: 2px solid #3498db; padding: 20px; border-radius: 8px;">
                    <h2 style="background: #3498db; color: white; padding: 10px; margin: -20px -20px 15px -20px; border-radius: 6px 6px 0 0;">
                        🏪 {seller_name}
                    </h2>
                    <p><strong>✨ {len(products)} nieuwe kids producten gevonden</strong></p>
            """
            
            for product in products:
                html += f"""
                <div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #e74c3c;">
                    <h3>{product['title']} <span style="background: #e74c3c; color: white; padding: 3px 8px; border-radius: 12px; font-size: 12px;">KIDS</span></h3>
                    <a href="{product['link']}" style="background: #3498db; color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">🛒 Bekijk Product</a>
                    <p style="color: #7f8c8d; font-size: 0.9em; margin-top: 10px;">Gevonden op: {datetime.fromisoformat(product['found_at']).strftime('%d-%m-%Y om %H:%M')}</p>
                </div>
                """
            
            html += "</div>"
        
        html += """
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1; color: #7f8c8d;">
                    <p><em>🤖 Deze melding is automatisch gegenereerd door DHgate Kids Monitor</em></p>
                    <p>Volgende check: morgen om 09:00 uur</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        return html

    def run_check(self):
        print("\n=== DHgate Kids Monitor Check Gestart ===")
        try:
            new_products = self.check_for_new_products()
            if new_products:
                total_new = sum(len(products) for products in new_products.values())
                print(f"\n🎉 Totaal {total_new} nieuwe kids producten gevonden!")
            else:
                print("\nℹ️  Geen nieuwe kids producten gevonden")
        except Exception as e:
            print(f"\n❌ Fout tijdens check: {e}")
        print("=== DHgate Kids Monitor Check Voltooid ===\n")

    def start_daily_monitoring(self):
        scheduled_time = self.config['schedule']['time']
        print(f"🕘 Monitor gestart! Dagelijkse check om {scheduled_time}")
        
        schedule.every().day.at(scheduled_time).do(self.run_check)
        print("🚀 Uitvoeren van eerste check...")
        self.run_check()
        
        print(f"⏰ Monitor actief - volgende check morgen om {scheduled_time}")
        while True:
            schedule.run_pending()
            time.sleep(60)

def main():
    monitor = DHgateKidsMonitor()
    
    print("🎯 DHgate Kids Product Monitor")
    print("==============================")
    print("Specifiek voor kids producten van jouw geselecteerde verkopers")
    print()
    print("1. Eenmalige check uitvoeren")
    print("2. Dagelijks monitoren starten (09:00)")
    print("3. Configuratie tonen")
    
    choice = input("\nKies een optie (1-3): ").strip()
    
    if choice == "1":
        monitor.run_check()
    elif choice == "2":
        monitor.start_daily_monitoring()
    elif choice == "3":
        print(f"\n📋 Huidige configuratie ({monitor.config_file}):")
        print(json.dumps(monitor.config, indent=2, ensure_ascii=False))
        print("\n⚠️  Vergeet niet je email gegevens in te vullen!")
    else:
        print("❌ Ongeldige keuze!")

if __name__ == "__main__":
    main()
