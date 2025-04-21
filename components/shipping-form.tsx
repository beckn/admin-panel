"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Truck, MapPin, Home, Building, Phone } from "lucide-react"

interface AddressField {
  key: string
  label: string
  required: boolean
  enabled: boolean
}

interface ShippingConfig {
  enablePinCodeCheck: boolean
  enableDeliveryEstimates: boolean
  showDeliveryCharge: boolean
  baseDeliveryCharge: number
  addressFields: AddressField[]
}

interface ShippingFormProps {
  appData: {
    id: number
    name: string
    shipping?: ShippingConfig
  }
}

export function ShippingForm({ appData }: ShippingFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [config, setConfig] = useState<ShippingConfig>(
    appData.shipping || {
      enablePinCodeCheck: true,
      enableDeliveryEstimates: true,
      showDeliveryCharge: true,
      baseDeliveryCharge: 40,
      addressFields: [
        { key: "flatNo", label: "Flat, House no, Building", required: true, enabled: true },
        { key: "street", label: "Area, Street, Sector, Village", required: true, enabled: true },
        { key: "city", label: "City/Town", required: true, enabled: true },
        { key: "pincode", label: "Pincode", required: true, enabled: true },
        { key: "state", label: "State/Province", required: true, enabled: true },
        { key: "country", label: "Country", required: true, enabled: true },
        { key: "phone", label: "Mobile Number", required: true, enabled: true },
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
        description: "Shipping configuration updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update shipping configuration",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFieldToggle = (key: string, enabled: boolean) => {
    setConfig({
      ...config,
      addressFields: config.addressFields.map(field => 
        field.key === key ? { ...field, enabled } : field
      )
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Shipping Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Delivery Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="pincode-check" className="text-base">Pincode Check</Label>
                  <p className="text-sm text-muted-foreground">Enable delivery availability check by pincode</p>
                </div>
              </div>
              <Switch
                id="pincode-check"
                checked={config.enablePinCodeCheck}
                onCheckedChange={(checked) => setConfig({ ...config, enablePinCodeCheck: checked })}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="delivery-estimates" className="text-base">Delivery Estimates</Label>
                  <p className="text-sm text-muted-foreground">Show estimated delivery dates</p>
                </div>
              </div>
              <Switch
                id="delivery-estimates"
                checked={config.enableDeliveryEstimates}
                onCheckedChange={(checked) => setConfig({ ...config, enableDeliveryEstimates: checked })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-4">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="delivery-charge" className="text-base">Delivery Charge</Label>
                    <p className="text-sm text-muted-foreground">Show delivery charges on checkout</p>
                  </div>
                </div>
                <Switch
                  id="delivery-charge"
                  checked={config.showDeliveryCharge}
                  onCheckedChange={(checked) => setConfig({ ...config, showDeliveryCharge: checked })}
                />
              </div>
              {config.showDeliveryCharge && (
                <div className="ml-9 mt-2">
                  <Label htmlFor="base-charge">Base Delivery Charge (₹)</Label>
                  <Input
                    id="base-charge"
                    type="number"
                    value={config.baseDeliveryCharge}
                    onChange={(e) => setConfig({ ...config, baseDeliveryCharge: Number(e.target.value) })}
                    className="w-32"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Address Fields */}
          <div className="space-y-4">
            <h3 className="font-semibold">Address Fields</h3>
            {config.addressFields.map((field) => (
              <div key={field.key} className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-4">
                  {field.key === "flatNo" && <Home className="h-5 w-5 text-muted-foreground" />}
                  {field.key === "street" && <Building className="h-5 w-5 text-muted-foreground" />}
                  {field.key === "phone" && <Phone className="h-5 w-5 text-muted-foreground" />}
                  {!["flatNo", "street", "phone"].includes(field.key) && (
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <Label htmlFor={field.key} className="text-base">{field.label}</Label>
                    <p className="text-sm text-muted-foreground">
                      {field.required ? "Required field" : "Optional field"}
                    </p>
                  </div>
                </div>
                <Switch
                  id={field.key}
                  checked={field.enabled}
                  onCheckedChange={(checked) => handleFieldToggle(field.key, checked)}
                  disabled={field.required}
                />
              </div>
            ))}
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