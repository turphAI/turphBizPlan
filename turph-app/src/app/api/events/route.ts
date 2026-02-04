import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/events - List all events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeSource = searchParams.get('includeSource') === 'true'
    const includePeople = searchParams.get('includePeople') === 'true'
    const entryMethod = searchParams.get('entryMethod')
    const isActive = searchParams.get('isActive')
    const tier = searchParams.get('tier')
    const upcoming = searchParams.get('upcoming') === 'true'

    const where: any = {}
    
    if (isActive !== null) where.isActive = isActive === 'true'
    if (entryMethod) where.entryMethod = entryMethod
    if (tier) where.tier = tier
    if (upcoming) where.startDate = { gte: new Date() }

    const events = await prisma.event.findMany({
      where,
      include: {
        source: includeSource,
        eventPeople: includePeople ? { include: { person: true } } : false,
      },
      orderBy: { startDate: 'desc' },
    })

    return NextResponse.json({ data: events }, { status: 200 })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const event = await prisma.event.create({
      data: {
        name: body.name,
        url: body.url,
        eventType: body.eventType || 'other',
        organization: body.organization,
        location: body.location,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        recurrence: body.recurrence || 'one_time',
        cost: body.cost,
        description: body.description,
        tags: body.tags || [],
        tier: body.tier,
        sourceId: body.sourceId,
        externalId: body.externalId,
        entryMethod: body.entryMethod || 'manual',
        isActive: body.isActive ?? true,
      },
      include: {
        source: true,
      },
    })

    return NextResponse.json({ data: event }, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}
