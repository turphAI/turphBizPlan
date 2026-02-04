import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST /api/events/bulk - Bulk create events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { events } = body

    if (!Array.isArray(events)) {
      return NextResponse.json(
        { error: 'Events must be an array' },
        { status: 400 }
      )
    }

    const created = await prisma.event.createMany({
      data: events.map((event: any) => ({
        name: event.name,
        url: event.url,
        eventType: event.eventType || 'other',
        organization: event.organization,
        location: event.location,
        startDate: new Date(event.startDate),
        endDate: event.endDate ? new Date(event.endDate) : null,
        recurrence: event.recurrence || 'one_time',
        cost: event.cost,
        description: event.description,
        tags: event.tags || [],
        tier: event.tier,
        sourceId: event.sourceId,
        externalId: event.externalId,
        entryMethod: event.entryMethod || 'manual',
        isActive: event.isActive ?? true,
      })),
      skipDuplicates: true,
    })

    return NextResponse.json(
      {
        message: `Successfully created ${created.count} events`,
        count: created.count,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error bulk creating events:', error)
    return NextResponse.json(
      { error: 'Failed to bulk create events' },
      { status: 500 }
    )
  }
}
