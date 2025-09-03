import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
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
import { RoommateListing, PetListing, FurnitureListing } from './types';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [showRoommateDetail, setShowRoommateDetail] = useState(false);
  const [showCreateListing, setShowCreateListing] = useState(false);
  const [showPetDetail, setShowPetDetail] = useState(false);
  const [showAdoptionApplication, setShowAdoptionApplication] = useState(false);
  const [showFurnitureDetail, setShowFurnitureDetail] = useState(false);
  const [showCreateFurnitureListing, setShowCreateFurnitureListing] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showContractWizard, setShowContractWizard] = useState(false);

  const renderCurrentPage = () => {
    if (showRoommateDetail) {
      return (
        <RoommateDetailPage 
          listing={{} as RoommateListing}
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
          listing={{} as PetListing}
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
          listing={{} as FurnitureListing}
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

    if (showChat) {
      return (
        <ChatPage 
          onBack={() => setShowChat(false)}
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

    switch (activePage) {
      case 'home':
        return (
          <HomePage 
            onCreateListing={() => setShowCreateListing(true)}
          />
        );
      case 'roommate':
        return (
          <RoommatePage 
            onShowDetail={() => setShowRoommateDetail(true)}
          />
        );
      case 'pets':
        return (
          <PetsPage 
            onShowDetail={() => setShowPetDetail(true)}
          />
        );
      case 'furniture':
        return (
          <FurniturePage 
            onShowDetail={() => setShowFurnitureDetail(true)}
            onCreateListing={() => setShowCreateFurnitureListing(true)}
          />
        );
      default:
        return (
          <HomePage 
            onCreateListing={() => setShowCreateListing(true)}
          />
        );
    }
  };

  const isDetailPage = showRoommateDetail || showCreateListing || showPetDetail || 
                      showAdoptionApplication || showFurnitureDetail || 
                      showCreateFurnitureListing || showProfile || showChat || 
                      showContractWizard;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header 
          onProfileClick={() => setShowProfile(true)}
        />
        <main className="pb-20">
          {renderCurrentPage()}
        </main>
        {!isDetailPage && (
          <Navigation 
            activePage={activePage}
            onPageChange={setActivePage}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
