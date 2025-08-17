#!/usr/bin/env python3
import json
import time
import smtplib
import hashlib
import os
import schedule
import random
import logging
from datetime import datetime
import email.mime.text
import email.mime.multipart

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import TimeoutException, NoSuchElementException, WebDriverException
from webdriver_manager.chrome import ChromeDriverManager

MimeText = email.mime.text.MIMEText
MimeMultipart = email.mime.multipart.MIMEMultipart

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class DHgateSeleniumMonitor:
    def __init__(self, config_file='config.json'):
        self.config_file = config_file
        self.data_file = 'product_data.json'
        self.config = self.load_config()
        self.previous_data = self.load_previous_data()

    def load_config(self):
        if os.path.exists(self.config_file):
            with open(self.config_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        else:
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
                        "name": "Kids Jersey Verkoper",
                        "search_url": "https://www.dhgate.com/wholesale/kids+jersey.html"
                    }
                ],
                "schedule": {"time": "09:00"},
                "filters": {"keywords": ["kids"], "case_sensitive": False},
                "max_products_to_check": 20,
                "selenium": {
                    "headless": True,
                    "wait_time": 10,
                    "page_load_timeout": 30,
                    "min_delay": 2,
                    "max_delay": 8,
                    "scroll_pause": 3
                }
            }
            with open(self.config_file, 'w', encoding='utf-8') as f:
                json.dump(default_config, f, indent=4, ensure_ascii=False)
            print("⚠️  Selenium config aangemaakt!")
            return default_config

    def load_previous_data(self):
        if os.path.exists(self.data_file):
            with open(self.data_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}

    def save_data(self, data):
        with open(self.data_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

    def create_driver(self):
        try:
            chrome_options = Options()
            
            selenium_config = self.config.get('selenium', {'headless': True, 'wait_time': 10, 'page_load_timeout': 30, 'min_delay': 2, 'max_delay': 8, 'scroll_pause': 3})
            
            if selenium_config.get('headless', True):
                chrome_options.add_argument('--headless')
            
            # Enhanced stealth options
            chrome_options.add_argument('--no-sandbox')
            chrome_options.add_argument('--disable-dev-shm-usage')
            chrome_options.add_argument('--disable-gpu')
            chrome_options.add_argument('--disable-blink-features=AutomationControlled')
            chrome_options.add_argument('--disable-extensions')
            chrome_options.add_argument('--disable-plugins-discovery')
            chrome_options.add_argument('--window-size=1920,1080')
            
            # Rotate user agents
            user_agents = [
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            ]
            selected_ua = random.choice(user_agents)
            chrome_options.add_argument(f'--user-agent={selected_ua}')
            
            chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
            chrome_options.add_experimental_option('useAutomationExtension', False)
            chrome_options.add_experimental_option("prefs", {
                "profile.default_content_setting_values.notifications": 2
            })
            
            print("🔄 Downloaden ChromeDriver...")
            service = Service(ChromeDriverManager().install())
            driver = webdriver.Chrome(service=service, options=chrome_options)
            
            # Enhanced stealth scripts
            driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            driver.execute_cdp_cmd('Page.addScriptToEvaluateOnNewDocument', {
                'source': '''
                    Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
                    Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]});
                    Object.defineProperty(navigator, 'languages', {get: () => ['en-US', 'en']});
                    window.chrome = {runtime: {}};
                '''
            })
            
            driver.set_page_load_timeout(selenium_config.get('page_load_timeout', 30))
            
            print(f"✅ Chrome WebDriver gestart met UA: {selected_ua[:50]}...")
            return driver
            
        except Exception as e:
            print(f"❌ Fout bij starten WebDriver: {e}")
            return None

    def contains_kids_keyword(self, text):
        if not text:
            return False
        keywords = self.config['filters']['keywords']
        search_text = text.lower()
        return any(keyword.lower() in search_text for keyword in keywords)
    
    def human_delay(self, min_time=None, max_time=None):
        """Simulate human-like delays"""
        selenium_config = self.config.get('selenium', {'min_delay': 2, 'max_delay': 8})
        min_delay = min_time or selenium_config.get('min_delay', 2)
        max_delay = max_time or selenium_config.get('max_delay', 8)
        delay = random.uniform(min_delay, max_delay)
        time.sleep(delay)
        return delay
    
    def simulate_human_behavior(self, driver):
        """Simulate human-like browsing behavior"""
        try:
            # Random scrolling
            scroll_height = random.randint(300, 800)
            driver.execute_script(f"window.scrollTo(0, {scroll_height});")
            time.sleep(random.uniform(1, 3))
            
            # Scroll back up a bit
            scroll_back = random.randint(50, 200)
            driver.execute_script(f"window.scrollBy(0, -{scroll_back});")
            time.sleep(random.uniform(0.5, 2))
            
            # Random mouse movement (if not headless)
            selenium_config = self.config.get('selenium', {'headless': True})
            if not selenium_config.get('headless', True):
                actions = ActionChains(driver)
                x = random.randint(100, 800)
                y = random.randint(100, 600)
                actions.move_by_offset(x, y).perform()
                
        except Exception as e:
            logging.debug(f"Human behavior simulation error: {e}")
    
    def check_for_blocks(self, driver):
        """Check if we've been blocked or hit a CAPTCHA"""
        try:
            page_source = driver.page_source.lower()
            page_title = driver.title.lower()
            
            # More specific block/captcha indicators
            block_indicators = [
                'please complete the security check',
                'verify you are human',
                'access denied',
                'forbidden',
                'blocked',
                'rate limit exceeded',
                'too many requests',
                'cloudflare'
            ]
            
            # Check both page source and title
            full_text = page_source + ' ' + page_title
            
            for indicator in block_indicators:
                if indicator in full_text:
                    logging.warning(f"Block detected: {indicator}")
                    return True
            
            # Check for CAPTCHA forms specifically
            if 'captcha' in page_source and ('form' in page_source or 'input' in page_source):
                logging.warning("CAPTCHA form detected")
                return True
                
            return False
            
        except Exception as e:
            logging.debug(f"Error in block detection: {e}")
            return False

    def get_seller_products_selenium(self, seller_config):
        driver = None
        try:
            driver = self.create_driver()
            if not driver:
                return []

            search_url = seller_config.get('search_url', 'https://www.dhgate.com/wholesale/kids.html')
            print(f"🔍 Selenium: Laden van {search_url}")
            
            # Human-like delay before loading page
            self.human_delay(1, 3)
            
            driver.get(search_url)
            
            # Check for blocks early
            if self.check_for_blocks(driver):
                print("⚠️ Mogelijk geblokkeerd door website")
                return []
            
            selenium_config = self.config.get('selenium', {'wait_time': 10})
            wait = WebDriverWait(driver, selenium_config.get('wait_time', 10))
            print("⏳ Wachten tot producten geladen zijn...")
            
            # Variable wait time
            initial_wait = random.uniform(3, 7)
            time.sleep(initial_wait)
            
            # Simulate human browsing behavior
            self.simulate_human_behavior(driver)
            
            # Enhanced product selectors with fallbacks
            product_selectors = [
                'a[href*="/product/"]',
                '.search-item a',
                '.pro-item a', 
                '.list-item a',
                'a[title]',
                '.product-item a',
                '.item-link',
                '[data-product-id] a',
                '.goods-item a'
            ]
            
            products = []
            found_links = set()
            
            for i, selector in enumerate(product_selectors):
                try:
                    # Add delay between selector attempts
                    if i > 0:
                        self.human_delay(1, 3)
                    
                    elements = driver.find_elements(By.CSS_SELECTOR, selector)
                    print(f"📦 Gevonden {len(elements)} elementen met selector: {selector}")
                    
                    if not elements:
                        continue
                    
                    # Process elements with human-like delays
                    for j, element in enumerate(elements[:self.config['max_products_to_check']]):
                        try:
                            # Small delay between elements
                            if j > 0 and j % 5 == 0:
                                self.human_delay(0.5, 1.5)
                            
                            link = element.get_attribute('href') or ''
                            title = element.get_attribute('title') or element.text.strip()
                            
                            # Try alternative title sources
                            if not title:
                                try:
                                    title_elem = element.find_element(By.CSS_SELECTOR, '[title], .title, .product-title, h3, h4')
                                    title = title_elem.get_attribute('title') or title_elem.text.strip()
                                except:
                                    pass
                            
                            if not link or '/product/' not in link or link in found_links:
                                continue
                                
                            found_links.add(link)
                            
                            if title and self.contains_kids_keyword(title):
                                # Extract core product ID from URL to avoid duplicates from dynamic parameters
                                import re
                                core_link = link.split('?')[0].split('#')[0]  # Remove query params and anchors
                                product_match = re.search(r'/product/[^/]+/(\d+)\.html', core_link)
                                if product_match:
                                    product_id = f"dhgate_{product_match.group(1)}"
                                else:
                                    product_id = hashlib.md5(core_link.encode()).hexdigest()
                                
                                # Enhanced price extraction
                                price = ""
                                price_selectors = [
                                    '.price',
                                    '.pro-price',
                                    '[class*="price"]',
                                    '.cost',
                                    '.amount',
                                    '.money'
                                ]
                                
                                for price_sel in price_selectors:
                                    try:
                                        price_element = element.find_element(By.CSS_SELECTOR, price_sel)
                                        price = price_element.text.strip()
                                        if price:
                                            break
                                    except:
                                        continue
                                
                                product = {
                                    'id': product_id,
                                    'title': title,
                                    'link': link,
                                    'price': price,
                                    'found_at': datetime.now().isoformat(),
                                    'selector_used': selector
                                }
                                
                                products.append(product)
                                print(f"👶 Kids product #{len(products)}: {title[:50]}...")
                                
                        except Exception as e:
                            logging.debug(f"Error processing element {j}: {e}")
                            continue
                    
                    # If we found products with this selector, no need to try others
                    if products:
                        print(f"✅ Succesvol met selector: {selector}")
                        break
                        
                except Exception as e:
                    print(f"⚠️ Fout met selector {selector}: {e}")
                    continue
            
            # Final human behavior simulation
            if products:
                self.simulate_human_behavior(driver)
            
            print(f"✅ Selenium: {len(products)} kids producten gevonden")
            return products
            
        except WebDriverException as e:
            print(f"❌ WebDriver fout: {e}")
            return []
        except Exception as e:
            print(f"❌ Selenium fout: {e}")
            return []
            
        finally:
            if driver:
                try:
                    driver.quit()
                    print("🔚 Chrome WebDriver afgesloten")
                except:
                    pass

    def check_for_new_products(self):
        all_new_products = {}
        
        for seller in self.config['sellers']:
            seller_name = seller['name']
            print(f"\n🏪 Controleren verkoper: {seller_name}")
            
            current_products = self.get_seller_products_selenium(seller)
            
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
            
            # Create dynamic subject with seller names
            seller_names = list(new_products.keys())
            if len(seller_names) == 1:
                seller_text = seller_names[0]
            elif len(seller_names) == 2:
                seller_text = f"{seller_names[0]} en {seller_names[1]}"
            else:
                seller_text = f"{', '.join(seller_names[:-1])} en {seller_names[-1]}"
            
            subject = f"{total_new} nieuwe producten geüpload door {seller_text}"
            
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
        <!DOCTYPE html>
        <html lang="nl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>DHgate Kids Monitor - Nieuwe Producten</title>
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
        
        for seller_name, products in new_products.items():
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
                                    <a href="http://localhost:5001/add_shop" style="display: inline-block; color: #ff6b35; text-decoration: none; font-weight: 600; margin: 0 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; font-family: 'Raleway', Arial, sans-serif;">
                                        Shop toevoegen
                                    </a>
                                    <span style="color: #cbd5e1; margin: 0 5px; font-size: 16px;">•</span>
                                    <a href="http://localhost:5001/settings" style="display: inline-block; color: #1e40af; text-decoration: none; font-weight: 600; margin: 0 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; font-family: 'Raleway', Arial, sans-serif;">
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

    def run_check(self):
        print("\n🤖 === DHgate Selenium Monitor Check ===")
        try:
            new_products = self.check_for_new_products()
            if new_products:
                total_new = sum(len(products) for products in new_products.values())
                print(f"\n🎉 Totaal {total_new} nieuwe kids producten gevonden!")
            else:
                print("\nℹ️  Geen nieuwe kids producten gevonden")
        except Exception as e:
            print(f"\n❌ Fout tijdens check: {e}")
        print("=== Selenium Monitor Check Voltooid ===\n")

    def start_daily_monitoring(self):
        scheduled_time = self.config['schedule']['time']
        print(f"🕘 Selenium Monitor gestart! Dagelijkse check om {scheduled_time}")
        
        schedule.every().day.at(scheduled_time).do(self.run_check)
        print("🚀 Uitvoeren van eerste check...")
        self.run_check()
        
        print(f"⏰ Monitor actief - volgende check morgen om {scheduled_time}")
        while True:
            schedule.run_pending()
            time.sleep(60)

def main():
    monitor = DHgateSeleniumMonitor()
    
    print("🤖 DHgate Kids Monitor - Selenium Versie")
    print("========================================")
    print("100% gratis browser automatisering")
    print()
    print("1. Eenmalige check uitvoeren")
    print("2. Dagelijks monitoren starten (09:00)")
    print("3. Configuratie tonen")
    print("4. Test Selenium setup")
    
    choice = input("\nKies een optie (1-4): ").strip()
    
    if choice == "1":
        monitor.run_check()
    elif choice == "2":
        monitor.start_daily_monitoring()
    elif choice == "3":
        print(f"\n📋 Selenium configuratie:")
        print(json.dumps(monitor.config, indent=2, ensure_ascii=False))
    elif choice == "4":
        print("🧪 Testen Selenium setup...")
        driver = monitor.create_driver()
        if driver:
            print("✅ Selenium werkt!")
            driver.quit()
        else:
            print("❌ Selenium probleem.")
    else:
        print("❌ Ongeldige keuze!")

if __name__ == "__main__":
    main()