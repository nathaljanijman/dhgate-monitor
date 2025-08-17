# 🤖 GitHub Actions Cloud Selenium Setup

## ✅ Voordelen
- 🆓 **100% Gratis** - 2000 minuten/maand GitHub Actions
- 🤖 **Echte Selenium** - Ubuntu VM met Chrome browser  
- 🛡️ **Antibot bypass** - Werkt perfect met DHgate
- ⏰ **Dagelijkse monitoring** - Automatisch om 09:00 UTC
- 📧 **Email notificaties** - Professional winter templates
- 📊 **Logs & monitoring** - Ingebouwd in GitHub interface

## 🔧 Setup (Eenmalig)

### Stap 1: GitHub Secrets toevoegen
1. Ga naar: https://github.com/nathaljanijman/dhgate-monitor
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret** - Voeg toe:

```
SENDER_EMAIL = nathaljanijman@gmail.com
SENDER_PASSWORD = ndox avht yqcp maak  
RECIPIENT_EMAIL = nathaljanijman@hotmail.com
```

### Stap 2: Test workflow
1. **Actions** tab → **DHgate Monitor - Daily Selenium Check**
2. **Run workflow** → **Run workflow**
3. Controleer logs voor succesvolle monitoring

## ⏰ Automatische Schedule
- **Dagelijks om 09:00 UTC** (10:00 CET winter, 11:00 CEST zomer)
- **Geen computer vereist** - Draait volledig in GitHub cloud
- **Email notificaties** bij nieuwe kids producten

## 📊 Monitoring & Logs
- **GitHub Actions**: Real-time logs van elke run
- **Email artifacts**: Logs opgeslagen 30 dagen
- **Status badge**: Zie laatste run status in repository

## 🛠️ Beheer
```bash
# Workflow handmatig triggeren
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/nathaljanijman/dhgate-monitor/actions/workflows/daily-monitoring.yml/dispatches \
  -d '{"ref":"main"}'

# Workflow status checken  
curl https://api.github.com/repos/nathaljanijman/dhgate-monitor/actions/workflows
```

## 🎯 Wat er gebeurt bij elke run:
1. 🐍 **Python & Chrome** installeren op Ubuntu VM
2. 📦 **Dependencies** installeren (Selenium, etc.)
3. 🔐 **Email credentials** laden van GitHub Secrets
4. 🤖 **Selenium monitoring** - DHgate shops scannen
5. 📧 **Email versturen** bij nieuwe kids producten
6. 📊 **Logs uploaden** voor 30 dagen opslag

## ✅ Resultaat:
**Je hebt nu 100% gratis, altijd-beschikbare DHgate monitoring zonder dat je computer aan hoeft te staan!**