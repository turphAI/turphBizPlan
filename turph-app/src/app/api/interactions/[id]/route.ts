import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/interactions/[id] - Get a single interaction
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const interaction = await prisma.networkingInteraction.findUnique({
      where: { id },
      include: {
        person: true,
      },
    })

    if (!interaction) {
      return NextResponse.json(
        { error: 'Interaction not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: interaction }, { status: 200 })
  } catch (error) {
    console.error('Error fetching interaction:', error)
    return NextResponse.json(
      { error: 'Failed to fetch interaction' },
      { status: 500 }
    )
  }
}

// PATCH /api/interactions/[id] - Update an interaction
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const interaction = await prisma.networkingInteraction.update({
      where: { id },
      data: {
        interactionType: body.interactionType,
        date: body.date ? new Date(body.date) : undefined,
        notes: body.notes,
      },
      include: {
        person: true,
      },
    })

    return NextResponse.json({ data: interaction }, { status: 200 })
  } catch (error) {
    console.error('Error updating interaction:', error)
    return NextResponse.json(
      { error: 'Failed to update interaction' },
      { status: 500 }
    )
  }
}

// DELETE /api/interactions/[id] - Delete an interaction
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.networkingInteraction.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Interaction deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting interaction:', error)
    return NextResponse.json(
      { error: 'Failed to delete interaction' },
      { status: 500 }
    )
  }
}
