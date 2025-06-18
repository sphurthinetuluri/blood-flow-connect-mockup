
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, MapPin, Clock, ArrowLeft, CheckCircle, Users } from 'lucide-react';

interface EmergencyRequestProps {
  userData: { name: string; role: string; bloodType: string };
  onBack: () => void;
}

const EmergencyRequest = ({ userData, onBack }: EmergencyRequestProps) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    location: 'City Hospital',
    urgency: 'Critical',
    unitsNeeded: '2',
    notes: 'Patient in surgery, immediate need for blood transfusion'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate processing
    setTimeout(() => {
      setStep('success');
    }, 3000);
  };

  const handleQuickRequest = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-medical-gray-light p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-pulse mb-6">
              <div className="w-16 h-16 bg-medical-red rounded-full mx-auto flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Processing Emergency Request</h2>
            <Progress value={66} className="mb-4" />
            <p className="text-muted-foreground mb-4">
              Broadcasting your request to nearby donors...
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Finding compatible donors</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Notifying blood banks</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Alerting emergency contacts</span>
                <div className="animate-spin h-4 w-4 border-2 border-medical-red border-t-transparent rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-medical-gray-light p-4">
        <div className="max-w-4xl mx-auto">
          <Button onClick={onBack} variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <Card className="mb-6 border-green-500 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-green-700">Emergency Request Sent!</h2>
                  <p className="text-green-600">Your request has been broadcast to 47 nearby donors and 3 blood banks.</p>
                </div>
                <Badge className="bg-green-500 text-white">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Request Details */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Request Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Blood Type</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="blood-type-badge">
                        {userData.bloodType}
                      </div>
                      <span className="font-semibold">{userData.bloodType}</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Units Needed</Label>
                    <p className="text-lg font-semibold mt-1">{formData.unitsNeeded} units</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                    <p className="font-medium mt-1 flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-medical-red" />
                      {formData.location}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Urgency</Label>
                    <Badge className="bg-red-500 text-white mt-1">
                      {formData.urgency}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Additional Notes</Label>
                  <p className="mt-1 p-3 bg-gray-50 rounded-lg">{formData.notes}</p>
                </div>
              </CardContent>
            </Card>

            {/* Live Updates */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-medical-green" />
                    Live Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">5 donors responded</p>
                        <p className="text-xs text-muted-foreground">2 min ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">City Hospital alerted</p>
                        <p className="text-xs text-muted-foreground">3 min ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Request broadcast sent</p>
                        <p className="text-xs text-muted-foreground">5 min ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Donors Notified</span>
                        <span>47</span>
                      </div>
                      <Progress value={100} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Responses Received</span>
                        <span>5</span>
                      </div>
                      <Progress value={25} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Blood Banks Contacted</span>
                        <span>3</span>
                      </div>
                      <Progress value={100} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estimated Response Time</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-medical-green mb-2">
                    15-25 min
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on current donor locations and traffic
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-medical-gray-light p-4">
      <div className="max-w-2xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-medical-red">
              <AlertTriangle className="h-6 w-6" />
              Emergency Blood Request
            </CardTitle>
            <p className="text-muted-foreground">
              This will immediately notify nearby donors and blood banks. Please ensure all information is accurate.
            </p>
          </CardHeader>
          
          <CardContent>
            {/* Quick Emergency Button */}
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-700 mb-2">Critical Emergency?</h3>
              <p className="text-sm text-red-600 mb-3">
                For immediate life-threatening situations, use our 1-click emergency request with pre-filled details.
              </p>
              <Button 
                onClick={handleQuickRequest}
                className="emergency-button w-full"
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                SEND EMERGENCY REQUEST NOW
              </Button>
            </div>

            <div className="mb-4">
              <div className="w-full border-t border-gray-300"></div>
              <div className="flex justify-center -mt-3">
                <span className="bg-background px-4 text-sm text-muted-foreground">
                  Or customize your request
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bloodType">Blood Type Required</Label>
                  <Input 
                    id="bloodType" 
                    value={userData.bloodType} 
                    readOnly 
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="units">Units Needed</Label>
                  <Input
                    id="units"
                    value={formData.unitsNeeded}
                    onChange={(e) => setFormData({...formData, unitsNeeded: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Hospital/Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Enter hospital name or address"
                />
              </div>

              <div>
                <Label>Urgency Level</Label>
                <div className="flex gap-2 mt-2">
                  {['Critical', 'Urgent', 'Moderate'].map((level) => (
                    <Button
                      key={level}
                      type="button"
                      variant={formData.urgency === level ? "default" : "outline"}
                      className={formData.urgency === level ? 
                        (level === 'Critical' ? 'bg-red-500 hover:bg-red-600' :
                         level === 'Urgent' ? 'bg-orange-500 hover:bg-orange-600' :
                         'bg-yellow-500 hover:bg-yellow-600') : ''
                      }
                      onClick={() => setFormData({...formData, urgency: level})}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Provide any additional details about the emergency..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-medical-red hover:bg-medical-red/90" size="lg">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Send Emergency Request
                </Button>
                <Button type="button" variant="outline" onClick={onBack}>
                  Cancel
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center pt-2">
                By submitting this request, you confirm that this is a genuine medical emergency.
                False requests may result in account suspension.
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyRequest;
