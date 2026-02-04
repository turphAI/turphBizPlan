import { chromium, Browser, Page } from 'playwright'
import { ScrapedEvent } from './feed-parser'

/**
 * Generic web scraper for event websites
 */
export class EventWebScraper {
  private browser: Browser | null = null

  async initialize() {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: true })
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
    }
  }

  /**
   * Scrape events from Mass Innovation Nights
   */
  async scrapeMassInnovationNights(): Promise<ScrapedEvent[]> {
    await this.initialize()
    const page = await this.browser!.newPage()
    const events: ScrapedEvent[] = []

    try {
      await page.goto('https://mass.innovationnights.com/next-event/', {
        waitUntil: 'networkidle',
      })

      // Extract event information
      const eventData = await page.evaluate(() => {
        const result: any[] = []
        
        // Look for event titles
        const titles = document.querySelectorAll('h1, h2, h3')
        titles.forEach(title => {
          if (title.textContent?.toLowerCase().includes('event')) {
            result.push({
              title: title.textContent?.trim(),
            })
          }
        })

        return result
      })

      for (const data of eventData) {
        if (data.title) {
          events.push({
            name: data.title,
            url: 'https://mass.innovationnights.com/',
            eventType: 'networking',
            organization: 'Mass Innovation Nights',
            startDate: new Date(), // Would need more sophisticated date extraction
            tags: ['Boston', 'Innovation', 'Networking'],
            externalId: `min-${Date.now()}`,
          })
        }
      }
    } catch (error) {
      console.error('Error scraping Mass Innovation Nights:', error)
    } finally {
      await page.close()
    }

    return events
  }

  /**
   * Scrape events from Venture Cafe Cambridge
   */
  async scrapeVentureCafe(): Promise<ScrapedEvent[]> {
    await this.initialize()
    const page = await this.browser!.newPage()
    const events: ScrapedEvent[] = []

    try {
      await page.goto('https://www.venturecafecambridge.org/', {
        waitUntil: 'networkidle',
      })

      // Extract Thursday gatherings info
      const eventData = await page.evaluate(() => {
        const events: any[] = []
        const eventElements = document.querySelectorAll('[class*="event"], .event-item, .program')

        eventElements.forEach(el => {
          const title = el.querySelector('h2, h3, .title')?.textContent?.trim()
          const description = el.querySelector('p, .description')?.textContent?.trim()
          const link = el.querySelector('a')?.href

          if (title) {
            events.push({ title, description, link })
          }
        })

        return events
      })

      for (const data of eventData) {
        // Thursday gatherings are recurring weekly
        const nextThursday = getNextDayOfWeek(4) // 4 = Thursday

        events.push({
          name: data.title || 'Thursday Gathering',
          url: data.link || 'https://www.venturecafecambridge.org/',
          eventType: 'networking',
          organization: 'Venture Cafe Cambridge',
          location: 'MIT, Cambridge',
          startDate: nextThursday,
          description: data.description,
          tags: ['Boston', 'Cambridge', 'MIT', 'Founders'],
          externalId: `vc-${nextThursday.toISOString()}`,
        })
      }
    } catch (error) {
      console.error('Error scraping Venture Cafe:', error)
    } finally {
      await page.close()
    }

    return events
  }

  /**
   * Generic scraper that can be configured with selectors
   */
  async scrapeGeneric(config: {
    url: string
    organization: string
    selectors: {
      container?: string
      title: string
      date?: string
      location?: string
      description?: string
      link?: string
    }
  }): Promise<ScrapedEvent[]> {
    await this.initialize()
    const page = await this.browser!.newPage()
    const events: ScrapedEvent[] = []

    try {
      await page.goto(config.url, { waitUntil: 'networkidle' })

      const eventData = await page.evaluate((selectors) => {
        const results: any[] = []
        const containers = selectors.container 
          ? document.querySelectorAll(selectors.container)
          : [document.body]

        containers.forEach(container => {
          const title = container.querySelector(selectors.title)?.textContent?.trim()
          const date = selectors.date 
            ? container.querySelector(selectors.date)?.textContent?.trim()
            : null
          const location = selectors.location
            ? container.querySelector(selectors.location)?.textContent?.trim()
            : null
          const description = selectors.description
            ? container.querySelector(selectors.description)?.textContent?.trim()
            : null
          const link = selectors.link
            ? container.querySelector(selectors.link)?.getAttribute('href')
            : null

          if (title) {
            results.push({ title, date, location, description, link })
          }
        })

        return results
      }, config.selectors)

      for (const data of eventData) {
        events.push({
          name: data.title,
          url: data.link ? new URL(data.link, config.url).href : config.url,
          eventType: 'networking',
          organization: config.organization,
          location: data.location,
          startDate: data.date ? parseFlexibleDate(data.date) : new Date(),
          description: data.description,
          tags: ['Boston'],
          externalId: `${config.organization.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        })
      }
    } catch (error) {
      console.error(`Error scraping ${config.url}:`, error)
    } finally {
      await page.close()
    }

    return events
  }
}

/**
 * Get the next occurrence of a day of the week
 */
function getNextDayOfWeek(dayOfWeek: number): Date {
  const today = new Date()
  const currentDay = today.getDay()
  const daysUntilTarget = (dayOfWeek - currentDay + 7) % 7 || 7
  
  const targetDate = new Date(today)
  targetDate.setDate(today.getDate() + daysUntilTarget)
  targetDate.setHours(18, 0, 0, 0) // Default to 6 PM
  
  return targetDate
}

/**
 * Parse various date formats
 */
function parseFlexibleDate(dateStr: string): Date {
  // Try standard parsing first
  const parsed = new Date(dateStr)
  if (!isNaN(parsed.getTime())) {
    return parsed
  }

  // Try common formats
  const formats = [
    /(\w+)\s+(\d+),\s+(\d{4})/, // "January 15, 2026"
    /(\d+)\/(\d+)\/(\d{4})/, // "01/15/2026"
    /(\d+)-(\d+)-(\d{4})/, // "01-15-2026"
  ]

  for (const format of formats) {
    const match = dateStr.match(format)
    if (match) {
      return new Date(dateStr)
    }
  }

  // Default to current date if parsing fails
  return new Date()
}
