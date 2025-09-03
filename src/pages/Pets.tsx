import React from 'react';
import { Filter, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { PetCard } from '../components/ui/PetCard';
import { AIRecommendationCard } from '../components/ui/AIRecommendationCard';
import { tr } from '../locales/tr';

export const Pets: React.FC = () => {
  const petListings = [
    {
      id: '1',
      title: 'Luna - Golden Retriever',
      petType: 'dog' as const,
      breed: 'Golden Retriever',
      age: '2 yaş',
      gender: 'female' as const,
      location: 'Çankaya, Ankara',
      distance: '1.2 km',
      image: '/api/placeholder/300/200',
      vaccinated: true,
      neutered: true,
      microchip: 'TR123456789',
      temperament: ['oyuncu', 'sakin', 'eğitimli'],
      healthStatus: 'Sağlıklı',
      user: {
        id: '1',
        name: 'Barınak Ankara',
        avatar: '/api/placeholder/40/40',
        verifications: {
          id: true,
          student: false,
          phone: true,
        },
        rating: 4.9,
        reviewCount: 156,
      },
      featured: true,
    },
    {
      id: '2',
      title: 'Mavi - British Shorthair',
      petType: 'cat' as const,
      breed: 'British Shorthair',
      age: '1 yaş',
      gender: 'male' as const,
      location: 'Kadıköy, İstanbul',
      distance: '3.1 km',
      image: '/api/placeholder/300/200',
      vaccinated: true,
      neutered: false,
      microchip: 'TR987654321',
      temperament: ['sakin', 'bağımsız'],
      healthStatus: 'Sağlıklı',
      user: {
        id: '2',
        name: 'Ayşe Kaya',
        avatar: '/api/placeholder/40/40',
        verifications: {
          id: true,
          student: true,
          phone: true,
        },
        rating: 4.7,
        reviewCount: 23,
      },
      featured: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hayvan Sahiplendirme</h1>
        <Button variant="outline">
          <Sparkles className="w-4 h-4 mr-2" />
          Pet Match
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <Input 
          placeholder="Tür, cins veya yaş ara..."
        />

        <div className="flex flex-wrap gap-4">
          <Select
            placeholder="Tür"
            options={[
              { value: 'dog', label: 'Köpek' },
              { value: 'cat', label: 'Kedi' },
              { value: 'bird', label: 'Kuş' },
              { value: 'rabbit', label: 'Tavşan' },
              { value: 'other', label: 'Diğer' },
            ]}
          />
          
          <Select
            placeholder="Cins"
            options={[
              { value: 'golden', label: 'Golden Retriever' },
              { value: 'labrador', label: 'Labrador' },
              { value: 'british', label: 'British Shorthair' },
              { value: 'persian', label: 'Persian' },
            ]}
          />

          <Select
            placeholder="Yaş"
            options={[
              { value: 'puppy', label: 'Yavru (0-1 yaş)' },
              { value: 'young', label: 'Genç (1-3 yaş)' },
              { value: 'adult', label: 'Yetişkin (3-7 yaş)' },
              { value: 'senior', label: 'Yaşlı (7+ yaş)' },
            ]}
          />

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtreler
          </Button>
        </div>

        {/* Health Filters */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Kısırlaştırılmış
          </Button>
          <Button variant="outline" size="sm">
            Aşı Kartı
          </Button>
          <Button variant="outline" size="sm">
            Çip
          </Button>
          <Button variant="outline" size="sm">
            Çocukla Uyumlu
          </Button>
        </div>
      </div>

      {/* AI Recommendation */}
      <AIRecommendationCard
        isLoading={false}
        isEmpty={false}
        onViewRecommendations={() => console.log('View recommendations')}
        onRefresh={() => console.log('Refresh')}
      />

      {/* Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {petListings.map((listing) => (
          <PetCard
            key={listing.id}
            listing={listing}
            onClick={() => console.log('View listing', listing.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {petListings.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Henüz ilan yok</h3>
          <p className="text-muted-foreground mb-4">
            Profiline yaşam tarzını ekle — daha iyi eşleşmeler!
          </p>
          <Button variant="outline">
            Profili Güncelle
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
