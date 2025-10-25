# ✅ Simplified Arabic/English Translation Setup

## 🎉 What Changed

The i18n (internationalization) setup has been **simplified** to remove URL-based locale routing. Instead of having URLs like `/en/about` and `/ar/about`, the site now uses **simple URLs** (`/about`) with **client-side language switching**.

### Before (Complex):
- URLs: `/en/about`, `/ar/about`, `/en/contact`, etc.
- Middleware-based routing
- Server-side locale detection
- Separate pages for each language

### After (Simple):
- URLs: `/about`, `/contact`, etc. (no locale prefix)
- Client-side language toggle
- Language stored in localStorage
- Same pages, different language on-screen

---

## 🌍 How It Works

### Language Switching
1. Click the **globe icon** (🌐) in the navigation bar
2. Select **English** or **العربية** (Arabic)
3. The entire page text changes instantly
4. Your selection is saved in the browser

### URL Structure
- **All pages**: Simple URLs without locale prefix
  - Home: `/`
  - About: `/about`
  - Pricing: `/pricing`
  - Careers: `/careers`
  - Contact: `/contact`

### Automatic Features
- ✅ **RTL Support**: Arabic automatically switches to right-to-left layout
- ✅ **Font Switching**: Arabic uses Cairo font, English uses Inter font
- ✅ **Persistent**: Language choice saved in localStorage
- ✅ **Instant**: No page reload required

---

## 📁 Key Files

### 1. Language Context Provider
**File**: `lib/LanguageContext.tsx`

Central context that manages language state and translations:
```typescript
import { useLanguage, useTranslations, useLocale } from '@/lib/LanguageContext';

// In your component
const { locale, setLocale } = useLanguage(); // Get/set current language
const t = useTranslations('nav'); // Get translations for 'nav' namespace
const currentLocale = useLocale(); // Just get current locale
```

### 2. Translation Files
**Location**: `messages/` directory
- `en.json` - All English translations
- `ar.json` - All Arabic translations

**Structure**:
```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    ...
  },
  "hero": {
    "title": "Welcome",
    ...
  }
}
```

### 3. Language Switcher
**File**: `components/layout/LanguageSwitcher.tsx`

Globe icon button that toggles between languages without navigation.

### 4. Updated Components
- **Navbar**: Uses `useTranslations('nav')` for menu items
- **Footer**: Uses `useTranslations('footer')` for footer content
- **Layout**: Wraps everything in `<LanguageProvider>`

---

## 🔧 How to Use in Your Components

### Example 1: Simple Translation

```typescript
'use client';

import { useTranslations } from '@/lib/LanguageContext';

export default function MyComponent() {
  const t = useTranslations('hero'); // 'hero' is the namespace in JSON

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  );
}
```

### Example 2: Get Current Language

```typescript
'use client';

import { useLocale } from '@/lib/LanguageContext';

export default function MyComponent() {
  const locale = useLocale(); // 'en' or 'ar'

  return (
    <div>
      Current language: {locale}
      {locale === 'ar' && <p>مرحباً</p>}
      {locale === 'en' && <p>Hello</p>}
    </div>
  );
}
```

### Example 3: Switch Language Programmatically

```typescript
'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function MyComponent() {
  const { locale, setLocale } = useLanguage();

  return (
    <button onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}>
      Switch to {locale === 'en' ? 'العربية' : 'English'}
    </button>
  );
}
```

---

## 📝 Adding New Translations

### Step 1: Add to English (`messages/en.json`)
```json
{
  "pricing": {
    "newFeature": "This is a new feature",
    "newButton": "Click Me"
  }
}
```

### Step 2: Add to Arabic (`messages/ar.json`)
```json
{
  "pricing": {
    "newFeature": "هذه ميزة جديدة",
    "newButton": "انقر هنا"
  }
}
```

### Step 3: Use in Component
```typescript
const t = useTranslations('pricing');

<h2>{t('newFeature')}</h2>
<button>{t('newButton')}</button>
```

---

## 🎨 RTL (Right-to-Left) Support

### Automatic RTL
When Arabic is selected:
- `document.documentElement.dir` automatically set to `'rtl'`
- Layout flips to right-to-left
- Cairo font automatically applied

### CSS RTL Styles
Located in `app/globals.css`:
```css
[dir="rtl"] {
  direction: rtl;
}

[dir="rtl"] .space-x-2 > * + * {
  margin-left: 0;
  margin-right: 0.5rem;
}

html[lang="ar"] body {
  font-family: var(--font-cairo), sans-serif;
}
```

---

## ⚙️ Technical Implementation

### Context Provider Setup
The `LanguageProvider` in `app/layout.tsx`:
```typescript
<LanguageProvider>
  <Navbar />
  <main>{children}</main>
  <Footer />
  <WhatsAppButton />
</LanguageProvider>
```

### Translation Hook
The `useTranslations` hook:
- Takes a namespace (e.g., 'nav', 'hero', 'footer')
- Returns a function to get translations
- Automatically uses current language from context

### Persistence
- Language saved to `localStorage` on change
- Auto-loaded on page mount
- Persists across sessions

---

## 🚀 Benefits of This Approach

### Advantages:
✅ **Simple URLs**: No `/en/` or `/ar/` prefixes
✅ **No Page Reload**: Instant language switching
✅ **Better SEO**: Single URL per page
✅ **Easy Maintenance**: One set of pages
✅ **Persistent Choice**: Saved in browser
✅ **Automatic RTL**: No manual layout changes

### Disadvantages:
❌ **No SEO per Language**: Search engines see only one version
❌ **No Language URL Sharing**: Can't share a specific language URL
❌ **Client-Side Only**: Requires JavaScript enabled

---

## 📋 Translation Status

| Component | Status |
|-----------|--------|
| Navbar | ✅ Translated |
| Footer | ✅ Translated |
| Language Switcher | ✅ Working |
| Home Page | ⏳ Needs translation keys |
| About Page | ⏳ Needs translation keys |
| Pricing Page | ⏳ Needs translation keys |
| Careers Page | ⏳ Needs translation keys |
| Contact Page | ⏳ Needs translation keys |

**Next Steps**: Replace hardcoded text in page components with `t('key')` calls.

---

## 🐛 Troubleshooting

### Language Not Switching?
- Check browser console for errors
- Verify `LanguageProvider` wraps your components
- Check translation keys exist in both `en.json` and `ar.json`

### RTL Layout Broken?
- Check `app/globals.css` has RTL styles
- Verify `document.documentElement.dir` is set correctly
- Use `[dir="rtl"]` selectors for Arabic-specific styles

### Translations Not Showing?
- Verify namespace name matches JSON structure
- Check translation key path (e.g., `nav.home` for `{ "nav": { "home": "Home" }}`)
- Ensure you're using `useTranslations` hook correctly

---

## 📚 Files Overview

```
cubiclabs/
├── lib/
│   └── LanguageContext.tsx          # Main language context & hooks
├── messages/
│   ├── en.json                       # English translations
│   └── ar.json                       # Arabic translations
├── components/layout/
│   ├── Navbar.tsx                    # Updated with translations
│   ├── Footer.tsx                    # Updated with translations
│   └── LanguageSwitcher.tsx          # Language toggle button
├── app/
│   ├── layout.tsx                    # Root layout with LanguageProvider
│   ├── globals.css                   # RTL styles
│   └── [pages]/                      # All pages (no locale prefix)
└── next.config.js                    # Simplified (no next-intl plugin)
```

---

## ✨ Summary

**What You Get:**
- Simple URLs without language prefixes
- Click-to-switch language toggle
- Automatic RTL for Arabic
- Font switching (Cairo for Arabic, Inter for English)
- Persistent language choice
- Easy translation management with JSON files

**How to Use:**
1. Click globe icon (🌐) in navbar
2. Select language
3. Entire site switches instantly
4. Choice saved in browser

**Perfect for:**
- Bilingual business websites
- Sites where SEO per language isn't critical
- Projects wanting simple, fast language switching
- Modern web apps with JavaScript-enabled users

---

Generated: October 25, 2025
