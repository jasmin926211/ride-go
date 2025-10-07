import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download } from "lucide-react"

export default function DriverEarningsPage() {
  const dailyEarnings = [
    { day: "Monday", trips: 14, earnings: 156.75 },
    { day: "Tuesday", trips: 12, earnings: 134.5 },
    { day: "Wednesday", trips: 16, earnings: 178.25 },
    { day: "Thursday", trips: 11, earnings: 122.0 },
    { day: "Friday", trips: 18, earnings: 198.5 },
    { day: "Saturday", trips: 15, earnings: 167.75 },
    { day: "Sunday", trips: 13, earnings: 145.0 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <Link href="/driver">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Earnings</h1>
          <p className="text-muted-foreground">Track your income and payouts</p>
        </div>

        {/* Total Earnings Card */}
        <Card className="mb-6 bg-accent text-accent-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm opacity-90">This Week's Earnings</p>
              <Calendar className="w-5 h-5 opacity-90" />
            </div>
            <p className="text-4xl font-bold mb-1">$1,102.75</p>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <TrendingUp className="w-4 h-4" />
              <span>+12% from last week</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">99</p>
              <p className="text-sm text-muted-foreground">Total Trips</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">42.5</p>
              <p className="text-sm text-muted-foreground">Hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">$11.14</p>
              <p className="text-sm text-muted-foreground">Per Trip</p>
            </CardContent>
          </Card>
        </div>

        {/* Daily Breakdown */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Daily Breakdown</h3>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="space-y-3">
              {dailyEarnings.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium">{day.day}</p>
                    <p className="text-sm text-muted-foreground">{day.trips} trips</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">${day.earnings.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payout Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Next Payout</h3>
                <p className="text-sm text-muted-foreground">Friday, Dec 22</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
              <span className="text-muted-foreground">Available Balance</span>
              <span className="text-xl font-bold">$1,102.75</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
