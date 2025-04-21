"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Type, Layout, Bell } from "lucide-react"

interface AppearanceConfig {
  typography: {
    baseFontSize: string
    headingFontSize: string
    fontWeight: string
    headingFontWeight: string
  }
  modal: {
    position: "center" | "top" | "bottom"
    animation: "fade" | "slide" | "scale"
  }
  toast: {
    position: "top-right" | "top-left" | "bottom-right" | "bottom-left"
    type: "default" | "success" | "error" | "warning" | "info"
    duration: number
  }
}

interface AppearanceFormProps {
  appData: {
    id: number
    primaryColor: string
    secondaryColor: string
    appearance?: AppearanceConfig
  }
}

export function AppearanceForm({ appData }: AppearanceFormProps) {
  const { toast } = useToast()
  const [primaryColor, setPrimaryColor] = useState(appData.primaryColor)
  const [secondaryColor, setSecondaryColor] = useState(appData.secondaryColor)
  const [config, setConfig] = useState<AppearanceConfig>(
    appData.appearance || {
      typography: {
        baseFontSize: "16px",
        headingFontSize: "24px",
        fontWeight: "normal",
        headingFontWeight: "bold",
      },
      modal: {
        position: "center",
        animation: "fade",
      },
      toast: {
        position: "bottom-right",
        type: "default",
        duration: 3000,
      }
    }
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Appearance updated",
        description: "Your appearance changes have been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update appearance settings.",
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
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize your application's colors and theme</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Colors</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex items-center gap-4">
                  <input
                    id="primary-color"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded-md border"
                  />
                  <div className="h-10 w-20 rounded-md" style={{ backgroundColor: primaryColor }} />
                  <span className="text-sm font-mono">{primaryColor}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex items-center gap-4">
                  <input
                    id="secondary-color"
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded-md border"
                  />
                  <div className="h-10 w-20 rounded-md" style={{ backgroundColor: secondaryColor }} />
                  <span className="text-sm font-mono">{secondaryColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Type className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-medium">Typography</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="base-font-size">Base Font Size</Label>
                <Input
                  id="base-font-size"
                  value={config.typography.baseFontSize}
                  onChange={(e) => setConfig({
                    ...config,
                    typography: { ...config.typography, baseFontSize: e.target.value }
                  })}
                  placeholder="16px"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heading-font-size">Heading Font Size</Label>
                <Input
                  id="heading-font-size"
                  value={config.typography.headingFontSize}
                  onChange={(e) => setConfig({
                    ...config,
                    typography: { ...config.typography, headingFontSize: e.target.value }
                  })}
                  placeholder="24px"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-weight">Base Font Weight</Label>
                <Select
                  value={config.typography.fontWeight}
                  onValueChange={(value) => setConfig({
                    ...config,
                    typography: { ...config.typography, fontWeight: value }
                  })}
                >
                  <SelectTrigger id="font-weight">
                    <SelectValue placeholder="Select weight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="semibold">Semibold</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="heading-font-weight">Heading Font Weight</Label>
                <Select
                  value={config.typography.headingFontWeight}
                  onValueChange={(value) => setConfig({
                    ...config,
                    typography: { ...config.typography, headingFontWeight: value }
                  })}
                >
                  <SelectTrigger id="heading-font-weight">
                    <SelectValue placeholder="Select weight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="semibold">Semibold</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="extrabold">Extra Bold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Modal Settings */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Layout className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-medium">Modal Settings</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modal-position">Position</Label>
                <Select
                  value={config.modal.position}
                  onValueChange={(value: "center" | "top" | "bottom") => setConfig({
                    ...config,
                    modal: { ...config.modal, position: value }
                  })}
                >
                  <SelectTrigger id="modal-position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="bottom">Bottom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="modal-animation">Animation</Label>
                <Select
                  value={config.modal.animation}
                  onValueChange={(value: "fade" | "slide" | "scale") => setConfig({
                    ...config,
                    modal: { ...config.modal, animation: value }
                  })}
                >
                  <SelectTrigger id="modal-animation">
                    <SelectValue placeholder="Select animation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fade">Fade</SelectItem>
                    <SelectItem value="slide">Slide</SelectItem>
                    <SelectItem value="scale">Scale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Toast Settings */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-medium">Toast Settings</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="toast-position">Position</Label>
                <Select
                  value={config.toast.position}
                  onValueChange={(value: "top-right" | "top-left" | "bottom-right" | "bottom-left") => setConfig({
                    ...config,
                    toast: { ...config.toast, position: value }
                  })}
                >
                  <SelectTrigger id="toast-position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top-right">Top Right</SelectItem>
                    <SelectItem value="top-left">Top Left</SelectItem>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="toast-type">Default Type</Label>
                <Select
                  value={config.toast.type}
                  onValueChange={(value: "default" | "success" | "error" | "warning" | "info") => setConfig({
                    ...config,
                    toast: { ...config.toast, type: value }
                  })}
                >
                  <SelectTrigger id="toast-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="toast-duration">Duration (ms)</Label>
                <Input
                  id="toast-duration"
                  type="number"
                  min={1000}
                  max={10000}
                  step={500}
                  value={config.toast.duration}
                  onChange={(e) => setConfig({
                    ...config,
                    toast: { ...config.toast, duration: Number(e.target.value) }
                  })}
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-medium">Preview</h3>
            <div className="rounded-lg border p-4">
              <div className="flex flex-col gap-4">
                <div
                  className="h-12 rounded-md flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: primaryColor }}
                >
                  Primary Button
                </div>
                <div
                  className="h-12 rounded-md flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: secondaryColor }}
                >
                  Secondary Button
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <div className="h-8 w-8 rounded-full" style={{ backgroundColor: secondaryColor }} />
                </div>
              </div>
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
