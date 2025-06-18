
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, MapPin, Calendar, Award, Heart, Clock } from 'lucide-react';

interface DonorDashboardProps {
  userData: { name: string; role: string; bloodType: string };
  onViewRequests: () => void;
  onViewMap: () => void;
}

const DonorDashboard = ({ userData, onViewRequests, onViewMap }: DonorDashboardProps) => {
  const [notifications] = useState([
    { id: 1, message: "Urgent: B+ needed at City Hospital", time: "2 min ago", urgent: true },
    { id: 2, message: "Thank you for your last donation!", time: "1 day ago", urgent: false },
    { id: 3, message: "You're eligible to donate again in 7 days", time: "2 days ago", urgent: false }
  ]);

  const nearbyRequests = [
    { id: 1, bloodType: "O+", location: "City Hospital", distance: "0.8 km", urgency: "Critical", time: "5 min ago" },
    { id: 2, bloodType: "O+", location: "General Hospital", distance: "1.2 km", urgency: "Urgent", time: "12 min ago" },
    { id: 3, bloodType: "A+", location: "Medical Center", distance: "2.1 km", urgency: "Moderate", time: "25 min ago" }
  ];

  const achievements = [
    { name: "Life Saver", description: "5 successful donations", earned: true },
    { name: "Hero", description: "10 successful donations", earned: true },
    { name: "Legend", description: "25 successful donations", earned: false },
    { name: "Guardian Angel", description: "Emergency response", earned: true }
  ];

  const nextEligible = new Date();
  nextEligible.setDate(nextEligible.getDate() + 7);

  return (
    <div className="min-h-screen bg-medical-gray-light p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-medical-green text-white font-bold">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {userData.name}</h1>
              <div className="flex items-center gap-2">
                <Badge className="bg-medical-green text-white">{userData.bloodType} Donor</Badge>
                <Badge variant="outline">Verified</Badge>
              </div>
            </div>
          </div>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-2 -right-2 h-5 w-5 bg-medical-red text-white rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-medical-red-light rounded-lg">
                <Heart className="h-5 w-5 text-medical-red" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Total Donations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-medical-blue-light rounded-lg">
                <Award className="h-5 w-5 text-medical-blue" />
              </div>
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-medical-green-light rounded-lg">
                <Calendar className="h-5 w-5 text-medical-green" />
              </div>
              <div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-sm text-muted-foreground">Days Until Eligible</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">36</p>
                <p className="text-sm text-muted-foreground">Lives Saved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Nearby Requests */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-medical-red" />
                Nearby Blood Requests
              </CardTitle>
              <Button onClick={onViewMap} variant="outline" size="sm">
                View Map
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nearbyRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="blood-type-badge">
                        {request.bloodType}
                      </div>
                      <div>
                        <p className="font-semibold">{request.location}</p>
                        <p className="text-sm text-muted-foreground">{request.distance} • {request.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={
                          request.urgency === 'Critical' ? 'bg-red-500' :
                          request.urgency === 'Urgent' ? 'bg-orange-500' : 'bg-yellow-500'
                        }
                      >
                        {request.urgency}
                      </Badge>
                      <Button size="sm" className="ml-2 bg-medical-green hover:bg-medical-green/90">
                        Respond
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={onViewRequests} className="w-full mt-4" variant="outline">
                View All Requests
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Next Donation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Next Donation Eligibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-medical-green mb-2">7 Days</div>
                <p className="text-sm text-muted-foreground mb-4">
                  {nextEligible.toLocaleDateString()}
                </p>
                <Progress value={75} className="mb-4" />
                <Button className="w-full" disabled>
                  Schedule Next Donation
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg text-center ${
                      achievement.earned ? 'bg-medical-green-light' : 'bg-gray-100'
                    }`}
                  >
                    <div className={`text-2xl mb-1 ${achievement.earned ? '' : 'grayscale'}`}>
                      🏆
                    </div>
                    <p className={`text-xs font-medium ${
                      achievement.earned ? 'text-medical-green' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.urgent ? 'bg-medical-red animate-pulse' : 'bg-medical-blue'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
