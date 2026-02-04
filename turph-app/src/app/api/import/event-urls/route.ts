import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { parseEventURLsFile, getEventURLsFilePath } from '@/lib/services/data-import/eventURLs-parser'

// POST /api/import/event-urls - Import events from eventURLS.md
export async function POST(request: NextRequest) {
  try {
    const filePath = getEventURLsFilePath()
    
    // Parse the file
    const { eventSources, events } = await parseEventURLsFile(filePath)

    // Import event sources
    const createdSources = []
    for (const source of eventSources) {
      const existingSource = await prisma.eventSource.findFirst({
        where: { url: source.url },
      })

      if (!existingSource) {
        const created = await prisma.eventSource.create({
          data: {
            name: source.name,
            url: source.url,
            sourceType: source.sourceType,
            tier: source.tier,
            scrapeFrequency: source.scrapeFrequency,
            scrapeConfig: source.scrapeConfig || {},
            isActive: true,
          },
        })
        createdSources.push(created)
      }
    }

    // Import events
    const createdEvents = []
    for (const event of events) {
      // Check for duplicates
      const existingEvent = await prisma.event.findFirst({
        where: {
          name: event.name,
          startDate: event.startDate,
        },
      })

      if (!existingEvent) {
        const created = await prisma.event.create({
          data: {
            name: event.name,
            url: event.url,
            eventType: event.eventType,
            organization: event.organization,
            location: event.location,
            startDate: event.startDate,
            recurrence: event.recurrence || 'one_time',
            cost: event.cost,
            description: event.description,
            tags: event.tags || [],
            tier: event.tier,
            entryMethod: 'manual',
            isActive: true,
          },
        })
        createdEvents.push(created)
      }
    }

    return NextResponse.json(
      {
        message: 'Import completed successfully',
        summary: {
          eventSources: {
            total: eventSources.length,
            created: createdSources.length,
            skipped: eventSources.length - createdSources.length,
          },
          events: {
            total: events.length,
            created: createdEvents.length,
            skipped: events.length - createdEvents.length,
          },
        },
        data: {
          eventSources: createdSources,
          events: createdEvents,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error importing event URLs:', error)
    return NextResponse.json(
      {
        error: 'Failed to import event URLs',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// GET /api/import/event-urls - Preview what would be imported
export async function GET(request: NextRequest) {
  try {
    const filePath = getEventURLsFilePath()
    const { eventSources, events } = await parseEventURLsFile(filePath)

    return NextResponse.json(
      {
        message: 'Preview of importable data',
        summary: {
          eventSources: eventSources.length,
          events: events.length,
        },
        data: {
          eventSources,
          events,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error previewing event URLs:', error)
    return NextResponse.json(
      {
        error: 'Failed to preview event URLs',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
