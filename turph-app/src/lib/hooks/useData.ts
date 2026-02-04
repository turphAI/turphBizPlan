import { useEffect, useState } from 'react'
import type { Person, Company, Event, NetworkingInteraction } from '@/lib/types'

interface UseDataResult<T> {
  data: T[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

// Generic data fetching hook
function useData<T>(endpoint: string, params: Record<string, string> = {}): UseDataResult<T> {
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const queryString = new URLSearchParams(params).toString()
      const url = `/api/${endpoint}${queryString ? `?${queryString}` : ''}`
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}`)
      }
      
      const result = await response.json()
      setData(result.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [endpoint, JSON.stringify(params)])

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  }
}

// Specific hooks for each entity
export function usePeople(params: Record<string, string> = {}) {
  return useData<Person>('people', { includeCompany: 'true', ...params })
}

export function useCompanies(params: Record<string, string> = {}) {
  return useData<Company>('companies', { includePeople: 'true', ...params })
}

export function useEvents(params: Record<string, string> = {}) {
  return useData<Event>('events', { includeSource: 'true', ...params })
}

export function useInteractions(params: Record<string, string> = {}) {
  return useData<NetworkingInteraction>('interactions', { includePerson: 'true', ...params })
}

// Stats hook for dashboard
export function useStats() {
  const { data: people } = usePeople()
  const { data: companies } = useCompanies()
  const { data: events } = useEvents()
  const { data: interactions } = useInteractions()

  return {
    peopleCount: people.length,
    companiesCount: companies.length,
    eventsCount: events.length,
    interactionsCount: interactions.length,
    upcomingEvents: events.filter(e => new Date(e.startDate) > new Date()).length,
    activePeople: people.filter(p => p.isActive).length,
  }
}
