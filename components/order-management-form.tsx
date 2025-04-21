"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Package, Clock, Truck, CheckCircle, History, Bell } from "lucide-react"

interface OrderStatus {
  key: string
  label: string
  enabled: boolean
  showEstimatedTime: boolean
}

interface OrderConfig {
  enableOrderTracking: boolean
  enablePushNotifications: boolean
  showOrderHistory: boolean
  itemsPerPage: number
  orderStatuses: OrderStatus[]
  enableInvoiceDownload: boolean
  showCancelButton: boolean
  cancelTimeLimit: number // in hours
}

interface OrderManagementFormProps {
  appData: {
    id: number
    name: string
    orderManagement?: OrderConfig
  }
}

export function OrderManagementForm({ appData }: OrderManagementFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [config, setConfig] = useState<OrderConfig>(
    appData.orderManagement || {
      enableOrderTracking: true,
      enablePushNotifications: true,
      showOrderHistory: true,
      itemsPerPage: 10,
      enableInvoiceDownload: true,
      showCancelButton: true,
      cancelTimeLimit: 24,
      orderStatuses: [
        { key: "pending", label: "Order Pending", enabled: true, showEstimatedTime: false },
        { key: "confirmed", label: "Order Confirmed", enabled: true, showEstimatedTime: true },
        { key: "processing", label: "Processing", enabled: true, showEstimatedTime: true },
        { key: "shipped", label: "Shipped", enabled: true, showEstimatedTime: true },
        { key: "delivered", label: "Delivered", enabled: true, showEstimatedTime: false },
        { key: "cancelled", label: "Cancelled", enabled: true, showEstimatedTime: false }
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
        description: "Order management configuration updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order management configuration",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusToggle = (key: string, field: "enabled" | "showEstimatedTime", value: boolean) => {
    setConfig({
      ...config,
      orderStatuses: config.orderStatuses.map(status => 
        status.key === key ? { ...status, [field]: value } : status
      )
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Order Management Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* General Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Package className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="order-tracking" className="text-base">Order Tracking</Label>
                  <p className="text-sm text-muted-foreground">Enable real-time order tracking</p>
                </div>
              </div>
              <Switch
                id="order-tracking"
                checked={config.enableOrderTracking}
                onCheckedChange={(checked) => setConfig({ ...config, enableOrderTracking: checked })}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send order status notifications</p>
                </div>
              </div>
              <Switch
                id="push-notifications"
                checked={config.enablePushNotifications}
                onCheckedChange={(checked) => setConfig({ ...config, enablePushNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <History className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="order-history" className="text-base">Order History</Label>
                  <p className="text-sm text-muted-foreground">Show order history section</p>
                </div>
              </div>
              <Switch
                id="order-history"
                checked={config.showOrderHistory}
                onCheckedChange={(checked) => setConfig({ ...config, showOrderHistory: checked })}
              />
            </div>

            {config.showOrderHistory && (
              <div className="ml-9 space-y-2">
                <Label htmlFor="items-per-page">Items per Page</Label>
                <Input
                  id="items-per-page"
                  type="number"
                  min={5}
                  max={50}
                  value={config.itemsPerPage}
                  onChange={(e) => setConfig({ ...config, itemsPerPage: Number(e.target.value) })}
                  className="w-32"
                />
              </div>
            )}
          </div>

          {/* Order Status Configuration */}
          <div className="space-y-4">
            <h3 className="font-semibold">Order Status Configuration</h3>
            {config.orderStatuses.map((status) => (
              <div key={status.key} className="space-y-2">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-4">
                    {status.key === "shipped" && <Truck className="h-4 w-4 text-muted-foreground" />}
                    {status.key === "delivered" && <CheckCircle className="h-4 w-4 text-muted-foreground" />}
                    {!["shipped", "delivered"].includes(status.key) && (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div>
                      <Label htmlFor={status.key} className="text-sm">{status.label}</Label>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`${status.key}-time`} className="text-xs">Show Time</Label>
                      <Switch
                        id={`${status.key}-time`}
                        checked={status.showEstimatedTime}
                        onCheckedChange={(checked) => handleStatusToggle(status.key, "showEstimatedTime", checked)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={status.key} className="text-xs">Enable</Label>
                      <Switch
                        id={status.key}
                        checked={status.enabled}
                        onCheckedChange={(checked) => handleStatusToggle(status.key, "enabled", checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Features */}
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Package className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="invoice-download" className="text-base">Invoice Download</Label>
                  <p className="text-sm text-muted-foreground">Allow users to download order invoices</p>
                </div>
              </div>
              <Switch
                id="invoice-download"
                checked={config.enableInvoiceDownload}
                onCheckedChange={(checked) => setConfig({ ...config, enableInvoiceDownload: checked })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="cancel-order" className="text-base">Order Cancellation</Label>
                    <p className="text-sm text-muted-foreground">Allow users to cancel orders</p>
                  </div>
                </div>
                <Switch
                  id="cancel-order"
                  checked={config.showCancelButton}
                  onCheckedChange={(checked) => setConfig({ ...config, showCancelButton: checked })}
                />
              </div>
              {config.showCancelButton && (
                <div className="ml-9 space-y-2">
                  <Label htmlFor="cancel-limit">Cancellation Time Limit (hours)</Label>
                  <Input
                    id="cancel-limit"
                    type="number"
                    min={1}
                    max={72}
                    value={config.cancelTimeLimit}
                    onChange={(e) => setConfig({ ...config, cancelTimeLimit: Number(e.target.value) })}
                    className="w-32"
                  />
                </div>
              )}
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