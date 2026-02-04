import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/companies - List all companies
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includePeople = searchParams.get('includePeople') === 'true'
    const isActive = searchParams.get('isActive')

    const where = isActive !== null ? { isActive: isActive === 'true' } : undefined

    const companies = await prisma.company.findMany({
      where,
      include: {
        people: includePeople,
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({ data: companies }, { status: 200 })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    )
  }
}

// POST /api/companies - Create a new company
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const company = await prisma.company.create({
      data: {
        name: body.name,
        website: body.website,
        linkedinUrl: body.linkedinUrl,
        industry: body.industry,
        location: body.location,
        description: body.description,
        tags: body.tags || [],
        isActive: body.isActive ?? true,
      },
    })

    return NextResponse.json({ data: company }, { status: 201 })
  } catch (error) {
    console.error('Error creating company:', error)
    return NextResponse.json(
      { error: 'Failed to create company' },
      { status: 500 }
    )
  }
}
