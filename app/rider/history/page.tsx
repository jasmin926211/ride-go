import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, MapPin, Calendar } from "lucide-react"

export default function RiderHistoryPage() {
  const trips = [
    {
      id: 1,
      driver: "John Doe",
      date: "Today, 2:30 PM",
      from: "123 Main Street",
      to: "456 Park Avenue",
      fare: "$12.50",
      status: "completed",
    },
    {
      id: 2,
      driver: "Jane Smith",
      date: "Yesterday, 9:15 AM",
      from: "789 Oak Road",
      to: "321 Elm Street",
      fare: "$18.75",
      status: "completed",
    },
    {
      id: 3,
      driver: "Mike Johnson",
      date: "Dec 15, 5:45 PM",
      from: "555 Broadway",
      to: "888 Fifth Avenue",
      fare: "$24.00",
      status: "completed",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <Link href="/rider">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Ride History</h1>
          <p className="text-muted-foreground">Your past trips and receipts</p>
        </div>

        {/* Summary Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Total Trips</p>
              </div>
              <div>
                <p className="text-2xl font-bold">$342</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
              <div>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trip List */}
        <div className="space-y-4">
          {trips.map((trip) => (
            <Card key={trip.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>
                        {trip.driver
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{trip.driver}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{trip.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">{trip.fare}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2 text-sm">
                    <div className="w-4 h-4 rounded-full bg-accent flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{trip.from}</p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{trip.to}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    View Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
