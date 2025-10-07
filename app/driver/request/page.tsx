import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, MapPin, DollarSign, Navigation, Clock } from "lucide-react"

export default function DriverRequestPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <Link href="/driver">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        {/* Map Preview */}
        <div className="relative w-full h-64 bg-muted rounded-xl mb-6 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Route Preview</p>
            </div>
          </div>

          {/* Route visualization */}
          <div className="absolute top-1/4 left-1/4">
            <div className="w-4 h-4 bg-accent rounded-full border-4 border-background shadow-lg" />
          </div>
          <div className="absolute bottom-1/3 right-1/4">
            <div className="w-4 h-4 bg-destructive rounded-full border-4 border-background shadow-lg" />
          </div>
        </div>

        {/* Request Card */}
        <Card className="mb-6 border-accent border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">New Ride Request</h2>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-accent">15</span>
                </div>
              </div>
            </div>

            {/* Rider Info */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-secondary rounded-lg">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Sarah Anderson</p>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-yellow-400">★</span>
                  <span className="font-medium">4.8</span>
                  <span className="text-muted-foreground">(156 trips)</span>
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="space-y-4 mb-6">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-accent rounded-full" />
                  <div className="w-0.5 h-12 bg-border" />
                  <MapPin className="w-4 h-4 text-destructive" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup</p>
                    <p className="font-medium">123 Main Street, Downtown</p>
                    <p className="text-sm text-muted-foreground">2.3 km away</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Destination</p>
                    <p className="font-medium">456 Park Avenue, Uptown</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center p-3 bg-secondary rounded-lg">
                <Navigation className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm font-semibold">5.8 km</p>
                <p className="text-xs text-muted-foreground">Distance</p>
              </div>
              <div className="text-center p-3 bg-secondary rounded-lg">
                <Clock className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm font-semibold">12 min</p>
                <p className="text-xs text-muted-foreground">Duration</p>
              </div>
              <div className="text-center p-3 bg-accent/10 rounded-lg">
                <DollarSign className="w-5 h-5 mx-auto mb-1 text-accent" />
                <p className="text-sm font-semibold text-accent">$12.50</p>
                <p className="text-xs text-muted-foreground">Fare</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" size="lg">
                Decline
              </Button>
              <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                Accept
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <p className="text-center text-sm text-muted-foreground">Request expires in 15 seconds</p>
      </div>
    </div>
  )
}
