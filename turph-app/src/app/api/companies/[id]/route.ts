import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/companies/[id] - Get a single company
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const includePeople = searchParams.get('includePeople') === 'true'

    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        people: includePeople,
      },
    })

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: company }, { status: 200 })
  } catch (error) {
    console.error('Error fetching company:', error)
    return NextResponse.json(
      { error: 'Failed to fetch company' },
      { status: 500 }
    )
  }
}

// PATCH /api/companies/[id] - Update a company
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const company = await prisma.company.update({
      where: { id },
      data: {
        name: body.name,
        website: body.website,
        linkedinUrl: body.linkedinUrl,
        industry: body.industry,
        location: body.location,
        description: body.description,
        tags: body.tags,
        isActive: body.isActive,
      },
    })

    return NextResponse.json({ data: company }, { status: 200 })
  } catch (error) {
    console.error('Error updating company:', error)
    return NextResponse.json(
      { error: 'Failed to update company' },
      { status: 500 }
    )
  }
}

// DELETE /api/companies/[id] - Delete a company
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.company.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Company deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting company:', error)
    return NextResponse.json(
      { error: 'Failed to delete company' },
      { status: 500 }
    )
  }
}
