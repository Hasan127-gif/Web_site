import React, { useState } from 'react';
import { FilterPill } from '../ui/FilterPill';
import { RoommateCard } from '../ui/RoommateCard';
import { AIRecommendationCard } from '../ui/AIRecommendationCard';
import { EmptyState } from '../ui/EmptyState';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { RangeSlider } from '../ui/RangeSlider';
import { Input } from '../ui/Input';
import { 
  Home, 
  Filter, 
  MapPin, 
  SlidersHorizontal, 
  ArrowUpDown,
  Map,
  List,
  Search,
  X
} from 'lucide-react';
import { tr } from '../../locales/tr';
import type { RoommateListing } from '../../types';

interface FilterState {
  cities: string[];
  districts: string[];
  budget: [number, number];
  roomTypes: string[];
  furnished: boolean | null;
  petFriendly: boolean | null;
  smoking: boolean | null;
  gender: string;
  student: boolean | null;
}

const mockRoommateListings: RoommateListing[] = [
  {
    id: '1',
    title: 'Kadıköy\'de Öğrenci Evi - Tek Kişilik Oda',
    description: 'Temiz, sakin ve güvenli bir ortamda tek kişilik oda. Metro ve üniversiteye yakın.',
    images: ['https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400'],
    price: 3500,
    location: {
      city: 'İstanbul',
      district: 'Kadıköy',
      lat: 40.9829,
      lng: 29.0375,
    },
    user: {
      id: '1',
      name: 'Ayşe Yılmaz',
      email: 'ayse@example.com',
      verifications: { id: true, student: true, phone: true },
      rating: 4.8,
      reviewCount: 12,
    },
    category: 'roommate',
    roomType: 'single',
    availableFrom: '2025-02-01',
    preferences: {
      gender: 'female',
      smoking: false,
      pets: false,
      students: true,
    },
    createdAt: '2025-01-10',
    featured: true,
    escrow: true,
  },
  {
    id: '2',
    title: 'Beyoğlu\'nda Paylaşımlı Ev',
    description: 'Merkezi konumda 3+1 dairede paylaşımlı yaşam alanı.',
    images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'],
    price: 2800,
    location: {
      city: 'İstanbul',
      district: 'Beyoğlu',
      lat: 41.0369,
      lng: 28.9857,
    },
    user: {
      id: '2',
      name: 'Mehmet Demir',
      email: 'mehmet@example.com',
      verifications: { id: true, student: false, phone: true },
      rating: 4.6,
      reviewCount: 8,
    },
    category: 'roommate',
    roomType: 'shared',
    availableFrom: '2025-01-20',
    preferences: {
      gender: 'any',
      smoking: false,
      pets: true,
      students: false,
    },
    createdAt: '2025-01-08',
    featured: false,
  },
  {
    id: '3',
    title: 'Beşiktaş\'ta Eşyalı Stüdyo Daire',
    description: 'Tam eşyalı, modern stüdyo daire. Deniz manzaralı.',
    images: ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400'],
    price: 4200,
    location: {
      city: 'İstanbul',
      district: 'Beşiktaş',
      lat: 41.0425,
      lng: 29.0096,
    },
    user: {
      id: '3',
      name: 'Zeynep Kaya',
      email: 'zeynep@example.com',
      verifications: { id: true, student: false, phone: true },
      rating: 4.9,
      reviewCount: 15,
    },
    category: 'roommate',
    roomType: 'studio',
    availableFrom: '2025-02-15',
    preferences: {
      gender: 'female',
      smoking: false,
      pets: true,
      students: false,
    },
    createdAt: '2025-01-05',
    featured: true,
    escrow: true,
  },
];

const quickFilters = [
  { id: 'all', label: 'Tümü', count: mockRoommateListings.length },
  { id: 'single', label: 'Tek Kişilik', count: 1 },
  { id: 'shared', label: 'Paylaşımlı', count: 1 },
  { id: 'studio', label: 'Stüdyo', count: 1 },
];

const sortOptions = [
  { value: 'newest', label: 'En Yeni' },
  { value: 'nearest', label: 'En Yakın' },
  { value: 'price-asc', label: 'Bütçe (Artan)' },
  { value: 'price-desc', label: 'Bütçe (Azalan)' },
  { value: 'trust-score', label: 'Güven Skoru' },
];

const cityOptions = [
  { value: 'istanbul', label: 'İstanbul' },
  { value: 'ankara', label: 'Ankara' },
  { value: 'izmir', label: 'İzmir' },
];

const districtOptions = [
  { value: 'kadikoy', label: 'Kadıköy' },
  { value: 'beyoglu', label: 'Beyoğlu' },
  { value: 'besiktas', label: 'Beşiktaş' },
  { value: 'sisli', label: 'Şişli' },
];

interface RoommatePageProps {
  onShowDetail?: () => void;
}

export const RoommatePage: React.FC<RoommatePageProps> = ({ onShowDetail }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  
  const [filters, setFilters] = useState<FilterState>({
    cities: [],
    districts: [],
    budget: [1000, 8000],
    roomTypes: [],
    furnished: null,
    petFriendly: null,
    smoking: null,
    gender: 'any',
    student: null,
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
      cities: [],
      districts: [],
      budget: [1000, 8000],
      roomTypes: [],
      furnished: null,
      petFriendly: null,
      smoking: null,
      gender: 'any',
      student: null,
    });
    setActiveFilter('all');
    setSearchQuery('');
  };

  const applyFilters = (): void => {
    setShowFilters(false);
  };

  const filteredListings = mockRoommateListings.filter(listing => {
    // Quick filter
    if (activeFilter !== 'all' && listing.roomType !== activeFilter) return false;
    
    // Search query
    if (searchQuery && !listing.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Budget filter
    if (listing.price < filters.budget[0] || listing.price > filters.budget[1]) return false;
    
    // Room type filter
    if (filters.roomTypes.length > 0 && !filters.roomTypes.includes(listing.roomType)) return false;
    
    // Pet friendly filter
    if (filters.petFriendly !== null && listing.preferences.pets !== filters.petFriendly) return false;
    
    // Smoking filter
    if (filters.smoking !== null && listing.preferences.smoking !== filters.smoking) return false;
    
    // Gender filter
    if (filters.gender !== 'any' && listing.preferences.gender !== filters.gender && listing.preferences.gender !== 'any') return false;
    
    // Student filter
    if (filters.student !== null && listing.preferences.students !== filters.student) return false;
    
    return true;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'trust-score':
        return b.user.rating - a.user.rating;
      default:
        return 0;
    }
  });

  const hasActiveFilters = filters.cities.length > 0 || 
    filters.districts.length > 0 || 
    filters.budget[0] > 1000 || 
    filters.budget[1] < 8000 ||
    filters.roomTypes.length > 0 ||
    filters.furnished !== null ||
    filters.petFriendly !== null ||
    filters.smoking !== null ||
    filters.gender !== 'any' ||
    filters.student !== null ||
    searchQuery.length > 0;

  return (
    <div className="pb-20">
      {/* Search and Quick Filters */}
      <div className="sticky top-16 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        {/* Search Bar */}
        <div className="p-4 pb-2">
          <Input
            placeholder="Oda ara..."
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
              
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                options={sortOptions}
                className="min-w-0 w-32 text-xs"
              />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMap(!showMap)}
                className={showMap ? 'text-blue-600 dark:text-blue-400' : ''}
              >
                {showMap ? <List className="h-4 w-4" /> : <Map className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          {hasActiveFilters && (
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {sortedListings.length} ilan bulundu
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

      {/* Map View */}
      {showMap && (
        <div className="h-64 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <Map className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">Harita görünümü yakında...</p>
          </div>
        </div>
      )}

      {/* AI Recommendations - Loading State */}
      <div className="p-4">
        <AIRecommendationCard
          isLoading={true}
          isEmpty={false}
          className="mb-6"
        />
      </div>

      {/* Content */}
      <div className="px-4">
        {sortedListings.length > 0 ? (
          <div className="space-y-3">
            {sortedListings.map(listing => (
              <RoommateCard
                key={listing.id}
                listing={listing}
                onFavorite={handleFavorite}
                isFavorited={favoriteIds.has(listing.id)}
                distance="1.2 km"
                onClick={onShowDetail}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Home className="h-8 w-8" />}
            title="Bölgende ilan yok"
            description="Filtreleri genişlet veya farklı bir bölge dene."
            action={
              <Button onClick={clearAllFilters}>
                Filtreleri Temizle
              </Button>
            }
          />
        )}
      </div>

      {/* Advanced Filters Modal */}
      <Modal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Gelişmiş Filtreler"
        size="md"
      >
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {/* Location Filters */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Konum</h3>
            <div className="space-y-3">
              <Select
                label="Şehir"
                value={filters.cities[0] || ''}
                onChange={(e) => handleFilterChange('cities', e.target.value ? [e.target.value] : [])}
                options={cityOptions}
                placeholder="Şehir seçin"
              />
              <Select
                label="İlçe"
                value={filters.districts[0] || ''}
                onChange={(e) => handleFilterChange('districts', e.target.value ? [e.target.value] : [])}
                options={districtOptions}
                placeholder="İlçe seçin"
              />
            </div>
          </div>

          {/* Budget Filter */}
          <div>
            <RangeSlider
              label="Bütçe (₺/ay)"
              min={500}
              max={10000}
              step={250}
              value={filters.budget}
              onChange={(value) => handleFilterChange('budget', value)}
              formatValue={(value) => `₺${value.toLocaleString('tr-TR')}`}
            />
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Oda Türü
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'single', label: 'Tek Kişilik' },
                { value: 'shared', label: 'Paylaşımlı' },
                { value: 'studio', label: 'Stüdyo' },
              ].map((type) => (
                <FilterPill
                  key={type.value}
                  label={type.label}
                  active={filters.roomTypes.includes(type.value)}
                  onClick={() => {
                    const newTypes = filters.roomTypes.includes(type.value)
                      ? filters.roomTypes.filter(t => t !== type.value)
                      : [...filters.roomTypes, type.value];
                    handleFilterChange('roomTypes', newTypes);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Boolean Filters */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Eşyalı
              </label>
              <div className="flex gap-2">
                <FilterPill
                  label="Evet"
                  active={filters.furnished === true}
                  onClick={() => handleFilterChange('furnished', filters.furnished === true ? null : true)}
                />
                <FilterPill
                  label="Hayır"
                  active={filters.furnished === false}
                  onClick={() => handleFilterChange('furnished', filters.furnished === false ? null : false)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Evcil Dostu
              </label>
              <div className="flex gap-2">
                <FilterPill
                  label="Evet"
                  active={filters.petFriendly === true}
                  onClick={() => handleFilterChange('petFriendly', filters.petFriendly === true ? null : true)}
                />
                <FilterPill
                  label="Hayır"
                  active={filters.petFriendly === false}
                  onClick={() => handleFilterChange('petFriendly', filters.petFriendly === false ? null : false)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Sigara
              </label>
              <div className="flex gap-2">
                <FilterPill
                  label="İzinli"
                  active={filters.smoking === true}
                  onClick={() => handleFilterChange('smoking', filters.smoking === true ? null : true)}
                />
                <FilterPill
                  label="Yasak"
                  active={filters.smoking === false}
                  onClick={() => handleFilterChange('smoking', filters.smoking === false ? null : false)}
                />
              </div>
            </div>

            <div>
              <Select
                label="Cinsiyet Tercihi"
                value={filters.gender}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
                options={[
                  { value: 'any', label: 'Farketmez' },
                  { value: 'male', label: 'Erkek' },
                  { value: 'female', label: 'Kadın' },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Öğrenci
              </label>
              <div className="flex gap-2">
                <FilterPill
                  label="Tercih Edilir"
                  active={filters.student === true}
                  onClick={() => handleFilterChange('student', filters.student === true ? null : true)}
                />
                <FilterPill
                  label="Farketmez"
                  active={filters.student === false}
                  onClick={() => handleFilterChange('student', filters.student === false ? null : false)}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={applyFilters} className="flex-1">
            Filtreleri Uygula ({sortedListings.length})
          </Button>
          <Button variant="ghost" onClick={clearAllFilters}>
            Temizle
          </Button>
        </div>
      </Modal>
    </div>
  );
};