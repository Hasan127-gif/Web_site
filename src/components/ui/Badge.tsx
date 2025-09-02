import React from 'react';
import { clsx } from 'clsx';
import { Shield, GraduationCap, Phone, Check } from 'lucide-react';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

interface VerificationBadgeProps {
  type: 'id' | 'student' | 'phone';
  verified: boolean;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  children,
  className,
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
        
        // Variants
        {
          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': variant === 'primary',
          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': variant === 'secondary',
          'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200': variant === 'accent',
          'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200': variant === 'success',
          'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200': variant === 'warning',
          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': variant === 'error',
          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200': variant === 'neutral',
        },
        
        // Sizes
        {
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-2.5 py-1 text-sm': size === 'md',
        },
        
        className
      )}
    >
      {children}
    </span>
  );
};

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  type,
  verified,
  size = 'sm',
}) => {
  const icons = {
    id: Shield,
    student: GraduationCap,
    phone: Phone,
  };
  
  const labels = {
    id: 'Kimlik',
    student: 'Öğrenci',
    phone: 'Telefon',
  };
  
  const Icon = icons[type];
  
  return (
    <div
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border font-medium',
        {
          'px-2 py-1 text-xs': size === 'sm',
          'px-3 py-1.5 text-sm': size === 'md',
        },
        verified
          ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200'
          : 'bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400'
      )}
    >
      <Icon className={clsx(size === 'sm' ? 'h-3 w-3' : 'h-4 w-4')} />
      <span>{labels[type]}</span>
      {verified && <Check className={clsx(size === 'sm' ? 'h-3 w-3' : 'h-4 w-4')} />}
    </div>
  );
};