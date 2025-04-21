"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ShoppingCart, CreditCard } from "lucide-react"

interface CartFormProps {
  appData: {
    id: number
    name: string
    cartConfig?: {
      enabled: boolean
    }
  }
}

export function CartForm({ appData }: CartFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [cartEnabled, setCartEnabled] = useState(appData.cartConfig?.enabled ?? true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would make an API call to update the cart configuration
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast({
        title: "Success",
        description: "Cart configuration updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update cart configuration",
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
          <CardTitle>Cart Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="cart-enabled" className="text-base">
                  Cart-based Checkout
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow users to add multiple items to cart before checkout
                </p>
              </div>
            </div>
            <Switch
              id="cart-enabled"
              checked={cartEnabled}
              onCheckedChange={setCartEnabled}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="direct-checkout" className="text-base">
                  Direct Checkout
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow users to proceed directly to payment without cart
                </p>
              </div>
            </div>
            <Switch
              id="direct-checkout"
              checked={!cartEnabled}
              onCheckedChange={(checked) => setCartEnabled(!checked)}
            />
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