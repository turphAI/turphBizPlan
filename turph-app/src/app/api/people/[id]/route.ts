import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/people/[id] - Get a single person
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const includeRelations = searchParams.get('includeRelations') === 'true'

    const person = await prisma.person.findUnique({
      where: { id },
      include: {
        company: true,
        eventPeople: includeRelations ? { include: { event: true } } : false,
        interactions: includeRelations ? { orderBy: { date: 'desc' } } : false,
      },
    })

    if (!person) {
      return NextResponse.json(
        { error: 'Person not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: person }, { status: 200 })
  } catch (error) {
    console.error('Error fetching person:', error)
    return NextResponse.json(
      { error: 'Failed to fetch person' },
      { status: 500 }
    )
  }
}

// PATCH /api/people/[id] - Update a person
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const person = await prisma.person.update({
      where: { id },
      data: {
        name: body.name,
        linkedinUrl: body.linkedinUrl,
        title: body.title,
        companyId: body.companyId,
        location: body.location,
        email: body.email,
        phone: body.phone,
        tags: body.tags,
        notes: body.notes,
        lastContactedAt: body.lastContactedAt ? new Date(body.lastContactedAt) : undefined,
        nextFollowupAt: body.nextFollowupAt ? new Date(body.nextFollowupAt) : undefined,
        isActive: body.isActive,
      },
      include: {
        company: true,
      },
    })

    return NextResponse.json({ data: person }, { status: 200 })
  } catch (error) {
    console.error('Error updating person:', error)
    return NextResponse.json(
      { error: 'Failed to update person' },
      { status: 500 }
    )
  }
}

// DELETE /api/people/[id] - Delete a person
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.person.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Person deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting person:', error)
    return NextResponse.json(
      { error: 'Failed to delete person' },
      { status: 500 }
    )
  }
}
