"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, MapPin, Clock, Users } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function RiderHomePage() {
  const [isSharedRide, setIsSharedRide] = useState(false)

  const calculatePrice = (basePrice: number) => {
    return isSharedRide ? (basePrice * 0.7).toFixed(2) : basePrice.toFixed(2)
  }

  const calculateSavings = (basePrice: number) => {
    return (basePrice * 0.3).toFixed(2)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <Link href="/rider">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        {/* Map Placeholder */}
        <div className="relative w-full h-64 bg-muted rounded-xl mb-6 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Map View</p>
            </div>
          </div>
          {/* Current Location Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-accent rounded-full border-4 border-background shadow-lg" />
          </div>
        </div>

        {/* Booking Card */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Where to?</h2>

            {/* Pickup Location */}
            <div className="mb-4">
              <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <Input
                  placeholder="Pickup location"
                  className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                  defaultValue="Current Location"
                />
              </div>
            </div>

            {/* Destination */}
            <div className="mb-6">
              <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Where are you going?"
                  className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                />
              </div>
            </div>

            <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="shared-ride" className="font-medium cursor-pointer">
                      Shared Ride
                    </Label>
                    <p className="text-xs text-muted-foreground">Save up to 30% by sharing</p>
                  </div>
                </div>
                <Switch id="shared-ride" checked={isSharedRide} onCheckedChange={setIsSharedRide} />
              </div>
            </div>

            {/* Ride Options */}
            <div className="space-y-3 mb-6">
              <h3 className="text-sm font-medium text-muted-foreground">Choose a ride</h3>

              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">🚗</div>
                  <div>
                    <p className="font-medium">RideGo</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>2 min</span>
                      {isSharedRide && (
                        <>
                          <span>•</span>
                          <Users className="w-3 h-3" />
                          <span>Shared</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${calculatePrice(12.5)}</p>
                  {isSharedRide && <p className="text-xs text-green-600 line-through">$12.50</p>}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">🚙</div>
                  <div>
                    <p className="font-medium">RideGo XL</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>5 min</span>
                      {isSharedRide && (
                        <>
                          <span>•</span>
                          <Users className="w-3 h-3" />
                          <span>Shared</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${calculatePrice(18.75)}</p>
                  {isSharedRide && <p className="text-xs text-green-600 line-through">$18.75</p>}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">🏪</div>
                  <div>
                    <p className="font-medium">RideGo Premium</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>3 min</span>
                      {isSharedRide && (
                        <>
                          <span>•</span>
                          <Users className="w-3 h-3" />
                          <span>Shared</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${calculatePrice(24.0)}</p>
                  {isSharedRide && <p className="text-xs text-green-600 line-through">$24.00</p>}
                </div>
              </div>
            </div>

            {isSharedRide && (
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-400 text-center font-medium">
                  💰 You'll save up to $7.20 with shared rides!
                </p>
              </div>
            )}

            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              Request {isSharedRide ? "Shared " : ""}Ride
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
