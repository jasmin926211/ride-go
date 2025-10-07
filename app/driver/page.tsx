import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Home, Bell, Clock, DollarSign } from "lucide-react"

export default function DriverPage() {
  const screens = [
    {
      title: "Dashboard",
      description: "Overview and go online/offline",
      href: "/driver/dashboard",
      icon: Home,
    },
    {
      title: "Ride Request",
      description: "Accept or decline incoming rides",
      href: "/driver/request",
      icon: Bell,
    },
    {
      title: "Active Ride",
      description: "Navigate and complete trips",
      href: "/driver/active",
      icon: Clock,
    },
    {
      title: "Earnings",
      description: "Track income and payouts",
      href: "/driver/earnings",
      icon: DollarSign,
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
            <h1 className="text-3xl font-bold mb-2">Driver Interface</h1>
            <p className="text-muted-foreground">Explore all driver-facing screens and features</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {screens.map((screen) => (
              <Link key={screen.href} href={screen.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <screen.icon className="w-6 h-6 text-primary" />
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
