'use client'

import { useInteractions } from '@/lib/hooks/useData'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Calendar, User, Plus, MessageSquare, Coffee, Phone, Mail } from 'lucide-react'
import { format } from 'date-fns'

const interactionIcons = {
  meeting: Coffee,
  call: Phone,
  email: Mail,
  message: MessageSquare,
  other: MessageSquare,
}

export function InteractionsView() {
  const { data: interactions, isLoading, error, refetch } = useInteractions()

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
        <p className="text-destructive">Error loading interactions: {error}</p>
        <Button onClick={refetch}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="text-2xl font-semibold">Interactions</h2>
          <p className="text-sm text-muted-foreground">{interactions.length} interactions</p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Interaction
        </Button>
      </div>

      {interactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <p className="text-muted-foreground">No interactions yet</p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Log Your First Interaction
          </Button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid gap-4">
            {interactions.map((interaction) => {
              const Icon = interactionIcons[interaction.interactionType] || MessageSquare
              
              return (
                <div
                  key={interaction.id}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {interaction.interactionType}
                        </Badge>
                        {interaction.date && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{format(new Date(interaction.date), 'MMM d, yyyy')}</span>
                          </div>
                        )}
                      </div>

                      {interaction.person && (
                        <div className="flex items-center gap-1 mt-1 text-sm font-medium">
                          <User className="w-3 h-3" />
                          <span>{interaction.person.name}</span>
                          {interaction.person.title && (
                            <span className="text-muted-foreground">
                              • {interaction.person.title}
                            </span>
                          )}
                        </div>
                      )}

                      {interaction.notes && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          {interaction.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
