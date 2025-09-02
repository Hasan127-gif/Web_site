import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Search, Menu, Bell, User, Moon, Sun } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useTheme } from '../../hooks/useTheme';
import { tr } from '../../locales/tr';

interface HeaderProps {
  onMenuToggle?: () => void;
  onProfileClick?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, onProfileClick, className }) => {
  const [searchValue, setSearchValue] = useState('');
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md',
        'border-b border-gray-200 dark:border-gray-700',
        'transition-colors duration-200',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="sm:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Menüyü aç"
          >
            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          </button>
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="hidden sm:block text-xl font-bold text-gray-900 dark:text-gray-100">
              TrustApp
            </span>
          </div>
          
          {/* Search bar - hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <Input
              type="text"
              placeholder={tr.common.search}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              icon={<Search className="h-4 w-4" />}
              className="w-full"
            />
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Mobile search button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Ara"
            >
              <Search className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            </button>
            
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label={theme === 'light' ? 'Karanlık tema' : 'Açık tema'}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              ) : (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>
            
            {/* Notifications */}
            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative"
              aria-label="Bildirimler"
            >
              <Bell className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
            </button>
            
            {/* Profile */}
            <button
              onClick={onProfileClick}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Profil"
            >
              <User className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};