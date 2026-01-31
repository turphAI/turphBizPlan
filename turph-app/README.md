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
- Market intelligence and competitive analysis for the greater Boston region

**NOT deployed to production or publicly accessible.**

## Market Intelligence Agent

### Overview
This application includes a continual process agent for market awareness and competitive intelligence specific to the greater Boston region. The agent automatically monitors and aggregates market data from various sources.

### Market Data Integration

The market intelligence component requires the following MCP (Model Context Protocol) server implementation:

**LinkedIn MCP Server** (felipfr/LinkedIn-MCP-Server)
- **Language**: TypeScript
- **Purpose**: Pull LinkedIn market intelligence, industry trends, and professional network data
- **Implementation**: Self-hosted Node.js server
- **Features**:
  - Integrates with LinkedIn APIs where available
  - Designed for Claude and other MCP-compatible assistants
  - Enables programmatic access to market awareness data
- **Repository**: [felipfr/LinkedIn-MCP-Server](https://github.com/felipfr/LinkedIn-MCP-Server)

### Data Collection Strategy

The agent performs:
- Web scraping of configured URLs for market information
- LinkedIn data aggregation via MCP server
- Competitive positioning analysis
- Regional market trend tracking
- Automated data collection and synthesis

### Setup Instructions

1. Install and configure the LinkedIn MCP Server locally
2. Update environment variables with LinkedIn API credentials
3. Configure target URLs for web scraping in the market intelligence module
4. Enable the market agent in the application configuration

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
