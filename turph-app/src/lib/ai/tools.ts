import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/lib/db'

// Tool definitions for Anthropic
export const tools: Anthropic.Tool[] = [
  {
    name: 'create_person',
    description: 'Create a new person in the networking database. Use when user wants to add a contact.',
    input_schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Full name of the person' },
        email: { type: 'string', description: 'Email address' },
        phone: { type: 'string', description: 'Phone number' },
        title: { type: 'string', description: 'Job title' },
        companyName: { type: 'string', description: 'Company name (we will find or create)' },
        location: { type: 'string', description: 'Location/city' },
        linkedinUrl: { type: 'string', description: 'LinkedIn profile URL' },
        tags: { type: 'array', items: { type: 'string' }, description: 'Tags like "AI", "Boston", "Founder"' },
        notes: { type: 'string', description: 'Notes about the person' },
      },
      required: ['name'],
    },
  },
  {
    name: 'create_company',
    description: 'Create a new company in the database.',
    input_schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Company name' },
        website: { type: 'string', description: 'Company website URL' },
        linkedinUrl: { type: 'string', description: 'Company LinkedIn URL' },
        industry: { type: 'string', description: 'Industry/sector' },
        location: { type: 'string', description: 'Location/city' },
        description: { type: 'string', description: 'Company description' },
        tags: { type: 'array', items: { type: 'string' }, description: 'Tags' },
      },
      required: ['name'],
    },
  },
  {
    name: 'create_event',
    description: 'Create a new networking event.',
    input_schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Event name' },
        url: { type: 'string', description: 'Event URL' },
        eventType: { type: 'string', enum: ['networking', 'conference', 'workshop', 'meetup', 'other'], description: 'Type of event' },
        organization: { type: 'string', description: 'Host organization' },
        location: { type: 'string', description: 'Event location' },
        startDate: { type: 'string', description: 'Start date/time in ISO format' },
        endDate: { type: 'string', description: 'End date/time in ISO format' },
        cost: { type: 'string', description: 'Cost in dollars (use "0" for free)' },
        description: { type: 'string', description: 'Event description' },
        tags: { type: 'array', items: { type: 'string' }, description: 'Tags' },
        tier: { type: 'string', enum: ['tier1', 'tier2', 'tier3'], description: 'Priority tier (tier1 = high priority)' },
      },
      required: ['name'],
    },
  },
  {
    name: 'create_interaction',
    description: 'Log an interaction with a person (meeting, call, email, etc).',
    input_schema: {
      type: 'object',
      properties: {
        personName: { type: 'string', description: 'Name of the person (we will look them up)' },
        interactionType: { type: 'string', enum: ['meeting', 'call', 'email', 'message', 'other'], description: 'Type of interaction' },
        date: { type: 'string', description: 'When the interaction occurred (ISO format). Use current time if not specified.' },
        notes: { type: 'string', description: 'Notes about the interaction' },
      },
      required: ['personName', 'interactionType'],
    },
  },
  {
    name: 'search_people',
    description: 'Search for people in the database by name, company, or tags.',
    input_schema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term (name, company, etc)' },
        tags: { type: 'array', items: { type: 'string' }, description: 'Filter by tags' },
      },
    },
  },
  {
    name: 'search_companies',
    description: 'Search for companies in the database.',
    input_schema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term' },
      },
    },
  },
  {
    name: 'search_events',
    description: 'Search for events. Can filter by upcoming, location, tags, etc.',
    input_schema: {
      type: 'object',
      properties: {
        upcoming: { type: 'boolean', description: 'Only upcoming events' },
        location: { type: 'string', description: 'Filter by location' },
        tags: { type: 'array', items: { type: 'string' }, description: 'Filter by tags' },
      },
    },
  },
  {
    name: 'get_person_interactions',
    description: 'Get all interactions with a specific person.',
    input_schema: {
      type: 'object',
      properties: {
        personName: { type: 'string', description: 'Name of the person' },
      },
      required: ['personName'],
    },
  },
  {
    name: 'update_person',
    description: 'Update an existing person\'s information.',
    input_schema: {
      type: 'object',
      properties: {
        personName: { type: 'string', description: 'Name of person to update' },
        updates: {
          type: 'object',
          description: 'Fields to update',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            title: { type: 'string' },
            location: { type: 'string' },
            notes: { type: 'string' },
          },
        },
      },
      required: ['personName', 'updates'],
    },
  },
  {
    name: 'delete_person',
    description: 'Delete a person from the database. Use with caution.',
    input_schema: {
      type: 'object',
      properties: {
        personName: { type: 'string', description: 'Name of person to delete' },
      },
      required: ['personName'],
    },
  },
]

// Tool execution handlers
export async function executeTool(toolName: string, toolInput: any): Promise<any> {
  try {
    switch (toolName) {
      case 'create_person': {
        // Find or create company if provided
        let companyId = null
        if (toolInput.companyName) {
          const company = await prisma.company.findFirst({
            where: {
              name: {
                contains: toolInput.companyName,
                mode: 'insensitive',
              },
            },
          })
          if (company) {
            companyId = company.id
          } else {
            const newCompany = await prisma.company.create({
              data: { name: toolInput.companyName },
            })
            companyId = newCompany.id
          }
        }

        const person = await prisma.person.create({
          data: {
            name: toolInput.name,
            email: toolInput.email,
            phone: toolInput.phone,
            title: toolInput.title,
            companyId,
            location: toolInput.location,
            linkedinUrl: toolInput.linkedinUrl,
            tags: toolInput.tags || [],
            notes: toolInput.notes,
          },
          include: { company: true },
        })
        return { success: true, person }
      }

      case 'create_company': {
        const company = await prisma.company.create({
          data: {
            name: toolInput.name,
            website: toolInput.website,
            linkedinUrl: toolInput.linkedinUrl,
            industry: toolInput.industry,
            location: toolInput.location,
            description: toolInput.description,
            tags: toolInput.tags || [],
          },
        })
        return { success: true, company }
      }

      case 'create_event': {
        const event = await prisma.event.create({
          data: {
            name: toolInput.name,
            url: toolInput.url,
            eventType: toolInput.eventType || 'networking',
            organization: toolInput.organization,
            location: toolInput.location,
            startDate: toolInput.startDate ? new Date(toolInput.startDate) : null,
            endDate: toolInput.endDate ? new Date(toolInput.endDate) : null,
            recurrence: 'one_time',
            cost: toolInput.cost || '0',
            description: toolInput.description,
            tags: toolInput.tags || [],
            tier: toolInput.tier || 'tier2',
            entryMethod: 'manual',
          },
        })
        return { success: true, event }
      }

      case 'create_interaction': {
        // Find person by name
        const person = await prisma.person.findFirst({
          where: {
            name: {
              contains: toolInput.personName,
              mode: 'insensitive',
            },
          },
        })

        if (!person) {
          return { success: false, error: `Person "${toolInput.personName}" not found. Please create them first.` }
        }

        const interaction = await prisma.networkingInteraction.create({
          data: {
            personId: person.id,
            interactionType: toolInput.interactionType,
            date: toolInput.date ? new Date(toolInput.date) : new Date(),
            notes: toolInput.notes,
          },
          include: { person: true },
        })
        return { success: true, interaction }
      }

      case 'search_people': {
        const where: any = {}
        if (toolInput.query) {
          where.OR = [
            { name: { contains: toolInput.query, mode: 'insensitive' } },
            { email: { contains: toolInput.query, mode: 'insensitive' } },
            { title: { contains: toolInput.query, mode: 'insensitive' } },
          ]
        }
        if (toolInput.tags && toolInput.tags.length > 0) {
          where.tags = { hasSome: toolInput.tags }
        }

        const people = await prisma.person.findMany({
          where,
          include: { company: true },
          take: 10,
        })
        return { success: true, people, count: people.length }
      }

      case 'search_companies': {
        const companies = await prisma.company.findMany({
          where: toolInput.query
            ? {
                OR: [
                  { name: { contains: toolInput.query, mode: 'insensitive' } },
                  { industry: { contains: toolInput.query, mode: 'insensitive' } },
                ],
              }
            : undefined,
          take: 10,
        })
        return { success: true, companies, count: companies.length }
      }

      case 'search_events': {
        const where: any = {}
        if (toolInput.upcoming) {
          where.startDate = { gte: new Date() }
        }
        if (toolInput.location) {
          where.location = { contains: toolInput.location, mode: 'insensitive' }
        }
        if (toolInput.tags && toolInput.tags.length > 0) {
          where.tags = { hasSome: toolInput.tags }
        }

        const events = await prisma.event.findMany({
          where,
          orderBy: { startDate: 'asc' },
          take: 10,
        })
        return { success: true, events, count: events.length }
      }

      case 'get_person_interactions': {
        const person = await prisma.person.findFirst({
          where: {
            name: {
              contains: toolInput.personName,
              mode: 'insensitive',
            },
          },
        })

        if (!person) {
          return { success: false, error: `Person "${toolInput.personName}" not found` }
        }

        const interactions = await prisma.networkingInteraction.findMany({
          where: { personId: person.id },
          orderBy: { date: 'desc' },
          include: { person: true },
        })
        return { success: true, interactions, count: interactions.length }
      }

      case 'update_person': {
        const person = await prisma.person.findFirst({
          where: {
            name: {
              contains: toolInput.personName,
              mode: 'insensitive',
            },
          },
        })

        if (!person) {
          return { success: false, error: `Person "${toolInput.personName}" not found` }
        }

        const updated = await prisma.person.update({
          where: { id: person.id },
          data: toolInput.updates,
          include: { company: true },
        })
        return { success: true, person: updated }
      }

      case 'delete_person': {
        const person = await prisma.person.findFirst({
          where: {
            name: {
              contains: toolInput.personName,
              mode: 'insensitive',
            },
          },
        })

        if (!person) {
          return { success: false, error: `Person "${toolInput.personName}" not found` }
        }

        await prisma.person.delete({
          where: { id: person.id },
        })
        return { success: true, deleted: person.name }
      }

      default:
        return { success: false, error: `Unknown tool: ${toolName}` }
    }
  } catch (error) {
    console.error(`Error executing tool ${toolName}:`, error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
