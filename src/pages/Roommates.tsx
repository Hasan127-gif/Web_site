import React from 'react';
import { Link } from 'react-router-dom';
import { Filter, MapPin, ArrowUpDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { RangeSlider } from '../components/ui/RangeSlider';
import { RoommateCard } from '../components/ui/RoommateCard';
import { AIRecommendationCard } from '../components/ui/AIRecommendationCard';
import { tr } from '../locales/tr';

const Roommates: React.FC = () => {
  const [showMap, setShowMap] = React.useState(false);
  const [priceRange, setPriceRange] = React.useState([2000, 8000]);

  const roommateListings = [
    {
      id: '1',
      title: 'Merkezi Konumda Tek Kişilik Oda',
      price: 3500,
      location: 'Kadıköy, İstanbul',
      distance: '2.3 km',
      image: '/api/placeholder/300/200',
      roomType: 'single' as const,
      availableFrom: '2025-02-01',
      preferences: {
        gender: 'any' as const,
        smoking: false,
        pets: true,
        students: true,
      },
      user: {
        id: '1',
        name: 'Ahmet Yılmaz',
        avatar: '/api/placeholder/40/40',
        verifications: {
          id: true,
          student: true,
          phone: true,
        },
        rating: 4.8,
        reviewCount: 24,
      },
      rules: 'Sessiz saat 23:00–07:00 • Evcil dostu • Sigara içilmez',
      featured: true,
    },
    {
      id: '2',
      title: 'Paylaşımlı Evde Oda',
      price: 2800,
      location: 'Beşiktaş, İstanbul',
      distance: '1.8 km',
      image: '/api/placeholder/300/200',
      roomType: 'shared' as const,
      availableFrom: '2025-01-15',
      preferences: {
        gender: 'female' as const,
        smoking: false,
        pets: false,
        students: true,
      },
      user: {
        id: '2',
        name: 'Elif Demir',
        avatar: '/api/placeholder/40/40',
        verifications: {
          id: true,
          student: false,
          phone: true,
        },
        rating: 4.6,
        reviewCount: 18,
      },
      rules: 'Temizlik kuralları • Misafir kabul edilmez',
      featured: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ev Arkadaşı Bul</h1>
        <Button
          variant="outline"
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? 'Liste Görünümü' : 'Harita Görünümü'}
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Input 
            placeholder="Şehir, ilçe veya mahalle ara..."
            className="pl-10"
          />
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </div>

        <div className="flex flex-wrap gap-4">
          <Select
            placeholder="Oda Türü"
            options={[
              { value: 'single', label: 'Tek Kişilik' },
              { value: 'shared', label: 'Paylaşımlı' },
              { value: 'studio', label: 'Stüdyo' },
            ]}
          />
          
          <Select
            placeholder="Eşyalı"
            options={[
              { value: 'furnished', label: 'Eşyalı' },
              { value: 'unfurnished', label: 'Eşyasız' },
            ]}
          />

          <Select
            placeholder="Cinsiyet"
            options={[
              { value: 'male', label: 'Erkek' },
              { value: 'female', label: 'Kadın' },
              { value: 'any', label: 'Fark Etmez' },
            ]}
          />

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtreler
          </Button>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Bütçe: {priceRange[0]} - {priceRange[1]} TL/ay
          </label>
          <RangeSlider
            value={priceRange}
            onChange={setPriceRange}
            min={1000}
            max={10000}
            step={500}
          />
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sırala:</span>
          <Select
            placeholder="En yeni"
            options={[
              { value: 'newest', label: 'En yeni' },
              { value: 'closest', label: 'En yakın' },
              { value: 'price-low', label: 'Bütçe (artan)' },
              { value: 'price-high', label: 'Bütçe (azalan)' },
              { value: 'trust', label: 'Güven skoru' },
            ]}
          />
        </div>
        
        <Button variant="outline" size="sm">
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Sırala
        </Button>
      </div>

      {/* AI Recommendation */}
      <AIRecommendationCard
        isLoading={true}
        isEmpty={false}
        onViewRecommendations={() => console.log('View recommendations')}
        onRefresh={() => console.log('Refresh')}
      />

      {/* Listings */}
      <div className="space-y-4">
        {roommateListings.map((listing) => (
          <RoommateCard
            key={listing.id}
            listing={listing}
            onClick={() => console.log('View listing', listing.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {roommateListings.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <MapPin className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Bölgende ilan yok</h3>
          <p className="text-muted-foreground mb-4">
            Filtreleri genişlet veya farklı bir bölge dene
          </p>
          <Button variant="outline">
            Filtreleri Temizle
          </Button>
        </div>
      )}

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">
          Daha Fazla Yükle
        </Button>
      </div>
    </div>
  );
};

export default Roommates;
