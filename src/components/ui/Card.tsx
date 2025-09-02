import React from 'react';
import { clsx } from 'clsx';
import { Heart, MapPin, Star } from 'lucide-react';
import { Badge, VerificationBadge } from './Badge';
import { tr } from '../../locales/tr';
import type { Listing } from '../../types';

interface CardProps {
  listing: Listing;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  listing,
  onFavorite,
  isFavorited = false,
  className,
}) => {
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavorite?.(listing.id);
  };

  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-200',
        'border border-gray-200 dark:border-gray-700',
        'overflow-hidden cursor-pointer group',
        className
      )}
    >
      {/* Image Container with 4:3 ratio */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.images[0] || 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 transition-colors"
          aria-label={isFavorited ? 'Favorilerden çıkar' : 'Favorilere ekle'}
        >
          <Heart
            className={clsx(
              'h-4 w-4 transition-colors',
              isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'
            )}
          />
        </button>
        
        {/* Featured Badge */}
        {listing.featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="accent" size="sm">
              {tr.common.featured}
            </Badge>
          </div>
        )}
        
        {/* Escrow Badge */}
        {listing.escrow && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="success" size="sm">
              {tr.trust.escrowProtected}
            </Badge>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {listing.title}
          </h3>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400 ml-2 flex-shrink-0">
            ₺{listing.price.toLocaleString('tr-TR')}
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <MapPin className="h-4 w-4" />
          <span>{listing.location.district}, {listing.location.city}</span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {listing.description}
        </p>
        
        {/* User Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              {listing.user.avatar ? (
                <img src={listing.user.avatar} alt={listing.user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {listing.user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {listing.user.name}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {listing.user.rating} ({listing.user.reviewCount})
                </span>
              </div>
            </div>
          </div>
          
          {/* Verification Badges */}
          <div className="flex gap-1">
            {listing.user.verifications.id && (
              <VerificationBadge type="id" verified={true} size="sm" />
            )}
            {listing.user.verifications.student && (
              <VerificationBadge type="student" verified={true} size="sm" />
            )}
            {listing.user.verifications.phone && (
              <VerificationBadge type="phone" verified={true} size="sm" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};