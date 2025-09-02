# DHgate Monitor Design System

## 🎨 Brand Colors

### Primary Brand Colors
```css
--primary-blue: #2563EB        /* Main DHgate Monitor blue */
--primary-blue-hover: #1D4ED8   /* Hover/active state */
--primary-blue-light: #60A5FA   /* Light variant for backgrounds */
--accent-orange: #EA580C        /* Secondary accent color */
--accent-orange-hover: #C2410C  /* Orange hover state */
--accent-orange-light: #FB923C  /* Light orange variant */
```

### Usage Guidelines
- **Primary Blue**: Main CTAs, links, focus states, brand elements
- **Orange Accent**: Secondary actions, highlights, warnings
- **Light variants**: Subtle backgrounds, hover states on cards

## 📝 Typography

### Light Theme Text Colors
```css
--text-primary: #111827     /* Main headings, body text (16.37:1 contrast) */
--text-secondary: #374151   /* Subheadings, secondary text (9.22:1 contrast) */
--text-muted: #4B5563       /* Meta text, captions (6.38:1 contrast) */
--text-white: #FFFFFF       /* Text on dark backgrounds */
```

### Dark Theme Text Colors
```css
--text-primary: #F8FAFC     /* Main text on dark backgrounds */
--text-secondary: #CBD5E1   /* Secondary text on dark */
--text-muted: #94A3B8       /* Muted text on dark */
--text-white: #FFFFFF       /* Always white */
```

### Typography Scale
- **Hero Titles**: 3.5rem (56px), font-weight: 800
- **Section Titles**: 2.5rem (40px), font-weight: 700
- **Card Titles**: 1.6rem (25px), font-weight: 700
- **Body Text**: 1rem (16px), font-weight: 400
- **Small Text**: 0.9rem (14px), font-weight: 500

## 🏗️ Layout & Spacing

### Container Widths
```css
max-width: 1400px    /* Main container */
max-width: 1200px    /* Content sections */
max-width: 800px     /* Forms and narrow content */
max-width: 600px     /* Text blocks, descriptions */
```

### Spacing Scale
```css
--spacing-xs: 0.5rem   /* 8px - tight spacing */
--spacing-sm: 1rem     /* 16px - small gaps */
--spacing-md: 2rem     /* 32px - standard spacing */
--spacing-lg: 3rem     /* 48px - section spacing */
--spacing-xl: 4rem     /* 64px - large section gaps */
```

## 🎯 Background System

### Light Theme Backgrounds
```css
--bg-primary: #FFFFFF
--bg-secondary: #F8FAFC
--bg-gradient: linear-gradient(135deg, #FEFEFE 0%, #F8FAFC 50%, #F1F5F9 100%)
--bg-hero: linear-gradient(135deg, #2563EB 0%, #EA580C 100%)
```

### Dark Theme Backgrounds
```css
--bg-primary: #0F172A        /* Deep slate */
--bg-secondary: #1E293B      /* Medium slate */
--bg-gradient: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)
--bg-hero: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)
```

## 🃏 Card System

### Card Backgrounds & Borders
```css
/* Light Theme */
--card-bg: #FFFFFF
--card-border: #E5E7EB
--card-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
--card-shadow-hover: 0 20px 60px rgba(0, 0, 0, 0.15)

/* Dark Theme */
--card-bg: #1E293B
--card-border: #334155
--card-shadow: 0 4px 6px rgba(0, 0, 0, 0.3)
```

### Card Specifications
- **Border Radius**: 20px (large cards), 16px (medium), 8px (small)
- **Padding**: 3rem 2.5rem (large), 2rem (medium), 1rem (small)
- **Hover Transform**: translateY(-10px) scale(1.02)
- **Transition**: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)

## 🔗 Interactive Elements

### Buttons
```css
/* Primary Button */
background: linear-gradient(135deg, #2563EB, #1D4ED8)
padding: 0.75rem 1.5rem
border-radius: 12px
font-weight: 600
transition: all 0.3s ease

/* Secondary Button */
background: transparent
border: 2px solid #2563EB
color: #2563EB
padding: 0.75rem 1.5rem
border-radius: 12px
```

### Links & Hover States
```css
color: #2563EB
text-decoration: none
transition: color 0.3s ease

/* Hover */
color: #1D4ED8
transform: translateX(5px)  /* For action links */
```

### Form Elements
```css
/* Input Fields */
border: 2px solid var(--border-color)
border-radius: 12px
padding: 12px 16px
font-size: 1rem
transition: border-color 0.3s ease

/* Focus State */
border-color: #2563EB
outline: 3px solid rgba(37, 99, 235, 0.1)
```

## 🎭 Animation System

### Page Entrance Animations
```css
@keyframes pageReveal {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes cardReveal {
  0% { opacity: 0; transform: translateY(40px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
```

### Stagger Delays
- First element: 0.6s
- Second element: 0.8s  
- Third element: 1.0s
- Increment: +0.2s

### Hover Animations
- **Duration**: 0.3-0.4s
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Transform**: translateY(-10px) for lift effect

## 🖼️ Icon System

### Icon Specifications
```css
/* Tile Icons */
width: 80px
height: 80px
stroke-width: 1
stroke: #2563EB
opacity: 0.1 (default), 0.2 (hover)

/* Small Icons */
width: 16px
height: 16px
stroke-width: 2

/* Medium Icons */
width: 24px  
height: 24px
stroke-width: 1.5
```

### Icon Usage
- Always use stroke instead of fill for consistency
- Maintain thin line weights (stroke-width: 1)
- Use DHgate Monitor blue (#2563EB) for brand consistency

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
@media (max-width: 768px) {
  /* Mobile styles */
  .container { padding: 1rem; }
  header h1 { font-size: 2rem; }
  .grid { grid-template-columns: 1fr; }
}

@media (min-width: 769px) and (max-width: 1024px) {
  /* Tablet styles */
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1025px) {
  /* Desktop styles */
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

## 🌓 Dark Mode Support

### Theme Toggle
All colors use CSS custom properties for automatic theme switching:
```css
[data-theme="light"] { /* light theme vars */ }
[data-theme="dark"] { /* dark theme vars */ }
```

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  :root {
    --text-primary: #000000;
    --primary-blue: #0000ee;
    --border-color: #000000;
  }
}
```

## ♿ Accessibility Standards

### WCAG 2.1 AA Compliance
- **Text contrast**: Minimum 4.5:1 ratio
- **Large text**: Minimum 3:1 ratio  
- **Focus indicators**: 3px solid outline
- **Touch targets**: Minimum 44px × 44px

### Focus Management
```css
/* Custom focus styles */
outline: 3px solid var(--primary-blue)
outline-offset: 2px
border-radius: inherit
```

## 🔧 Implementation Guidelines

### CSS Architecture
1. Use CSS custom properties for all colors
2. Implement mobile-first responsive design
3. Follow BEM methodology for class naming
4. Use semantic HTML elements

### Performance
- Optimize animations with `transform` and `opacity`
- Use `will-change` sparingly for complex animations
- Implement `prefers-reduced-motion` support

### Component Structure
```html
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Title</h3>
  </div>
  <div class="card__content">
    <p class="card__description">Description</p>
  </div>
  <div class="card__actions">
    <button class="btn btn--primary">Action</button>
  </div>
</div>
```

---

**Version**: 2.0  
**Last Updated**: 2025-01-09  
**Maintained by**: DHgate Monitor Team