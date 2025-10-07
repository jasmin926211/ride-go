import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Clock, CreditCard, User } from "lucide-react"

export default function RiderPage() {
  const screens = [
    {
      title: "Home / Booking",
      description: "Main screen for requesting rides",
      href: "/rider/home",
      icon: MapPin,
    },
    {
      title: "Ride Tracking",
      description: "Track your ride in real-time",
      href: "/rider/tracking",
      icon: Clock,
    },
    {
      title: "Ride History",
      description: "View past trips and receipts",
      href: "/rider/history",
      icon: CreditCard,
    },
    {
      title: "Profile",
      description: "Manage account and preferences",
      href: "/rider/profile",
      icon: User,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Rider Interface</h1>
            <p className="text-muted-foreground">Explore all rider-facing screens and features</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {screens.map((screen) => (
              <Link key={screen.href} href={screen.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <screen.icon className="w-6 h-6 text-accent" />
                      </div>
                      <CardTitle>{screen.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{screen.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
