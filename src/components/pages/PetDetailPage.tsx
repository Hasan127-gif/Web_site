import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge, VerificationBadge } from '../ui/Badge';
import { 
  ArrowLeft,
  Heart,
  Share,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Scale,
  Shield,
  Zap,
  Cpu,
  Star,
  MessageCircle,
  FileText,
  Eye,
  Flag,
  Clock,
  Home,
  User,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { tr } from '../../locales/tr';
import type { PetListing } from '../../types';

interface PetDetailPageProps {
  listing: PetListing;
  onBack: () => void;
  onShowApplication?: () => void;
}

const mockListing: PetListing = {
  id: '1',
  title: 'Luna - Sevimli Golden Retriever Yavrusu',
  description: 'Luna çok sevecen ve oyuncu bir Golden Retriever yavrusu. Çocuklarla çok iyi geçiniyor ve temel eğitimleri almış durumda. Sosyal bir yapısı var ve diğer hayvanlarla da uyumlu.',
  images: [
    'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
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
    avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=100',
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
};

const temperamentTags = [
  { id: 'playful', label: 'Oyuncu', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' },
  { id: 'calm', label: 'Sakin', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' },
  { id: 'trained', label: 'Eğitimli', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' },
  { id: 'social', label: 'Sosyal', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' },
  { id: 'gentle', label: 'Nazik', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200' }
];

const careNotes = [
  'Günde 2 kez beslenmeli (yavru maması)',
  'Günlük 30-45 dakika oyun ve egzersiz',
  'Haftalık tırnak kesimi gerekli',
  'Aylık veteriner kontrolü öneriliyor',
  'Soğuk havalarda ek koruma gerekebilir'
];

const adoptionRequirements = [
  { id: 1, text: 'Kapalı bahçeli ev veya güvenli balkon', completed: false },
  { id: 2, text: 'Önceden köpek bakım deneyimi', completed: false },
  { id: 3, text: 'Düzenli veteriner takibi sağlama', completed: false },
  { id: 4, text: 'Günlük egzersiz ve sosyalizasyon', completed: false },
  { id: 5, text: 'Acil durum veteriner masrafları için bütçe', completed: false }
];

export const PetDetailPage: React.FC<PetDetailPageProps> = ({ 
  listing = mockListing, 
  onBack,
  onShowApplication
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  // Extract pet name from title
  const petName = listing.title.split(' - ')[0] || listing.title.split(' ')[0] || 'İsimsiz';
  const isUrgent = Math.random() > 0.7; // Mock urgent status
  const isNew = (new Date().getTime() - new Date(listing.createdAt).getTime()) < 7 * 24 * 60 * 60 * 1000;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavorite}
              className="p-2"
            >
              <Heart className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative h-80 overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-out h-full"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {listing.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${petName} - ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
        
        {/* Navigation Arrows */}
        {listing.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
        
        {/* Dots Indicator */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {listing.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImage ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isUrgent && (
            <Badge variant="error" size="sm">
              🚨 Acil Yuva
            </Badge>
          )}
          {isNew && (
            <Badge variant="accent" size="sm">
              ✨ Yeni
            </Badge>
          )}
          {listing.featured && (
            <Badge variant="success" size="sm">
              {tr.common.featured}
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Pet Name and Basic Info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {petName}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <MapPin className="h-4 w-4" />
            <span>{listing.location.district}, {listing.location.city}</span>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {listing.description}
          </p>
        </div>

        {/* Pet Details */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Detaylı Bilgiler
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Yaş</div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">{listing.age}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cinsiyet</div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {listing.gender === 'female' ? '♀️ Dişi' : '♂️ Erkek'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Scale className="h-5 w-5 text-green-600 dark:text-green-400" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Kilo</div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">8.5 kg</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Home className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cins</div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">{listing.breed}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Health Status */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Sağlık Durumu
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className={`h-5 w-5 ${listing.vaccinated ? 'text-green-600' : 'text-red-600'}`} />
                <span className="text-sm font-medium">Aşı Durumu</span>
              </div>
              <Badge variant={listing.vaccinated ? 'success' : 'error'} size="sm">
                {listing.vaccinated ? 'Aşıları Tam' : 'Aşı Eksik'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Zap className={`h-5 w-5 ${listing.neutered ? 'text-green-600' : 'text-orange-600'}`} />
                <span className="text-sm font-medium">Kısırlaştırma</span>
              </div>
              <Badge variant={listing.neutered ? 'success' : 'warning'} size="sm">
                {listing.neutered ? 'Kısırlaştırılmış' : 'Henüz Değil'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Cpu className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Mikroçip</span>
              </div>
              <div className="text-sm font-mono text-gray-600 dark:text-gray-400">
                ****-****-**42
              </div>
            </div>
          </div>
        </div>

        {/* Temperament Tags */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Karakter Özellikleri
          </h2>
          <div className="flex flex-wrap gap-2">
            {temperamentTags.map((tag) => (
              <span
                key={tag.id}
                className={`px-3 py-1 rounded-full text-sm font-medium ${tag.color}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>

        {/* Care Notes */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Bakım Notları
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <div className="flex items-start gap-3 mb-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <h3 className="font-medium text-blue-900 dark:text-blue-100">
                Özel Bakım Gereksinimleri
              </h3>
            </div>
            <ul className="space-y-2">
              {careNotes.map((note, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-200">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Adoption Requirements */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Sahiplenme Gereksinimleri
          </h2>
          <div className="space-y-3">
            {adoptionRequirements.map((req) => (
              <div key={req.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <CheckCircle className={`h-5 w-5 mt-0.5 ${req.completed ? 'text-green-600' : 'text-gray-400'}`} />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {req.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Host Profile */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {listing.user.rating > 4.5 ? 'Barınak Bilgileri' : 'Sahip Bilgileri'}
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                {listing.user.avatar ? (
                  <img 
                    src={listing.user.avatar} 
                    alt={listing.user.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-xl font-medium">
                    {listing.user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {listing.user.name}
                  </h3>
                  <div className="flex gap-1">
                    {listing.user.verifications.id && (
                      <VerificationBadge type="id" verified={true} size="sm" />
                    )}
                    {listing.user.verifications.phone && (
                      <VerificationBadge type="phone" verified={true} size="sm" />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                    {listing.user.rating}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ({listing.user.reviewCount} değerlendirme)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>1 saat önce aktifti</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Block */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-red-800 dark:text-red-200 mb-1">
                Güvenlik Uyarısı
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                Ücret talep edenlere itibar etmeyin. Sahiplenme ücretsiz olmalıdır.
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 dark:text-red-400 p-0 h-auto"
              >
                <Flag className="h-4 w-4 mr-1" />
                Şüpheli ilanı bildir
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-3 gap-3">
          <Button className="flex-1" onClick={onShowApplication}>
            <FileText className="h-4 w-4 mr-2" />
            Sahiplenmeye Başvur
          </Button>
          <Button variant="secondary" className="flex-1">
            <MessageCircle className="h-4 w-4 mr-2" />
            Mesaj Gönder
          </Button>
          <Button variant="outline" className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            Ön Ziyaret
          </Button>
        </div>
      </div>
    </div>
  );
}; 