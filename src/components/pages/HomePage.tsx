import React, { useState } from 'react';
import { SegmentedTabs } from '../ui/SegmentedTabs';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { FilterPill } from '../ui/FilterPill';
import { AIRecommendationCard } from '../ui/AIRecommendationCard';
import { 
  Home, 
  Heart, 
  Package, 
  Search, 
  MapPin,
  DollarSign,
  Shield,
  Star,
  Bot,
  ChevronRight,
  Phone,
  Mail,
  FileText,
  HelpCircle,
  CreditCard,
  Users,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { tr } from '../../locales/tr';
import type { Listing } from '../../types';

interface HomePageProps {
  activeService: string;
  onServiceChange: (service: string) => void;
  onCreateListing?: () => void;
}

interface ServiceTab {
  id: string;
  label: string;
  count: number;
}

interface QuickFilter {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
}

const services: ServiceTab[] = [
  { id: 'roommate', label: 'Ev Arkadaşı', count: 156 },
  { id: 'pets', label: 'Hayvan Sahiplendirme', count: 89 },
  { id: 'furniture', label: 'Ev Eşyaları', count: 234 },
];

const quickFilters: QuickFilter[] = [
  { id: 'city', label: 'Şehir', icon: MapPin, active: false },
  { id: 'budget', label: 'Bütçe', icon: DollarSign, active: false },
  { id: 'verified', label: 'Doğrulanmış', icon: Shield, active: true },
  { id: 'pet-friendly', label: 'Evcil Dostu', icon: Heart, active: false },
];

// Mock data for featured listings
const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Merkezi konumda geniş oda',
    description: 'Şehir merkezinde, ulaşım imkanları yakın, temiz ve düzenli oda.',
    images: ['https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400'],
    price: 3500,
    location: { city: 'İstanbul', district: 'Kadıköy', lat: 40.9833, lng: 29.0167 },
    user: {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      avatar: '',
      verifications: { id: true, student: true, phone: true },
      rating: 4.8,
      reviewCount: 23
    },
    category: 'roommate',
    createdAt: '2024-01-15',
    featured: true,
    escrow: true
  },
  {
    id: '2',
    title: 'Sevimli Golden Retriever',
    description: '2 yaşında, aşılı ve sosyal köpek. Yeni ailesi arıyor.',
    images: ['https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400'],
    price: 0,
    location: { city: 'Ankara', district: 'Çankaya', lat: 39.9208, lng: 32.8541 },
    user: {
      id: '2',
      name: 'Elif Demir',
      email: 'elif@example.com',
      avatar: '',
      verifications: { id: true, student: false, phone: true },
      rating: 4.9,
      reviewCount: 15
    },
    category: 'pet',
    createdAt: '2024-01-14',
    featured: true
  },
  {
    id: '3',
    title: 'Modern üçlü koltuk takımı',
    description: 'Az kullanılmış, temiz durumda modern koltuk takımı.',
    images: ['https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400'],
    price: 2800,
    location: { city: 'İzmir', district: 'Bornova', lat: 38.4189, lng: 27.1287 },
    user: {
      id: '3',
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      avatar: '',
      verifications: { id: true, student: false, phone: true },
      rating: 4.7,
      reviewCount: 31
    },
    category: 'furniture',
    createdAt: '2024-01-13',
    featured: true,
    escrow: true
  }
];

export const HomePage: React.FC<HomePageProps> = ({ activeService, onServiceChange, onCreateListing }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<string[]>(['verified']);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleFilterToggle = (filterId: string): void => {
    setActiveFilters((prev: string[]) => 
      prev.includes(filterId) 
        ? prev.filter((id: string) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const nextSlide = (): void => {
    setCurrentSlide((prev: number) => (prev + 1) % mockListings.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev: number) => (prev - 1 + mockListings.length) % mockListings.length);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const handleSlideClick = (index: number): void => {
    setCurrentSlide(index);
  };

  return (
    <div className="pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 px-4 pt-6 pb-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
            Ev arkadaşı, hayvan sahiplendirme ve ev eşyası — tek yerde.
          </h1>
          
          {/* Search Bar */}
          <div className="mb-6">
            <Input
              placeholder="Ne arıyorsun?"
              value={searchQuery}
              onChange={handleSearchChange}
              icon={<Search className="h-5 w-5" />}
              className="text-base py-3"
            />
          </div>
          
          {/* Service Tabs */}
          <div className="mb-6">
            <SegmentedTabs
              tabs={services}
              activeTab={activeService}
              onChange={onServiceChange}
            />
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickFilters.map((filter: QuickFilter) => {
            const Icon = filter.icon;
            return (
              <FilterPill
                key={filter.id}
                label={filter.label}
                active={activeFilters.includes(filter.id)}
                onClick={() => handleFilterToggle(filter.id)}
              />
            );
          })}
        </div>
      </div>

      {/* AI Matching Widget */}
      <div className="px-4 mb-6">
        <AIRecommendationCard
          isLoading={false}
          isEmpty={false}
          onViewRecommendations={() => {
            // Navigate to recommendations page
            console.log('View AI recommendations');
          }}
          onRefresh={() => {
            // Refresh recommendations
            console.log('Refresh recommendations');
          }}
        />
      </div>

      {/* Featured Listings Carousel */}
      <div className="mb-8">
        <div className="px-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Öne Çıkan İlanlar
          </h2>
        </div>
        
        <div className="relative">
          <div className="flex overflow-x-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {mockListings.map((listing: Listing) => (
                <div key={listing.id} className="w-full flex-shrink-0 px-4">
                  <Card listing={listing} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 gap-2">
            {mockListings.map((_, index: number) => (
              <button
                key={index}
                onClick={() => handleSlideClick(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Trust Row */}
      <div className="px-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
            Güvenin Adresi
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                Güven Rozeti
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Doğrulanmış kullanıcılar
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                Emanet Ödeme
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Güvenli işlemler
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                Doğrulanmış Kullanıcılar
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                2,450+ aktif üye
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">
            Sen de aramıza katıl!
          </h3>
          <p className="text-green-100 mb-4">
            İlanını ver, hemen fark edilsin
          </p>
          <Button 
            variant="secondary"
            className="bg-white text-green-600 hover:bg-green-50"
            onClick={onCreateListing}
          >
            İlan Ver
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Yasal
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    KVKK
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Kullanım Şartları
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Destek
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    SSS
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    İletişim
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                © 2024 Tüm hakları saklıdır.
              </p>
              <div className="flex gap-4">
                <a href="tel:+905551234567" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  <Phone className="h-4 w-4" />
                </a>
                <a href="mailto:info@example.com" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};