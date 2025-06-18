
import { useState } from 'react';
import AuthFlow from '@/components/AuthFlow';
import DonorDashboard from '@/components/DonorDashboard';
import RecipientDashboard from '@/components/RecipientDashboard';
import BloodMap from '@/components/BloodMap';

const Index = () => {
  const [currentView, setCurrentView] = useState<'auth' | 'dashboard' | 'map'>('auth');
  const [userData, setUserData] = useState<{
    name: string;
    role: 'donor' | 'recipient';
    bloodType: string;
  } | null>(null);

  const handleLogin = (data: { name: string; role: 'donor' | 'recipient'; bloodType: string }) => {
    setUserData(data);
    setCurrentView('dashboard');
  };

  const handleViewMap = () => {
    setCurrentView('map');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleViewRequests = () => {
    // This would typically navigate to a requests page
    // For now, we'll show the map which displays requests
    setCurrentView('map');
  };

  if (!userData || currentView === 'auth') {
    return <AuthFlow onLogin={handleLogin} />;
  }

  if (currentView === 'map') {
    return (
      <BloodMap 
        onBack={handleBackToDashboard}
        userRole={userData.role}
      />
    );
  }

  if (userData.role === 'donor') {
    return (
      <DonorDashboard 
        userData={userData}
        onViewRequests={handleViewRequests}
        onViewMap={handleViewMap}
      />
    );
  }

  return (
    <RecipientDashboard 
      userData={userData}
      onViewMap={handleViewMap}
    />
  );
};

export default Index;
