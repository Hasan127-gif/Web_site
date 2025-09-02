import React from 'react';
import { clsx } from 'clsx';
import { Heart, MapPin, Star, Shield, Users, Cigarette, GraduationCap } from 'lucide-react';
import { Badge, VerificationBadge } from './Badge';
import { tr } from '../../locales/tr';
import type { RoommateListing } from '../../types';

interface RoommateCardProps {
  listing: RoommateListing;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
  distance?: string;
  className?: string;
  onClick?: () => void;
}

export const RoommateCard: React.FC<RoommateCardProps> = ({
  listing,
  onFavorite,
  isFavorited = false,
  distance,
  className,
  onClick,
}) => {
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavorite?.(listing.id);
  };

  const getRoomTypeLabel = (type: string) => {
    switch (type) {
      case 'single':
        return tr.roommate.single;
      case 'shared':
        return tr.roommate.shared;
      case 'studio':
        return tr.roommate.studio;
      default:
        return type;
    }
  };

  const getGenderLabel = (gender?: string) => {
    switch (gender) {
      case 'male':
        return tr.roommate.male;
      case 'female':
        return tr.roommate.female;
      case 'any':
        return tr.roommate.any;
      default:
        return tr.roommate.any;
    }
  };

  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-200',
        'border border-gray-200 dark:border-gray-700',
        'overflow-hidden cursor-pointer group',
        className
      )}
      onClick={onClick}
    >
      <div className="flex">
        {/* Left: Photo */}
        <div className="relative w-32 h-24 flex-shrink-0">
          <img
            src={listing.images[0] || 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400'}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label={isFavorited ? 'Favorilerden çıkar' : 'Favorilere ekle'}
          >
            <Heart
              className={clsx(
                'h-3 w-3 transition-colors',
                isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'
              )}
            />
          </button>
          
          {/* Featured Badge */}
          {listing.featured && (
            <div className="absolute top-2 left-2">
              <Badge variant="accent" size="sm">
                {tr.common.featured}
              </Badge>
            </div>
          )}
        </div>
        
        {/* Right: Content */}
        <div className="flex-1 p-3 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {listing.title}
            </h3>
            <div className="text-sm font-bold text-blue-600 dark:text-blue-400 ml-2 flex-shrink-0">
              ₺{listing.price.toLocaleString('tr-TR')}/ay
            </div>
          </div>
          
          {/* Location and Distance */}
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
            <MapPin className="h-3 w-3" />
            <span>{listing.location.district}, {listing.location.city}</span>
            {distance && (
              <>
                <span>•</span>
                <span>{distance}</span>
              </>
            )}
          </div>
          
          {/* Room Type and Badges */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant="secondary" size="sm">
              {getRoomTypeLabel(listing.roomType)}
            </Badge>
            
            {listing.preferences.pets && (
              <Badge variant="success" size="sm">
                Evcil Dostu
              </Badge>
            )}
            
            {listing.preferences.students && (
              <Badge variant="primary" size="sm">
                <GraduationCap className="h-3 w-3 mr-1" />
                Öğrenci
              </Badge>
            )}
          </div>
          
          {/* Rules/Preferences */}
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{getGenderLabel(listing.preferences.gender)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Cigarette className={clsx(
                'h-3 w-3',
                listing.preferences.smoking ? 'text-orange-500' : 'text-gray-400 line-through'
              )} />
              <span>{listing.preferences.smoking ? 'İzinli' : 'Yasak'}</span>
            </div>
          </div>
          
          {/* User Info and Verifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                {listing.user.avatar ? (
                  <img src={listing.user.avatar} alt={listing.user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-medium">
                    {listing.user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <div className="text-xs font-medium text-gray-900 dark:text-gray-100">
                  {listing.user.name}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {listing.user.rating}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Verification Badges */}
            <div className="flex gap-1">
              {listing.user.verifications.id && (
                <VerificationBadge type="id" verified={true} size="sm" />
              )}
              {listing.user.verifications.phone && (
                <VerificationBadge type="phone" verified={true} size="sm" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 