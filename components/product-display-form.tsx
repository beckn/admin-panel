"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid2X2, List, Star, Store, Tag, Eye } from "lucide-react"

interface ProductDisplayConfig {
  layout: "grid" | "list"
  showRatings: boolean
  showSeller: boolean
  showPrice: boolean
  enableQuickView: boolean
  itemsPerRow: 2 | 3 | 4
}

interface ProductDisplayFormProps {
  appData: {
    id: number
    name: string
    productDisplay?: ProductDisplayConfig
  }
}

export function ProductDisplayForm({ appData }: ProductDisplayFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [config, setConfig] = useState<ProductDisplayConfig>(
    appData.productDisplay || {
      layout: "grid",
      showRatings: true,
      showSeller: true,
      showPrice: true,
      enableQuickView: true,
      itemsPerRow: 3
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
        description: "Product display configuration updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product display configuration",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Product Display Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Layout Selection */}
          <div className="space-y-2">
            <Label>Layout Style</Label>
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant={config.layout === "grid" ? "default" : "outline"}
                className="flex items-center space-x-2"
                onClick={() => setConfig({ ...config, layout: "grid" })}
              >
                <Grid2X2 className="h-4 w-4" />
                <span>Grid View</span>
              </Button>
              <Button
                type="button"
                variant={config.layout === "list" ? "default" : "outline"}
                className="flex items-center space-x-2"
                onClick={() => setConfig({ ...config, layout: "list" })}
              >
                <List className="h-4 w-4" />
                <span>List View</span>
              </Button>
            </div>
          </div>

          {/* Grid Items per Row */}
          {config.layout === "grid" && (
            <div className="space-y-2">
              <Label htmlFor="itemsPerRow">Items per Row</Label>
              <Select
                value={config.itemsPerRow.toString()}
                onValueChange={(value) => setConfig({ ...config, itemsPerRow: Number(value) as 2 | 3 | 4 })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select items per row" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Items</SelectItem>
                  <SelectItem value="3">3 Items</SelectItem>
                  <SelectItem value="4">4 Items</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Display Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Star className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="show-ratings" className="text-base">Show Ratings</Label>
                  <p className="text-sm text-muted-foreground">Display product ratings and reviews</p>
                </div>
              </div>
              <Switch
                id="show-ratings"
                checked={config.showRatings}
                onCheckedChange={(checked) => setConfig({ ...config, showRatings: checked })}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Store className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="show-seller" className="text-base">Show Seller</Label>
                  <p className="text-sm text-muted-foreground">Display seller information</p>
                </div>
              </div>
              <Switch
                id="show-seller"
                checked={config.showSeller}
                onCheckedChange={(checked) => setConfig({ ...config, showSeller: checked })}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="show-price" className="text-base">Show Price</Label>
                  <p className="text-sm text-muted-foreground">Display product price</p>
                </div>
              </div>
              <Switch
                id="show-price"
                checked={config.showPrice}
                onCheckedChange={(checked) => setConfig({ ...config, showPrice: checked })}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Eye className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="enable-quick-view" className="text-base">Quick View</Label>
                  <p className="text-sm text-muted-foreground">Enable quick view functionality</p>
                </div>
              </div>
              <Switch
                id="enable-quick-view"
                checked={config.enableQuickView}
                onCheckedChange={(checked) => setConfig({ ...config, enableQuickView: checked })}
              />
            </div>
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