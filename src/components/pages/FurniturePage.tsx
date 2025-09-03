import React, { useState } from 'react';
import { FilterPill } from '../ui/FilterPill';
import { FurnitureCard } from '../ui/FurnitureCard';
import { AIRecommendationCard } from '../ui/AIRecommendationCard';
import { EmptyState } from '../ui/EmptyState';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { RangeSlider } from '../ui/RangeSlider';
import { Input } from '../ui/Input';
import { 
  Package, 
  Filter, 
  Search,
  SlidersHorizontal,
  Map,
  List,
  MapPin,
  Truck,
  X,
  Navigation
} from 'lucide-react';
import { tr } from '../../locales/tr';
import type { FurnitureListing } from '../../types';

interface FilterState {
  categories: string[];
  conditions: string[];
  priceRange: [number, number];
  dimensions: string;
  delivery: string[];
  location: string;
}

const mockFurnitureListings: FurnitureListing[] = [
  {
    id: '1',
    title: 'Modern L Koltuk Takımı',
    description: 'Az kullanılmış, temiz durumda modern L koltuk takımı. Gri renk, çok rahat.',
    images: ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400'],
    price: 4500,
    location: {
      city: 'İstanbul',
      district: 'Şişli',
      lat: 41.0602,
      lng: 28.9887,
    },
    user: {
      id: '1',
      name: 'Fatma Özkan',
      email: 'fatma@example.com',
      verifications: { id: true, student: false, phone: true },
      rating: 4.5,
      reviewCount: 6,
    },
    category: 'furniture',
    furnitureType: 'sofa',
    condition: 'excellent',
    dimensions: '240x160x85 cm',
    createdAt: '2025-01-11',
    featured: true,
    escrow: true,
  },
  {
    id: '2',
    title: 'Ahşap Yemek Masası ve 4 Sandalye',
    description: 'Masif ahşap yemek masası ve 4 adet sandalye seti. İyi durumda.',
    images: ['https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400'],
    price: 2200,
    location: {
      city: 'Ankara',
      district: 'Kızılay',
      lat: 39.9188,
      lng: 32.8537,
    },
    user: {
      id: '2',
      name: 'Hasan Türk',
      email: 'hasan@example.com',
      verifications: { id: true, student: false, phone: false },
      rating: 4.2,
      reviewCount: 3,
    },
    category: 'furniture',
    furnitureType: 'table',
    condition: 'good',
    dimensions: '120x80x75 cm',
    createdAt: '2025-01-06',
    featured: false,
  },
  {
    id: '3',
    title: 'Vintage Ahşap Kitaplık',
    description: 'Antika tarzı ahşap kitaplık. 5 raflı, çok sağlam yapı.',
    images: ['https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400'],
    price: 1800,
    location: {
      city: 'İzmir',
      district: 'Alsancak',
      lat: 38.4237,
      lng: 27.1428,
    },
    user: {
      id: '3',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      verifications: { id: true, student: false, phone: true },
      rating: 4.7,
      reviewCount: 12,
    },
    category: 'furniture',
    furnitureType: 'storage',
    condition: 'good',
    dimensions: '180x35x200 cm',
    createdAt: '2025-01-08',
    featured: false,
    escrow: true,
  },
  {
    id: '4',
    title: 'Çift Kişilik Yatak ve Başlık',
    description: 'Ortopedik yatak ve modern başlık. Temiz kullanım.',
    images: ['https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400'],
    price: 3200,
    location: {
      city: 'İstanbul',
      district: 'Kadıköy',
      lat: 40.9833,
      lng: 29.0167,
    },
    user: {
      id: '4',
      name: 'Elif Demir',
      email: 'elif@example.com',
      verifications: { id: true, student: true, phone: true },
      rating: 4.8,
      reviewCount: 8,
    },
    category: 'furniture',
    furnitureType: 'bed',
    condition: 'excellent',
    dimensions: '160x200x40 cm',
    createdAt: '2025-01-04',
    featured: true,
    escrow: false,
  }
];

const quickFilters = [
  { id: 'all', label: 'Tümü', count: mockFurnitureListings.length },
  { id: 'sofa', label: 'Koltuk', count: 1 },
  { id: 'table', label: 'Masa', count: 1 },
  { id: 'storage', label: 'Dolap', count: 1 },
  { id: 'bed', label: 'Yatak', count: 1 },
];

const smartFilters = [
  { id: 'nearby', label: 'Yakınımdaki', active: false },
  { id: 'affordable', label: 'Uygun Fiyat', active: false },
  { id: 'clean', label: 'Temiz Kullanım', active: true },
];

const categoryOptions = [
  { value: 'sofa', label: 'Koltuk' },
  { value: 'table', label: 'Masa' },
  { value: 'chair', label: 'Sandalye' },
  { value: 'bed', label: 'Yatak' },
  { value: 'storage', label: 'Dolap' },
  { value: 'decoration', label: 'Dekorasyon' },
  { value: 'other', label: 'Diğer' }
];

const conditionOptions = [
  { value: 'new', label: 'Sıfır' },
  { value: 'excellent', label: 'Mükemmel' },
  { value: 'good', label: 'İyi' },
  { value: 'fair', label: 'Orta' }
];

const deliveryOptions = [
  { value: 'pickup', label: 'Elden Teslim' },
  { value: 'cargo', label: 'Kargo' },
  { value: 'transport', label: 'Nakliye' }
];

const sortOptions = [
  { value: 'newest', label: 'En Yeni' },
  { value: 'price-asc', label: 'Fiyat (Artan)' },
  { value: 'price-desc', label: 'Fiyat (Azalan)' },
  { value: 'nearest', label: 'En Yakın' }
];

interface FurniturePageProps {
  onShowDetail?: () => void;
  onCreateListing?: () => void;
}

export const FurniturePage: React.FC<FurniturePageProps> = ({ onShowDetail, onCreateListing }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [activeSmartFilters, setActiveSmartFilters] = useState<string[]>(['clean']);
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    conditions: [],
    priceRange: [500, 15000],
    dimensions: '',
    delivery: [],
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

  const handleSmartFilterToggle = (filterId: string): void => {
    setActiveSmartFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const clearAllFilters = (): void => {
    setFilters({
      categories: [],
      conditions: [],
      priceRange: [500, 15000],
      dimensions: '',
      delivery: [],
      location: ''
    });
    setActiveFilter('all');
    setSearchQuery('');
    setActiveSmartFilters(['clean']);
  };

  const toggleCategory = (category: string): void => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    handleFilterChange('categories', newCategories);
  };

  const toggleCondition = (condition: string): void => {
    const newConditions = filters.conditions.includes(condition)
      ? filters.conditions.filter(c => c !== condition)
      : [...filters.conditions, condition];
    handleFilterChange('conditions', newConditions);
  };

  const toggleDelivery = (delivery: string): void => {
    const newDelivery = filters.delivery.includes(delivery)
      ? filters.delivery.filter(d => d !== delivery)
      : [...filters.delivery, delivery];
    handleFilterChange('delivery', newDelivery);
  };

  const filteredListings = mockFurnitureListings.filter(listing => {
    // Quick filter
    if (activeFilter !== 'all' && listing.furnitureType !== activeFilter) return false;
    
    // Search query
    if (searchQuery && !listing.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Price filter
    if (listing.price < filters.priceRange[0] || listing.price > filters.priceRange[1]) return false;
    
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(listing.furnitureType)) return false;
    
    // Condition filter
    if (filters.conditions.length > 0 && !filters.conditions.includes(listing.condition)) return false;
    
    // Smart filters
    if (activeSmartFilters.includes('affordable') && listing.price > 3000) return false;
    if (activeSmartFilters.includes('clean') && !['new', 'excellent'].includes(listing.condition)) return false;
    
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
      case 'nearest':
        return 0; // Would calculate actual distance
      default:
        return 0;
    }
  });

  const hasActiveFilters = filters.categories.length > 0 || 
    filters.conditions.length > 0 || 
    filters.priceRange[0] > 500 || 
    filters.priceRange[1] < 15000 ||
    filters.delivery.length > 0 ||
    filters.location !== '' ||
    searchQuery.length > 0 ||
    activeSmartFilters.length !== 1;

  return (
    <div className="pb-20">
      {/* Search and Filters */}
      <div className="sticky top-16 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        {/* Search Bar */}
        <div className="p-4 pb-2">
          <Input
            placeholder="Mobilya ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
            className="text-sm"
          />
        </div>
        
        {/* Smart Filters */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto">
            {smartFilters.map(filter => (
              <FilterPill
                key={filter.id}
                label={filter.label}
                active={activeSmartFilters.includes(filter.id)}
                onClick={() => handleSmartFilterToggle(filter.id)}
              />
            ))}
          </div>
        </div>
        
        {/* Category Filters and Controls */}
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
                {sortedListings.length} ürün bulundu
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

      {/* Map View with Pickup Points */}
      {showMap && (
        <div className="h-64 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 relative">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Map className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">Harita görünümü yakında...</p>
            </div>
          </div>
          
          {/* Pickup Points Legend */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 text-sm">
              Teslim Noktaları
            </h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Elden Teslim</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Kargo Merkezi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Nakliye</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Listing CTA */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-4 text-white text-center mb-6">
          <h3 className="text-lg font-bold mb-2">
            Mobilyalarını Sat!
          </h3>
          <p className="text-green-100 mb-4 text-sm">
            Kullanmadığın mobilyaları değerinde sat
          </p>
          <Button 
            variant="secondary"
            className="bg-white text-green-600 hover:bg-green-50"
            onClick={onCreateListing}
          >
            <Package className="h-4 w-4 mr-2" />
            İlan Ver
          </Button>
        </div>
      </div>

      {/* AI Recommendations - Empty State */}
      <div className="p-4">
        <AIRecommendationCard
          isLoading={false}
          isEmpty={true}
          className="mb-6"
        />
      </div>

      {/* Content */}
      <div className="px-4">
        {sortedListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedListings.map(listing => (
              <FurnitureCard
                key={listing.id}
                listing={listing}
                onFavorite={handleFavorite}
                isFavorited={favoriteIds.has(listing.id)}
                distance="1.5 km"
                onClick={onShowDetail}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Package className="h-8 w-8" />}
            title="Uygun mobilya bulunamadı"
            description="Filtrelerinizi genişletmeyi deneyin."
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
        title="Mobilya Filtreleri"
        size="md"
      >
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
              Kategori
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categoryOptions.map((category) => (
                <FilterPill
                  key={category.value}
                  label={category.label}
                  active={filters.categories.includes(category.value)}
                  onClick={() => toggleCategory(category.value)}
                />
              ))}
            </div>
          </div>

          {/* Condition Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
              Durum
            </label>
            <div className="grid grid-cols-2 gap-2">
              {conditionOptions.map((condition) => (
                <FilterPill
                  key={condition.value}
                  label={condition.label}
                  active={filters.conditions.includes(condition.value)}
                  onClick={() => toggleCondition(condition.value)}
                />
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <RangeSlider
              label="Fiyat Aralığı (₺)"
              min={100}
              max={20000}
              step={100}
              value={filters.priceRange}
              onChange={(value) => handleFilterChange('priceRange', value)}
              formatValue={(value) => `₺${value.toLocaleString('tr-TR')}`}
            />
          </div>

          {/* Dimensions */}
          <div>
            <Input
              label="Ölçü Filtresi"
              value={filters.dimensions}
              onChange={(e) => handleFilterChange('dimensions', e.target.value)}
              placeholder="Örn: 200x100, büyük, küçük..."
            />
          </div>

          {/* Delivery Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
              Teslim Seçenekleri
            </label>
            <div className="space-y-2">
              {deliveryOptions.map((delivery) => (
                <FilterPill
                  key={delivery.value}
                  label={delivery.label}
                  active={filters.delivery.includes(delivery.value)}
                  onClick={() => toggleDelivery(delivery.value)}
                />
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
          <Select
              label="Konum"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            options={[
                { value: 'istanbul', label: 'İstanbul' },
                { value: 'ankara', label: 'Ankara' },
                { value: 'izmir', label: 'İzmir' }
            ]}
              placeholder="Şehir seçin"
            />
          </div>
        </div>
        
        <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={() => setShowFilters(false)} className="flex-1">
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