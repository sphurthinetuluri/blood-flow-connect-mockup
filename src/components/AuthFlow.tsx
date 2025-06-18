
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface AuthFlowProps {
  onLogin: (userData: { name: string; role: 'donor' | 'recipient'; bloodType: string }) => void;
}

const AuthFlow = ({ onLogin }: AuthFlowProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodType: '',
    role: 'donor' as 'donor' | 'recipient'
  });

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: formData.name || 'John Doe',
      role: formData.role,
      bloodType: formData.bloodType || 'O+'
    });
  };

  const handleQuickLogin = (role: 'donor' | 'recipient') => {
    onLogin({
      name: role === 'donor' ? 'Alex Donor' : 'Sarah Recipient',
      role,
      bloodType: role === 'donor' ? 'O+' : 'B+'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue-light to-medical-red-light flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-medical rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🩸</span>
          </div>
          <CardTitle className="text-3xl font-bold text-medical-red">Blood Connect</CardTitle>
          <p className="text-muted-foreground">Saving lives, one donation at a time</p>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Quick Start (Demo)</p>
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleQuickLogin('donor')}
                  className="flex-1 bg-medical-green hover:bg-medical-green/90"
                >
                  Login as Donor
                </Button>
                <Button 
                  onClick={() => handleQuickLogin('recipient')}
                  className="flex-1 bg-medical-blue hover:bg-medical-blue/90"
                >
                  Login as Recipient
                </Button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with form</span>
            </div>
          </div>

          <Tabs defaultValue="signup" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+1234567890"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Blood Type</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {bloodTypes.map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant={formData.bloodType === type ? "default" : "outline"}
                        className="h-12"
                        onClick={() => setFormData({...formData, bloodType: type})}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>I want to</Label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      type="button"
                      variant={formData.role === 'donor' ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setFormData({...formData, role: 'donor'})}
                    >
                      <span className="mr-2">❤️</span>
                      Donate Blood
                    </Button>
                    <Button
                      type="button"
                      variant={formData.role === 'recipient' ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setFormData({...formData, role: 'recipient'})}
                    >
                      <span className="mr-2">🆘</span>
                      Request Blood
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-medical-red hover:bg-medical-red/90">
                  Create Account
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <Button onClick={() => handleQuickLogin('donor')} className="w-full bg-medical-red hover:bg-medical-red/90">
                  Sign In
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthFlow;
