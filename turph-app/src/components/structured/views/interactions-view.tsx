'use client'

import { useState } from 'react'
import { useInteractions } from '@/lib/hooks/useData'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Calendar, User, Plus, MessageSquare, Coffee, Phone, Mail, Pencil, Trash2, MoreVertical } from 'lucide-react'
import { format } from 'date-fns'
import { InteractionForm } from '@/components/forms/interaction-form'
import { DeleteDialog } from '@/components/forms/delete-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { NetworkingInteraction } from '@/lib/types'

const interactionIcons = {
  meeting: Coffee,
  call: Phone,
  email: Mail,
  message: MessageSquare,
  other: MessageSquare,
}

export function InteractionsView() {
  const { data: interactions, isLoading, error, refetch } = useInteractions()
  const [formOpen, setFormOpen] = useState(false)
  const [editingInteraction, setEditingInteraction] = useState<NetworkingInteraction | undefined>()
  const [deletingInteraction, setDeletingInteraction] = useState<NetworkingInteraction | undefined>()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = (interaction: NetworkingInteraction) => {
    setEditingInteraction(interaction)
    setFormOpen(true)
  }

  const handleDelete = async () => {
    if (!deletingInteraction) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/interactions/${deletingInteraction.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete interaction')

      refetch()
      setDeletingInteraction(undefined)
    } catch (error) {
      console.error('Error deleting interaction:', error)
      alert('Failed to delete interaction. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleFormSuccess = () => {
    refetch()
    setEditingInteraction(undefined)
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
        <Button size="sm" onClick={() => { setEditingInteraction(undefined); setFormOpen(true); }}>
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
                    <div className="flex items-start gap-3 flex-1 cursor-pointer" onClick={() => handleEdit(interaction)}>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(interaction)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeletingInteraction(interaction)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <InteractionForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) setEditingInteraction(undefined)
        }}
        onSuccess={handleFormSuccess}
        interaction={editingInteraction}
      />

      <DeleteDialog
        open={!!deletingInteraction}
        onOpenChange={(open) => !open && setDeletingInteraction(undefined)}
        onConfirm={handleDelete}
        title="Delete Interaction"
        description={`Are you sure you want to delete this interaction? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  )
}
