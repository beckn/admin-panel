"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, ShoppingCartIcon as Paypal, Smartphone, Building } from "lucide-react"

interface PaymentFormProps {
  appData: {
    id: number
    paymentOptions: {
      creditCard: boolean
      paypal: boolean
      applePay: boolean
      googlePay: boolean
      bankTransfer: boolean
    }
  }
}

export function PaymentForm({ appData }: PaymentFormProps) {
  const { toast } = useToast()
  const [paymentOptions, setPaymentOptions] = useState(appData.paymentOptions)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = (option: keyof typeof paymentOptions) => {
    setPaymentOptions({
      ...paymentOptions,
      [option]: !paymentOptions[option],
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Payment options updated",
      description: "Your payment configuration has been saved successfully.",
    })

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Payment Options</CardTitle>
          <CardDescription>Configure which payment methods are available in your application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="credit-card" className="text-base">
                    Credit Card
                  </Label>
                  <p className="text-sm text-muted-foreground">Accept Visa, Mastercard, and other major credit cards</p>
                </div>
              </div>
              <Switch
                id="credit-card"
                checked={paymentOptions.creditCard}
                onCheckedChange={() => handleToggle("creditCard")}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Paypal className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="paypal" className="text-base">
                    PayPal
                  </Label>
                  <p className="text-sm text-muted-foreground">Allow customers to pay with their PayPal account</p>
                </div>
              </div>
              <Switch id="paypal" checked={paymentOptions.paypal} onCheckedChange={() => handleToggle("paypal")} />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="apple-pay" className="text-base">
                    Apple Pay
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable payments through Apple Pay on supported devices
                  </p>
                </div>
              </div>
              <Switch
                id="apple-pay"
                checked={paymentOptions.applePay}
                onCheckedChange={() => handleToggle("applePay")}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="google-pay" className="text-base">
                    Google Pay
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable payments through Google Pay on supported devices
                  </p>
                </div>
              </div>
              <Switch
                id="google-pay"
                checked={paymentOptions.googlePay}
                onCheckedChange={() => handleToggle("googlePay")}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Building className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="bank-transfer" className="text-base">
                    Bank Transfer
                  </Label>
                  <p className="text-sm text-muted-foreground">Allow direct bank transfers for payments</p>
                </div>
              </div>
              <Switch
                id="bank-transfer"
                checked={paymentOptions.bankTransfer}
                onCheckedChange={() => handleToggle("bankTransfer")}
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
