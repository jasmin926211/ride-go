import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, DollarSign, Clock, Star, TrendingUp } from "lucide-react"

export default function DriverDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <Link href="/driver">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        {/* Driver Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">John Doe</h2>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.9</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Online/Offline Toggle */}
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div>
                <p className="font-semibold">You're Online</p>
                <p className="text-sm text-muted-foreground">Ready to accept rides</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Today's Stats */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Today's Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-accent/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-accent" />
                  <p className="text-sm text-muted-foreground">Earnings</p>
                </div>
                <p className="text-2xl font-bold">$124.50</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Hours</p>
                </div>
                <p className="text-2xl font-bold">6.5</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Trips</p>
                </div>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
                <p className="text-2xl font-bold">4.9</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Overview */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">This Week</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Earnings</span>
                <span className="font-semibold text-lg">$842.75</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Trips</span>
                <span className="font-semibold">67</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Online Hours</span>
                <span className="font-semibold">38.5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Acceptance Rate</span>
                <span className="font-semibold">94%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" size="lg" className="h-auto py-4 bg-transparent">
            <div className="text-center">
              <Clock className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm">View Schedule</p>
            </div>
          </Button>
          <Button variant="outline" size="lg" className="h-auto py-4 bg-transparent">
            <div className="text-center">
              <DollarSign className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm">Earnings</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
