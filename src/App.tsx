import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { HomePage } from './components/pages/HomePage';
import { RoommatePage } from './components/pages/RoommatePage';
import { RoommateDetailPage } from './components/pages/RoommateDetailPage';
import { CreateListingPage } from './components/pages/CreateListingPage';
import { PetsPage } from './components/pages/PetsPage';
import { PetDetailPage } from './components/pages/PetDetailPage';
import { AdoptionApplicationPage } from './components/pages/AdoptionApplicationPage';
import { FurniturePage } from './components/pages/FurniturePage';
import { FurnitureDetailPage } from './components/pages/FurnitureDetailPage';
import { CreateFurnitureListingPage } from './components/pages/CreateFurnitureListingPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { ChatPage } from './components/pages/ChatPage';
import { ContractWizardPage } from './components/pages/ContractWizardPage';
import { SafetyTipsModal } from './components/SafetyTipsModal';
import { ThemeProvider } from './components/ThemeProvider';
import { Button } from './components/ui/Button';
import { Shield } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [showSafetyTips, setShowSafetyTips] = useState(false);
  const [showRoommateDetail, setShowRoommateDetail] = useState(false);
  const [showCreateListing, setShowCreateListing] = useState(false);
  const [showPetDetail, setShowPetDetail] = useState(false);
  const [showAdoptionApplication, setShowAdoptionApplication] = useState(false);
  const [showFurnitureDetail, setShowFurnitureDetail] = useState(false);
  const [showCreateFurnitureListing, setShowCreateFurnitureListing] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showContractWizard, setShowContractWizard] = useState(false);

  const renderCurrentPage = () => {
    if (showRoommateDetail) {
      return (
        <RoommateDetailPage 
          listing={{} as any}
          onBack={() => setShowRoommateDetail(false)}
          onShowContract={() => {
            setShowRoommateDetail(false);
            setShowContractWizard(true);
          }}
        />
      );
    }

    if (showCreateListing) {
      return (
        <CreateListingPage 
          onBack={() => setShowCreateListing(false)}
        />
      );
    }

    if (showPetDetail) {
      return (
        <PetDetailPage 
          listing={{} as any}
          onBack={() => setShowPetDetail(false)}
          onShowApplication={() => {
            setShowPetDetail(false);
            setShowAdoptionApplication(true);
          }}
        />
      );
    }

    if (showAdoptionApplication) {
      return (
        <AdoptionApplicationPage 
          petName="Luna"
          onBack={() => setShowAdoptionApplication(false)}
        />
      );
    }

    if (showFurnitureDetail) {
      return (
        <FurnitureDetailPage 
          listing={{} as any}
          onBack={() => setShowFurnitureDetail(false)}
        />
      );
    }

    if (showCreateFurnitureListing) {
      return (
        <CreateFurnitureListingPage 
          onBack={() => setShowCreateFurnitureListing(false)}
        />
      );
    }

    if (showProfile) {
      return (
        <ProfilePage 
          onBack={() => setShowProfile(false)}
        />
      );
    }

    if (showContractWizard) {
      return (
        <ContractWizardPage 
          onBack={() => setShowContractWizard(false)}
        />
      );
    }

    switch (activeTab) {
      case 'roommate':
        return <RoommatePage onShowDetail={() => setShowRoommateDetail(true)} />;
      case 'pets':
        return <PetsPage onShowDetail={() => setShowPetDetail(true)} />;
              case 'furniture':
        return (
          <FurniturePage 
            onShowDetail={() => setShowFurnitureDetail(true)}
            onCreateListing={() => setShowCreateFurnitureListing(true)}
          />
        );
              case 'chat':
        return <ChatPage onBack={() => setActiveTab('home')} />;
      default:
        return (
          <HomePage 
            activeService={activeTab} 
            onServiceChange={setActiveTab}
            onCreateListing={() => setShowCreateListing(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header onProfileClick={() => setShowProfile(true)} />
      
      {/* Safety Tips Button - Floating */}
      <Button
        onClick={() => setShowSafetyTips(true)}
        variant="secondary"
        size="sm"
        className="fixed top-20 right-4 z-30 shadow-lg"
        aria-label="Güvenlik İpuçları"
      >
        <Shield className="h-4 w-4" />
      </Button>
      
      <main className="pt-4">
        {renderCurrentPage()}
      </main>
      
      {!showRoommateDetail && !showCreateListing && !showPetDetail && !showAdoptionApplication && !showFurnitureDetail && !showCreateFurnitureListing && !showProfile && !showContractWizard && (
        <Navigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}
      
      <SafetyTipsModal
        isOpen={showSafetyTips}
        onClose={() => setShowSafetyTips(false)}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;