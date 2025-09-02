import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge, VerificationBadge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { 
  ArrowLeft,
  Heart,
  Share,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  MessageCircle,
  Shield,
  Truck,
  Flag,
  Clock,
  User,
  Package,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  Info,
  Maximize,
  Calendar,
  DollarSign
} from 'lucide-react';
import { tr } from '../../locales/tr';
import type { FurnitureListing } from '../../types';

interface FurnitureDetailPageProps {
  listing: FurnitureListing;
  onBack: () => void;
}

const mockListing: FurnitureListing = {
  id: '1',
  title: 'Modern L Koltuk Takımı',
  description: 'Az kullanılmış, temiz durumda modern L koltuk takımı. Gri renk, çok rahat. Oturma grubu olarak mükemmel. Pet hair yok, sigara içilmeyen evde kullanılmış.',
  images: [
    'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
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
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
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
};

const deliveryOptions = [
  {
    id: 'pickup',
    title: 'Elden Teslim',
    price: 0,
    description: 'Satıcının adresinden alabilirsiniz',
    icon: Package,
    time: 'Anında'
  },
  {
    id: 'cargo',
    title: 'Kargo',
    price: 50,
    description: 'Kapınıza kadar kargo ile',
    icon: Package,
    time: '2-3 gün'
  },
  {
    id: 'transport',
    title: 'Nakliye',
    price: 200,
    description: 'Profesyonel nakliye ekibi',
    icon: Truck,
    time: '1-2 gün'
  }
];

export const FurnitureDetailPage: React.FC<FurnitureDetailPageProps> = ({ 
  listing = mockListing, 
  onBack 
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showEscrowModal, setShowEscrowModal] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState('pickup');

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case 'new':
        return { label: 'Sıfır', color: 'success' as const };
      case 'excellent':
        return { label: 'Mükemmel', color: 'primary' as const };
      case 'good':
        return { label: 'İyi', color: 'secondary' as const };
      case 'fair':
        return { label: 'Orta', color: 'warning' as const };
      default:
        return { label: condition, color: 'secondary' as const };
    }
  };

  const parseDimensions = (dimensions: string) => {
    const parts = dimensions.split('x');
    if (parts.length === 3) {
      return {
        width: parts[0].trim(),
        depth: parts[1].trim(),
        height: parts[2].trim()
      };
    }
    return { width: '', depth: '', height: '' };
  };

  const condition = getConditionLabel(listing.condition);
  const dims = parseDimensions(listing.dimensions || '');
  const escrowFee = Math.round(listing.price * 0.03); // 3% escrow fee
  const selectedDeliveryOption = deliveryOptions.find(opt => opt.id === selectedDelivery);
  const totalPrice = listing.price + escrowFee + (selectedDeliveryOption?.price || 0);

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
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge variant={condition.color} size="sm">
            {condition.label}
          </Badge>
          {listing.featured && (
            <Badge variant="accent" size="sm">
              {tr.common.featured}
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Title, Price and Basic Info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {listing.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <MapPin className="h-4 w-4" />
            <span>{listing.location.district}, {listing.location.city}</span>
          </div>
          
          {/* Price */}
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            ₺{listing.price.toLocaleString('tr-TR')}
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {listing.description}
          </p>
        </div>

        {/* Dimensions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Ölçüler
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <Maximize className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{dims.width}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Genişlik (cm)</span>
              </div>
              <div className="flex flex-col items-center">
                <Maximize className="h-6 w-6 text-green-600 dark:text-green-400 mb-2 rotate-90" />
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{dims.depth}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Derinlik (cm)</span>
              </div>
              <div className="flex flex-col items-center">
                <Maximize className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2 rotate-45" />
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{dims.height}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Yükseklik (cm)</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Toplam: <strong>{listing.dimensions}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Seller Profile */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Satıcı Bilgileri
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
                  <span>3 saat önce aktifti</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Warning */}
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                Güvenlik Notu
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                Ürünü satın almadan önce mutlaka görün ve test edin. Güvenli ödeme seçeneklerini tercih edin.
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
          
          {listing.escrow ? (
            <Button 
              className="flex-1"
              onClick={() => setShowEscrowModal(true)}
            >
              <Shield className="h-4 w-4 mr-2" />
              Güvenli Ödeme
            </Button>
          ) : (
            <Button className="flex-1">
              <CreditCard className="h-4 w-4 mr-2" />
              Satın Al
            </Button>
          )}
          
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setShowDeliveryModal(true)}
          >
            <Truck className="h-4 w-4 mr-2" />
            Teslimat
          </Button>
        </div>
      </div>

      {/* Escrow Modal */}
      <Modal
        isOpen={showEscrowModal}
        onClose={() => setShowEscrowModal(false)}
        title="Güvenli Ödeme (Escrow)"
        size="md"
      >
        <div className="space-y-6">
          {/* Fee Breakdown */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Ödeme Detayları
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Ürün Fiyatı:</span>
                <span className="font-medium">₺{listing.price.toLocaleString('tr-TR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Güvenli Ödeme Ücreti (%3):</span>
                <span className="font-medium">₺{escrowFee.toLocaleString('tr-TR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Teslimat:</span>
                <span className="font-medium">₺{selectedDeliveryOption?.price || 0}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Toplam:</span>
                  <span className="text-blue-600 dark:text-blue-400">₺{totalPrice.toLocaleString('tr-TR')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Escrow Process */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Güvenli Ödeme Süreci
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Ödeme Yap</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Paranız güvenli hesapta bekletilir
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">2</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Ürünü İncele</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Ürünü teslim alın ve 48 saat içinde onaylayın
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Para Satıcıya Geçer</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Onayınız sonrası ödeme satıcıya aktarılır
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Return Policy */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              İade Koşulları
            </h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800 dark:text-blue-200">48 saat içinde iade hakkı</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800 dark:text-blue-200">Ürün açıklamaya uygun değilse tam iade</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800 dark:text-blue-200">Hasarlı teslimat durumunda ücretsiz iade</span>
              </div>
            </div>
          </div>

          <Button onClick={() => setShowEscrowModal(false)} className="w-full">
            <Shield className="h-4 w-4 mr-2" />
            Güvenli Ödeme ile Satın Al (₺{totalPrice.toLocaleString('tr-TR')})
          </Button>
        </div>
      </Modal>

      {/* Delivery Options Modal */}
      <Modal
        isOpen={showDeliveryModal}
        onClose={() => setShowDeliveryModal(false)}
        title="Teslimat Seçenekleri"
        size="md"
      >
        <div className="space-y-4">
          {deliveryOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedDelivery === option.id;
            
            return (
              <div
                key={option.id}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => setSelectedDelivery(option.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {option.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {option.price === 0 ? 'Ücretsiz' : `₺${option.price}`}
                        </span>
                        <Badge variant="secondary" size="sm">
                          {option.time}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          
          <Button onClick={() => setShowDeliveryModal(false)} className="w-full">
            Teslimat Seçeneğini Kaydet
          </Button>
        </div>
      </Modal>
    </div>
  );
}; 