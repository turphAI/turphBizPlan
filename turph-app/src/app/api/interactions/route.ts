import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/interactions - List all interactions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const personId = searchParams.get('personId')
    const includePerson = searchParams.get('includePerson') === 'true'

    const where = personId ? { personId } : undefined

    const interactions = await prisma.interaction.findMany({
      where,
      include: {
        person: includePerson,
      },
      orderBy: { date: 'desc' },
    })

    return NextResponse.json({ data: interactions }, { status: 200 })
  } catch (error) {
    console.error('Error fetching interactions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch interactions' },
      { status: 500 }
    )
  }
}

// POST /api/interactions - Create a new interaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const interaction = await prisma.interaction.create({
      data: {
        personId: body.personId,
        interactionType: body.interactionType,
        date: new Date(body.date),
        notes: body.notes,
      },
      include: {
        person: true,
      },
    })

    return NextResponse.json({ data: interaction }, { status: 201 })
  } catch (error) {
    console.error('Error creating interaction:', error)
    return NextResponse.json(
      { error: 'Failed to create interaction' },
      { status: 500 }
    )
  }
}
