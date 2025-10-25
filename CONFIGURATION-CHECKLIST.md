# 📋 Configuration Checklist

Complete this checklist to fully customize your Cubiclabs website!

---

## 🔴 REQUIRED (Must Complete)

### 1. Gmail Configuration
**File:** `.env` (create this file in project root)
**Status:** ⚠️ Needs Configuration

Create a `.env` file and add:
```env
GMAIL_USER=your.email@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
```

**How to get these:**
1. Go to https://myaccount.google.com/apppasswords
2. Enable 2-Factor Authentication (if not already enabled)
3. Create an App Password for "Cubiclabs Website"
4. Copy the 16-character password
5. Paste into `.env` file (remove spaces)

**Detailed Guide:** See `GMAIL-SETUP.md` for complete step-by-step instructions

**Benefits:** Direct Gmail integration, no third-party services, more reliable!

---

### 2. MacBook Screenshot
**File:** `public/images/website.png`
**Status:** ⚠️ Placeholder showing

**What to add:**
- Screenshot of YOUR website/dashboard/product
- Dimensions: 1920x1080 pixels
- Format: PNG or JPG
- Max size: 2MB

**Current:** Showing "ADD YOUR SCREENSHOT HERE" placeholder

**Detailed Guide:** See `IMAGE-NEEDED.md` for instructions

---

### 3. WhatsApp Number
**File:** `components/layout/WhatsAppButton.tsx`
**Line:** 6
**Status:** ⚠️ Needs Your Number

```typescript
const phoneNumber = '1234567890'; // ← Replace with your WhatsApp number
```

**Format:** Just numbers, no + or spaces
**Example:** If your number is +1 (555) 123-4567, enter: `15551234567`

---

## 🟡 RECOMMENDED (Should Update)

### 4. Company Contact Information
**File:** `components/layout/Footer.tsx`

Update these:
```typescript
// Line ~35: Address
<span>123 Tech Street, Innovation City, IC 12345</span>

// Line ~41: Phone
<span>+1 (555) 123-4567</span>

// Line ~47: Email
<span>info@cubiclabs.com</span>
```

---

### 5. Social Media Links
**File:** `components/layout/Footer.tsx`
**Lines:** ~15-20

```typescript
const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:info@cubiclabs.com', label: 'Email' },
];
```

Replace with YOUR social media URLs!

---

### 6. Job Postings
**File:** `data/jobs.json`
**Status:** ⚠️ Sample data showing

Current: 4 sample job postings
**Action:** Edit this file to add your actual job openings or remove if not hiring

---

### 7. SEO Metadata
**File:** `app/layout.tsx`
**Lines:** 12-21

```typescript
export const metadata: Metadata = {
  title: "Cubiclabs - Futuristic Technology Solutions", // ← Customize
  description: "Building the future...", // ← Customize
  keywords: ["technology", "innovation"...], // ← Add your keywords
};
```

---

### 8. About Page Content
**File:** `app/about/page.tsx`

Update:
- Timeline dates and milestones (line ~51)
- Company stats (line ~253)
- Mission & vision text

---

## 🟢 OPTIONAL (Nice to Have)

### 9. Brand Colors
**File:** `tailwind.config.ts`
**Lines:** 12-22

Current cyber theme colors:
- Cyber Blue: `#00f0ff`
- Cyber Pink: `#ff006e`
- Cyber Purple: `#8b5cf6`
- Cyber Green: `#00ff87`

Change these to match your brand!

---

### 10. Pricing Plans
**File:** `app/pricing/page.tsx`
**Lines:** 11-65

Update:
- Plan names
- Prices
- Features
- Descriptions

---

### 11. Hero Text
**File:** `app/page.tsx`

Customize the home page hero section text (lines 50-70)

---

### 12. MacBook Title Text
**File:** `app/page.tsx`
**Lines:** 136-140

```typescript
title={
  <span>
    Experience our platform <br />  // ← Customize this
    in <span className="text-gradient">stunning detail</span>
  </span>
}
```

---

## ✅ Quick Start Order

Do these in this order:

1. ✅ Install dependencies: `npm install`
2. ⚠️ Configure Gmail (REQUIRED for forms to work)
3. ⚠️ Add your screenshot to MacBook (website.png)
4. ⚠️ Update WhatsApp number
5. ✅ Update company info in Footer
6. ✅ Update social media links
7. ✅ Customize job postings or remove
8. ✅ Test everything: `npm run dev`
9. ✅ Deploy!

---

## 🧪 Testing Checklist

After configuration, test:

- [ ] EmailJS forms working (contact page)
- [ ] Job application form working
- [ ] WhatsApp button opens chat
- [ ] MacBook shows your screenshot
- [ ] All social links work
- [ ] All pages load without errors
- [ ] Mobile responsive
- [ ] 3D elements render

---

## 📝 Notes

- All files use TypeScript (.tsx, .ts)
- Changes auto-reload in dev mode
- Build before deploy: `npm run build`
- Environment variables: See `.env.example`

---

## 🆘 Help

**Forms not working?**
→ Check EmailJS configuration

**MacBook screen empty?**
→ Check `public/images/website.png` exists

**WhatsApp not working?**
→ Check phone number format (numbers only)

**Need more help?**
→ Check `SETUP.md` and `README.md`

---

## Status Summary

| Item | Status | Priority |
|------|--------|----------|
| EmailJS Config | ⚠️ Not Set | 🔴 HIGH |
| MacBook Screenshot | ⚠️ Placeholder | 🔴 HIGH |
| WhatsApp Number | ⚠️ Default | 🔴 HIGH |
| Contact Info | ⚠️ Sample Data | 🟡 MEDIUM |
| Social Links | ⚠️ Generic | 🟡 MEDIUM |
| Job Postings | ⚠️ Sample Jobs | 🟡 MEDIUM |
| SEO Metadata | ⚠️ Generic | 🟡 MEDIUM |

**Get started now!** Begin with the 🔴 HIGH priority items.
