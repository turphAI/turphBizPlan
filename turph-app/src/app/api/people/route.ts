import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/people - List all people
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeCompany = searchParams.get('includeCompany') === 'true'
    const includeRelations = searchParams.get('includeRelations') === 'true'
    const isActive = searchParams.get('isActive')

    const where = isActive !== null ? { isActive: isActive === 'true' } : undefined

    const people = await prisma.person.findMany({
      where,
      include: {
        company: includeCompany || includeRelations,
        eventPeople: includeRelations ? { include: { event: true } } : false,
        interactions: includeRelations,
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({ data: people }, { status: 200 })
  } catch (error) {
    console.error('Error fetching people:', error)
    return NextResponse.json(
      { error: 'Failed to fetch people' },
      { status: 500 }
    )
  }
}

// POST /api/people - Create a new person
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const person = await prisma.person.create({
      data: {
        name: body.name,
        linkedinUrl: body.linkedinUrl,
        title: body.title,
        companyId: body.companyId,
        location: body.location,
        email: body.email,
        phone: body.phone,
        tags: body.tags || [],
        notes: body.notes,
        lastContactedAt: body.lastContactedAt ? new Date(body.lastContactedAt) : null,
        nextFollowupAt: body.nextFollowupAt ? new Date(body.nextFollowupAt) : null,
        isActive: body.isActive ?? true,
      },
      include: {
        company: true,
      },
    })

    return NextResponse.json({ data: person }, { status: 201 })
  } catch (error) {
    console.error('Error creating person:', error)
    return NextResponse.json(
      { error: 'Failed to create person' },
      { status: 500 }
    )
  }
}
