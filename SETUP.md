# Quick Setup Guide

Follow these steps to get your Cubiclabs website up and running!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure EmailJS

### 2.1 Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

### 2.2 Setup Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup wizard
5. Copy your **Service ID**

### 2.3 Create Email Templates

#### Contact Form Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Name it "Contact Form"
4. Use this template structure:

```
Subject: New Contact Form Submission

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}
```

5. Save and copy the **Template ID**

#### Job Application Template
1. Create another template
2. Name it "Job Application"
3. Use this template structure:

```
Subject: New Job Application - {{job_title}}

Applicant Details:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Address: {{address}}

Job Information:
- Job ID: {{job_id}}
- Position: {{job_title}}

Cover Letter:
{{message}}

CV: {{cv_url}}
```

4. Save and copy the **Template ID**

### 2.4 Get Public Key
1. Go to "Account" in EmailJS dashboard
2. Find your **Public Key**
3. Copy it

### 2.5 Update Configuration
Open `lib/email/emailjs.ts` and update these values:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id_here',           // From step 2.2
  CONTACT_TEMPLATE_ID: 'your_template_id_here', // From step 2.3
  APPLICATION_TEMPLATE_ID: 'your_template_id',  // From step 2.3
  PUBLIC_KEY: 'your_public_key_here',          // From step 2.4
};
```

## Step 3: Configure WhatsApp

Open `components/layout/WhatsAppButton.tsx` and update:

```typescript
const phoneNumber = 'YOUR_NUMBER'; // e.g., '1234567890' (no + or spaces)
```

## Step 4: Customize Content

### Update Company Information
Edit `components/layout/Footer.tsx`:
- Contact information
- Social media links
- Address

### Add/Edit Jobs
Edit `data/jobs.json` to manage job postings.

### Update Metadata (SEO)
Edit `app/layout.tsx` to update:
- Site title
- Description
- Keywords

## Step 5: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your website!

## Step 6: Test Everything

1. **Homepage**: Check 3D animations load
2. **Navigation**: Test all menu links
3. **Contact Form**: Submit a test message (check your email)
4. **Careers**: Browse jobs and test application form
5. **WhatsApp**: Click the floating button
6. **Responsive**: Test on mobile view

## Step 7: Deploy

### Option A: Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

### Option B: Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Deploy

## Common Issues

### 3D Objects Not Showing
- Check browser supports WebGL
- Clear cache and reload
- Check console for errors

### Email Not Sending
- Verify EmailJS credentials
- Check EmailJS dashboard for quota
- Enable email service properly

### Build Errors
- Run `npm install` again
- Delete `node_modules` and `.next` folders
- Run `npm install` fresh

## Need Help?

- Check README.md for detailed documentation
- Review EmailJS documentation
- Open an issue on GitHub

## Customization Tips

1. **Colors**: Edit `tailwind.config.ts` for theme colors
2. **3D Scene**: Modify `components/3d/HeroScene.tsx`
3. **Animations**: Adjust timing in page components
4. **Content**: Update all text directly in page files

## Production Checklist

- [ ] Updated EmailJS credentials
- [ ] Changed WhatsApp number
- [ ] Updated all company information
- [ ] Added real job postings
- [ ] Updated social media links
- [ ] Tested all forms
- [ ] Tested on mobile devices
- [ ] Updated SEO metadata
- [ ] Created .env file (if needed)
- [ ] Tested build locally: `npm run build`

## Enjoy Your New Website! 🚀
