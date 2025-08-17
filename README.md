# 🚀 DHgate Monitor

Een moderne, cloud-native applicatie die automatisch DHgate doorzoekt naar nieuwe producten van specifieke verkopers en je hiervan op de hoogte brengt via email.

## 🎯 Overzicht

Deze applicatie helpt je om nieuwe producten te ontdekken zodra ze door jouw gekozen verkopers worden geüpload op DHgate. Volledig geautomatiseerd en draait 100% in de cloud zonder dat je computer aan hoeft te staan.

## ✨ Functies

- **🌩️ Cloud-native**: Draait volledig op Cloudflare Workers + GitHub Actions
- **🎯 Dynamische tags**: Configureer welke producten gedetecteerd worden via web interface
- **📧 Professional emails**: Mooie HTML emails met winter-thema design
- **🤖 Selenium automation**: Echte browser automation voor betrouwbare monitoring
- **📱 Responsive dashboard**: Beheer shops en instellingen via web interface
- **🆓 100% gratis**: Gebruik gratis tiers van Cloudflare en GitHub

## 🏗️ Architectuur

```
┌─────────────────────┐    ┌──────────────────────┐    ┌─────────────────────┐
│   Cloudflare        │    │   GitHub Actions     │    │   Email Service     │
│   Workers           │    │   (Daily 09:00 UTC)  │    │   (SMTP)            │
│                     │    │                      │    │                     │
│ • Web Dashboard     │    │ • Selenium Monitor   │    │ • Professional      │
│ • Shop Management   │    │ • DHgate Scraping    │    │   HTML Templates    │
│ • Tag Management    │    │ • Product Detection  │    │ • New Product       │
│ • Settings          │    │ • Email Sending      │    │   Notifications     │
│ • KV Storage        │    │                      │    │                     │
└─────────────────────┘    └──────────────────────┘    └─────────────────────┘
```

## 📂 Projectstructuur

```
dhgate-monitor/
├── cloudflare_app.js         # Cloudflare Workers web applicatie
├── selenium_monitor.py       # Core monitoring logica (Selenium)
├── run_monitor.py           # GitHub Actions runner
├── update_config_secrets.py # GitHub Secrets configuratie
├── requirements-full.txt    # Python dependencies
├── package.json            # Node.js/Wrangler configuratie
├── wrangler.toml           # Cloudflare Workers configuratie
├── .github/workflows/      # GitHub Actions workflows
└── README.md              # Deze documentatie
```

## 🚀 Deployment

### Live Applicatie
- **Website**: https://dhgate-monitor.com
- **Monitoring**: Dagelijks om 09:00 UTC via GitHub Actions
- **Status**: Volledig operationeel

### Technische Details
- **Frontend**: Cloudflare Workers met embedded HTML/CSS/JS
- **Backend**: Cloudflare KV voor data opslag
- **Monitoring**: GitHub Actions met Ubuntu + Chrome + Selenium
- **Email**: SMTP via Gmail met app-specifieke wachtwoorden

## 📊 Features

### Web Dashboard
- **Shop Management**: Voeg DHgate shops toe voor monitoring
- **Tag Management**: Configureer welke producten gedetecteerd worden
- **Settings**: Email configuratie en monitoring instellingen
- **Status Overview**: Real-time status van alle componenten

### Cloud Monitoring
- **Betrouwbaar**: Echte browser automation via Selenium
- **Schaalbaar**: Draait op GitHub's infrastructure
- **Logs**: Volledige monitoring logs beschikbaar in GitHub Actions
- **Fallback**: Automatische fallback naar default tags bij API problemen

### Email Notificaties
- **Professional Design**: Winter-thema met Raleway font
- **Mobile-friendly**: Responsive HTML emails
- **Product Details**: Titel, URL, afbeelding, en metadata
- **Batch Updates**: Groepeer alle nieuwe producten in één email

## 🔧 Configuratie

### GitHub Secrets
```
SENDER_EMAIL = jouw-email@gmail.com
SENDER_PASSWORD = app-specifiek-wachtwoord  
RECIPIENT_EMAIL = ontvanger@email.com
```

### Tag Management
Ga naar https://dhgate-monitor.com/tags om te configureren welke producten gedetecteerd worden:
- kids, children, youth (default)
- baby, toddler
- of elke andere gewenste tag

## 📈 Monitoring

### GitHub Actions
- **Dagelijkse runs**: Elke dag om 09:00 UTC
- **Manual trigger**: Via GitHub Actions interface
- **Logs**: Volledige output beschikbaar voor 30 dagen
- **Status badges**: Zie laatste run status in repository

### Cloudflare Analytics
- **Real-time metrics**: Via Cloudflare dashboard
- **Performance**: Response times en error rates
- **Usage**: API calls en KV operations

## 🛠️ Development

### Local Development
```bash
# Cloudflare Workers development
npm install
npm run dev

# Python monitoring testing
pip install -r requirements-full.txt
python selenium_monitor.py
```

### Deployment
```bash
# Automatisch via git push
git push origin main

# Handmatig via Wrangler
npm run deploy
```

## 📝 API Endpoints

### Public API
- `GET /api/shops` - Lijst van geregistreerde shops
- `GET /api/tags` - Huidige monitoring tags
- `GET /api/status` - Service status

### Web Interface
- `/` - Dashboard
- `/add_shop` - Shop toevoegen
- `/settings` - Configuratie
- `/tags` - Tag management

## 🔒 Security

- **GitHub Secrets**: Gevoelige data veilig opgeslagen
- **Environment Variables**: Automatische configuratie voor cloud deployment
- **CORS Headers**: Veilige API access
- **Rate Limiting**: Ingebouwde bescherming tegen misbruik

## 📞 Support

Voor vragen of problemen:
- **Issues**: GitHub Issues in deze repository
- **Logs**: Check GitHub Actions voor monitoring logs
- **Status**: https://dhgate-monitor.com/api/status

---

**Status**: ✅ Actief en operationeel  
**Laatste Update**: 2025-08-17  
**Versie**: 3.0.0 (Cloud-native)