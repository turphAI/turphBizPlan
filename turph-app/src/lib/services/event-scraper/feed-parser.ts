import ical from 'ical'

export interface ScrapedEvent {
  name: string
  url?: string
  eventType: 'meetup' | 'conference' | 'workshop' | 'networking' | 'other'
  organization?: string
  location?: string
  startDate: Date
  endDate?: Date
  description?: string
  tags?: string[]
  externalId?: string
}

/**
 * Parse an iCal feed URL and extract events
 */
export async function parseICalFeed(feedUrl: string, organizationName: string): Promise<ScrapedEvent[]> {
  try {
    const events: ScrapedEvent[] = []
    
    // Fetch and parse the iCal feed
    const data = await ical.async.fromURL(feedUrl)
    
    for (const k in data) {
      const event = data[k]
      
      if (event.type === 'VEVENT') {
        // Only include future events
        const startDate = new Date(event.start)
        if (startDate < new Date()) {
          continue
        }

        events.push({
          name: event.summary || 'Untitled Event',
          url: event.url,
          eventType: categorizeEvent(event.summary || '', event.description || ''),
          organization: organizationName,
          location: event.location || undefined,
          startDate: startDate,
          endDate: event.end ? new Date(event.end) : undefined,
          description: event.description,
          tags: extractTags(event.summary || '', event.description || ''),
          externalId: event.uid,
        })
      }
    }

    return events
  } catch (error) {
    console.error(`Error parsing iCal feed from ${feedUrl}:`, error)
    throw error
  }
}

/**
 * Categorize event based on title and description keywords
 */
function categorizeEvent(title: string, description: string): 'meetup' | 'conference' | 'workshop' | 'networking' | 'other' {
  const text = `${title} ${description}`.toLowerCase()
  
  if (text.match(/\b(workshop|tutorial|training|hands-on|lab)\b/)) {
    return 'workshop'
  }
  if (text.match(/\b(conference|summit|symposium)\b/)) {
    return 'conference'
  }
  if (text.match(/\b(meetup|meet-up|networking|mixer|social)\b/)) {
    return 'networking'
  }
  if (text.match(/\b(meetup|gathering|community)\b/)) {
    return 'meetup'
  }
  
  return 'other'
}

/**
 * Extract relevant tags from event title and description
 */
function extractTags(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase()
  const tags: Set<string> = new Set()
  
  // Technology tags
  const techKeywords = ['ai', 'ml', 'machine learning', 'artificial intelligence', 
                       'data science', 'startup', 'entrepreneurship', 'innovation',
                       'software', 'tech', 'blockchain', 'web3', 'cloud']
  
  for (const keyword of techKeywords) {
    if (text.includes(keyword)) {
      tags.add(keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
    }
  }
  
  // Location tags
  if (text.includes('boston')) tags.add('Boston')
  if (text.includes('cambridge')) tags.add('Cambridge')
  if (text.includes('mit')) tags.add('MIT')
  
  return Array.from(tags)
}

/**
 * Parse RSS feed (simpler format than iCal)
 */
export async function parseRSSFeed(feedUrl: string, organizationName: string): Promise<ScrapedEvent[]> {
  try {
    const response = await fetch(feedUrl)
    const xml = await response.text()
    
    // Basic RSS parsing (would need a proper RSS parser for production)
    const events: ScrapedEvent[] = []
    
    // This is a simplified example - in production, use a proper RSS parser
    const itemRegex = /<item>([\s\S]*?)<\/item>/g
    const titleRegex = /<title>(.*?)<\/title>/
    const linkRegex = /<link>(.*?)<\/link>/
    const descRegex = /<description>(.*?)<\/description>/
    const dateRegex = /<pubDate>(.*?)<\/pubDate>/
    
    let match
    while ((match = itemRegex.exec(xml)) !== null) {
      const itemXml = match[1]
      
      const title = titleRegex.exec(itemXml)?.[1] || 'Untitled Event'
      const link = linkRegex.exec(itemXml)?.[1]
      const description = descRegex.exec(itemXml)?.[1]
      const dateStr = dateRegex.exec(itemXml)?.[1]
      
      if (dateStr) {
        const startDate = new Date(dateStr)
        
        if (startDate >= new Date()) {
          events.push({
            name: title,
            url: link,
            eventType: categorizeEvent(title, description || ''),
            organization: organizationName,
            startDate,
            description,
            tags: extractTags(title, description || ''),
          })
        }
      }
    }
    
    return events
  } catch (error) {
    console.error(`Error parsing RSS feed from ${feedUrl}:`, error)
    throw error
  }
}
