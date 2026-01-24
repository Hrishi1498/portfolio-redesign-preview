# 🎌 Anime Portfolio Design System

> A comprehensive design system combining [Growth.Design](https://growth.design/case-studies)'s card-based comic storytelling, [Seedhe Maut](https://www.seedhemaut.com/)'s bold dark aesthetic, with an **anime-inspired twist**.

---

## Table of Contents

1. [Design Vision](#design-vision)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Layout & Grid](#layout--grid)
5. [Components](#components)
6. [Anime Effects & Animations](#anime-effects--animations)
7. [Technical Stack](#technical-stack)
8. [Implementation Guide](#implementation-guide)

---

## Design Vision

### Inspiration Sources

| Source | What We Take |
|--------|--------------|
| **Growth.Design** | Card-based layout, comic storytelling, clean navigation, filter tabs, staggered reveals |
| **Seedhe Maut** | Bold typography, dark backgrounds, full-bleed hero, countdown timers, horizontal scrolling marquee, merchandise grid |
| **Anime Aesthetic** | Neon glows, glitch effects, Japanese typography, speed lines, dramatic gradients, character illustrations |

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Dark-First Design** | Rich dark backgrounds (#0A0A0F) with high contrast neon accents |
| **Bold Typography** | Condensed, impactful fonts for headlines inspired by anime titles |
| **Dynamic Motion** | Glitch effects, floating elements, parallax, and dramatic reveals |
| **Visual Drama** | High contrast, neon glows, gradients that feel like anime scenes |
| **Comic Storytelling** | Card-based case studies with visual narratives |

---

## Color System

### Anime-Inspired Dark Palette

```css
:root {
  /* ═══════════════════════════════════════════
     BACKGROUND COLORS - Deep Dark Base
     ═══════════════════════════════════════════ */
  --bg-void: #0A0A0F;           /* Darkest - main background */
  --bg-deep: #0F0F18;           /* Card backgrounds */
  --bg-surface: #151520;        /* Elevated surfaces */
  --bg-elevated: #1A1A28;       /* Modals, dropdowns */
  --bg-glass: rgba(15, 15, 24, 0.8);  /* Glassmorphism */
  
  /* ═══════════════════════════════════════════
     NEON ACCENT COLORS - Anime Vibes
     ═══════════════════════════════════════════ */
  --neon-pink: #FF2D92;         /* Primary CTA - hot pink */
  --neon-cyan: #00F0FF;         /* Secondary accent - electric cyan */
  --neon-purple: #BD00FF;       /* Tertiary - vibrant purple */
  --neon-yellow: #FFE600;       /* Highlight - anime yellow */
  --neon-green: #00FF94;        /* Success states */
  --neon-red: #FF3366;          /* Error/danger */
  --neon-orange: #FF6B00;       /* Warning */
  
  /* Neon Glow Variants (for box-shadow/text-shadow) */
  --glow-pink: 0 0 20px rgba(255, 45, 146, 0.5), 0 0 40px rgba(255, 45, 146, 0.3);
  --glow-cyan: 0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.3);
  --glow-purple: 0 0 20px rgba(189, 0, 255, 0.5), 0 0 40px rgba(189, 0, 255, 0.3);
  
  /* ═══════════════════════════════════════════
     TEXT COLORS
     ═══════════════════════════════════════════ */
  --text-primary: #FFFFFF;
  --text-secondary: #A0A0B8;
  --text-muted: #606078;
  --text-accent: var(--neon-cyan);
  
  /* ═══════════════════════════════════════════
     CATEGORY TAG COLORS (Growth.Design style)
     ═══════════════════════════════════════════ */
  --tag-project: var(--neon-pink);
  --tag-tutorial: var(--neon-cyan);
  --tag-music: var(--neon-purple);
  --tag-design: var(--neon-yellow);
  --tag-code: var(--neon-green);
  --tag-featured: var(--neon-orange);
  
  /* ═══════════════════════════════════════════
     GRADIENT PRESETS
     ═══════════════════════════════════════════ */
  --gradient-hero: linear-gradient(135deg, #0A0A0F 0%, #1A0A20 50%, #0A1520 100%);
  --gradient-card: linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-deep) 100%);
  --gradient-neon: linear-gradient(90deg, var(--neon-pink) 0%, var(--neon-purple) 50%, var(--neon-cyan) 100%);
  --gradient-sunset: linear-gradient(135deg, #FF2D92 0%, #FF6B00 100%);
  --gradient-ocean: linear-gradient(135deg, #00F0FF 0%, #BD00FF 100%);
  
  /* ═══════════════════════════════════════════
     BORDER & SHADOW
     ═══════════════════════════════════════════ */
  --border-subtle: rgba(255, 255, 255, 0.05);
  --border-default: rgba(255, 255, 255, 0.1);
  --border-accent: rgba(0, 240, 255, 0.3);
  
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.5);
  --shadow-neon: 0 0 30px rgba(255, 45, 146, 0.2);
}
```

### Light Mode Alternative (Optional)

```css
[data-theme="light"] {
  --bg-void: #FAFAFA;
  --bg-deep: #FFFFFF;
  --bg-surface: #F5F5F8;
  --text-primary: #0A0A0F;
  --text-secondary: #606078;
  --neon-pink: #E91E8C;
  --neon-cyan: #00C4D4;
}
```

---

## Typography

### Font Stack - Anime Title Aesthetic

```css
:root {
  /* ═══════════════════════════════════════════
     DISPLAY FONT - Bold Headlines (Seedhe Maut style)
     Condensed, impactful, all-caps energy
     ═══════════════════════════════════════════ */
  --font-display: 'Bebas Neue', 'Oswald', 'Anton', Impact, sans-serif;
  
  /* ═══════════════════════════════════════════
     HEADING FONT - Section Titles
     Modern geometric sans-serif
     ═══════════════════════════════════════════ */
  --font-heading: 'Space Grotesk', 'Outfit', 'DM Sans', sans-serif;
  
  /* ═══════════════════════════════════════════
     BODY FONT - Readable Content
     Clean, neutral, good for long text
     ═══════════════════════════════════════════ */
  --font-body: 'Inter', 'Plus Jakarta Sans', -apple-system, sans-serif;
  
  /* ═══════════════════════════════════════════
     JAPANESE ACCENT FONT - Anime Flavor
     For decorative Japanese text elements
     ═══════════════════════════════════════════ */
  --font-japanese: 'Zen Kaku Gothic New', 'Noto Sans JP', 'M PLUS 1p', sans-serif;
  
  /* ═══════════════════════════════════════════
     MONO FONT - Code & Tech Elements
     ═══════════════════════════════════════════ */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
}
```

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Type Scale

```css
:root {
  /* Font Sizes - Dramatic Scale for Impact */
  --text-xs: 0.75rem;      /* 12px - Labels */
  --text-sm: 0.875rem;     /* 14px - Meta text */
  --text-base: 1rem;       /* 16px - Body */
  --text-lg: 1.125rem;     /* 18px - Large body */
  --text-xl: 1.25rem;      /* 20px - Card titles */
  --text-2xl: 1.5rem;      /* 24px - Section labels */
  --text-3xl: 2rem;        /* 32px - Subheadings */
  --text-4xl: 2.5rem;      /* 40px - Section titles */
  --text-5xl: 3.5rem;      /* 56px - Page titles */
  --text-6xl: 5rem;        /* 80px - Hero headlines */
  --text-7xl: 7rem;        /* 112px - Giant display */
  --text-8xl: 10rem;       /* 160px - Massive hero (Seedhe Maut style) */
  
  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;
  
  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.1em;
  --tracking-widest: 0.2em;   /* For all-caps display */
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-black: 900;
}
```

### Typography Classes

```css
/* ═══════════════════════════════════════════
   HERO HEADLINE - Massive, Impactful
   Used for main page titles
   ═══════════════════════════════════════════ */
.text-hero {
  font-family: var(--font-display);
  font-size: clamp(var(--text-5xl), 12vw, var(--text-8xl));
  font-weight: var(--font-normal); /* Bebas Neue is already bold */
  line-height: var(--leading-none);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-primary);
}

/* With neon glow effect */
.text-hero-glow {
  text-shadow: var(--glow-pink);
}

/* ═══════════════════════════════════════════
   SECTION TITLE - Bold, Modern
   ═══════════════════════════════════════════ */
.text-section {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
}

/* ═══════════════════════════════════════════
   CARD TITLE
   ═══════════════════════════════════════════ */
.text-card-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  color: var(--text-primary);
}

/* ═══════════════════════════════════════════
   BODY TEXT
   ═══════════════════════════════════════════ */
.text-body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
  color: var(--text-secondary);
}

/* ═══════════════════════════════════════════
   JAPANESE ACCENT TEXT - Decorative
   ═══════════════════════════════════════════ */
.text-japanese {
  font-family: var(--font-japanese);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-wider);
  color: var(--text-muted);
  opacity: 0.6;
}

/* ═══════════════════════════════════════════
   META/LABEL TEXT
   ═══════════════════════════════════════════ */
.text-meta {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--text-muted);
}
```

---

## Layout & Grid

### Spacing System

```css
:root {
  /* 8px Base Spacing Scale */
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
  --space-40: 10rem;     /* 160px */
  
  /* Container Widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1440px;
  --container-full: 1920px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-3xl: 32px;
  --radius-full: 9999px;
}
```

### Grid System

```css
/* Main Container */
.container {
  width: 100%;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.container-wide {
  max-width: var(--container-2xl);
}

.container-full {
  max-width: var(--container-full);
}

/* Portfolio Cards Grid (Growth.Design style) */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .portfolio-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1440px) {
  .portfolio-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Bento Grid Layout (Alternative) */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: var(--space-4);
}

.bento-lg {
  grid-column: span 2;
  grid-row: span 2;
}

.bento-wide {
  grid-column: span 2;
}

.bento-tall {
  grid-row: span 2;
}
```

---

## Components

### 1. Navigation Bar (Glass Morphism + Dark)

```html
<nav class="navbar">
  <div class="navbar-container">
    <!-- Logo with Japanese accent -->
    <a href="/" class="navbar-logo">
      <span class="logo-text">PORTFOLIO</span>
      <span class="logo-japanese">ポートフォリオ</span>
    </a>
    
    <!-- Main Navigation -->
    <ul class="navbar-menu">
      <li><a href="/work" class="navbar-link active">Work</a></li>
      <li><a href="/about" class="navbar-link">About</a></li>
      <li><a href="/blog" class="navbar-link">Blog</a></li>
      <li><a href="/contact" class="navbar-link">Contact</a></li>
    </ul>
    
    <!-- CTA Button -->
    <a href="/hire-me" class="btn btn-neon">
      <span>Let's Talk</span>
      <span class="btn-glow"></span>
    </a>
  </div>
</nav>
```

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--bg-glass);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-subtle);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: var(--space-4) var(--space-6);
}

.navbar-logo {
  display: flex;
  flex-direction: column;
  text-decoration: none;
}

.logo-text {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-widest);
  color: var(--text-primary);
}

.logo-japanese {
  font-family: var(--font-japanese);
  font-size: var(--text-xs);
  color: var(--neon-cyan);
  opacity: 0.7;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  list-style: none;
}

.navbar-link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  text-decoration: none;
  position: relative;
  padding: var(--space-2) 0;
  transition: color 0.3s ease;
}

.navbar-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-neon);
  transition: width 0.3s ease;
}

.navbar-link:hover,
.navbar-link.active {
  color: var(--text-primary);
}

.navbar-link:hover::after,
.navbar-link.active::after {
  width: 100%;
}
```

### 2. Hero Section (Seedhe Maut + Anime Style)

```html
<section class="hero">
  <!-- Background Effects -->
  <div class="hero-bg">
    <div class="hero-gradient"></div>
    <div class="hero-grid"></div>
    <div class="hero-particles"></div>
  </div>
  
  <!-- Content -->
  <div class="hero-content">
    <!-- Japanese Accent -->
    <span class="hero-japanese">クリエイティブ・デベロッパー</span>
    
    <!-- Main Title -->
    <h1 class="hero-title">
      <span class="hero-title-line">CREATIVE</span>
      <span class="hero-title-line hero-title-outline">DEVELOPER</span>
    </h1>
    
    <!-- Subtitle -->
    <p class="hero-subtitle">
      Building digital experiences with code & creativity
    </p>
    
    <!-- CTAs -->
    <div class="hero-actions">
      <a href="/work" class="btn btn-neon btn-lg">
        View Work
        <svg class="btn-arrow"><!-- arrow icon --></svg>
      </a>
      <a href="/about" class="btn btn-ghost btn-lg">
        About Me
      </a>
    </div>
    
    <!-- Scroll Indicator -->
    <div class="hero-scroll">
      <span class="hero-scroll-text">SCROLL</span>
      <div class="hero-scroll-line"></div>
    </div>
  </div>
  
  <!-- Floating Elements (Anime style) -->
  <div class="hero-floaters">
    <div class="floater floater-1">01</div>
    <div class="floater floater-2">⟡</div>
    <div class="floater floater-3">創造</div>
  </div>
</section>
```

```css
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--bg-void);
}

/* Background Effects */
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 45, 146, 0.15), transparent),
    radial-gradient(ellipse 60% 40% at 80% 50%, rgba(189, 0, 255, 0.1), transparent),
    radial-gradient(ellipse 50% 30% at 20% 80%, rgba(0, 240, 255, 0.1), transparent);
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(var(--border-subtle) 1px, transparent 1px),
    linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
}

/* Content */
.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: var(--space-6);
}

.hero-japanese {
  display: block;
  font-family: var(--font-japanese);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-widest);
  color: var(--neon-cyan);
  margin-bottom: var(--space-4);
  opacity: 0.8;
}

.hero-title {
  margin-bottom: var(--space-6);
}

.hero-title-line {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(3rem, 15vw, 12rem);
  line-height: 0.9;
  letter-spacing: var(--tracking-wide);
  color: var(--text-primary);
}

.hero-title-outline {
  -webkit-text-stroke: 2px var(--neon-pink);
  -webkit-text-fill-color: transparent;
  text-shadow: var(--glow-pink);
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 500px;
  margin: 0 auto var(--space-10);
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

/* Floating Elements */
.hero-floaters {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floater {
  position: absolute;
  font-family: var(--font-display);
  font-size: var(--text-6xl);
  color: var(--text-primary);
  opacity: 0.03;
  animation: float 6s ease-in-out infinite;
}

.floater-1 { top: 15%; left: 10%; animation-delay: 0s; }
.floater-2 { top: 60%; right: 15%; animation-delay: 2s; font-size: var(--text-8xl); }
.floater-3 { bottom: 20%; left: 20%; animation-delay: 4s; font-family: var(--font-japanese); }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

/* Scroll Indicator */
.hero-scroll {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.hero-scroll-text {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  color: var(--text-muted);
}

.hero-scroll-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, var(--neon-cyan), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 1; height: 60px; }
  50% { opacity: 0.5; height: 40px; }
}
```

### 3. Filter Tabs (Growth.Design style with Anime accents)

```html
<div class="filter-section">
  <!-- Section Header -->
  <div class="filter-header">
    <h2 class="filter-title">
      <span class="filter-title-text">SELECTED WORK</span>
      <span class="filter-title-japanese">作品集</span>
    </h2>
  </div>
  
  <!-- Filter Tabs -->
  <div class="filter-tabs">
    <button class="filter-tab active" data-filter="all">
      <span class="filter-tab-dot"></span>
      All
    </button>
    <button class="filter-tab" data-filter="project">
      <span class="filter-tab-dot"></span>
      Projects
    </button>
    <button class="filter-tab" data-filter="design">
      <span class="filter-tab-dot"></span>
      Design
    </button>
    <button class="filter-tab" data-filter="code">
      <span class="filter-tab-dot"></span>
      Code
    </button>
    <button class="filter-tab" data-filter="music">
      <span class="filter-tab-dot"></span>
      Music
    </button>
  </div>
</div>
```

```css
.filter-section {
  padding: var(--space-8) 0;
  border-bottom: 1px solid var(--border-subtle);
}

.filter-header {
  display: flex;
  align-items: baseline;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.filter-title {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
}

.filter-title-text {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  letter-spacing: var(--tracking-wide);
  color: var(--text-primary);
}

.filter-title-japanese {
  font-family: var(--font-japanese);
  font-size: var(--text-sm);
  color: var(--neon-pink);
  opacity: 0.7;
}

.filter-tabs {
  display: flex;
  gap: var(--space-2);
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: var(--space-2);
}

.filter-tabs::-webkit-scrollbar {
  display: none;
}

.filter-tab {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  background: transparent;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.filter-tab-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-muted);
  transition: all 0.3s ease;
}

.filter-tab:hover {
  color: var(--text-primary);
  border-color: var(--border-default);
  background: var(--bg-surface);
}

.filter-tab.active {
  color: var(--text-primary);
  background: var(--bg-elevated);
  border-color: var(--neon-cyan);
  box-shadow: var(--glow-cyan);
}

.filter-tab.active .filter-tab-dot {
  background: var(--neon-cyan);
  box-shadow: 0 0 8px var(--neon-cyan);
}
```

### 4. Portfolio Card (Anime Style + Growth.Design Layout)

```html
<article class="portfolio-card" data-category="project">
  <!-- Thumbnail with overlay -->
  <div class="card-thumbnail">
    <img src="/project-thumbnail.jpg" alt="Project title" />
    
    <!-- Hover Overlay -->
    <div class="card-overlay">
      <span class="card-overlay-text">VIEW PROJECT</span>
      <span class="card-overlay-arrow">→</span>
    </div>
    
    <!-- Category Badge -->
    <span class="card-badge badge-project">PROJECT</span>
    
    <!-- Number (Anime style) -->
    <span class="card-number">01</span>
  </div>
  
  <!-- Content -->
  <div class="card-content">
    <!-- Title -->
    <h3 class="card-title">E-Commerce Redesign</h3>
    
    <!-- Description -->
    <p class="card-description">
      Complete redesign of an e-commerce platform focusing on UX...
    </p>
    
    <!-- Meta -->
    <div class="card-meta">
      <span class="card-year">2025</span>
      <span class="card-divider">•</span>
      <span class="card-type">UI/UX Design</span>
    </div>
    
    <!-- Tags -->
    <div class="card-tags">
      <span class="card-tag">Figma</span>
      <span class="card-tag">React</span>
      <span class="card-tag">Tailwind</span>
    </div>
  </div>
</article>
```

```css
.portfolio-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--bg-deep);
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.portfolio-card:hover {
  transform: translateY(-8px);
  border-color: var(--border-accent);
  box-shadow: 
    var(--shadow-lg),
    0 0 40px rgba(0, 240, 255, 0.1);
}

/* Thumbnail */
.card-thumbnail {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--bg-surface);
}

.card-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease, filter 0.3s ease;
}

.portfolio-card:hover .card-thumbnail img {
  transform: scale(1.1);
  filter: brightness(0.7);
}

/* Overlay */
.card-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  background: rgba(10, 10, 15, 0.6);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portfolio-card:hover .card-overlay {
  opacity: 1;
}

.card-overlay-text {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-widest);
  color: var(--text-primary);
}

.card-overlay-arrow {
  font-size: var(--text-2xl);
  color: var(--neon-cyan);
  transform: translateX(-10px);
  transition: transform 0.3s ease;
}

.portfolio-card:hover .card-overlay-arrow {
  transform: translateX(0);
}

/* Badge */
.card-badge {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  padding: var(--space-1) var(--space-3);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  border-radius: var(--radius-full);
  backdrop-filter: blur(8px);
}

.badge-project {
  background: rgba(255, 45, 146, 0.2);
  color: var(--neon-pink);
  border: 1px solid rgba(255, 45, 146, 0.3);
}

.badge-design {
  background: rgba(255, 230, 0, 0.2);
  color: var(--neon-yellow);
  border: 1px solid rgba(255, 230, 0, 0.3);
}

.badge-code {
  background: rgba(0, 255, 148, 0.2);
  color: var(--neon-green);
  border: 1px solid rgba(0, 255, 148, 0.3);
}

.badge-music {
  background: rgba(189, 0, 255, 0.2);
  color: var(--neon-purple);
  border: 1px solid rgba(189, 0, 255, 0.3);
}

/* Number (Anime style) */
.card-number {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  color: var(--text-primary);
  opacity: 0.1;
  line-height: 1;
}

/* Content */
.card-content {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.card-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin: 0;
  transition: color 0.3s ease;
}

.portfolio-card:hover .card-title {
  color: var(--neon-cyan);
}

.card-description {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--text-muted);
}

.card-divider {
  opacity: 0.5;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.card-tag {
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  color: var(--text-muted);
  background: var(--bg-surface);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
}
```

### 5. Buttons (Neon Glow Effect)

```css
/* ═══════════════════════════════════════════
   BASE BUTTON
   ═══════════════════════════════════════════ */
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  text-decoration: none;
  border-radius: var(--radius-lg);
  border: none;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ═══════════════════════════════════════════
   NEON BUTTON - Primary CTA
   ═══════════════════════════════════════════ */
.btn-neon {
  background: var(--neon-pink);
  color: white;
  box-shadow: var(--glow-pink);
}

.btn-neon:hover {
  transform: translateY(-2px);
  box-shadow: 
    var(--glow-pink),
    0 10px 40px rgba(255, 45, 146, 0.4);
}

.btn-neon:active {
  transform: translateY(0);
}

/* Animated gradient background */
.btn-neon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    var(--neon-pink),
    var(--neon-purple),
    var(--neon-pink)
  );
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: gradientShift 3s ease infinite;
}

.btn-neon:hover::before {
  opacity: 1;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.btn-neon span {
  position: relative;
  z-index: 1;
}

/* ═══════════════════════════════════════════
   CYAN BUTTON - Secondary CTA
   ═══════════════════════════════════════════ */
.btn-cyan {
  background: transparent;
  color: var(--neon-cyan);
  border: 1px solid var(--neon-cyan);
  box-shadow: var(--glow-cyan);
}

.btn-cyan:hover {
  background: var(--neon-cyan);
  color: var(--bg-void);
  box-shadow: 
    var(--glow-cyan),
    0 10px 40px rgba(0, 240, 255, 0.3);
}

/* ═══════════════════════════════════════════
   GHOST BUTTON
   ═══════════════════════════════════════════ */
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-default);
}

.btn-ghost:hover {
  color: var(--text-primary);
  border-color: var(--text-primary);
  background: var(--bg-surface);
}

/* ═══════════════════════════════════════════
   SIZE VARIANTS
   ═══════════════════════════════════════════ */
.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-base);
}

.btn-xl {
  padding: var(--space-5) var(--space-10);
  font-size: var(--text-lg);
}
```

### 6. Marquee Section (Seedhe Maut Style)

```html
<section class="marquee-section">
  <div class="marquee">
    <div class="marquee-content">
      <span class="marquee-item">CREATIVE DEVELOPER</span>
      <span class="marquee-divider">✦</span>
      <span class="marquee-item">UI/UX DESIGNER</span>
      <span class="marquee-divider">✦</span>
      <span class="marquee-item">クリエイター</span>
      <span class="marquee-divider">✦</span>
      <span class="marquee-item">AVAILABLE FOR WORK</span>
      <span class="marquee-divider">✦</span>
    </div>
    <!-- Duplicate for seamless loop -->
    <div class="marquee-content" aria-hidden="true">
      <span class="marquee-item">CREATIVE DEVELOPER</span>
      <span class="marquee-divider">✦</span>
      <span class="marquee-item">UI/UX DESIGNER</span>
      <span class="marquee-divider">✦</span>
      <span class="marquee-item">クリエイター</span>
      <span class="marquee-divider">✦</span>
      <span class="marquee-item">AVAILABLE FOR WORK</span>
      <span class="marquee-divider">✦</span>
    </div>
  </div>
</section>
```

```css
.marquee-section {
  padding: var(--space-8) 0;
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
  overflow: hidden;
}

.marquee {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}

.marquee:hover {
  animation-play-state: paused;
}

.marquee-content {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  padding-right: var(--space-8);
}

.marquee-item {
  font-family: var(--font-display);
  font-size: clamp(var(--text-3xl), 5vw, var(--text-5xl));
  letter-spacing: var(--tracking-wide);
  color: var(--text-primary);
  white-space: nowrap;
}

.marquee-divider {
  font-size: var(--text-2xl);
  color: var(--neon-pink);
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

### 7. Footer

```html
<footer class="footer">
  <div class="footer-container">
    <!-- Top Section -->
    <div class="footer-top">
      <div class="footer-brand">
        <h2 class="footer-logo">
          <span class="footer-logo-text">LET'S WORK</span>
          <span class="footer-logo-outline">TOGETHER</span>
        </h2>
        <p class="footer-tagline">
          Ready to bring your ideas to life? Let's create something amazing.
        </p>
        <a href="mailto:hello@example.com" class="btn btn-neon btn-lg">
          Get In Touch
        </a>
      </div>
    </div>
    
    <!-- Links Grid -->
    <div class="footer-grid">
      <div class="footer-column">
        <h4 class="footer-heading">Navigation</h4>
        <ul class="footer-links">
          <li><a href="/work">Work</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      
      <div class="footer-column">
        <h4 class="footer-heading">Socials</h4>
        <ul class="footer-links">
          <li><a href="#">Twitter / X</a></li>
          <li><a href="#">GitHub</a></li>
          <li><a href="#">LinkedIn</a></li>
          <li><a href="#">Dribbble</a></li>
        </ul>
      </div>
      
      <div class="footer-column">
        <h4 class="footer-heading">Contact</h4>
        <ul class="footer-links">
          <li><a href="mailto:hello@example.com">hello@example.com</a></li>
          <li><span>Based in Tokyo 🇯🇵</span></li>
        </ul>
      </div>
    </div>
    
    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <p class="footer-copyright">
        © 2026 — All rights reserved
      </p>
      <p class="footer-credit">
        Designed & Built with 💜
      </p>
    </div>
  </div>
</footer>
```

```css
.footer {
  background: var(--bg-void);
  border-top: 1px solid var(--border-subtle);
  padding: var(--space-24) 0 var(--space-8);
}

.footer-container {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.footer-top {
  text-align: center;
  margin-bottom: var(--space-20);
}

.footer-logo {
  margin-bottom: var(--space-6);
}

.footer-logo-text,
.footer-logo-outline {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(var(--text-4xl), 10vw, var(--text-7xl));
  line-height: 0.9;
  letter-spacing: var(--tracking-wide);
}

.footer-logo-text {
  color: var(--text-primary);
}

.footer-logo-outline {
  -webkit-text-stroke: 2px var(--neon-cyan);
  -webkit-text-fill-color: transparent;
}

.footer-tagline {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 400px;
  margin: 0 auto var(--space-8);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--space-10);
  padding: var(--space-12) 0;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.footer-heading {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: var(--space-4);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer-links a,
.footer-links span {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--neon-cyan);
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-top: var(--space-8);
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-align: center;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}
```

---

## Anime Effects & Animations

### Glitch Text Effect

```css
/* ═══════════════════════════════════════════
   GLITCH TEXT - Anime/Cyberpunk Style
   ═══════════════════════════════════════════ */
.glitch {
  position: relative;
  font-family: var(--font-display);
  color: var(--text-primary);
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  color: var(--neon-cyan);
  animation: glitch-1 2s infinite linear alternate-reverse;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
}

.glitch::after {
  color: var(--neon-pink);
  animation: glitch-2 3s infinite linear alternate-reverse;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
}

@keyframes glitch-1 {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-3px); }
  40% { transform: translateX(3px); }
  60% { transform: translateX(-1px); }
  80% { transform: translateX(2px); }
}

@keyframes glitch-2 {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(3px); }
  40% { transform: translateX(-2px); }
  60% { transform: translateX(2px); }
  80% { transform: translateX(-3px); }
}

/* Hover trigger */
.glitch-hover:hover::before,
.glitch-hover:hover::after {
  animation-play-state: running;
}

.glitch-hover::before,
.glitch-hover::after {
  animation-play-state: paused;
}
```

### Neon Glow Pulse

```css
/* ═══════════════════════════════════════════
   NEON PULSE ANIMATION
   ═══════════════════════════════════════════ */
@keyframes neonPulse {
  0%, 100% {
    box-shadow: 
      0 0 5px var(--neon-pink),
      0 0 10px var(--neon-pink),
      0 0 20px var(--neon-pink);
  }
  50% {
    box-shadow: 
      0 0 10px var(--neon-pink),
      0 0 20px var(--neon-pink),
      0 0 40px var(--neon-pink),
      0 0 80px var(--neon-pink);
  }
}

.neon-pulse {
  animation: neonPulse 2s ease-in-out infinite;
}

/* Text glow pulse */
@keyframes textGlow {
  0%, 100% {
    text-shadow: 
      0 0 10px var(--neon-cyan),
      0 0 20px var(--neon-cyan);
  }
  50% {
    text-shadow: 
      0 0 20px var(--neon-cyan),
      0 0 40px var(--neon-cyan),
      0 0 60px var(--neon-cyan);
  }
}

.text-glow-pulse {
  animation: textGlow 3s ease-in-out infinite;
}
```

### Speed Lines Background

```css
/* ═══════════════════════════════════════════
   SPEED LINES - Anime Action Effect
   ═══════════════════════════════════════════ */
.speed-lines {
  position: relative;
  overflow: hidden;
}

.speed-lines::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.03) 2px,
    rgba(255, 255, 255, 0.03) 4px
  );
  animation: speedLines 0.5s linear infinite;
  pointer-events: none;
}

@keyframes speedLines {
  0% { transform: translateX(0); }
  100% { transform: translateX(4px); }
}

/* Radial speed lines */
.speed-lines-radial::before {
  background: repeating-conic-gradient(
    from 0deg,
    transparent 0deg 2deg,
    rgba(255, 255, 255, 0.02) 2deg 4deg
  );
  animation: speedLinesRadial 10s linear infinite;
}

@keyframes speedLinesRadial {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### Staggered Page Load Reveal

```css
/* ═══════════════════════════════════════════
   FADE UP WITH STAGGER
   ═══════════════════════════════════════════ */
@keyframes fadeUpIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  opacity: 0;
  animation: fadeUpIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Stagger delays */
.animate-in:nth-child(1) { animation-delay: 0ms; }
.animate-in:nth-child(2) { animation-delay: 100ms; }
.animate-in:nth-child(3) { animation-delay: 200ms; }
.animate-in:nth-child(4) { animation-delay: 300ms; }
.animate-in:nth-child(5) { animation-delay: 400ms; }
.animate-in:nth-child(6) { animation-delay: 500ms; }
.animate-in:nth-child(7) { animation-delay: 600ms; }
.animate-in:nth-child(8) { animation-delay: 700ms; }

/* Slide from sides */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-left {
  animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.slide-right {
  animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

### Card Hover Effects

```css
/* ═══════════════════════════════════════════
   CARD HOVER - Lift + Glow
   ═══════════════════════════════════════════ */
.card-hover {
  transition: 
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 60px rgba(0, 240, 255, 0.1);
  border-color: var(--neon-cyan);
}

/* Tilt effect on hover */
.card-tilt {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.card-tilt:hover {
  transform: rotateX(5deg) rotateY(-5deg) translateY(-10px);
}

/* Shine effect */
.card-shine {
  position: relative;
  overflow: hidden;
}

.card-shine::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 40%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 60%
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.card-shine:hover::after {
  transform: translateX(100%);
}
```

### Floating Animation

```css
/* ═══════════════════════════════════════════
   FLOATING ELEMENTS
   ═══════════════════════════════════════════ */
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(2deg);
  }
  75% {
    transform: translateY(10px) rotate(-2deg);
  }
}

.floating {
  animation: float 6s ease-in-out infinite;
}

.floating-slow {
  animation: float 8s ease-in-out infinite;
}

.floating-fast {
  animation: float 4s ease-in-out infinite;
}

/* Different delays for multiple elements */
.floating-1 { animation-delay: 0s; }
.floating-2 { animation-delay: 1s; }
.floating-3 { animation-delay: 2s; }
.floating-4 { animation-delay: 3s; }
```

### Cursor Trail Effect (JavaScript)

```javascript
// Anime-style cursor trail
class CursorTrail {
  constructor() {
    this.trails = [];
    this.trailCount = 10;
    this.init();
  }

  init() {
    for (let i = 0; i < this.trailCount; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.cssText = `
        position: fixed;
        width: ${8 - i * 0.5}px;
        height: ${8 - i * 0.5}px;
        background: var(--neon-pink);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: ${1 - i * 0.1};
        box-shadow: 0 0 ${10 - i}px var(--neon-pink);
        transition: transform 0.1s ease;
      `;
      document.body.appendChild(trail);
      this.trails.push({ el: trail, x: 0, y: 0 });
    }

    document.addEventListener('mousemove', (e) => this.move(e));
  }

  move(e) {
    this.trails.forEach((trail, index) => {
      setTimeout(() => {
        trail.el.style.left = e.clientX - 4 + 'px';
        trail.el.style.top = e.clientY - 4 + 'px';
      }, index * 50);
    });
  }
}

// Initialize
new CursorTrail();
```

---

## Technical Stack

### Recommended Technologies

| Category | Technology | Why |
|----------|------------|-----|
| **Framework** | Next.js 14+ (App Router) | SSR, performance, image optimization |
| **Styling** | Tailwind CSS + CSS Variables | Utility-first + custom design system |
| **Animation** | Framer Motion | Declarative animations, gestures |
| **3D Effects** | Three.js / React Three Fiber | Optional: 3D backgrounds |
| **CMS** | Sanity / Contentful | Headless CMS for portfolio items |
| **Hosting** | Vercel | Edge functions, analytics |
| **Fonts** | Google Fonts + Variable Fonts | Performance + flexibility |

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#0A0A0F',
        deep: '#0F0F18',
        surface: '#151520',
        elevated: '#1A1A28',
        neon: {
          pink: '#FF2D92',
          cyan: '#00F0FF',
          purple: '#BD00FF',
          yellow: '#FFE600',
          green: '#00FF94',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        japanese: ['Zen Kaku Gothic New', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'neonPulse 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'glitch-1': 'glitch-1 2s infinite linear alternate-reverse',
        'glitch-2': 'glitch-2 3s infinite linear alternate-reverse',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        neonPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 5px #FF2D92, 0 0 10px #FF2D92, 0 0 20px #FF2D92' 
          },
          '50%': { 
            boxShadow: '0 0 10px #FF2D92, 0 0 20px #FF2D92, 0 0 40px #FF2D92, 0 0 80px #FF2D92' 
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(255, 45, 146, 0.5), 0 0 40px rgba(255, 45, 146, 0.3)',
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.3)',
      },
    },
  },
  plugins: [],
};
```

### React Components Example

```jsx
// components/PortfolioCard.jsx
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function PortfolioCard({ 
  title, 
  description,
  thumbnail, 
  category,
  year,
  tags,
  index 
}) {
  const categoryColors = {
    project: 'neon-pink',
    design: 'neon-yellow',
    code: 'neon-green',
    music: 'neon-purple',
  };

  return (
    <motion.article
      className="portfolio-card group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ y: -8 }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-surface">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-void/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="font-display text-lg tracking-widest">VIEW PROJECT</span>
        </div>
        
        {/* Badge */}
        <span className={`absolute top-4 left-4 badge badge-${category}`}>
          {category}
        </span>
        
        {/* Number */}
        <span className="absolute top-4 right-4 font-display text-4xl opacity-10">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      
      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="font-heading text-xl font-semibold group-hover:text-neon-cyan transition-colors">
          {title}
        </h3>
        <p className="text-sm text-secondary line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted">
          <span>{year}</span>
          <span>•</span>
          <span>{category}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="card-tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
```

---

## Resources & References

### Design Inspiration
- **Growth.Design**: [https://growth.design/case-studies](https://growth.design/case-studies)
- **Seedhe Maut**: [https://www.seedhemaut.com/](https://www.seedhemaut.com/)
- **Awwwards Anime Sites**: Search "anime" on awwwards.com

### Fonts
- [Google Fonts - Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue)
- [Google Fonts - Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- [Google Fonts - Zen Kaku Gothic New](https://fonts.google.com/specimen/Zen+Kaku+Gothic+New)
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)

### Animation Libraries
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/gsap/)
- [Lottie](https://lottiefiles.com/)

### Icons & Assets
- [Lucide Icons](https://lucide.dev/)
- [Heroicons](https://heroicons.com/)
- [SVG Backgrounds](https://www.svgbackgrounds.com/)

---

*Last updated: January 2026*

**Design System Version: 1.0.0**

✦ Built for creating anime-inspired portfolio websites ✦
