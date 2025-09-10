# 🚀 DHgate Monitor - Staffel-Marge Calculator

Een geavanceerde calculator voor het berekenen van marges op basis van staffelprijzen, kosten en verkoopprijzen. Perfect voor e-commerce ondernemers die inkopen via DHgate, Alibaba en AliExpress.

## ✨ Features

### 🎯 Core Functionaliteiten
- **Staffelprijzen Management**: Dynamische tabel met CRUD operaties
- **Kostenmodel**: Vaste, variabele en percentage-gebaseerde kosten
- **Real-time Berekeningen**: Automatische marge berekening bij elke wijziging
- **Break-even Analyse**: Berekening van het break-even punt
- **URL Scraping**: Automatische invoer van productdata (DHgate, Alibaba, AliExpress)

### 📊 Visualisatie & Analyse
- **Interactieve Grafieken**: Marge % en € over verschillende hoeveelheden
- **Resultaten Dashboard**: Overzicht van alle berekeningen
- **Quantity Selector**: Slider en quick-select knoppen voor hoeveelheden
- **Responsive Design**: Mobiel-vriendelijk met touch gestures

### 📤 Export & Sharing
- **CSV Export**: Download resultaten voor Excel/Google Sheets
- **PDF Export**: Professionele rapporten (komt in V2)
- **Deelbare Links**: Share berekeningen zonder login
- **Project Samenvatting**: Overzicht van alle metrics

## 🛠️ Technische Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: TailwindCSS + Custom Design System
- **State Management**: Zustand
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🚀 Installatie & Setup

### Vereisten
- Node.js 18+ 
- npm of yarn

### Stappen
```bash
# Clone repository
git clone <repository-url>
cd staffel-calculator

# Installeer dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:5173
```

## 📱 Gebruik

### 1. Project Setup
- Geef je project een naam
- Kies valuta (EUR, USD, GBP)
- Voer verkoopprijs per stuk in

### 2. Staffelprijzen
- Voeg staffelprijzen toe (min/max hoeveelheid + prijs)
- Bewerk bestaande staffels
- Valideer dat er geen gaten of overlap zijn

### 3. Kosten Invoeren
- **Per stuk**: Kosten die per eenheid worden toegevoegd
- **Per batch**: Vaste kosten per bestelling
- **Percentage**: Kosten als % van verkoopprijs

### 4. Resultaten Bekijken
- Bekijk marges per hoeveelheid
- Analyseer break-even punt
- Gebruik interactieve grafieken

### 5. Export & Share
- Download CSV voor verdere analyse
- Genereer deelbare links
- Bekijk project samenvatting

## 🎨 Design System

### Kleuren
- **Primary**: Blue (#3B82F6), Purple (#8B5CF6)
- **Accents**: Orange (#F59E0B), Green (#10B981)
- **Backgrounds**: Dark theme met verschillende niveaus
- **Text**: High contrast voor leesbaarheid

### Typografie
- **Font**: Raleway (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Hierarchy**: Duidelijke heading en body text

### Componenten
- **Cards**: Consistent border radius en shadows
- **Buttons**: Primary, secondary en interactive states
- **Inputs**: Focus states en validatie feedback
- **Tables**: Responsive grid layouts

## 🔧 Development

### Project Structuur
```
src/
├── components/          # React componenten
│   ├── Calculator.tsx  # Hoofdcomponent
│   ├── URLInput.tsx    # URL scraping modal
│   ├── StaffelEditor.tsx # Staffelprijzen editor
│   ├── CostsEditor.tsx # Kosten editor
│   ├── ResultsView.tsx # Resultaten & grafieken
│   └── ExportPanel.tsx # Export functionaliteit
├── store/              # State management
│   └── calculatorStore.ts # Zustand store
├── types/              # TypeScript interfaces
│   └── index.ts        # Type definities
├── utils/              # Utility functies
│   └── calculations.ts # Berekening logica
└── App.tsx             # Hoofdapp component
```

### Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint check
```

## 📈 Roadmap

### V1 (Huidig) ✅
- [x] Basis calculator functionaliteit
- [x] Staffelprijzen management
- [x] Kostenmodel
- [x] Real-time berekeningen
- [x] Basis grafieken
- [x] CSV export

### V2 (2-3 maanden)
- [ ] URL scraping voor DHgate
- [ ] Valuta API integratie
- [ ] Deelbare project links
- [ ] PDF export

### V3 (3-6 maanden)
- [ ] Ondersteuning meerdere marketplaces
- [ ] User accounts + database
- [ ] Scenario vergelijking
- [ ] AI insights

## 🧪 Testing

### Test Data
De applicatie bevat mock data voor testing:
- Voorbeeld staffelprijzen
- Standaard kostenposten
- Mock DHgate scraping

### Validatie
- Staffelprijzen validatie (geen gaten/overlap)
- Kosten input validatie
- Break-even berekening validatie

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run preview
```

### Cloudflare Pages
```bash
npm run build
# Upload dist/ folder naar Cloudflare Pages
```

## 🤝 Bijdragen

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je wijzigingen (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📄 Licentie

Dit project is onderdeel van DHgate Monitor en is eigendom van [Company Name].

## 📞 Support

Voor vragen of ondersteuning:
- Email: support@dhgatemonitor.com
- Issues: GitHub Issues
- Documentatie: [Link naar docs]

---

**Gemaakt met ❤️ voor e-commerce ondernemers**