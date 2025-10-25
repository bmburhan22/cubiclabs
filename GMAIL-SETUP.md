# 📧 Gmail Setup Guide

## How to Get Gmail App Password

Your website now uses **Gmail with Nodemailer** to send emails directly (no third-party services needed!).

---

## ✅ What You Need

1. A Gmail account
2. A Gmail App Password (NOT your regular password)

---

## 🔐 Creating Gmail App Password

### Step 1: Enable 2-Factor Authentication

**You MUST have 2FA enabled to create app passwords**

1. Go to https://myaccount.google.com/security
2. Under "Signing in to Google", click **2-Step Verification**
3. Follow the steps to enable it (if not already enabled)

### Step 2: Create App Password

1. Go to https://myaccount.google.com/apppasswords
   - Or: Google Account → Security → 2-Step Verification → App passwords

2. Click **Select app** → Choose **Mail**

3. Click **Select device** → Choose **Other (Custom name)**

4. Type: **Cubiclabs Website**

5. Click **Generate**

6. You'll see a 16-character password like: `abcd efgh ijkl mnop`

7. **COPY THIS PASSWORD** - You won't see it again!

---

## 🛠️ Configure Your Website

### Step 1: Create .env File

Create a file named `.env` in your project root (where package.json is):

```bash
# In: C:\Users\USER\burhan\cubiclabs\.env
```

### Step 2: Add Your Credentials

Paste this into your `.env` file:

```env
GMAIL_USER=your.actual.email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

**Important:**
- Replace `your.actual.email@gmail.com` with YOUR Gmail address
- Replace `abcdefghijklmnop` with the 16-character app password (remove spaces)
- The app password should be 16 characters with NO SPACES

### Example:

```env
GMAIL_USER=john.doe@gmail.com
GMAIL_APP_PASSWORD=xyzabc123456defg
```

---

## ✅ Test It

1. Save your `.env` file

2. Restart your dev server:
   ```bash
   npm run dev
   ```

3. Go to http://localhost:3000/contact

4. Fill out the contact form

5. Submit it

6. Check your Gmail inbox - you should receive the email!

---

## 🔒 Security Notes

### ✅ DO:
- Use App Passwords (not your regular password)
- Keep your `.env` file private
- Add `.env` to `.gitignore` (already done)
- Use a dedicated Gmail account if possible

### ❌ DON'T:
- Share your App Password with anyone
- Commit `.env` to Git
- Use your regular Gmail password
- Share credentials publicly

---

## 🐛 Troubleshooting

### "Email service not configured"
→ Make sure `.env` file exists in project root with GMAIL_USER and GMAIL_APP_PASSWORD

### "Invalid credentials"
→ Double-check your app password is correct (16 characters, no spaces)

### "Less secure app access"
→ You don't need this anymore! Use App Passwords instead

### "Authentication failed"
→ Make sure 2FA is enabled on your Gmail account

### Emails not arriving
→ Check Gmail spam folder
→ Verify GMAIL_USER is correct
→ Make sure app password was copied correctly

---

## 📝 How It Works

When someone submits a form on your website:

1. Form data is sent to your API route (`/api/contact` or `/api/apply`)
2. API route uses Nodemailer to connect to Gmail
3. Email is sent from YOUR Gmail account TO YOUR Gmail account
4. You receive the email in your inbox
5. You can reply directly to the sender

---

## 💡 Benefits Over EmailJS

✅ **No third-party service** - Direct Gmail connection
✅ **More reliable** - Gmail's infrastructure
✅ **Better control** - You own the email system
✅ **Free** - No quotas or limits (within Gmail's limits)
✅ **Secure** - Credentials stay on your server
✅ **Professional** - Emails come from your domain

---

## 📧 Email Templates

Your website sends beautiful HTML emails with:

### Contact Form Email:
- Sender name and email
- Subject line
- Message content
- Reply-to address (so you can reply directly)

### Job Application Email:
- Applicant details (name, email, phone, address)
- Position applied for
- Job ID
- CV file name
- Cover letter

Both are formatted with your brand colors and are mobile-responsive!

---

## 🚀 Production Deployment

When deploying to Vercel/Netlify/etc:

1. Add environment variables in your hosting dashboard:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`

2. DO NOT commit your `.env` file

3. Keep your app password secret

---

## 🔄 Changing App Password

If you need to change it:

1. Go to https://myaccount.google.com/apppasswords
2. Remove old "Cubiclabs Website" app password
3. Create a new one
4. Update your `.env` file

---

## ✨ That's It!

You're now using professional email handling with Gmail!

**Quick Checklist:**
- [ ] 2FA enabled on Gmail
- [ ] App password created
- [ ] `.env` file created
- [ ] GMAIL_USER configured
- [ ] GMAIL_APP_PASSWORD configured
- [ ] Tested contact form
- [ ] Emails arriving in inbox

**Need help?** Check the troubleshooting section above!
