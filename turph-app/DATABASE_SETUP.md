# Database Setup Guide

This guide will help you set up PlanetScale for the turph-app networking database.

## Prerequisites

- PlanetScale account (free tier available)
- Prisma CLI installed (already in package.json)

## Setup Steps

### 1. Create PlanetScale Database

1. Go to [PlanetScale](https://planetscale.com) and sign in/create account
2. Click "Create Database"
3. Name it `turph-app` (or your preferred name)
4. Select region closest to you (e.g., `us-east-1` for Boston)
5. Create database

### 2. Get Connection String

1. In your database dashboard, click "Connect"
2. Select "Prisma" from the dropdown
3. Copy the `DATABASE_URL` connection string
4. It should look like:
   ```
   mysql://USER:PASSWORD@HOST/DATABASE?sslaccept=strict
   ```

### 3. Configure Environment Variables

1. Create `.env` file in the `turph-app` directory:
   ```bash
   cd turph-app
   cp .env.example .env
   ```

2. Add your database URL to `.env`:
   ```
   DATABASE_URL="mysql://USER:PASSWORD@HOST/DATABASE?sslaccept=strict"
   ```

3. (Optional) Add other environment variables:
   ```
   CRON_SECRET="your-random-secret-for-cron-auth"
   ANTHROPIC_API_KEY="your-anthropic-key"
   EVENTBRITE_OAUTH_TOKEN="your-eventbrite-token"
   ```

### 4. Push Database Schema

Push the Prisma schema to PlanetScale:

```bash
npx prisma db push
```

This will create all tables:
- `people`
- `companies`
- `events`
- `event_sources`
- `event_people`
- `interactions`

### 5. Verify Setup

Check that tables were created:

```bash
npx prisma studio
```

This opens a GUI where you can view your database tables.

## Seeding Initial Data

### Import Event Sources

Once your database is set up, import your event sources from `eventURLS.md`:

```bash
# Using the API endpoint
curl -X POST http://localhost:3000/api/import/event-urls
```

Or use the import UI (once built).

## Database Maintenance

### View Database in Prisma Studio

```bash
npx prisma studio
```

### Generate Prisma Client (if schema changes)

```bash
npx prisma generate
```

### Reset Database (CAUTION: Deletes all data)

```bash
npx prisma db push --force-reset
```

## Vercel Deployment

When deploying to Vercel:

1. Add `DATABASE_URL` to Vercel environment variables:
   - Go to Project Settings → Environment Variables
   - Add `DATABASE_URL` with your PlanetScale connection string
   - Add `CRON_SECRET` for cron job authentication

2. Deploy your app - Prisma will automatically generate the client during build

3. After deployment, trigger the initial import:
   ```bash
   curl -X POST https://your-app.vercel.app/api/import/event-urls
   ```

## Cron Job Setup

The app includes a Vercel Cron job that runs daily at 8 AM UTC to scrape events.

Configuration in `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/scrape/events",
      "schedule": "0 8 * * *"
    }
  ]
}
```

The cron job will:
1. Fetch all active event sources
2. Scrape events from each source
3. Deduplicate events
4. Save new events to database

## Troubleshooting

### Connection Issues

- Verify `DATABASE_URL` is correct in `.env`
- Check PlanetScale database is active
- Ensure IP restrictions aren't blocking connection

### Prisma Errors

- Run `npx prisma generate` to regenerate client
- Check that `@prisma/client` is installed
- Verify schema syntax with `npx prisma validate`

### Missing Tables

- Run `npx prisma db push` again
- Check PlanetScale dashboard for any errors

## Cost Considerations

PlanetScale Free Tier:
- 5 GB storage
- 1 billion row reads/month
- 10 million row writes/month

This is more than sufficient for the turph-app networking database.
