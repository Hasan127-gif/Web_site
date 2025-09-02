import React from 'react';
import { clsx } from 'clsx';
import { Home, Heart, Map, MessageCircle, User } from 'lucide-react';
import { tr } from '../../locales/tr';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const navItems = [
  { id: 'home', label: 'Ana Sayfa', icon: Home },
  { id: 'roommate', label: tr.nav.roommate, icon: Home },
  { id: 'pets', label: tr.nav.pets, icon: Heart },
  { id: 'furniture', label: tr.nav.furniture, icon: Home },
  { id: 'chat', label: tr.nav.chat, icon: MessageCircle },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  className,
}) => {
  return (
    <nav
      className={clsx(
        'fixed bottom-0 left-0 right-0 z-30',
        'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md',
        'border-t border-gray-200 dark:border-gray-700',
        'safe-area-inset-bottom',
        className
      )}
    >
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={clsx(
                'flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200',
                'min-h-[48px] min-w-[48px]', // Minimum tap target
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                isActive
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              )}
              aria-label={item.label}
              role="tab"
              aria-selected={isActive}
            >
              <Icon
                className={clsx(
                  'h-5 w-5 transition-transform duration-200',
                  isActive && 'scale-110'
                )}
              />
              <span className="text-xs font-medium truncate max-w-[60px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};