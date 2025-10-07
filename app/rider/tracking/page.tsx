import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, MapPin, Phone, MessageSquare, Star } from "lucide-react"

export default function RiderTrackingPage() {
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
        <div className="relative w-full h-96 bg-muted rounded-xl mb-6 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Live Tracking Map</p>
            </div>
          </div>

          {/* Route Line Simulation */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-dashed border-accent rounded-lg" />

          {/* Driver Location */}
          <div className="absolute top-1/3 left-1/3">
            <div className="w-8 h-8 bg-accent rounded-full border-4 border-background shadow-lg flex items-center justify-center">
              🚗
            </div>
          </div>

          {/* Destination */}
          <div className="absolute bottom-1/4 right-1/4">
            <div className="w-6 h-6 bg-destructive rounded-full border-4 border-background shadow-lg" />
          </div>
        </div>

        {/* Status Card */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">Arriving in</p>
                <p className="text-2xl font-bold">3 mins</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="text-lg font-semibold">1.2 km</p>
              </div>
            </div>

            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-accent rounded-full" />
            </div>
          </CardContent>
        </Card>

        {/* Driver Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">John Doe</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.9</span>
                    <span className="text-muted-foreground">(234 trips)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Toyota Camry • ABC 1234</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" size="lg">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" size="lg">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trip Details */}
        <Card className="mt-4">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Trip Details</h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-accent rounded-full" />
                  <div className="w-0.5 h-8 bg-border" />
                  <MapPin className="w-4 h-4 text-destructive" />
                </div>
                <div className="flex-1 space-y-4">
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

            <div className="mt-4 pt-4 border-t flex justify-between">
              <span className="text-muted-foreground">Estimated fare</span>
              <span className="font-semibold">$12.50</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
