
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MapPin, Navigation, Search, Filter, Phone } from 'lucide-react';

interface BloodMapProps {
  onBack: () => void;
  userRole: 'donor' | 'recipient';
}

const BloodMap = ({ onBack, userRole }: BloodMapProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for demonstration
  const donorsOnMap = [
    { id: 1, name: "Alex Johnson", bloodType: "O+", distance: "0.8 km", status: "Available", lat: 40.7128, lng: -74.0060 },
    { id: 2, name: "Maria Garcia", bloodType: "B+", distance: "1.2 km", status: "Available", lat: 40.7580, lng: -73.9855 },
    { id: 3, name: "David Chen", bloodType: "A+", distance: "2.1 km", status: "Busy", lat: 40.7505, lng: -73.9934 },
    { id: 4, name: "Sarah Wilson", bloodType: "O-", distance: "1.8 km", status: "Available", lat: 40.7614, lng: -73.9776 },
  ];

  const bloodBanks = [
    { id: 1, name: "City Blood Bank", address: "123 Medical Center Dr", stock: "High", distance: "1.5 km" },
    { id: 2, name: "General Hospital Blood Bank", address: "456 Health Ave", stock: "Medium", distance: "2.3 km" },
    { id: 3, name: "Emergency Blood Services", address: "789 Emergency Blvd", stock: "Low", distance: "3.1 km" },
  ];

  const emergencyRequests = [
    { id: 1, bloodType: "B+", location: "City Hospital", urgency: "Critical", time: "5 min ago" },
    { id: 2, bloodType: "O-", location: "General Hospital", urgency: "Urgent", time: "12 min ago" },
  ];

  return (
    <div className="min-h-screen bg-medical-gray-light p-4">
      <div className="max-w-7xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-medical-red" />
                    Live Blood Network Map
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Navigation className="mr-2 h-4 w-4" />
                      My Location
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search location, blood type, or hospital..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-full p-0">
                {/* Simulated Map */}
                <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
                  {/* Mock map background with streets */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full">
                      <defs>
                        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ccc" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>

                  {/* Donor pins */}
                  {donorsOnMap.map((donor, index) => (
                    <div
                      key={donor.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{
                        left: `${20 + (index * 15)}%`,
                        top: `${30 + (index * 10)}%`
                      }}
                    >
                      <div className={`donor-pin ${donor.status === 'Available' ? 'bg-medical-green' : 'bg-gray-400'}`}>
                      </div>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white rounded-lg shadow-lg p-3 whitespace-nowrap border">
                          <p className="font-semibold">{donor.name}</p>
                          <p className="text-sm text-muted-foreground">{donor.bloodType} • {donor.distance}</p>
                          <Badge className={donor.status === 'Available' ? 'bg-green-500' : 'bg-gray-500'}>
                            {donor.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Blood bank markers */}
                  {bloodBanks.map((bank, index) => (
                    <div
                      key={bank.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{
                        left: `${60 + (index * 10)}%`,
                        top: `${20 + (index * 15)}%`
                      }}
                    >
                      <div className="w-8 h-8 bg-medical-blue rounded-lg border-2 border-white shadow-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🏥</span>
                      </div>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white rounded-lg shadow-lg p-3 whitespace-nowrap border">
                          <p className="font-semibold">{bank.name}</p>
                          <p className="text-sm text-muted-foreground">{bank.distance}</p>
                          <Badge className={
                            bank.stock === 'High' ? 'bg-green-500' :
                            bank.stock === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                          }>
                            {bank.stock} Stock
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Emergency request markers */}
                  {userRole === 'donor' && emergencyRequests.map((request, index) => (
                    <div
                      key={request.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{
                        left: `${40 + (index * 20)}%`,
                        top: `${60 + (index * 10)}%`
                      }}
                    >
                      <div className="w-8 h-8 bg-medical-red rounded-full border-2 border-white shadow-lg animate-pulse flex items-center justify-center">
                        <span className="text-white text-xs font-bold">⚠️</span>
                      </div>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white rounded-lg shadow-lg p-3 whitespace-nowrap border">
                          <p className="font-semibold text-medical-red">Emergency Request</p>
                          <p className="text-sm text-muted-foreground">{request.bloodType} • {request.location}</p>
                          <Badge className="bg-red-500">
                            {request.urgency}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* User location */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-600">
                      You
                    </div>
                  </div>
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 border">
                  <p className="text-sm font-semibold mb-2">Legend</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-medical-green rounded-full"></div>
                      <span>Available Donors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-medical-blue rounded-lg"></div>
                      <span>Blood Banks</span>
                    </div>
                    {userRole === 'donor' && (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-medical-red rounded-full animate-pulse"></div>
                        <span>Emergency Requests</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span>Your Location</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {/* Filter Options */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((type) => (
                    <Button
                      key={type}
                      variant="outline"
                      size="sm"
                      className="h-8"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Within 1 km
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Available Now
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Emergency Only
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Donors/Requests */}
            {userRole === 'donor' ? (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Emergency Requests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {emergencyRequests.map((request) => (
                    <div key={request.id} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="blood-type-badge text-xs w-8 h-8">
                          {request.bloodType}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{request.location}</p>
                          <p className="text-xs text-muted-foreground">{request.time}</p>
                        </div>
                      </div>
                      <Badge className="bg-red-500 text-white mb-2">
                        {request.urgency}
                      </Badge>
                      <Button size="sm" className="w-full bg-medical-green hover:bg-medical-green/90">
                        Respond
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Nearby Donors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {donorsOnMap.filter(d => d.status === 'Available').map((donor) => (
                    <div key={donor.id} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="blood-type-badge text-xs w-8 h-8">
                          {donor.bloodType}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{donor.name}</p>
                          <p className="text-xs text-muted-foreground">{donor.distance}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button size="sm" className="flex-1 bg-medical-blue hover:bg-medical-blue/90">
                          Request
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Blood Banks */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Blood Banks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {bloodBanks.map((bank) => (
                  <div key={bank.id} className="p-3 border rounded-lg">
                    <p className="font-semibold text-sm">{bank.name}</p>
                    <p className="text-xs text-muted-foreground mb-2">{bank.distance}</p>
                    <Badge className={
                      bank.stock === 'High' ? 'bg-green-500' :
                      bank.stock === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }>
                      {bank.stock} Stock
                    </Badge>
                    <Button size="sm" variant="outline" className="w-full mt-2">
                      <Phone className="mr-2 h-3 w-3" />
                      Contact
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodMap;
