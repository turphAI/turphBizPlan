'use client'

import { useState } from 'react'
import { useCompanies } from '@/lib/hooks/useData'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Building2, Globe, MapPin, Users, Plus, Pencil, Trash2, MoreVertical } from 'lucide-react'
import { CompanyForm } from '@/components/forms/company-form'
import { DeleteDialog } from '@/components/forms/delete-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Company } from '@/lib/types'

export function CompaniesView() {
  const { data: companies, isLoading, error, refetch } = useCompanies()
  const [formOpen, setFormOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | undefined>()
  const [deletingCompany, setDeletingCompany] = useState<Company | undefined>()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = (company: Company) => {
    setEditingCompany(company)
    setFormOpen(true)
  }

  const handleDelete = async () => {
    if (!deletingCompany) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/companies/${deletingCompany.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete company')

      refetch()
      setDeletingCompany(undefined)
    } catch (error) {
      console.error('Error deleting company:', error)
      alert('Failed to delete company. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleFormSuccess = () => {
    refetch()
    setEditingCompany(undefined)
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
        <p className="text-destructive">Error loading companies: {error}</p>
        <Button onClick={refetch}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="text-2xl font-semibold">Companies</h2>
          <p className="text-sm text-muted-foreground">{companies.length} companies</p>
        </div>
        <Button size="sm" onClick={() => { setEditingCompany(undefined); setFormOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Company
        </Button>
      </div>

      {companies.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <p className="text-muted-foreground">No companies yet</p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Company
          </Button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid gap-4">
            {companies.map((company) => (
              <div
                key={company.id}
                className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 cursor-pointer" onClick={() => handleEdit(company)}>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-muted-foreground" />
                      <h3 className="font-semibold text-lg">{company.name}</h3>
                    </div>

                    {company.industry && (
                      <p className="mt-1 text-sm text-muted-foreground">{company.industry}</p>
                    )}

                    <div className="flex flex-col gap-1 mt-2">
                      {company.location && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{company.location}</span>
                        </div>
                      )}
                      {company.website && (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <Globe className="w-3 h-3" />
                          <span>Website</span>
                        </a>
                      )}
                      {company.people && company.people.length > 0 && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="w-3 h-3" />
                          <span>{company.people.length} contact{company.people.length !== 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>

                    {company.tags && company.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {company.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {company.description && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {company.description}
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
                      <DropdownMenuItem onClick={() => handleEdit(company)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletingCompany(company)}
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

      <CompanyForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) setEditingCompany(undefined)
        }}
        onSuccess={handleFormSuccess}
        company={editingCompany}
      />

      <DeleteDialog
        open={!!deletingCompany}
        onOpenChange={(open) => !open && setDeletingCompany(undefined)}
        onConfirm={handleDelete}
        title="Delete Company"
        description={`Are you sure you want to delete ${deletingCompany?.name}? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  )
}
