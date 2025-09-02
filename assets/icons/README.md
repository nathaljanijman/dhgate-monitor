# DHGate Monitor Icons

> Professional icon font library for DHGate Monitor brand system

## 🚀 Quick Start

### Installation

**Option 1: Download & Copy**
```bash
# Download the dist folder and copy to your project
cp -r dhgate-monitor-icons-dist/ your-project/src/assets/icons/
```

**Option 2: CDN (when available)**
```html
<link rel="stylesheet" href="https://cdn.dhgate-monitor.com/icons/v1/dhgate-monitor-icons.css">
```

**Option 3: npm (when published)**
```bash
npm install @dhgate-monitor/icons
```

### Basic Usage

```html
<!-- Include the CSS -->
<link rel="stylesheet" href="path/to/dhgate-monitor-icons.css">

<!-- Use icons -->
<i class="dhg dhg-search-1"></i>
<i class="dhg dhg-user-4 dhg-lg"></i>
<i class="dhg dhg--accent dhg-heart"></i>
```

## 📐 Icon Sizes

- `dhg-sm` - 16px (small)
- `dhg-md` - 24px (medium)
- `dhg-lg` - 32px (large)  
- `dhg-xl` - 48px (extra large)
- `dhg-tile` - 80px (decorative)

## 🎨 Color Variants

- Default: DHGate Monitor primary blue
- `dhg--accent` - Orange accent color
- `dhg--muted` - Muted gray color

## 🌓 Dark Mode

```html
<html data-theme="dark">
  <!-- Icons automatically adapt -->
</html>
```

## 📊 Available Icons: 606

Categories include:
- E-commerce & Shopping
- User Interface 
- Social Media & Brands
- Business & Finance
- Technology & Development
- Communication
- Navigation

## 💡 Examples

```html
<!-- E-commerce -->
<button class="btn-primary">
  <i class="dhg dhg-cart-1"></i> Add to Cart
</button>

<!-- Search -->
<div class="search-box">
  <i class="dhg dhg-search-1"></i>
  <input type="text" placeholder="Search...">
</div>

<!-- User actions -->
<a href="/profile">
  <i class="dhg dhg-user-4"></i> Profile
</a>
```

## 🔧 Framework Integration

### React
```jsx
import './assets/icons/dhgate-monitor-icons.css';

function App() {
  return <i className="dhg dhg-heart dhg-lg" />;
}
```

### Vue
```vue
<template>
  <i class="dhg dhg-star-fat dhg--accent"></i>
</template>
```

### Angular
```typescript
// Add to angular.json styles array
"src/assets/icons/dhgate-monitor-icons.css"
```

## 📱 Responsive

Icons automatically adapt to DHGate Monitor breakpoints:
- Mobile: ≤768px
- Tablet: 769px-1024px  
- Desktop: ≥1025px

## ⚡ Performance

- Optimized font files (WOFF2/WOFF/TTF/SVG)
- CSS custom properties for theming
- Smooth transitions and animations
- Minimal bundle size impact

## 🎯 DHGate Monitor Specific

Perfect for:
- E-commerce dashboards
- Product monitoring tools
- Analytics interfaces
- User management systems
- Mobile applications

## 📞 Support

- Documentation: See IMPLEMENTATION-GUIDE.md
- Issues: Contact DHGate Monitor team
- Version: 1.0.0 (DHGate Monitor Edition)

---

Based on Lineicons Free v5.0 | Customized for DHGate Monitor Brand System