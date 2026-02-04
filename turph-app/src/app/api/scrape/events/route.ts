import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { parseICalFeed, parseRSSFeed } from '@/lib/services/event-scraper/feed-parser'
import { EventWebScraper } from '@/lib/services/event-scraper/web-scraper'
import { deduplicateEvents } from '@/lib/services/event-scraper/deduplicator'

// POST /api/scrape/events - Scrape events from all active sources
export async function POST(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get('authorization')
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get all active event sources
    const sources = await prisma.eventSource.findMany({
      where: { isActive: true },
    })

    let allScrapedEvents: any[] = []
    const scraper = new EventWebScraper()
    const results: any[] = []

    for (const source of sources) {
      try {
        let scrapedEvents: any[] = []

        // Scrape based on source type
        if (source.sourceType === 'ical') {
          scrapedEvents = await parseICalFeed(source.url, source.name)
        } else if (source.sourceType === 'rss') {
          scrapedEvents = await parseRSSFeed(source.url, source.name)
        } else if (source.sourceType === 'web_scrape') {
          // Use configured scraper or generic scraper
          if (source.name.toLowerCase().includes('mass innovation')) {
            scrapedEvents = await scraper.scrapeMassInnovationNights()
          } else if (source.name.toLowerCase().includes('venture cafe')) {
            scrapedEvents = await scraper.scrapeVentureCafe()
          } else if (source.scrapeConfig && typeof source.scrapeConfig === 'object' && 'selectors' in source.scrapeConfig) {
            scrapedEvents = await scraper.scrapeGeneric({
              url: source.url,
              organization: source.name,
              selectors: source.scrapeConfig.selectors as any,
            })
          }
        }

        // Add source reference to scraped events
        scrapedEvents = scrapedEvents.map(event => ({
          ...event,
          sourceId: source.id,
          tier: source.tier,
          entryMethod: 'scraped' as const,
        }))

        allScrapedEvents.push(...scrapedEvents)

        // Update last scraped timestamp
        await prisma.eventSource.update({
          where: { id: source.id },
          data: { lastScrapedAt: new Date() },
        })

        results.push({
          source: source.name,
          scraped: scrapedEvents.length,
          status: 'success',
        })
      } catch (error) {
        console.error(`Error scraping ${source.name}:`, error)
        results.push({
          source: source.name,
          scraped: 0,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    await scraper.close()

    // Deduplicate events
    const uniqueEvents = await deduplicateEvents(allScrapedEvents)

    // Save unique events to database
    let savedCount = 0
    for (const event of uniqueEvents) {
      try {
        await prisma.event.create({
          data: {
            name: event.name,
            url: event.url,
            eventType: event.eventType,
            organization: event.organization,
            location: event.location,
            startDate: event.startDate,
            endDate: event.endDate,
            description: event.description,
            tags: event.tags || [],
            tier: event.tier,
            sourceId: event.sourceId,
            externalId: event.externalId,
            entryMethod: 'scraped',
            lastScrapedAt: new Date(),
            isActive: true,
          },
        })
        savedCount++
      } catch (error) {
        console.error(`Error saving event ${event.name}:`, error)
      }
    }

    return NextResponse.json(
      {
        message: 'Event scraping completed',
        summary: {
          sourcesProcessed: sources.length,
          eventsScraped: allScrapedEvents.length,
          uniqueEvents: uniqueEvents.length,
          eventsSaved: savedCount,
        },
        results,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in event scraping:', error)
    return NextResponse.json(
      {
        error: 'Failed to scrape events',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// GET /api/scrape/events - Get scraping status and recent activity
export async function GET(request: NextRequest) {
  try {
    const sources = await prisma.eventSource.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        sourceType: true,
        tier: true,
        lastScrapedAt: true,
        scrapeFrequency: true,
      },
      orderBy: { lastScrapedAt: 'desc' },
    })

    const recentEvents = await prisma.event.findMany({
      where: {
        entryMethod: 'scraped',
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        source: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(
      {
        sources,
        recentEvents,
        summary: {
          activeSources: sources.length,
          recentScrapedEvents: recentEvents.length,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error getting scraping status:', error)
    return NextResponse.json(
      { error: 'Failed to get scraping status' },
      { status: 500 }
    )
  }
}
