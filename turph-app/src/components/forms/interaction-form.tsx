'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { usePeople } from '@/lib/hooks/useData'
import type { NetworkingInteraction } from '@/lib/types'

interface InteractionFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  interaction?: NetworkingInteraction
  defaultPersonId?: string
}

export function InteractionForm({ open, onOpenChange, onSuccess, interaction, defaultPersonId }: InteractionFormProps) {
  const { data: people } = usePeople()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    personId: '',
    interactionType: 'meeting' as const,
    date: '',
    notes: '',
  })

  useEffect(() => {
    if (interaction) {
      setFormData({
        personId: interaction.personId || '',
        interactionType: interaction.interactionType || 'meeting',
        date: interaction.date ? new Date(interaction.date).toISOString().slice(0, 16) : '',
        notes: interaction.notes || '',
      })
    } else {
      const now = new Date().toISOString().slice(0, 16)
      setFormData({
        personId: defaultPersonId || '',
        interactionType: 'meeting',
        date: now,
        notes: '',
      })
    }
  }, [interaction, defaultPersonId, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const payload = {
        ...formData,
        date: formData.date ? new Date(formData.date).toISOString() : new Date().toISOString(),
      }

      const url = interaction ? `/api/interactions/${interaction.id}` : '/api/interactions'
      const method = interaction ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Failed to save interaction')

      onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving interaction:', error)
      alert('Failed to save interaction. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{interaction ? 'Edit Interaction' : 'Log New Interaction'}</DialogTitle>
          <DialogDescription>
            {interaction ? 'Update interaction details' : 'Record a conversation or meeting'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="person">Person *</Label>
            <Select value={formData.personId} onValueChange={(value) => setFormData({ ...formData, personId: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select person" />
              </SelectTrigger>
              <SelectContent>
                {people.map((person) => (
                  <SelectItem key={person.id} value={person.id}>
                    {person.name} {person.title ? `- ${person.title}` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="interactionType">Type *</Label>
              <Select value={formData.interactionType} onValueChange={(value: any) => setFormData({ ...formData, interactionType: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="message">Message</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date & Time *</Label>
              <Input
                id="date"
                type="datetime-local"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={6}
              placeholder="What did you discuss? Key takeaways, follow-up items, etc."
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !formData.personId}>
              {isLoading ? 'Saving...' : interaction ? 'Update' : 'Log Interaction'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
