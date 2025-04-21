"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

interface BrandingFormProps {
  appData: {
    id: number;
    name: string;
    description: string;
    logo: string;
  };
}

export function BrandingForm({ appData }: BrandingFormProps) {
  const { toast } = useToast();
  const [name, setName] = useState(appData.name);
  const [description, setDescription] = useState(appData.description);
  const [logo, setLogo] = useState(appData.logo);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setLogo(previewUrl);
    }
  };

  const handleRemoveLogo = () => {
    setLogo("/placeholder.svg?height=80&width=80");
    setLogoFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Branding updated",
      description: "Your branding changes have been saved successfully.",
    });

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Branding</CardTitle>
          <CardDescription>
            Customize your application's name, description, and logo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="app-name">Application Name</Label>
            <Input
              id="app-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter application name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="app-description">Description</Label>
            <Textarea
              id="app-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a short description of your application"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Logo</Label>
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-md border">
                <Image
                  src={logo || "/placeholder.svg"}
                  alt="App logo"
                  fill
                  className="object-cover"
                />
                {logo !== "/placeholder.svg?height=80&width=80" && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-0 top-0 h-5 w-5 rounded-full"
                    onClick={handleRemoveLogo}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove logo</span>
                  </Button>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="logo-upload"
                  className="cursor-pointer inline-flex h-9 items-center justify-center rounded-md bg-[#77AEDE] px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Logo
                </Label>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
                <p className="text-xs text-muted-foreground">
                  Recommended size: 512x512px
                </p>
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
  );
}
