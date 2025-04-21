"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Search, Filter, SortAsc, ArrowUpDown, Sliders } from "lucide-react"

interface FilterOption {
  key: string
  label: string
  enabled: boolean
  type: "price" | "rating" | "seller" | "category"
}

interface SortOption {
  key: string
  label: string
  enabled: boolean
}

interface SearchConfig {
  enableAutoSuggest: boolean
  enableVoiceSearch: boolean
  minSearchLength: number
  filterOptions: FilterOption[]
  sortOptions: SortOption[]
  showFilterBar: boolean
  showSortBar: boolean
}

interface SearchFormProps {
  appData: {
    id: number
    name: string
    search?: SearchConfig
  }
}

export function SearchForm({ appData }: SearchFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [config, setConfig] = useState<SearchConfig>(
    appData.search || {
      enableAutoSuggest: true,
      enableVoiceSearch: true,
      minSearchLength: 2,
      showFilterBar: true,
      showSortBar: true,
      filterOptions: [
        { key: "price", label: "Price Range", enabled: true, type: "price" },
        { key: "rating", label: "Rating", enabled: true, type: "rating" },
        { key: "seller", label: "Seller", enabled: true, type: "seller" },
        { key: "category", label: "Category", enabled: true, type: "category" }
      ],
      sortOptions: [
        { key: "price_asc", label: "Price: Low to High", enabled: true },
        { key: "price_desc", label: "Price: High to Low", enabled: true },
        { key: "rating", label: "Rating", enabled: true },
        { key: "newest", label: "Newest First", enabled: true }
      ]
    }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would make an API call to update the configuration
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast({
        title: "Success",
        description: "Search configuration updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update search configuration",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterToggle = (key: string, enabled: boolean) => {
    setConfig({
      ...config,
      filterOptions: config.filterOptions.map(option => 
        option.key === key ? { ...option, enabled } : option
      )
    })
  }

  const handleSortToggle = (key: string, enabled: boolean) => {
    setConfig({
      ...config,
      sortOptions: config.sortOptions.map(option => 
        option.key === key ? { ...option, enabled } : option
      )
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Search Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Search className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="auto-suggest" className="text-base">Auto Suggestions</Label>
                  <p className="text-sm text-muted-foreground">Show search suggestions as user types</p>
                </div>
              </div>
              <Switch
                id="auto-suggest"
                checked={config.enableAutoSuggest}
                onCheckedChange={(checked) => setConfig({ ...config, enableAutoSuggest: checked })}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Search className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="voice-search" className="text-base">Voice Search</Label>
                  <p className="text-sm text-muted-foreground">Enable voice search functionality</p>
                </div>
              </div>
              <Switch
                id="voice-search"
                checked={config.enableVoiceSearch}
                onCheckedChange={(checked) => setConfig({ ...config, enableVoiceSearch: checked })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="min-search">Minimum Search Length</Label>
              <Input
                id="min-search"
                type="number"
                min={1}
                max={5}
                value={config.minSearchLength}
                onChange={(e) => setConfig({ ...config, minSearchLength: Number(e.target.value) })}
                className="w-32"
              />
            </div>
          </div>

          {/* Filter Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="show-filter" className="text-base">Filter Bar</Label>
                  <p className="text-sm text-muted-foreground">Show filter options in search results</p>
                </div>
              </div>
              <Switch
                id="show-filter"
                checked={config.showFilterBar}
                onCheckedChange={(checked) => setConfig({ ...config, showFilterBar: checked })}
              />
            </div>

            {config.showFilterBar && (
              <div className="ml-9 space-y-4">
                <h4 className="font-medium">Available Filters</h4>
                {config.filterOptions.map((option) => (
                  <div key={option.key} className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-4">
                      <Sliders className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor={option.key} className="text-sm">{option.label}</Label>
                    </div>
                    <Switch
                      id={option.key}
                      checked={option.enabled}
                      onCheckedChange={(checked) => handleFilterToggle(option.key, checked)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sort Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <SortAsc className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="show-sort" className="text-base">Sort Bar</Label>
                  <p className="text-sm text-muted-foreground">Show sorting options in search results</p>
                </div>
              </div>
              <Switch
                id="show-sort"
                checked={config.showSortBar}
                onCheckedChange={(checked) => setConfig({ ...config, showSortBar: checked })}
              />
            </div>

            {config.showSortBar && (
              <div className="ml-9 space-y-4">
                <h4 className="font-medium">Available Sort Options</h4>
                {config.sortOptions.map((option) => (
                  <div key={option.key} className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-4">
                      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor={option.key} className="text-sm">{option.label}</Label>
                    </div>
                    <Switch
                      id={option.key}
                      checked={option.enabled}
                      onCheckedChange={(checked) => handleSortToggle(option.key, checked)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
} 