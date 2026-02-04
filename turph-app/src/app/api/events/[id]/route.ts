import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/events/[id] - Get a single event
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const includePeople = searchParams.get('includePeople') === 'true'

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        source: true,
        eventPeople: includePeople ? { include: { person: true } } : false,
      },
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: event }, { status: 200 })
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}

// PATCH /api/events/[id] - Update an event
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const event = await prisma.event.update({
      where: { id },
      data: {
        name: body.name,
        url: body.url,
        eventType: body.eventType,
        organization: body.organization,
        location: body.location,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        recurrence: body.recurrence,
        cost: body.cost,
        description: body.description,
        tags: body.tags,
        tier: body.tier,
        attended: body.attended,
        attendedDate: body.attendedDate ? new Date(body.attendedDate) : undefined,
        notes: body.notes,
        isActive: body.isActive,
      },
      include: {
        source: true,
      },
    })

    return NextResponse.json({ data: event }, { status: 200 })
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    )
  }
}

// DELETE /api/events/[id] - Delete an event
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.event.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Event deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    )
  }
}
