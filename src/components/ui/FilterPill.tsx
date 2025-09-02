import React from 'react';
import { clsx } from 'clsx';

interface FilterPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  count?: number;
}

export const FilterPill: React.FC<FilterPillProps> = ({
  label,
  active = false,
  onClick,
  count,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium',
        'transition-all duration-200 whitespace-nowrap',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
        active
          ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
      )}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={clsx(
            'text-xs px-1.5 py-0.5 rounded-full font-semibold',
            active
              ? 'bg-white/20 text-white'
              : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
};