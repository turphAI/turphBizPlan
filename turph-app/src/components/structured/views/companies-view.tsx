'use client'

import { useCompanies } from '@/lib/hooks/useData'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Building2, Globe, MapPin, Users, Plus } from 'lucide-react'

export function CompaniesView() {
  const { data: companies, isLoading, error, refetch } = useCompanies()

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
        <Button size="sm">
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
                className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
