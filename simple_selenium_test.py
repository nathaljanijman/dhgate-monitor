#!/usr/bin/env python3
try:
    print("🔍 Importeren Selenium...")
    from selenium import webdriver
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.chrome.service import Service
    from webdriver_manager.chrome import ChromeDriverManager
    
    print("✅ Imports succesvol!")
    
    print("🔄 Starten Chrome WebDriver...")
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    
    # Correcte manier om service en options te combineren
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    print("✅ WebDriver gestart!")
    
    print("🌐 Testen webpagina laden...")
    driver.get("https://www.google.com")
    print(f"✅ Pagina titel: {driver.title}")
    
    driver.quit()
    print("🎉 Selenium test succesvol!")
    
except Exception as e:
    print(f"❌ Fout: {e}")