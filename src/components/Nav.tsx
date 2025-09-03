import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Heart, Package, MessageCircle } from 'lucide-react';
import { tr } from '../locales/tr';

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
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-sm font-bold text-white">T</span>
            </div>
            <span className="text-xl font-bold text-neutral-900">TrustApp</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-neutral-100">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t bg-white">
        <div className="mx-auto max-w-6xl px-4">
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
                      ? 'text-blue-600' 
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
