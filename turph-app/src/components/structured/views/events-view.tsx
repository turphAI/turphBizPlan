'use client'

import { useState } from 'react'
import { useEvents } from '@/lib/hooks/useData'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Calendar, MapPin, DollarSign, Plus, ExternalLink, Pencil, Trash2, MoreVertical } from 'lucide-react'
import { format } from 'date-fns'
import { EventForm } from '@/components/forms/event-form'
import { DeleteDialog } from '@/components/forms/delete-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Event } from '@/lib/types'

export function EventsView() {
  const { data: events, isLoading, error, refetch } = useEvents({ upcoming: 'true' })
  const [formOpen, setFormOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | undefined>()
  const [deletingEvent, setDeletingEvent] = useState<Event | undefined>()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setFormOpen(true)
  }

  const handleDelete = async () => {
    if (!deletingEvent) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/events/${deletingEvent.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete event')

      refetch()
      setDeletingEvent(undefined)
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Failed to delete event. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleFormSuccess = () => {
    refetch()
    setEditingEvent(undefined)
  }

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
        <Button size="sm" onClick={() => { setEditingEvent(undefined); setFormOpen(true); }}>
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
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 cursor-pointer" onClick={() => handleEdit(event)}>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(event)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletingEvent(event)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <EventForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) setEditingEvent(undefined)
        }}
        onSuccess={handleFormSuccess}
        event={editingEvent}
      />

      <DeleteDialog
        open={!!deletingEvent}
        onOpenChange={(open) => !open && setDeletingEvent(undefined)}
        onConfirm={handleDelete}
        title="Delete Event"
        description={`Are you sure you want to delete ${deletingEvent?.name}? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  )
}
