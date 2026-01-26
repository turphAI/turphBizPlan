# Turph AI Website

Next.js + Tailwind CSS website for turph.app

## Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation

```bash
cd turph-app
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
turph-app/
├── app/
│   ├── page.tsx              # Homepage
│   ├── contact/page.tsx      # Contact page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── public/                   # Static files
└── package.json
```

## Deployment to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Add Next.js site"
git push
```

### 2. Deploy to Vercel

- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repo (turphBizPlan)
- Select the `turph-app` folder as the root directory
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

### Colors
- Edit `app/globals.css` to change color scheme
- Or modify Tailwind config in `tailwind.config.ts`

### Content
- Homepage: `app/page.tsx`
- Contact: `app/contact/page.tsx`

### Fonts
- Default: System fonts via Tailwind
- To add custom fonts, edit `app/layout.tsx`

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Connect turph.app domain
3. ⏳ Set up Formspree contact form
4. ⏳ Start networking with your one-pager PDF
5. ⏳ After first customer, add case studies and expand site

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Documentation](https://vercel.com/docs)
