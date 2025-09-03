import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Heart, Package, MessageCircle } from 'lucide-react';
import { tr } from '../locales/tr';
import { routes } from '../app/routes';

export const Nav: React.FC = () => {
  const location = useLocation();

  // Navigation items with icons
  const navItems = [
    { id: 'home', label: tr.nav.home, icon: Home, path: '/' },
    { id: 'roommate', label: tr.nav.roommate, icon: Users, path: '/roommates' },
    { id: 'pets', label: tr.nav.pets, icon: Heart, path: '/pets' },
    { id: 'furniture', label: tr.nav.furniture, icon: Package, path: '/furniture' },
    { id: 'chat', label: tr.nav.chat, icon: MessageCircle, path: '/chat' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
