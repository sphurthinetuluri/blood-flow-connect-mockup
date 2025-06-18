
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AlertTriangle, MapPin, Clock, Phone, Shield } from 'lucide-react';
import EmergencyRequest from './EmergencyRequest';

interface RecipientDashboardProps {
  userData: { name: string; role: string; bloodType: string };
  onViewMap: () => void;
}

const RecipientDashboard = ({ userData, onViewMap }: RecipientDashboardProps) => {
  const [showEmergencyRequest, setShowEmergencyRequest] = useState(false);
  const [activeRequests] = useState([
    { 
      id: 1, 
      bloodType: "B+", 
      status: "Active", 
      location: "City Hospital", 
      timePosted: "12 min ago",
      responses: 3,
      urgency: "Critical"
    }
  ]);

  const [donorResponses] = useState([
    { id: 1, name: "Alex Johnson", bloodType: "B+", distance: "0.8 km", eta: "15 min", verified: true },
    { id: 2, name: "Maria Garcia", bloodType: "B+", distance: "1.2 km", eta: "20 min", verified: true },
    { id: 3, name: "David Chen", bloodType: "B+", distance: "2.1 km", eta: "25 min", verified: false }
  ]);

  const handleEmergencyRequest = () => {
    setShowEmergencyRequest(true);
  };

  if (showEmergencyRequest) {
    return (
      <EmergencyRequest 
        userData={userData}
        onBack={() => setShowEmergencyRequest(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-medical-gray-light p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-medical-blue text-white font-bold">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {userData.name}</h1>
              <div className="flex items-center gap-2">
                <Badge className="bg-medical-blue text-white">{userData.bloodType} Recipient</Badge>
                <Badge variant="outline">Verified</Badge>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleEmergencyRequest}
            className="emergency-button"
            size="lg"
          >
            <AlertTriangle className="mr-2 h-5 w-5" />
            EMERGENCY REQUEST
          </Button>
        </div>
      </div>

      {/* Emergency Notice */}
      <Card className="mb-6 border-medical-red bg-emergency-light">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-medical-red" />
            <div className="flex-1">
              <p className="font-semibold text-medical-red">Emergency Blood Request Active</p>
              <p className="text-sm text-gray-700">Your request for {userData.bloodType} blood is being processed. 3 donors have responded.</p>
            </div>
            <Badge className="bg-medical-red text-white">Active</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Requests */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-medical-red" />
                Active Blood Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="blood-type-badge">
                        {request.bloodType}
                      </div>
                      <div>
                        <p className="font-semibold">{request.location}</p>
                        <p className="text-sm text-muted-foreground">Posted {request.timePosted}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-red-500 text-white mb-1">
                        {request.urgency}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{request.responses} responses</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={onViewMap} variant="outline" size="sm" className="flex-1">
                      <MapPin className="mr-2 h-4 w-4" />
                      View on Map
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Update Details
                    </Button>
                    <Button variant="destructive" size="sm">
                      Cancel Request
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Donor Responses */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Donor Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {donorResponses.map((donor) => (
                  <div key={donor.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-medical-green text-white">
                          {donor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{donor.name}</p>
                          {donor.verified && (
                            <Shield className="h-4 w-4 text-medical-green" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="blood-type-badge text-xs w-6 h-6">
                            {donor.bloodType}
                          </span>
                          <span>{donor.distance}</span>
                          <span>•</span>
                          <span>ETA: {donor.eta}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-medical-green hover:bg-medical-green/90">
                        Accept
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleEmergencyRequest}
                className="w-full bg-medical-red hover:bg-medical-red/90"
                size="lg"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Emergency Request
              </Button>
              <Button onClick={onViewMap} variant="outline" className="w-full">
                <MapPin className="mr-2 h-4 w-4" />
                Find Blood Banks
              </Button>
              <Button variant="outline" className="w-full">
                <Clock className="mr-2 h-4 w-4" />
                Schedule Request
              </Button>
            </CardContent>
          </Card>

          {/* Blood Type Compatibility */}
          <Card>
            <CardHeader>
              <CardTitle>Blood Compatibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="blood-type-badge mx-auto mb-2">
                  {userData.bloodType}
                </div>
                <p className="text-sm text-muted-foreground">Your Blood Type</p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">You can receive from:</p>
                <div className="flex flex-wrap gap-2">
                  {userData.bloodType === 'B+' ? 
                    ['B+', 'B-', 'O+', 'O-'].map(type => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    )) :
                    ['O+', 'O-'].map(type => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))
                  }
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                <Phone className="h-4 w-4 text-medical-red" />
                <div>
                  <p className="text-sm font-medium">Emergency Hotline</p>
                  <p className="text-sm text-muted-foreground">911</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                <Phone className="h-4 w-4 text-medical-blue" />
                <div>
                  <p className="text-sm font-medium">Blood Bank</p>
                  <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecipientDashboard;
