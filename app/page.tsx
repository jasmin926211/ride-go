import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Car, User, MapPin, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-balance">RideGo</h1>
            <p className="text-lg text-muted-foreground text-balance">Your complete ride booking system</p>
          </div>

          {/* Main Navigation Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Link href="/rider" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                      <User className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <h2 className="text-2xl font-semibold">Rider Interface</h2>
                    <p className="text-muted-foreground">Book rides, track drivers, and manage your trips</p>
                    <Button className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                      View Rider Screens
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/driver" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                      <Car className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl font-semibold">Driver Interface</h2>
                    <p className="text-muted-foreground">Accept rides, navigate routes, and track earnings</p>
                    <Button className="mt-4">View Driver Screens</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <MapPin className="w-10 h-10 text-accent" />
                  <h3 className="font-semibold">Real-time Tracking</h3>
                  <p className="text-sm text-muted-foreground">Live location updates and ETA</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <Clock className="w-10 h-10 text-accent" />
                  <h3 className="font-semibold">Quick Booking</h3>
                  <p className="text-sm text-muted-foreground">Book rides in seconds</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <Car className="w-10 h-10 text-accent" />
                  <h3 className="font-semibold">Multiple Options</h3>
                  <p className="text-sm text-muted-foreground">Choose from various ride types</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
