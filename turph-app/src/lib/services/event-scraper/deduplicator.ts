import { prisma } from '@/lib/db'
import { ScrapedEvent } from './feed-parser'

/**
 * Check if an event already exists in the database
 */
export async function isDuplicateEvent(event: ScrapedEvent): Promise<boolean> {
  // Check by external ID first (most reliable)
  if (event.externalId) {
    const existing = await prisma.event.findFirst({
      where: { externalId: event.externalId },
    })
    if (existing) return true
  }

  // Check by name and date combination
  const startDate = new Date(event.startDate)
  const dayStart = new Date(startDate)
  dayStart.setHours(0, 0, 0, 0)
  const dayEnd = new Date(startDate)
  dayEnd.setHours(23, 59, 59, 999)

  const existing = await prisma.event.findFirst({
    where: {
      name: event.name,
      startDate: {
        gte: dayStart,
        lte: dayEnd,
      },
    },
  })

  return !!existing
}

/**
 * Deduplicate a list of scraped events
 */
export async function deduplicateEvents(events: ScrapedEvent[]): Promise<ScrapedEvent[]> {
  const unique: ScrapedEvent[] = []
  const seen = new Set<string>()

  for (const event of events) {
    // Create a unique key for this event
    const key = event.externalId || `${event.name}-${event.startDate.toISOString()}`

    if (!seen.has(key)) {
      const isDuplicate = await isDuplicateEvent(event)
      if (!isDuplicate) {
        seen.add(key)
        unique.push(event)
      }
    }
  }

  return unique
}

/**
 * Calculate similarity score between two strings (0-1)
 */
function stringSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1

  if (longer.length === 0) return 1.0

  const editDistance = levenshteinDistance(longer.toLowerCase(), shorter.toLowerCase())
  return (longer.length - editDistance) / longer.length
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = []

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        )
      }
    }
  }

  return matrix[str2.length][str1.length]
}

/**
 * Find potential duplicate events using fuzzy matching
 */
export async function findPotentialDuplicates(
  event: ScrapedEvent,
  threshold: number = 0.8
): Promise<Array<{ id: string; name: string; similarity: number }>> {
  // Get events within a week of the target date
  const weekBefore = new Date(event.startDate)
  weekBefore.setDate(weekBefore.getDate() - 7)
  const weekAfter = new Date(event.startDate)
  weekAfter.setDate(weekAfter.getDate() + 7)

  const candidates = await prisma.event.findMany({
    where: {
      startDate: {
        gte: weekBefore,
        lte: weekAfter,
      },
    },
    select: {
      id: true,
      name: true,
      startDate: true,
    },
  })

  const potentialDuplicates: Array<{ id: string; name: string; similarity: number }> = []

  for (const candidate of candidates) {
    const similarity = stringSimilarity(event.name, candidate.name)
    if (similarity >= threshold) {
      potentialDuplicates.push({
        id: candidate.id,
        name: candidate.name,
        similarity,
      })
    }
  }

  return potentialDuplicates.sort((a, b) => b.similarity - a.similarity)
}
