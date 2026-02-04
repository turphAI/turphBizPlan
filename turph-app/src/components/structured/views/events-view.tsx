'use client'

import { useEvents } from '@/lib/hooks/useData'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Calendar, MapPin, DollarSign, Plus, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'

export function EventsView() {
  const { data: events, isLoading, error, refetch } = useEvents({ upcoming: 'true' })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-destructive">Error loading events: {error}</p>
        <Button onClick={refetch}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="text-2xl font-semibold">Events</h2>
          <p className="text-sm text-muted-foreground">{events.length} upcoming events</p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <p className="text-muted-foreground">No upcoming events</p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Event
          </Button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{event.name}</h3>
                      {event.tier === 'tier1' && (
                        <Badge variant="default" className="text-xs">Priority</Badge>
                      )}
                      {event.entryMethod === 'manual' && (
                        <Badge variant="outline" className="text-xs">Manual</Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      {event.startDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(event.startDate), 'MMM d, yyyy')}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.cost && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{event.cost === '0' ? 'Free' : `$${event.cost}`}</span>
                        </div>
                      )}
                    </div>

                    {event.organization && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        Hosted by {event.organization}
                      </p>
                    )}

                    {event.tags && event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {event.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {event.url && (
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline"
                      >
                        View Details
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
