import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Heart, Package, Star, Bot, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { AIRecommendationCard } from '../components/ui/AIRecommendationCard';
import { tr } from '../locales/tr';
import { config, isFeatureEnabled } from '../config/env';

export const Home: React.FC = () => {
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
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* App Info */}
      <div className="text-center text-sm text-muted-foreground">
        {config.app.name} v{config.app.version} - {config.app.environment}
      </div>

      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-foreground">
          {tr.home.hero.title}
        </h1>
        
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder={tr.home.hero.searchPlaceholder}
              className="pl-10"
            />
          </div>
        </div>

        {/* Service Tabs */}
        <div className="flex justify-center space-x-2">
          {serviceTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Hızlı Filtreler</h2>
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <Button
              key={filter.label}
              variant={filter.active ? "default" : "outline"}
              size="sm"
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Öne Çıkan İlanlar</h2>
          <Button variant="outline" size="sm">
            Tümünü Gör
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="aspect-video bg-muted rounded-t-lg" />
              <div className="p-4 space-y-2">
                <h3 className="font-semibold">{listing.title}</h3>
                <p className="text-sm text-muted-foreground">{listing.location}</p>
                <p className="font-bold text-primary">{listing.price}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Trust Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trustFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="text-center p-6">
              <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-4 py-8">
        <h2 className="text-2xl font-bold">İlanınızı Verin</h2>
        <p className="text-muted-foreground">
          Güvenli platformumuzda ilanınızı paylaşın
        </p>
        <Link to="/listing/new">
          <Button size="lg">
            İlan Ver
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 border-t text-sm text-muted-foreground">
        <div className="space-y-2">
          <p>© 2025 {config.app.name}. Tüm hakları saklıdır.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-foreground">KVKK</a>
            <a href="#" className="hover:text-foreground">SSS</a>
            <a href="#" className="hover:text-foreground">İletişim</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
