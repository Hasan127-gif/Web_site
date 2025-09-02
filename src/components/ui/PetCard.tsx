import React from 'react';
import { clsx } from 'clsx';
import { Heart, MapPin, Star, Shield, Baby, Zap, Home } from 'lucide-react';
import { Badge } from './Badge';
import { tr } from '../../locales/tr';
import type { PetListing } from '../../types';

interface PetCardProps {
  listing: PetListing;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
  distance?: string;
  className?: string;
  onClick?: () => void;
}

export const PetCard: React.FC<PetCardProps> = ({
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

  const getPetTypeIcon = (type: string) => {
    switch (type) {
      case 'dog':
        return '🐕';
      case 'cat':
        return '🐱';
      case 'bird':
        return '🐦';
      case 'rabbit':
        return '🐰';
      default:
        return '🐾';
    }
  };

  const getPetTypeName = (type: string) => {
    switch (type) {
      case 'dog':
        return tr.pets.dog;
      case 'cat':
        return tr.pets.cat;
      case 'bird':
        return tr.pets.bird;
      case 'rabbit':
        return tr.pets.rabbit;
      default:
        return tr.pets.other;
    }
  };

  const getGenderIcon = (gender: string) => {
    return gender === 'male' ? '♂️' : '♀️';
  };

  // Extract pet name from title (assuming format: "Name - Description")
  const petName = listing.title.split(' - ')[0] || listing.title.split(' ')[0] || 'İsimsiz';

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
      {/* Pet Photo */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={listing.images[0] || 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400'}
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
        
        {/* Pet Type Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" size="sm" className="bg-white/90 text-gray-800">
            <span className="mr-1">{getPetTypeIcon(listing.petType)}</span>
            {getPetTypeName(listing.petType)}
          </Badge>
        </div>
        
        {/* Featured Badge */}
        {listing.featured && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="accent" size="sm">
              {tr.common.featured}
            </Badge>
          </div>
        )}
        
        {/* Free Adoption Badge */}
        {listing.price === 0 && (
          <div className="absolute bottom-3 right-3">
            <Badge variant="success" size="sm">
              Ücretsiz Sahiplenme
            </Badge>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Name and Age */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {petName}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <span>{getGenderIcon(listing.gender)}</span>
            <span>{listing.age}</span>
          </div>
        </div>
        
        {/* Breed */}
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {listing.breed}
        </div>
        
        {/* Health Badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {listing.vaccinated && (
            <Badge variant="success" size="sm">
              <Shield className="h-3 w-3 mr-1" />
              Aşılı
            </Badge>
          )}
          
          {listing.neutered && (
            <Badge variant="primary" size="sm">
              <Zap className="h-3 w-3 mr-1" />
              Kısır
            </Badge>
          )}
          
          {/* Assume microchipped if from shelter (user rating > 4.5) */}
          {listing.user.rating > 4.5 && (
            <Badge variant="secondary" size="sm">
              🔍 Çipli
            </Badge>
          )}
          
          {/* Child-friendly indicator (assume true for featured pets) */}
          {listing.featured && (
                         <Badge variant="primary" size="sm">
              <Baby className="h-3 w-3 mr-1" />
              Çocuk Dostu
            </Badge>
          )}
        </div>
        
        {/* Location and Distance */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <MapPin className="h-4 w-4" />
          <span>{listing.location.district}, {listing.location.city}</span>
          {distance && (
            <>
              <span>•</span>
              <span>{distance}</span>
            </>
          )}
        </div>
        
        {/* Owner/Shelter Info */}
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
                {/* Shelter vs Owner Tag */}
                {listing.user.rating > 4.5 ? (
                  <Badge variant="primary" size="sm" className="text-xs">
                    <Home className="h-3 w-3 mr-1" />
                    Barınak
                  </Badge>
                ) : (
                  <Badge variant="secondary" size="sm" className="text-xs">
                    Sahip
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {listing.user.rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 