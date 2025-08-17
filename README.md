# 👶 DHgate Kids Monitor

Een Python-applicatie die automatisch DHgate doorzoekt naar nieuwe kinderproducten van specifieke verkopers en je hiervan op de hoogte brengt via email.

## 🎯 Doel

Deze applicatie helpt je om nieuwe kids/kinderproducten te ontdekken zodra ze door jouw gekozen verkopers worden geüpload op DHgate. Perfect voor mensen die snel willen zijn bij het vinden van nieuwe kinderkleding en -producten.

## ✨ Functies

- **Automatische monitoring**: Dagelijkse controle om 09:00 (configureerbaar)
- **Slimme filtering**: Zoekt specifiek naar producten met "kids" gerelateerde keywords
- **Email notificaties**: Krijg mooie HTML emails met alle nieuwe producten
- **Dubbele implementatie**: Zowel requests-based als Selenium-based versie
- **Verkoper tracking**: Monitor meerdere verkopers tegelijkelijk
- **Data opslag**: Houdt bij welke producten al eerder zijn gevonden

## 📂 Projectstructuur

```
dhgate-monitor/
├── dhgate_monitor.py       # Hoofd monitor (requests-based)
├── selenium_monitor.py     # Selenium-based monitor (robuuster)
├── config.json            # Email en verkoper configuratie
├── product_data.json       # Opgeslagen productdata
├── email_test.py           # Test email functionaliteit
├── simple_test.py          # Basis test script
├── simple_selenium_test.py # Selenium test script
└── README.md              # Deze documentatie
```

## 🚀 Installatie

### Vereisten

- Python 3.7+
- Chrome browser (voor Selenium versie)

### Stap 1: Clone repository

```bash
git clone https://github.com/nathaljanijman/dhgate-monitor.git
cd dhgate-monitor
```

### Stap 2: Installeer dependencies

```bash
pip install requests beautifulsoup4 schedule selenium webdriver-manager
```

### Stap 3: Configuratie

Bij eerste gebruik wordt automatisch een `config.json` bestand aangemaakt. Pas dit aan:

```json
{
  "email": {
    "smtp_server": "smtp.gmail.com",
    "smtp_port": 587,
    "sender_email": "jouw_email@gmail.com",
    "sender_password": "jouw_app_wachtwoord",
    "recipient_email": "ontvanger@gmail.com"
  },
  "sellers": [
    {
      "name": "Verkoper Naam",
      "search_url": "https://www.dhgate.com/store/12345678"
    }
  ],
  "schedule": {"time": "09:00"},
  "filters": {"keywords": ["kids"], "case_sensitive": false},
  "max_products_to_check": 50
}
```

### ⚠️ Gmail App Wachtwoord

Voor Gmail moet je een **App Wachtwoord** aanmaken:

1. Ga naar [Google Account beveiligingsinstellingen](https://myaccount.google.com/security)
2. Zet 2-factor authenticatie aan (vereist)
3. Zoek naar "App wachtwoorden"
4. Maak een nieuw app wachtwoord voor "Mail"
5. Gebruik dit wachtwoord in de config

## 🎮 Gebruik

### Basis Monitor (Requests)

```bash
python dhgate_monitor.py
```

**Menu opties:**
1. **Eenmalige check** - Test de monitor direct
2. **Dagelijks monitoren** - Start continue monitoring
3. **Configuratie tonen** - Bekijk huidige instellingen

### Selenium Monitor (Robuuster)

```bash
python selenium_monitor.py
```

**Extra functies:**
- Beter omgaan met JavaScript-heavy websites
- Human-like browsing gedrag
- CAPTCHA/block detectie
- Meer geavanceerde product extractie

**Menu opties:**
1. **Eenmalige check** - Test de monitor direct
2. **Dagelijks monitoren** - Start continue monitoring  
3. **Configuratie tonen** - Bekijk huidige instellingen
4. **Test Selenium** - Controleer of Chrome driver werkt

## 📧 Email Notificaties

Wanneer nieuwe kids producten worden gevonden, krijg je een professioneel opgemaakte HTML email met:

- **Product details**: Titel, prijs (indien beschikbaar), link
- **Verkoper informatie**: Per verkoper gegroepeerd
- **Tijdstempel**: Wanneer het product is gevonden
- **Direct links**: Klik om het product te bekijken

### Email Voorbeeld

```
📧 Onderwerp: "2 nieuwe producten geüpload door spider_jerseys"

✨ Inhoud:
- Overzichtelijke tabel met alle nieuwe producten
- Directe links naar de DHgate productpagina's
- Kids label voor gemakkelijke herkenning
- Moderne, mobiel-vriendelijke opmaak
```

## ⚙️ Configuratie Opties

### Verkopers Configureren

Voeg verkopers toe aan `config.json`:

```json
"sellers": [
  {
    "name": "Verkoper A",
    "search_url": "https://www.dhgate.com/store/12345678"
  },
  {
    "name": "Verkoper B", 
    "search_url": "https://www.dhgate.com/wholesale/kids+jersey.html"
  }
]
```

### Filter Instellingen

```json
"filters": {
  "keywords": ["kids", "child", "youth"],
  "case_sensitive": false
},
"max_products_to_check": 50
```

### Schedule Aanpassen

```json
"schedule": {"time": "14:30"}  // Andere tijd instellen
```

### Selenium Instellingen

```json
"selenium": {
  "headless": true,           // Browser zichtbaar of niet
  "wait_time": 10,           // Maximale wachttijd
  "page_load_timeout": 30,   // Pagina laadtijd
  "min_delay": 2,            // Minimale vertraging
  "max_delay": 8,            // Maximale vertraging
  "scroll_pause": 3          // Scroll pauze
}
```

## 🔧 Test Scripts

### Email Test

```bash
python email_test.py
```

Test of email configuratie werkt zonder producten te zoeken.

### Basis Functionaliteit Test

```bash
python simple_test.py
```

Test basis DHgate connectiviteit.

### Selenium Test

```bash
python simple_selenium_test.py
```

Test Selenium setup en Chrome driver.

## 📊 Data Opslag

Het systeem slaat productdata op in `product_data.json`:

```json
{
  "verkoper_naam": {
    "product_id_1": {
      "id": "product_id_1",
      "title": "Kids Nike Jersey",
      "link": "https://...",
      "price": "$19.99",
      "found_at": "2024-01-15T09:00:00"
    }
  }
}
```

## 🔍 Hoe het werkt

1. **Product Zoeken**: Monitor doorzoekt verkoper pagina's of zoekresultaten
2. **Kids Filtering**: Alleen producten met "kids" keywords worden opgeslagen
3. **Duplicaat Detectie**: Vergelijkt met eerder gevonden producten
4. **Email Verzenden**: Bij nieuwe producten wordt email notificatie verstuurd
5. **Data Update**: Nieuwe producten worden opgeslagen voor volgende run

## 🚨 Troubleshooting

### Geen producten gevonden

- Controleer of verkoper URL's correct zijn
- Test met `simple_test.py` voor basis connectiviteit
- Probeer Selenium versie voor moeilijke websites

### Email werkt niet

- Controleer Gmail app wachtwoord instellingen
- Test met `email_test.py`
- Controleer firewall/antivirus instellingen

### Selenium problemen

- Controleer of Chrome browser geïnstalleerd is
- Run `selenium_monitor.py` optie 4 voor setup test
- Chrome driver wordt automatisch gedownload

### Te veel CAPTCHA's

- Gebruik `headless: false` in selenium config
- Verhoog delays in selenium instellingen
- Gebruik VPN of ander IP adres

## 🔄 Automatisering

### Windows (Task Scheduler)

1. Open Task Scheduler
2. Maak nieuwe Basic Task
3. Trigger: Daily 09:00
4. Action: Start programma
5. Program: `python`
6. Arguments: `C:\pad\naar\dhgate_monitor.py`

### macOS/Linux (Crontab)

```bash
# Edit crontab
crontab -e

# Voeg toe (dagelijks om 09:00):
0 9 * * * /usr/bin/python3 /pad/naar/dhgate_monitor.py
```

### Docker (Optioneel)

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["python", "dhgate_monitor.py"]
```

## 📈 Uitbreidingsmogelijkheden

- **Meer platforms**: AliExpress, Taobao monitoring
- **Price tracking**: Prijsveranderingen bijhouden
- **Telegram bot**: Notificaties via Telegram
- **Web interface**: GUI voor configuratie
- **Machine learning**: Verbeterde product classificatie

## 🤝 Bijdragen

Voel je vrij om issues te rapporteren of pull requests in te dienen op GitHub.

## 📜 Licentie

Dit project is ontwikkeld voor persoonlijk gebruik. Gebruik op eigen risico en respecteer DHgate's robots.txt en terms of service.

## 👩‍💻 Auteur

**Nathalja Nijman**
- GitHub: [@nathaljanijman](https://github.com/nathaljanijman)
- Email: nathaljanijman@gmail.com

---

*Ontwikkeld met ❤️ voor alle ouders die de beste deals willen voor hun kinderen!*