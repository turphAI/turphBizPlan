# Turph AI Internal Dashboard (turph-app)

Internal business tool for tracking projects, customers, and operations. NOT publicly accessible.

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

## Purpose

This is an internal tool for:
- Tracking customer projects and engagements
- Managing business operations
- Internal reporting and analytics
- Business metrics and KPIs

**NOT deployed to production or publicly accessible.**

## Structure

```
turph-app/
├── app/
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── page.tsx              # Internal dashboard (placeholder)
├── public/                   # Static files
└── package.json
```

## Development Notes

- This app is for internal use only
- Build custom pages/dashboards as needed
- Not connected to public domain
- Use for operational tracking, CRM, reporting, etc.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

## Important

- **This is INTERNAL only** - not for public consumption
- See `/website/` for the public-facing turph.app site
- See separate `turphdesigns` repo for portfolio site
