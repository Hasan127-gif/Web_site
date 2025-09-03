import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Heart, Package, Star, Bot, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { AIRecommendationCard } from '../components/ui/AIRecommendationCard';
import { tr } from '../locales/tr';
import { config, isFeatureEnabled } from '../config/env';

const Home: React.FC = () => {
  const serviceTabs = [
    { id: 'roommate', label: tr.home.tabs.roommate, icon: Users },
    { id: 'pets', label: tr.home.tabs.pets, icon: Heart },
    { id: 'furniture', label: tr.home.tabs.furniture, icon: Package },
  ];

  const quickFilters = [
    { label: 'İstanbul', active: true },
    { label: 'Ankara', active: false },
    { label: 'İzmir', active: false },
    { label: 'Bütçe', active: false },
    { label: 'Doğrulanmış', active: false },
    { label: 'Evcil Dostu', active: false },
  ];

  const featuredListings = [
    {
      id: '1',
      type: 'roommate',
      title: 'Merkezi Konumda Oda',
      price: '3,500 TL/ay',
      location: 'Kadıköy, İstanbul',
      image: '/api/placeholder/300/200',
    },
    {
      id: '2',
      type: 'pet',
      title: 'Luna - Golden Retriever',
      price: 'Sahiplendirme',
      location: 'Çankaya, Ankara',
      image: '/api/placeholder/300/200',
    },
    {
      id: '3',
      type: 'furniture',
      title: 'Modern Koltuk Takımı',
      price: '8,500 TL',
      location: 'Konak, İzmir',
      image: '/api/placeholder/300/200',
    },
  ];

  const trustFeatures = [
    {
      icon: Star,
      title: 'Güven Rozeti',
      description: 'Doğrulanmış kullanıcılar',
    },
    {
      icon: Bot,
      title: 'Emanet Ödeme',
      description: 'Güvenli alışveriş',
    },
    {
      icon: Sparkles,
      title: 'Doğrulanmış Kullanıcılar',
      description: 'Kimlik doğrulama',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-neutral-900 md:text-5xl">
            {tr.home.hero.title}
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Güvenilir platformumuzda ev arkadaşı bulun, hayvan sahiplendirin ve ikinci el eşya alım-satımı yapın.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <Input 
              placeholder={tr.home.hero.searchPlaceholder}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>

        {/* Service Tabs */}
        <div className="flex justify-center space-x-3">
          {serviceTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant="outline"
                className="flex items-center space-x-2 px-6 py-3"
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">Hızlı Filtreler</h2>
        <div className="flex flex-wrap gap-3">
          {quickFilters.map((filter) => (
            <Button
              key={filter.label}
              variant={filter.active ? "default" : "outline"}
              size="sm"
              className="px-4 py-2"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* AI Matching - Only show if feature is enabled */}
      {isFeatureEnabled('ai') && (
        <AIRecommendationCard
          isLoading={false}
          isEmpty={false}
          onViewRecommendations={() => console.log('View recommendations')}
          onRefresh={() => console.log('Refresh')}
        />
      )}

      {/* Featured Listings */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-neutral-900">Öne Çıkan İlanlar</h2>
          <Button variant="outline">
            Tümünü Gör
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-neutral-200 rounded-t-lg" />
              <div className="p-6 space-y-3">
                <h3 className="font-semibold text-lg text-neutral-900">{listing.title}</h3>
                <p className="text-sm text-neutral-600">{listing.location}</p>
                <p className="font-bold text-blue-600 text-lg">{listing.price}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Trust Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trustFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
              <Icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold text-lg mb-2 text-neutral-900">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </Card>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-6 py-12 bg-neutral-100 rounded-2xl">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-neutral-900">İlanınızı Verin</h2>
          <p className="text-lg text-neutral-600 max-w-xl mx-auto">
            Güvenli platformumuzda ilanınızı paylaşın ve hızlıca eşleşin
          </p>
        </div>
        <Link to="/listing/new">
          <Button size="lg" className="px-8 py-4 text-lg">
            İlan Ver
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
