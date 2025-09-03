import React from 'react';
import { Filter, MapPin, Truck, Navigation } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { FurnitureCard } from '../components/ui/FurnitureCard';
import { AIRecommendationCard } from '../components/ui/AIRecommendationCard';
import { tr } from '../locales/tr';

const Furniture: React.FC = () => {
  const [showMap, setShowMap] = React.useState(false);

  const furnitureListings = [
    {
      id: '1',
      title: 'Modern Koltuk Takımı',
      furnitureType: 'sofa' as const,
      condition: 'excellent' as const,
      price: 8500,
      location: 'Konak, İzmir',
      distance: '2.1 km',
      image: '/api/placeholder/300/200',
      dimensions: '200x90x85 cm',
      deliveryOptions: ['pickup', 'shipping'],
      escrow: true,
      user: {
        id: '1',
        name: 'Mehmet Özkan',
        avatar: '/api/placeholder/40/40',
        verifications: {
          id: true,
          student: false,
          phone: true,
        },
        rating: 4.8,
        reviewCount: 42,
      },
      featured: true,
    },
    {
      id: '2',
      title: 'Antika Ahşap Masa',
      furnitureType: 'table' as const,
      condition: 'good' as const,
      price: 3200,
      location: 'Beyoğlu, İstanbul',
      distance: '4.3 km',
      image: '/api/placeholder/300/200',
      dimensions: '150x80x75 cm',
      deliveryOptions: ['pickup'],
      escrow: false,
      user: {
        id: '2',
        name: 'Zeynep Arslan',
        avatar: '/api/placeholder/40/40',
        verifications: {
          id: true,
          student: true,
          phone: true,
        },
        rating: 4.6,
        reviewCount: 18,
      },
      featured: false,
    },
  ];

  const smartChips = [
    { label: 'Yakınımdaki', active: true },
    { label: 'Uygun Fiyat', active: false },
    { label: 'Temiz Kullanım', active: true },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ev Eşyaları</h1>
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
            placeholder="Kategori, marka veya model ara..."
            className="pl-10"
          />
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </div>

        <div className="flex flex-wrap gap-4">
          <Select
            placeholder="Kategori"
            options={[
              { value: 'sofa', label: 'Koltuk' },
              { value: 'table', label: 'Masa' },
              { value: 'chair', label: 'Sandalye' },
              { value: 'bed', label: 'Yatak' },
              { value: 'storage', label: 'Dolap' },
              { value: 'decoration', label: 'Dekorasyon' },
            ]}
          />
          
          <Select
            placeholder="Durum"
            options={[
              { value: 'new', label: 'Yeni' },
              { value: 'excellent', label: 'Çok İyi' },
              { value: 'good', label: 'İyi' },
              { value: 'fair', label: 'Orta' },
            ]}
          />

          <Select
            placeholder="Teslimat"
            options={[
              { value: 'pickup', label: 'Elden' },
              { value: 'shipping', label: 'Kargo' },
              { value: 'delivery', label: 'Nakliye' },
            ]}
          />

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtreler
          </Button>
        </div>

        {/* Smart Chips */}
        <div className="flex flex-wrap gap-2">
          {smartChips.map((chip) => (
            <Button
              key={chip.label}
              variant={chip.active ? "default" : "outline"}
              size="sm"
            >
              {chip.label}
            </Button>
          ))}
        </div>
      </div>

      {/* AI Recommendation */}
      <AIRecommendationCard
        isLoading={false}
        isEmpty={true}
        onViewRecommendations={() => console.log('View recommendations')}
        onRefresh={() => console.log('Refresh')}
      />

      {/* Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {furnitureListings.map((listing) => (
          <FurnitureCard
            key={listing.id}
            listing={listing}
            onClick={() => console.log('View listing', listing.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {furnitureListings.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Truck className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Henüz ilan yok</h3>
          <p className="text-muted-foreground mb-4">
            Bu kategoride henüz ilan bulunmuyor
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

      {/* CTA Section */}
      <div className="text-center space-y-4 py-8 bg-muted/50 rounded-lg">
        <h2 className="text-xl font-semibold">İlanınızı Verin</h2>
        <p className="text-muted-foreground">
          Kullanmadığınız eşyalarınızı satın
        </p>
        <Button size="lg">
          İlan Ver
        </Button>
      </div>
    </div>
  );
};
export default Furniture;
