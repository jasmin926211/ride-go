import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, MapPin, Phone, MessageSquare, Navigation, CheckCircle } from "lucide-react"

export default function DriverActivePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <Link href="/driver">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        {/* Map Navigation */}
        <div className="relative w-full h-96 bg-muted rounded-xl mb-6 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-12 h-12 text-accent mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Navigation Active</p>
            </div>
          </div>

          {/* Current location */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-accent rounded-full border-4 border-background shadow-lg flex items-center justify-center">
              🚗
            </div>
          </div>

          {/* Destination */}
          <div className="absolute top-1/4 right-1/4">
            <div className="w-6 h-6 bg-destructive rounded-full border-4 border-background shadow-lg" />
          </div>

          {/* Navigation Info Overlay */}
          <div className="absolute top-4 left-4 right-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">1.2 km</p>
                    <p className="text-sm text-muted-foreground">Turn right on Main St</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">3 min</p>
                    <p className="text-sm text-muted-foreground">ETA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trip Status */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-accent">En Route to Pickup</span>
              <span className="text-sm text-muted-foreground">Trip #1234</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-accent rounded-full" />
            </div>
          </CardContent>
        </Card>

        {/* Rider Info */}
        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-14 h-14">
                  <AvatarImage src="/placeholder.svg?height=56&width=56" />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">Sarah Anderson</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-400">★</span>
                    <span className="font-medium">4.8</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <Button variant="outline" className="flex-1 bg-transparent">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>

            {/* Trip Route */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-accent rounded-full" />
                  <div className="w-0.5 h-8 bg-border" />
                  <MapPin className="w-4 h-4 text-destructive" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup</p>
                    <p className="font-medium">123 Main Street, Downtown</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Destination</p>
                    <p className="font-medium">456 Park Avenue, Uptown</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trip Details */}
        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="font-semibold">5.8 km</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fare</p>
                <p className="font-semibold text-accent">$12.50</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
          <CheckCircle className="w-5 h-5 mr-2" />
          Arrived at Pickup
        </Button>
      </div>
    </div>
  )
}
