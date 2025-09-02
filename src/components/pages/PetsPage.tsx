import React, { useState } from 'react';
import { FilterPill } from '../ui/FilterPill';
import { PetCard } from '../ui/PetCard';
import { AIRecommendationCard } from '../ui/AIRecommendationCard';
import { EmptyState } from '../ui/EmptyState';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { 
  Heart, 
  Filter, 
  Search,
  SlidersHorizontal,
  Sparkles,
  User,
  X
} from 'lucide-react';
import { tr } from '../../locales/tr';
import type { PetListing } from '../../types';

interface FilterState {
  petTypes: string[];
  breeds: string[];
  ageRanges: string[];
  neutered: boolean | null;
  vaccinated: boolean | null;
  microchipped: boolean | null;
  childFriendly: boolean | null;
  location: string;
}

const mockPetListings: PetListing[] = [
  {
    id: '1',
    title: 'Luna - Sevimli Golden Retriever Yavrusu',
    description: 'Çok sevecen ve oyuncu bir Golden Retriever yavrusu. Aşıları tam, sağlık raporu mevcut. Çocuklarla çok iyi geçiniyor.',
    images: ['https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400'],
    price: 0,
    location: {
      city: 'İstanbul',
      district: 'Beşiktaş',
      lat: 41.0429,
      lng: 29.0096,
    },
    user: {
      id: '1',
      name: 'Patiler Barınağı',
      email: 'patiler@example.com',
      verifications: { id: true, student: false, phone: true },
      rating: 4.9,
      reviewCount: 45,
    },
    category: 'pet',
    petType: 'dog',
    breed: 'Golden Retriever',
    age: '3 aylık',
    gender: 'female',
    vaccinated: true,
    neutered: false,
    createdAt: '2025-01-09',
    featured: true,
  },
  {
    id: '2',
    title: 'Mırnav - Şirin Tekir Kedi',
    description: 'Çok sakin ve sevecen bir tekir kedi. Ev ortamına alışkın, çocuklarla iyi geçiniyor. Tuvalet eğitimi tamam.',
    images: ['https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400'],
    price: 0,
    location: {
      city: 'Ankara',
      district: 'Çankaya',
      lat: 39.9042,
      lng: 32.8597,
    },
    user: {
      id: '2',
      name: 'Ali Şahin',
      email: 'ali@example.com',
      verifications: { id: true, student: true, phone: true },
      rating: 4.7,
      reviewCount: 9,
    },
    category: 'pet',
    petType: 'cat',
    breed: 'Tekir',
    age: '1 yaşında',
    gender: 'female',
    vaccinated: true,
    neutered: true,
    createdAt: '2025-01-07',
    featured: false,
  },
  {
    id: '3',
    title: 'Max - Oyuncu Husky',
    description: 'Çok enerjik ve sadık bir Husky. Günlük uzun yürüyüşlere ihtiyacı var. Deneyimli sahip arıyor.',
    images: ['https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400'],
    price: 0,
    location: {
      city: 'İzmir',
      district: 'Bornova',
      lat: 38.4189,
      lng: 27.1287,
    },
    user: {
      id: '3',
      name: 'Hayvan Dostları Derneği',
      email: 'hayvandostlari@example.com',
      verifications: { id: true, student: false, phone: true },
      rating: 4.8,
      reviewCount: 32,
    },
    category: 'pet',
    petType: 'dog',
    breed: 'Husky',
    age: '2 yaşında',
    gender: 'male',
    vaccinated: true,
    neutered: true,
    createdAt: '2025-01-05',
    featured: false,
  },
  {
    id: '4',
    title: 'Cici - Renkli Muhabbet Kuşu',
    description: 'Çok konuşkan ve sosyal bir muhabbet kuşu. Kafesi ve tüm malzemeleri ile birlikte.',
    images: ['https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=400'],
    price: 0,
    location: {
      city: 'İstanbul',
      district: 'Kadıköy',
      lat: 40.9833,
      lng: 29.0167,
    },
    user: {
      id: '4',
      name: 'Mehmet Yılmaz',
      email: 'mehmet@example.com',
      verifications: { id: true, student: false, phone: true },
      rating: 4.3,
      reviewCount: 5,
    },
    category: 'pet',
    petType: 'bird',
    breed: 'Muhabbet Kuşu',
    age: '8 aylık',
    gender: 'male',
    vaccinated: false,
    neutered: false,
    createdAt: '2025-01-03',
    featured: false,
  }
];

const quickFilters = [
  { id: 'all', label: 'Tümü', count: mockPetListings.length },
  { id: 'dog', label: 'Köpek', count: 2 },
  { id: 'cat', label: 'Kedi', count: 1 },
  { id: 'bird', label: 'Kuş', count: 1 },
  { id: 'rabbit', label: 'Tavşan', count: 0 },
];

const petTypeOptions = [
  { value: 'dog', label: 'Köpek' },
  { value: 'cat', label: 'Kedi' },
  { value: 'bird', label: 'Kuş' },
  { value: 'rabbit', label: 'Tavşan' },
  { value: 'other', label: 'Diğer' }
];

const ageRangeOptions = [
  { value: 'puppy', label: 'Yavru (0-6 ay)' },
  { value: 'young', label: 'Genç (6ay-2yaş)' },
  { value: 'adult', label: 'Yetişkin (2-7 yaş)' },
  { value: 'senior', label: 'Yaşlı (7+ yaş)' }
];

const locationOptions = [
  { value: 'istanbul', label: 'İstanbul' },
  { value: 'ankara', label: 'Ankara' },
  { value: 'izmir', label: 'İzmir' }
];

interface PetsPageProps {
  onShowDetail?: () => void;
}

export const PetsPage: React.FC<PetsPageProps> = ({ onShowDetail }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  
  const [filters, setFilters] = useState<FilterState>({
    petTypes: [],
    breeds: [],
    ageRanges: [],
    neutered: null,
    vaccinated: null,
    microchipped: null,
    childFriendly: null,
    location: ''
  });

  const handleFavorite = (id: string): void => {
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleFilterChange = (key: keyof FilterState, value: any): void => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearAllFilters = (): void => {
    setFilters({
      petTypes: [],
      breeds: [],
      ageRanges: [],
      neutered: null,
      vaccinated: null,
      microchipped: null,
      childFriendly: null,
      location: ''
    });
    setActiveFilter('all');
    setSearchQuery('');
  };

  const togglePetType = (petType: string): void => {
    const newTypes = filters.petTypes.includes(petType)
      ? filters.petTypes.filter(t => t !== petType)
      : [...filters.petTypes, petType];
    handleFilterChange('petTypes', newTypes);
  };

  const filteredListings = mockPetListings.filter(listing => {
    // Quick filter
    if (activeFilter !== 'all' && listing.petType !== activeFilter) return false;
    
    // Search query
    if (searchQuery && !listing.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !listing.breed.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Pet type filter
    if (filters.petTypes.length > 0 && !filters.petTypes.includes(listing.petType)) return false;
    
    // Vaccination filter
    if (filters.vaccinated !== null && listing.vaccinated !== filters.vaccinated) return false;
    
    // Neutered filter
    if (filters.neutered !== null && listing.neutered !== filters.neutered) return false;
    
    // Microchipped filter (assume true for high-rated shelters)
    if (filters.microchipped !== null) {
      const isMicrochipped = listing.user.rating > 4.5;
      if (isMicrochipped !== filters.microchipped) return false;
    }
    
    // Child-friendly filter (assume true for featured pets)
    if (filters.childFriendly !== null) {
      const isChildFriendly = listing.featured;
      if (isChildFriendly !== filters.childFriendly) return false;
    }
    
    return true;
  });

  const hasActiveFilters = filters.petTypes.length > 0 || 
    filters.vaccinated !== null ||
    filters.neutered !== null ||
    filters.microchipped !== null ||
    filters.childFriendly !== null ||
    filters.location !== '' ||
    searchQuery.length > 0;

  return (
    <div className="pb-20">
      {/* Search and Quick Filters */}
      <div className="sticky top-16 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        {/* Search Bar */}
        <div className="p-4 pb-2">
          <Input
            placeholder="Hayvan ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
            className="text-sm"
          />
        </div>
        
        {/* Quick Filters and Controls */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {quickFilters.map(filter => (
              <FilterPill
                key={filter.id}
                label={filter.label}
                count={filter.count}
                active={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              />
            ))}
            
            <div className="flex gap-2 ml-auto flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(true)}
                className={hasActiveFilters ? 'text-blue-600 dark:text-blue-400' : ''}
              >
                <SlidersHorizontal className="h-4 w-4 mr-1" />
                Filtreler
              </Button>
            </div>
          </div>
          
          {hasActiveFilters && (
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {filteredListings.length} hayvan bulundu
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-red-600 dark:text-red-400"
              >
                <X className="h-4 w-4 mr-1" />
                Temizle
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Pet Match Widget */}
      <div className="p-4">
        <AIRecommendationCard
          isLoading={false}
          isEmpty={false}
          onViewRecommendations={() => {
            console.log('View pet recommendations');
          }}
          className="mb-6"
        />
      </div>

      {/* Content */}
      <div className="px-4">
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredListings.map(listing => (
              <PetCard
                key={listing.id}
                listing={listing}
                onFavorite={handleFavorite}
                isFavorited={favoriteIds.has(listing.id)}
                distance="2.1 km"
                onClick={onShowDetail}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Heart className="h-8 w-8" />}
            title="Uygun hayvan bulunamadı"
            description="Profiline yaşam tarzını ekle — daha iyi eşleşmeler!"
            action={
              <div className="space-y-2">
                <Button onClick={clearAllFilters}>
                  Filtreleri Temizle
                </Button>
                <Button variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  Profili Tamamla
                </Button>
              </div>
            }
          />
        )}
      </div>

      {/* Advanced Filters Modal */}
      <Modal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Hayvan Filtreleri"
        size="md"
      >
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {/* Pet Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
              Hayvan Türü
            </label>
            <div className="flex flex-wrap gap-2">
              {petTypeOptions.map((type) => (
                <FilterPill
                  key={type.value}
                  label={type.label}
                  active={filters.petTypes.includes(type.value)}
                  onClick={() => togglePetType(type.value)}
                />
              ))}
            </div>
          </div>

          {/* Breed Filter */}
          <div>
            <Input
              label="Cins"
              placeholder="Örn: Golden Retriever, Tekir..."
              className="text-sm"
            />
          </div>

          {/* Age Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
              Yaş Aralığı
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ageRangeOptions.map((age) => (
                <FilterPill
                  key={age.value}
                  label={age.label}
                  active={filters.ageRanges.includes(age.value)}
                  onClick={() => {
                    const newRanges = filters.ageRanges.includes(age.value)
                      ? filters.ageRanges.filter(r => r !== age.value)
                      : [...filters.ageRanges, age.value];
                    handleFilterChange('ageRanges', newRanges);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Health Filters */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Kısırlaştırma
              </label>
              <div className="flex gap-2">
                <FilterPill
                  label="Kısırlaştırılmış"
                  active={filters.neutered === true}
                  onClick={() => handleFilterChange('neutered', filters.neutered === true ? null : true)}
                />
                <FilterPill
                  label="Kısırlaştırılmamış"
                  active={filters.neutered === false}
                  onClick={() => handleFilterChange('neutered', filters.neutered === false ? null : false)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Aşı Kartı
              </label>
              <div className="flex gap-2">
                <FilterPill
                  label="Aşıları Tam"
                  active={filters.vaccinated === true}
                  onClick={() => handleFilterChange('vaccinated', filters.vaccinated === true ? null : true)}
                />
                <FilterPill
                  label="Aşı Eksik"
                  active={filters.vaccinated === false}
                  onClick={() => handleFilterChange('vaccinated', filters.vaccinated === false ? null : false)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Çip
              </label>
              <div className="flex gap-2">
                <FilterPill
                  label="Çipli"
                  active={filters.microchipped === true}
                  onClick={() => handleFilterChange('microchipped', filters.microchipped === true ? null : true)}
                />
                <FilterPill
                  label="Çipsiz"
                  active={filters.microchipped === false}
                  onClick={() => handleFilterChange('microchipped', filters.microchipped === false ? null : false)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Çocukla Uyumlu
              </label>
              <div className="flex gap-2">
                <FilterPill
                  label="Çocuk Dostu"
                  active={filters.childFriendly === true}
                  onClick={() => handleFilterChange('childFriendly', filters.childFriendly === true ? null : true)}
                />
                <FilterPill
                  label="Sadece Yetişkin"
                  active={filters.childFriendly === false}
                  onClick={() => handleFilterChange('childFriendly', filters.childFriendly === false ? null : false)}
                />
              </div>
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <Select
              label="Konum"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              options={locationOptions}
              placeholder="Şehir seçin"
            />
          </div>
        </div>
        
        <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={() => setShowFilters(false)} className="flex-1">
            Filtreleri Uygula ({filteredListings.length})
          </Button>
          <Button variant="ghost" onClick={clearAllFilters}>
            Temizle
          </Button>
        </div>
      </Modal>
    </div>
  );
};