import fs from 'fs'
import path from 'path'

export interface ParsedEventSource {
  name: string
  url: string
  sourceType: 'rss' | 'ical' | 'api' | 'web_scrape'
  tier: 'tier1' | 'tier2' | 'tier3'
  scrapeFrequency: 'daily' | 'weekly' | 'monthly'
  description?: string
  scrapeConfig?: Record<string, any>
}

export interface ParsedEvent {
  name: string
  url?: string
  eventType: 'meetup' | 'conference' | 'workshop' | 'networking' | 'other'
  organization?: string
  location?: string
  startDate: Date
  recurrence?: 'one_time' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  cost?: number
  description?: string
  tags?: string[]
  tier?: 'tier1' | 'tier2' | 'tier3'
  entryMethod: 'manual'
}

/**
 * Parse the eventURLS.md file and extract event sources and events
 */
export async function parseEventURLsFile(filePath: string): Promise<{
  eventSources: ParsedEventSource[]
  events: ParsedEvent[]
}> {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  const eventSources: ParsedEventSource[] = []
  const events: ParsedEvent[] = []

  let currentTier: 'tier1' | 'tier2' | 'tier3' = 'tier1'
  let currentEventName = ''
  let currentUrl = ''
  let currentDescription: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Detect tier changes
    if (line.includes('Tier 1:')) {
      currentTier = 'tier1'
    } else if (line.includes('Tier 2:')) {
      currentTier = 'tier2'
    } else if (line.includes('Tier 3:')) {
      currentTier = 'tier3'
    }

    // Detect event entries (numbered list items with bold names)
    const eventMatch = line.match(/^\d+\.\s+\*\*(.+?)\*\*/)
    if (eventMatch) {
      // Save previous event if exists
      if (currentEventName && currentUrl) {
        eventSources.push(createEventSource(
          currentEventName,
          currentUrl,
          currentTier,
          currentDescription.join(' ')
        ))
      }

      currentEventName = eventMatch[1]
      currentDescription = []
      currentUrl = ''
      continue
    }

    // Extract URL
    const urlMatch = line.match(/(?:URL|Event Calendar|Events):\s*(https?:\/\/[^\s)]+)/)
    if (urlMatch && currentEventName) {
      currentUrl = urlMatch[1]
    }

    // Extract description/why lines
    if (line.startsWith('- Why:') || line.startsWith('- What:') || line.startsWith('- Best for:')) {
      const desc = line.replace(/^- (?:Why|What|Best for):\s*/, '')
      currentDescription.push(desc)
    }

    // Extract specific events with dates
    const dateMatch = line.match(/When:.+?Next:\s*([A-Z][a-z]+\s+\d+,\s+\d{4})/)
    if (dateMatch && currentEventName && currentUrl) {
      const dateStr = dateMatch[1]
      try {
        const startDate = new Date(dateStr)
        if (!isNaN(startDate.getTime())) {
          events.push({
            name: currentEventName,
            url: currentUrl,
            eventType: 'networking',
            startDate,
            tier: currentTier,
            description: currentDescription.join(' '),
            tags: ['Boston', 'Networking'],
            entryMethod: 'manual',
          })
        }
      } catch (error) {
        console.error(`Error parsing date: ${dateStr}`, error)
      }
    }

    // Extract cost
    const costMatch = line.match(/Cost:\s*\$(\d+(?:\.\d{2})?)/)
    if (costMatch && events.length > 0) {
      events[events.length - 1].cost = parseFloat(costMatch[1])
    }

    // Extract location
    const locationMatch = line.match(/Where:\s*(.+)/)
    if (locationMatch && events.length > 0) {
      events[events.length - 1].location = locationMatch[1]
    }
  }

  // Save last event source
  if (currentEventName && currentUrl) {
    eventSources.push(createEventSource(
      currentEventName,
      currentUrl,
      currentTier,
      currentDescription.join(' ')
    ))
  }

  return { eventSources, events }
}

function createEventSource(
  name: string,
  url: string,
  tier: 'tier1' | 'tier2' | 'tier3',
  description: string
): ParsedEventSource {
  // Determine source type based on URL
  let sourceType: 'rss' | 'ical' | 'api' | 'web_scrape' = 'web_scrape'
  let scrapeFrequency: 'daily' | 'weekly' | 'monthly' = 'weekly'

  if (url.includes('calendar.mit.edu') || url.includes('calendar.northeastern.edu')) {
    sourceType = 'ical'
    scrapeFrequency = 'weekly'
  } else if (url.includes('eventbrite.com')) {
    sourceType = 'api'
    scrapeFrequency = 'weekly'
  } else if (url.includes('meetup.com')) {
    sourceType = 'web_scrape'
    scrapeFrequency = 'weekly'
  } else if (tier === 'tier1') {
    scrapeFrequency = 'daily'
  } else if (tier === 'tier2') {
    scrapeFrequency = 'weekly'
  } else {
    scrapeFrequency = 'monthly'
  }

  return {
    name,
    url,
    sourceType,
    tier,
    scrapeFrequency,
    description,
    scrapeConfig: {},
  }
}

/**
 * Get the default path to eventURLS.md file
 */
export function getEventURLsFilePath(): string {
  // In production, this would be the path to the file in the project
  return path.join(process.cwd(), '..', 'business-plan', 'research', 'eventURLS.md')
}
