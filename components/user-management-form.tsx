"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Lock, Shield, Bell, Globe } from "lucide-react"

interface UserManagementFormProps {
  appData: any
}

interface UserManagementConfig {
  authentication: {
    enable2FA: boolean
    enableSocialLogin: boolean
    sessionTimeout: number
    maxLoginAttempts: number
    passwordPolicy: {
      minLength: number
      requireUppercase: boolean
      requireNumbers: boolean
      requireSpecialChars: boolean
    }
  }
  profileFields: {
    key: string
    label: string
    required: boolean
    enabled: boolean
  }[]
  verification: {
    emailVerification: boolean
    phoneVerification: boolean
    documentVerification: boolean
  }
  roles: {
    key: string
    label: string
    permissions: string[]
    enabled: boolean
  }[]
}

export function UserManagementForm({ appData }: UserManagementFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [config, setConfig] = useState<UserManagementConfig>(
    appData.userManagement || {
      authentication: {
        enable2FA: true,
        enableSocialLogin: true,
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireNumbers: true,
          requireSpecialChars: true
        }
      },
      profileFields: [
        { key: "firstName", label: "First Name", required: true, enabled: true },
        { key: "lastName", label: "Last Name", required: true, enabled: true },
        { key: "email", label: "Email", required: true, enabled: true },
        { key: "phone", label: "Phone", required: true, enabled: true },
        { key: "address", label: "Address", required: false, enabled: true },
        // { key: "company", label: "Company", required: false, enabled: true },
        // { key: "position", label: "Position", required: false, enabled: true }
      ],
      verification: {
        emailVerification: true,
        phoneVerification: true,
        documentVerification: false
      },
      roles: [
        {
          key: "admin",
          label: "Administrator",
          permissions: ["all"],
          enabled: true
        },
        {
          key: "manager",
          label: "Manager",
          permissions: ["view", "edit", "create"],
          enabled: true
        },
        {
          key: "user",
          label: "User",
          permissions: ["view"],
          enabled: true
        }
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
        description: "User management configuration updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user management configuration",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFieldToggle = (key: string, enabled: boolean) => {
    setConfig({
      ...config,
      profileFields: config.profileFields.map(field => 
        field.key === key ? { ...field, enabled } : field
      )
    })
  }

  const handleRoleToggle = (key: string, enabled: boolean) => {
    setConfig({
      ...config,
      roles: config.roles.map(role => 
        role.key === key ? { ...role, enabled } : role
      )
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>User Management Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Authentication Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold">Authentication Settings</h3>
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="2fa" className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Enable 2FA for enhanced security</p>
                </div>
              </div>
              <Switch
                id="2fa"
                checked={config.authentication.enable2FA}
                onCheckedChange={(checked) => setConfig({
                  ...config,
                  authentication: { ...config.authentication, enable2FA: checked }
                })}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="social-login" className="text-base">Social Login</Label>
                  <p className="text-sm text-muted-foreground">Allow login with social accounts</p>
                </div>
              </div>
              <Switch
                id="social-login"
                checked={config.authentication.enableSocialLogin}
                onCheckedChange={(checked) => setConfig({
                  ...config,
                  authentication: { ...config.authentication, enableSocialLogin: checked }
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input
                id="session-timeout"
                type="number"
                min={5}
                max={1440}
                value={config.authentication.sessionTimeout}
                onChange={(e) => setConfig({
                  ...config,
                  authentication: { ...config.authentication, sessionTimeout: Number(e.target.value) }
                })}
                className="w-32"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-login-attempts">Maximum Login Attempts</Label>
              <Input
                id="max-login-attempts"
                type="number"
                min={3}
                max={10}
                value={config.authentication.maxLoginAttempts}
                onChange={(e) => setConfig({
                  ...config,
                  authentication: { ...config.authentication, maxLoginAttempts: Number(e.target.value) }
                })}
                className="w-32"
              />
            </div>
          </div>

          {/* Password Policy */}
          <div className="space-y-4">
            <h3 className="font-semibold">Password Policy</h3>
            <div className="space-y-2">
              <Label htmlFor="min-password-length">Minimum Password Length</Label>
              <Input
                id="min-password-length"
                type="number"
                min={6}
                max={32}
                value={config.authentication.passwordPolicy.minLength}
                onChange={(e) => setConfig({
                  ...config,
                  authentication: {
                    ...config.authentication,
                    passwordPolicy: {
                      ...config.authentication.passwordPolicy,
                      minLength: Number(e.target.value)
                    }
                  }
                })}
                className="w-32"
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="require-uppercase" className="text-base">Require Uppercase</Label>
                  <p className="text-sm text-muted-foreground">Password must contain uppercase letters</p>
                </div>
              </div>
              <Switch
                id="require-uppercase"
                checked={config.authentication.passwordPolicy.requireUppercase}
                onCheckedChange={(checked) => setConfig({
                  ...config,
                  authentication: {
                    ...config.authentication,
                    passwordPolicy: {
                      ...config.authentication.passwordPolicy,
                      requireUppercase: checked
                    }
                  }
                })}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="require-numbers" className="text-base">Require Numbers</Label>
                  <p className="text-sm text-muted-foreground">Password must contain numbers</p>
                </div>
              </div>
              <Switch
                id="require-numbers"
                checked={config.authentication.passwordPolicy.requireNumbers}
                onCheckedChange={(checked) => setConfig({
                  ...config,
                  authentication: {
                    ...config.authentication,
                    passwordPolicy: {
                      ...config.authentication.passwordPolicy,
                      requireNumbers: checked
                    }
                  }
                })}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="require-special-chars" className="text-base">Require Special Characters</Label>
                  <p className="text-sm text-muted-foreground">Password must contain special characters</p>
                </div>
              </div>
              <Switch
                id="require-special-chars"
                checked={config.authentication.passwordPolicy.requireSpecialChars}
                onCheckedChange={(checked) => setConfig({
                  ...config,
                  authentication: {
                    ...config.authentication,
                    passwordPolicy: {
                      ...config.authentication.passwordPolicy,
                      requireSpecialChars: checked
                    }
                  }
                })}
              />
            </div>
          </div>

          {/* Profile Fields */}
          <div className="space-y-4">
            <h3 className="font-semibold">Profile Fields</h3>
            {config.profileFields.map((field) => (
              <div key={field.key} className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-4">
                  <User className="h-5 w-5 text-muted-foreground" />
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
                />
              </div>
            ))}
          </div>

          {/* Verification Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold">Verification Settings</h3>
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="email-verification" className="text-base">Email Verification</Label>
                  <p className="text-sm text-muted-foreground">Require email verification</p>
                </div>
              </div>
              <Switch
                id="email-verification"
                checked={config.verification.emailVerification}
                onCheckedChange={(checked) => setConfig({
                  ...config,
                  verification: { ...config.verification, emailVerification: checked }
                })}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="phone-verification" className="text-base">Phone Verification</Label>
                  <p className="text-sm text-muted-foreground">Require phone verification</p>
                </div>
              </div>
              <Switch
                id="phone-verification"
                checked={config.verification.phoneVerification}
                onCheckedChange={(checked) => setConfig({
                  ...config,
                  verification: { ...config.verification, phoneVerification: checked }
                })}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="document-verification" className="text-base">Document Verification</Label>
                  <p className="text-sm text-muted-foreground">Require document verification</p>
                </div>
              </div>
              <Switch
                id="document-verification"
                checked={config.verification.documentVerification}
                onCheckedChange={(checked) => setConfig({
                  ...config,
                  verification: { ...config.verification, documentVerification: checked }
                })}
              />
            </div>
          </div>

          {/* User Roles */}
          <div className="space-y-4">
            <h3 className="font-semibold">User Roles</h3>
            {config.roles.map((role) => (
              <div key={role.key} className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-4">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor={role.key} className="text-base">{role.label}</Label>
                    <p className="text-sm text-muted-foreground">
                      Permissions: {role.permissions.join(", ")}
                    </p>
                  </div>
                </div>
                <Switch
                  id={role.key}
                  checked={role.enabled}
                  onCheckedChange={(checked) => handleRoleToggle(role.key, checked)}
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