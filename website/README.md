# Turph AI Website (turph.app)

Public-facing Next.js website for consulting services.

## Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation

```bash
cd website
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
website/
├── app/
│   ├── page.tsx              # Homepage
│   ├── contact/page.tsx      # Contact page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── public/                   # Static files
└── package.json
```

## Pages

### Homepage (/)
- Hero section with value proposition
- Problem statement and solution explanation
- The embedded approach (how it works)
- Why it works (3 differentiators)
- About/credentials section
- Call to action

### Contact (/contact)
- Direct contact information
- Contact form (Formspree)
- Social links (LinkedIn)

## Deployment to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Update website for public launch"
git push
```

### 2. Deploy to Vercel

- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repo (turphBizPlan)
- Select the `website` folder as the root directory
- Deploy

### 3. Connect Domain (turph.app)

In Vercel:
- Go to Settings → Domains
- Add domain: turph.app
- Vercel will provide nameservers

In DreamHost:
- Go to DNS settings for turph.app
- Replace current nameservers with Vercel's nameservers
- Wait 24-48 hours for propagation

## Contact Form Setup

The contact form uses Formspree. To enable it:

1. Go to [formspree.io](https://formspree.io)
2. Sign up and create a new form
3. Copy your form ID
4. In `app/contact/page.tsx`, replace `YOUR_FORM_ID` with your actual form ID
5. Redeploy

## Customization

### Colors & Styling
- Edit `app/globals.css` to change color scheme
- Or modify Tailwind config in `tailwind.config.ts`

### Content
- Homepage: `app/page.tsx`
- Contact: `app/contact/page.tsx`

### Add More Pages
Create new files in `app/[page-name]/page.tsx` and follow the same pattern.

## Environment Variables

None required for basic setup. Formspree handles form submissions without environment variables.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Documentation](https://vercel.com/docs)
- [Formspree](https://formspree.io)

## Important Notes

- This is the PUBLIC website for turph.app
- For internal business tools, see `/turph-app/`
- Portfolio site will be separate (`turphdesigns.com`)
