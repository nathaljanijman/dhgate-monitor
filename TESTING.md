# 🧪 DHgate Monitor - Test Automation System

> **Comprehensive Customer Journey Testing & Quality Assurance Framework**

## 📋 Overzicht

Het DHgate Monitor platform beschikt over een geavanceerd geautomatiseerd testsysteem dat volledige customer journey tests uitvoert. Dit systeem dekt alle aspecten van gebruikersinteractie, van inschrijving tot dashboard toegang, met uitgebreide validatie van veiligheid, prestaties en functionaliteit.

## 🔄 Dagelijkse Geautomatiseerde Testing

### **Planning & Uitvoering**
- **Schema**: Automatisch elke dag om 09:00 UTC via Cloudflare cron triggers
- **Dekking**: 8 uitgebreide testscenario's inclusief signup flow, validatie, beveiliging en prestaties
- **Rapportage**: Resultaten worden automatisch geüpload naar het dashboard en dagelijks via email verzonden
- **Opslag**: Testresultaten opgeslagen in zowel KV storage (7-30 dagen) als D1 database (lange-termijn analytics)

### **Automatische Functies**
- **Test Uitvoering**: Volledige customer journey simulatie
- **Result Upload**: Automatische upload naar dashboard voor real-time monitoring  
- **Email Rapportage**: Dagelijkse samenvattingen met testresultaten
- **Error Handling**: Robuuste foutafhandeling met graceful fallbacks
- **Performance Tracking**: Responstijd monitoring en benchmarking

## 🖥️ Handmatige Test Uitvoering

### **Via Terminal Commando's**

```bash
# Basis customer journey tests lokaal uitvoeren
npm run test:customer-journey

# Tests tegen productie omgeving uitvoeren
npm run test:customer-journey:production

# Tests tegen development omgeving uitvoeren  
npm run test:customer-journey:dev

# Met aangepaste configuratie
TEST_EMAIL="custom@test.com" VERBOSE=true npm run test:customer-journey

# Geavanceerde configuratie opties
ENVIRONMENT=production TEST_EMAIL="qa@test.com" VERBOSE=true TIMEOUT=45000 npm run test:customer-journey
```

### **Beschikbare Environment Variables**

| Variable | Beschrijving | Default Waarde | Voorbeelden |
|----------|--------------|----------------|-------------|
| `ENVIRONMENT` | Doel omgeving | `development` | `production`, `development` |
| `TEST_EMAIL` | Test email adres | `manual-test-{timestamp}@dhgate-monitor.com` | `qa@example.com` |
| `VERBOSE` | Uitgebreide logging | `false` | `true`, `false`, `1`, `0` |
| `TIMEOUT` | Request timeout (ms) | `30000` | `45000`, `60000` |

### **Via GitHub Actions Workflow**

1. **Navigatie**: Ga naar de **Actions** tab in GitHub repository
2. **Workflow Selectie**: Kies **"Manual Customer Journey Test"** workflow
3. **Uitvoering Starten**: Klik **"Run workflow"** 
4. **Configuratie Opties**:
   - **Environment**: `production` of `development`
   - **Test Email**: Aangepast test email adres
   - **Verbose Output**: Schakel gedetailleerde logging in
5. **Monitoring**: Bekijk resultaten in de workflow samenvatting

### **GitHub Actions Features**
- **Parameter Configuratie**: Web-based interface voor test parameters
- **Artifact Upload**: Automatische opslag van test resultaten en logs
- **Detailed Summary**: Uitgebreide rapportage in GitHub interface
- **Multi-Environment**: Support voor zowel productie als development
- **Error Reporting**: Comprehensive error logging en stack traces

## 📊 Test Dekking & Scenario's

### **Uitgebreide Test Suite**

Onze comprehensive test suite dekt alle kritieke aspecten van het platform:

| Test Scenario | Beschrijving | Validatie Criteria | Timeout |
|---------------|--------------|-------------------|---------|
| **Health Check** | Platform beschikbaarheid | Response tijd < 2s, HTTP 200 status | 5s |
| **Homepage Load** | Hoofdpagina functionaliteit | Content loading, performance metrics | 10s |
| **Widget API** | Signup widget endpoint | API response, widget HTML generatie | 8s |
| **User Signup** | Complete inschrijvingsflow | Form validatie, token generatie, database storage | 15s |
| **Dashboard Access** | Gebruiker dashboard functionaliteit | Authenticatie, data weergave, toegangscontrole | 12s |
| **Security Testing** | XSS en injection bescherming | Input sanitization, script tag filtering | 10s |
| **Form Validation** | Input validatie logica | Error handling, edge cases, field requirements | 8s |
| **Performance** | Responstijden en optimalisatie | Sub-5s response times, resource loading | 15s |

### **Beveiligings Validatie**

Speciale aandacht voor security testing:

- **XSS Protection**: Validatie van script tag sanitization
- **Input Sanitization**: Controle op malicious input filtering  
- **HTTPS Enforcement**: SSL/TLS validatie
- **Authentication**: Token-based access control testing
- **Data Privacy**: GDPR compliance en data handling validation

### **Performance Benchmarks**

- **Response Times**: < 5 seconden voor alle endpoints
- **API Performance**: < 2 seconden voor widget generation
- **Database Queries**: < 1 seconde voor user lookups
- **Error Recovery**: < 30 seconden voor fallback mechanisms

## 📈 Test Result Analytics

### **Real-time Dashboard Monitoring**
- **Live Results**: Bekijk laatste testresultaten op [dhgate-monitor.com/admin/dashboard](https://dhgate-monitor.com/admin/dashboard)
- **Historical Trends**: 30-dagen test geschiedenis met trend analyse
- **Success Metrics**: Success rate tracking en performance benchmarks
- **Alert System**: Automatische notificaties bij test failures of performance degradatie

### **Data Opslag & Retentie**

#### **KV Storage** (Short-term)
- **Retention**: 7-30 dagen afhankelijk van data type
- **Access**: Snelle dashboard weergave
- **Keys**: `latest_test_results`, `test_history_{date}`

#### **D1 Database** (Long-term)  
- **Retention**: Permanent voor analytics
- **Schema**: Gestructureerde opslag met indexing
- **Analytics**: Trend analysis en performance monitoring

### **Rapportage Formaten**

#### **Console Output**
```bash
🧪 Starting Comprehensive Customer Journey Tests
   Environment: production
   Base URL: https://dhgate-monitor.com
   Test Email: qa-test@dhgate-monitor.com

✅ PASSED: Health Check (245ms)
✅ PASSED: Homepage Load (834ms)
✅ PASSED: Widget API Endpoint (456ms)
✅ PASSED: User Signup Flow (2.1s)
✅ PASSED: Dashboard Access (987ms)
✅ PASSED: API Security - XSS Protection (623ms)
✅ PASSED: Form Validation (445ms)
✅ PASSED: Performance Test (756ms)

📊 TEST SUMMARY
==================================================
Total Tests: 8
Passed: 8
Failed: 0
Duration: 6842ms
Success Rate: 100%
🎉 All tests passed!
```

#### **JSON Export Format**
```json
{
  "timestamp": "2025-09-14T10:30:00.000Z",
  "environment": "production",
  "testEmail": "qa-test@dhgate-monitor.com",
  "tests": [
    {
      "name": "Health Check",
      "status": "PASSED",
      "duration": 245,
      "result": {
        "status": 200,
        "healthy": true
      }
    }
  ],
  "summary": {
    "total": 8,
    "passed": 8,
    "failed": 0,
    "duration": 6842,
    "successRate": 100
  }
}
```

## ⚙️ Technische Implementatie

### **Test Runner Architectuur**

#### **ManualTestRunner Class**
- **Multi-environment Support**: Automatische configuratie voor prod/dev
- **Worker Management**: Cloudflare Worker lifecycle management
- **Request Handling**: HTTP client met timeout en retry logic
- **Result Processing**: JSON formatting en file export
- **Error Recovery**: Graceful handling van test failures

#### **Test Execution Flow**
1. **Environment Detection**: Productie vs development configuratie
2. **Worker Startup**: Cloudflare Worker initialisatie (development only)
3. **Test Sequencing**: Sequentiële uitvoering van 8 testscenario's  
4. **Result Collection**: Real-time logging en result aggregation
5. **Data Export**: JSON file generatie voor analyse
6. **Cleanup**: Worker shutdown en resource cleanup

### **Integration Points**

#### **Cloudflare Workers**
- **Scheduled Events**: Cron trigger voor dagelijkse tests (09:00 UTC)
- **KV Storage**: Test result persistence en caching
- **D1 Database**: Long-term analytics en trend data
- **Edge Computing**: Global performance testing

#### **Email Integration**
- **Daily Reports**: Testresultaten in dagelijkse monitoring emails
- **Alert System**: Failure notifications via SMTP
- **HTML Templates**: Professional email formatting met test metrics

## 🛠️ Development & Debugging

### **Local Development Setup**

```bash
# Dependencies installeren
npm install

# Development server starten
npm run dev

# Tests uitvoeren tegen lokale server  
npm run test:customer-journey:dev

# Met debug logging
VERBOSE=true npm run test:customer-journey:dev
```

### **Debug Features**

- **Verbose Logging**: Uitgebreide console output met timestamps
- **Request/Response Logging**: Complete HTTP transaction details
- **Performance Metrics**: Individual test timing en bottleneck identification
- **Error Stack Traces**: Detailed error information voor troubleshooting

### **Common Troubleshooting**

#### **Worker Startup Issues**
```bash
# Controleer Wrangler installatie
npx wrangler --version

# Authenticatie controleren  
npx wrangler auth whoami

# Development server handmatig starten
npx wrangler dev --local --port 3000
```

#### **Test Failures**
```bash
# Uitgebreide logging inschakelen
VERBOSE=true npm run test:customer-journey

# Timeout verhogen voor langzame verbindingen
TIMEOUT=60000 npm run test:customer-journey

# Specifiek test email gebruiken
TEST_EMAIL="debug@test.com" npm run test:customer-journey
```

## 🚀 Deployment & CI/CD

### **Productie Deployment**
- **Automatic**: Tests worden automatisch uitgevoerd na elke deployment
- **Manual Trigger**: GitHub Actions workflow voor on-demand testing
- **Environment Validation**: Pre-deployment smoke tests

### **CI/CD Integration**  
- **GitHub Actions**: Automated workflow voor test execution
- **Artifact Storage**: Test results bewaard voor 30 dagen
- **Status Reporting**: Integration met GitHub status checks

### **Monitoring & Alerting**
- **Real-time Monitoring**: Dashboard integration voor live status
- **Email Alerts**: Automatische notificaties bij failures  
- **Performance Tracking**: Trend analysis en capacity planning

---

## 📚 Gerelateerde Documentatie

- **[README.md](./README.md)** - Algemene platform documentatie
- **[API_REFERENCE.md](./docs/API_REFERENCE.md)** - API endpoint documentatie  
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Deployment instructies
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Technische architectuur

---

**🤖 Dit TESTING.md bestand is automatisch gegenereerd als onderdeel van het DHgate Monitor test automation systeem.**

*Voor support of vragen over het test systeem: [support@dhgate-monitor.com](mailto:support@dhgate-monitor.com)*