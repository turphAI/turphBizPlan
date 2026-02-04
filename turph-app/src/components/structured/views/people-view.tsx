'use client'

import { useState } from 'react'
import { usePeople } from '@/lib/hooks/useData'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Mail, Building2, Plus, Pencil, Trash2, MoreVertical } from 'lucide-react'
import { PersonForm } from '@/components/forms/person-form'
import { DeleteDialog } from '@/components/forms/delete-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Person } from '@/lib/types'

export function PeopleView() {
  const { data: people, isLoading, error, refetch } = usePeople()
  const [formOpen, setFormOpen] = useState(false)
  const [editingPerson, setEditingPerson] = useState<Person | undefined>()
  const [deletingPerson, setDeletingPerson] = useState<Person | undefined>()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = (person: Person) => {
    setEditingPerson(person)
    setFormOpen(true)
  }

  const handleDelete = async () => {
    if (!deletingPerson) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/people/${deletingPerson.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete person')

      refetch()
      setDeletingPerson(undefined)
    } catch (error) {
      console.error('Error deleting person:', error)
      alert('Failed to delete person. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleFormSuccess = () => {
    refetch()
    setEditingPerson(undefined)
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
        <p className="text-destructive">Error loading people: {error}</p>
        <Button onClick={refetch}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="text-2xl font-semibold">People</h2>
          <p className="text-sm text-muted-foreground">{people.length} contacts</p>
        </div>
        <Button size="sm" onClick={() => { setEditingPerson(undefined); setFormOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Person
        </Button>
      </div>

      {people.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <p className="text-muted-foreground">No people yet</p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Contact
          </Button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid gap-4">
            {people.map((person) => (
              <div
                key={person.id}
                className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 cursor-pointer" onClick={() => handleEdit(person)}>
                    <h3 className="font-semibold text-lg">{person.name}</h3>
                    {person.title && (
                      <p className="text-sm text-muted-foreground">{person.title}</p>
                    )}
                    {person.company && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <Building2 className="w-3 h-3" />
                        <span>{person.company.name}</span>
                      </div>
                    )}
                    {person.email && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <span>{person.email}</span>
                      </div>
                    )}
                    {person.tags && person.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {person.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {person.notes && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {person.notes}
                      </p>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(person)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletingPerson(person)}
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

      <PersonForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) setEditingPerson(undefined)
        }}
        onSuccess={handleFormSuccess}
        person={editingPerson}
      />

      <DeleteDialog
        open={!!deletingPerson}
        onOpenChange={(open) => !open && setDeletingPerson(undefined)}
        onConfirm={handleDelete}
        title="Delete Person"
        description={`Are you sure you want to delete ${deletingPerson?.name}? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  )
}
