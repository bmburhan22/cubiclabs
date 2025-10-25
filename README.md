# Cubiclabs - Futuristic 3D Business Website

A cutting-edge, futuristic business website built with Next.js 14, React Three Fiber, and modern animation libraries. Features stunning 3D visualizations, smooth animations, and a comprehensive business landing page.

## Features

- **3D Hero Section**: Interactive 3D geometric objects powered by Three.js and React Three Fiber
- **MacBook Scroll Animation**: Beautiful scroll-triggered MacBook display showcasing your product
- **Responsive Navigation**: Glassmorphism effect with smooth animations
- **Multiple Pages**:
  - Home: 3D hero with typing animations, MacBook scroll, and feature showcase
  - About: Company story with timeline and values
  - Pricing: Animated pricing cards with filtering
  - Contact: Form with EmailJS integration
  - Careers: Job listings with search and filters
  - Job Application: Dynamic job details with application form
- **WhatsApp Integration**: Floating chat button for instant communication
- **Email Functionality**: Contact forms and job applications via EmailJS
- **Modern UI**: Futuristic design with cyber theme, gradients, and animations
- **Fully Responsive**: Mobile-first design that works on all devices

## Tech Stack

### Core
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling

### 3D & Animations
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Helper components for 3D
- **Three.js** - 3D graphics library
- **Framer Motion** - Smooth animations
- **GSAP** - Advanced animation sequences
- **React Type Animation** - Typing effects

### Forms & Validation
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **EmailJS** - Email service (no backend needed)

### UI Components
- **Lucide React** - Modern icons
- **React Hot Toast** - Notifications

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cubiclabs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup EmailJS** (Important!)

   a. Go to [EmailJS](https://www.emailjs.com/) and create a free account

   b. Create an email service (Gmail, Outlook, etc.)

   c. Create two email templates:
      - **Contact Form Template**: For contact page submissions
      - **Job Application Template**: For career applications

   d. Copy your credentials and update `lib/email/emailjs.ts`:
   ```typescript
   export const EMAILJS_CONFIG = {
     SERVICE_ID: 'your_service_id',
     CONTACT_TEMPLATE_ID: 'your_contact_template_id',
     APPLICATION_TEMPLATE_ID: 'your_application_template_id',
     PUBLIC_KEY: 'your_public_key',
   };
   ```

4. **Configure WhatsApp**

   Update the phone number in `components/layout/WhatsAppButton.tsx`:
   ```typescript
   const phoneNumber = 'YOUR_WHATSAPP_NUMBER'; // e.g., '1234567890'
   ```

5. **Customize Content**

   - **Jobs**: Edit `data/jobs.json` to add/remove job postings
   - **Footer**: Update contact info in `components/layout/Footer.tsx`
   - **Social Links**: Update social media URLs in `components/layout/Footer.tsx`
   - **Company Info**: Update metadata in `app/layout.tsx`

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Project Structure

```
cubiclabs/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page
│   ├── careers/             # Careers page
│   │   └── [jobId]/        # Dynamic job application page
│   ├── contact/             # Contact page
│   ├── pricing/             # Pricing page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── 3d/                  # Three.js 3D components
│   │   ├── Scene.tsx
│   │   ├── FloatingCube.tsx
│   │   ├── FloatingTorus.tsx
│   │   ├── ParticleField.tsx
│   │   └── HeroScene.tsx
│   ├── layout/              # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppButton.tsx
│   ├── ui/                  # UI components
│   └── forms/               # Form components
├── data/                    # JSON data files
│   └── jobs.json           # Job listings
├── lib/                     # Utility functions
│   ├── email/              # Email configuration
│   │   └── emailjs.ts
│   └── utils/              # Helper functions
│       └── cn.ts
├── public/                  # Static assets
│   ├── images/
│   └── models/
├── tailwind.config.ts       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── tsconfig.json            # TypeScript configuration
```

## Customization Guide

### Changing Colors

Edit `tailwind.config.ts` to customize the cyber theme:

```typescript
colors: {
  cyber: {
    pink: "#ff006e",      // Main pink accent
    blue: "#00f0ff",      // Main blue accent
    purple: "#8b5cf6",    // Purple accent
    green: "#00ff87",     // Green accent
  },
}
```

### Adding New Jobs

Edit `data/jobs.json`:

```json
{
  "id": "job-005",
  "title": "Your Job Title",
  "department": "Department Name",
  "location": "Location",
  "type": "Full-time",
  "experience": "3+ years",
  "description": "Job description...",
  "responsibilities": ["..."],
  "requirements": ["..."],
  "benefits": ["..."],
  "isActive": true,
  "postedDate": "2024-10-25"
}
```

### Modifying 3D Scene

Edit `components/3d/HeroScene.tsx` to add/remove 3D objects:

```tsx
<FloatingCube position={[0, 0, 0]} size={1.5} color="#00f0ff" />
<FloatingTorus position={[2, 1, -1]} color="#ff006e" />
```

### Updating Metadata (SEO)

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Company Name",
  description: "Your description",
  // ... other metadata
};
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy with one click

### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Deploy

### Other Platforms

The site can be deployed to any platform that supports Next.js applications.

## EmailJS Template Setup

### Contact Form Template

Use these variables in your EmailJS template:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Email subject
- `{{message}}` - Email message
- `{{to_name}}` - Recipient (e.g., "Cubiclabs Team")

### Job Application Template

Use these variables:
- `{{from_name}}` - Applicant's name
- `{{from_email}}` - Applicant's email
- `{{phone}}` - Phone number
- `{{address}}` - Address
- `{{job_id}}` - Job ID
- `{{job_title}}` - Job title
- `{{message}}` - Cover letter
- `{{to_name}}` - Recipient (e.g., "Cubiclabs HR Team")

## Performance Optimization

The website is optimized for performance with:
- Code splitting
- Lazy loading for 3D components
- Optimized images
- Minimal JavaScript bundle

For better 3D performance:
- Reduce particle count in `ParticleField.tsx`
- Disable orbit controls in production
- Use lower polygon 3D models

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Note: 3D features require WebGL support.

## Contributing

Feel free to submit issues or pull requests to improve the website.

## License

MIT License - feel free to use this for your own projects!

## Support

For questions or issues:
- Email: info@cubiclabs.com
- WhatsApp: Use the floating button on the site

## Acknowledgments

- Built with Next.js and React
- 3D graphics powered by Three.js
- Animations by Framer Motion and GSAP
- Icons by Lucide React
- Email service by EmailJS
