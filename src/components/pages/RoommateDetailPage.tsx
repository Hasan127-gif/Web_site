import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge, VerificationBadge } from '../ui/Badge';
import { 
  ArrowLeft,
  Heart,
  Share,
  ChevronLeft,
  ChevronRight,
  Cigarette,
  Users,
  Volume2,
  Home,
  Maximize,
  Layers,
  Star,
  MessageCircle,
  Calendar,
  FileText,
  Shield,
  Flag,
  Clock,
  MapPin,
  Wifi,
  Car,
  Utensils,
  Tv,
  Waves,
  Zap
} from 'lucide-react';
import { tr } from '../../locales/tr';
import type { RoommateListing } from '../../types';

interface RoommateDetailPageProps {
  listing: RoommateListing;
  onBack: () => void;
  onShowContract?: () => void;
}

const mockListing: RoommateListing = {
  id: '1',
  title: 'Kadıköy\'de Öğrenci Evi - Tek Kişilik Oda',
  description: 'Temiz, sakin ve güvenli bir ortamda tek kişilik oda. Metro ve üniversiteye yakın. Evin tüm ortak alanları kullanılabilir. Mutfak tam donanımlı, çamaşır makinesi mevcut.',
  images: [
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
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
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
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
    pets: true,
    students: true,
  },
  createdAt: '2025-01-10',
  featured: true,
  escrow: true,
};

const houseRules = [
  {
    icon: Cigarette,
    label: 'Sigara içilmez',
    allowed: false,
    color: 'text-red-500'
  },
  {
    icon: Users,
    label: 'Evcil dostu',
    allowed: true,
    color: 'text-green-500'
  },
  {
    icon: Users,
    label: 'Misafir izinli',
    allowed: true,
    color: 'text-green-500'
  },
  {
    icon: Volume2,
    label: 'Sessiz saat 23:00–07:00',
    allowed: true,
    color: 'text-blue-500'
  }
];

const amenities = [
  { icon: Wifi, label: 'Wi-Fi' },
  { icon: Car, label: 'Otopark' },
  { icon: Utensils, label: 'Mutfak' },
  { icon: Tv, label: 'TV' },
  { icon: Waves, label: 'Çamaşır Makinesi' },
  { icon: Zap, label: 'Klima' }
];

export const RoommateDetailPage: React.FC<RoommateDetailPageProps> = ({ 
  listing = mockListing, 
  onBack,
  onShowContract
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

  const depositAmount = Math.round(listing.price * 1.5);
  const maintenanceFee = 150;

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
              alt={`${listing.title} - ${index + 1}`}
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
        
        {/* Featured Badge */}
        {listing.featured && (
          <div className="absolute top-4 left-4">
            <Badge variant="accent" size="sm">
              {tr.common.featured}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Title and Price */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {listing.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <MapPin className="h-4 w-4" />
            <span>{listing.location.district}, {listing.location.city}</span>
          </div>
          
          {/* Price Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ₺{listing.price.toLocaleString('tr-TR')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Aylık Kira</div>
              </div>
              <div>
                <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  ₺{depositAmount.toLocaleString('tr-TR')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Depozito</div>
              </div>
              <div>
                <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  ₺{maintenanceFee}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Aidat</div>
              </div>
            </div>
          </div>
        </div>

        {/* House Rules */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Ev Kuralları
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {houseRules.map((rule, index) => {
              const Icon = rule.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <Icon className={`h-5 w-5 ${rule.color}`} />
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {rule.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Kurallar:</strong> Sessiz saat 23:00–07:00 • Evcil dostu • Sigara içilmez.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Hakkında
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {listing.description}
          </p>
          
          {/* Room/House Plan */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
              Oda ve Ev Planı
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <Maximize className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">18 m²</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Oda Boyutu</span>
              </div>
              <div className="flex flex-col items-center">
                <Home className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">3+1</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Ev Planı</span>
              </div>
              <div className="flex flex-col items-center">
                <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">2. Kat</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Konum</span>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Olanaklar
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400 mb-2" />
                  <span className="text-xs text-gray-900 dark:text-gray-100 text-center">
                    {amenity.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lessor Profile */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Kiracı Bilgileri
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
                    {listing.user.verifications.student && (
                      <VerificationBadge type="student" verified={true} size="sm" />
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
                  <span>2 saat önce aktifti</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Note */}
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                Güvenlik Notu
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                Görüşmelerinizi güvenli yerlerde yapın. Kişisel bilgilerinizi koruyun ve şüpheli durumları bildirin.
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 dark:text-red-400 p-0 h-auto"
              >
                <Flag className="h-4 w-4 mr-1" />
                Bu ilanı bildir
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-3 gap-3">
          <Button variant="secondary" className="flex-1">
            <MessageCircle className="h-4 w-4 mr-2" />
            Mesaj Gönder
          </Button>
          <Button variant="outline" className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Görüşme Ayarla
          </Button>
          <Button className="flex-1" onClick={onShowContract}>
            <FileText className="h-4 w-4 mr-2" />
            Sözleşme Oluştur
          </Button>
        </div>
      </div>
    </div>
  );
}; 