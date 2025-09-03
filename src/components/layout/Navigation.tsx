import React from 'react';
import { Home, Users, Heart, Package, MessageCircle } from 'lucide-react';
import { tr } from '../../locales/tr';

interface NavigationProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activePage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: tr.nav.home, icon: Home },
    { id: 'roommate', label: tr.nav.roommate, icon: Users },
    { id: 'pets', label: tr.nav.pets, icon: Heart },
    { id: 'furniture', label: tr.nav.furniture, icon: Package },
    { id: 'chat', label: tr.nav.chat, icon: MessageCircle },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
