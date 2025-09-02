import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge, VerificationBadge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { SegmentedTabs } from '../ui/SegmentedTabs';
import { EmptyState } from '../ui/EmptyState';
import { VerificationModals } from '../modals/VerificationModals';
import { 
  ArrowLeft,
  Edit,
  Shield,
  Star,
  MapPin,
  Clock,
  Heart,
  DollarSign,
  Volume2,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Plus,
  MessageCircle,
  Package,
  Home,
  Calendar
} from 'lucide-react';
import { tr } from '../../locales/tr';
import type { User, Listing } from '../../types';

interface ProfilePageProps {
  onBack: () => void;
}

const mockUser: User = {
  id: '1',
  name: 'Ayşe Yılmaz',
  email: 'ayse@example.com',
  phone: '+90 555 123 45 67',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
  verifications: {
    id: true,
    student: true,
    phone: true
  },
  rating: 4.8,
  reviewCount: 23
};

const mockUserProfile = {
  handle: '@ayse_yilmaz',
  bio: 'İstanbul\'da yaşan öğretmen. Temiz ve düzenli yaşam tarzı. Hayvan sever, sigara içmez.',
  joinDate: '2023-06-15',
  preferences: {
    quietHours: '23:00-07:00',
    pets: true,
    budget: { min: 2000, max: 5000 },
    smoking: false,
    location: 'Kadıköy, İstanbul'
  },
  trustScore: 85,
  badges: [
    { id: 'verified', label: 'Doğrulanmış Üye', icon: Shield, color: 'text-green-600' },
    { id: 'top-rated', label: 'En İyi Değerlendirme', icon: Star, color: 'text-amber-500' },
    { id: 'quick-responder', label: 'Hızlı Yanıt', icon: MessageCircle, color: 'text-blue-600' }
  ]
};

const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Merkezi konumda geniş oda',
    description: 'Şehir merkezinde, ulaşım imkanları yakın.',
    images: ['https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400'],
    price: 3500,
    location: { city: 'İstanbul', district: 'Kadıköy', lat: 40.9833, lng: 29.0167 },
    user: mockUser,
    category: 'roommate',
    createdAt: '2024-01-15',
    featured: true,
    escrow: true
  }
];

const mockReviews = [
  {
    id: '1',
    reviewer: 'Mehmet Kaya',
    rating: 5,
    comment: 'Çok temiz ve düzenli bir ev arkadaşı. Kesinlikle tavsiye ederim!',
    date: '2024-01-10',
    avatar: ''
  },
  {
    id: '2',
    reviewer: 'Elif Demir',
    rating: 4,
    comment: 'İyi bir deneyimdi. Sessiz ve saygılı.',
    date: '2024-01-05',
    avatar: ''
  }
];

const profileTabs = [
  { id: 'listings', label: 'İlanlar', count: mockListings.length },
  { id: 'reviews', label: 'Yorumlar', count: mockReviews.length },
  { id: 'about', label: 'Hakkımda', count: 0 }
];

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('listings');
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [showIdModal, setShowIdModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [userVerifications, setUserVerifications] = useState(mockUser.verifications);

  const handleFavorite = (id: string) => {
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

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrustScoreLabel = (score: number) => {
    if (score >= 80) return 'Yüksek Güven';
    if (score >= 60) return 'Orta Güven';
    return 'Düşük Güven';
  };

  const getVerificationProgress = () => {
    const verifications = Object.values(userVerifications);
    const completedCount = verifications.filter(Boolean).length;
    return (completedCount / verifications.length) * 100;
  };

  const handleVerificationComplete = (type: 'id' | 'student' | 'phone') => {
    setUserVerifications(prev => ({
      ...prev,
      [type]: true
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
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
          
          <h1 className="font-semibold text-gray-900 dark:text-gray-100">
            Profil
          </h1>
          
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
          >
            <Edit className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 p-6">
        <div className="flex items-start gap-4 mb-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
            {mockUser.avatar ? (
              <img 
                src={mockUser.avatar} 
                alt={mockUser.name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-2xl font-medium">
                {mockUser.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          {/* Name and Handle */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {mockUser.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {mockUserProfile.handle}
            </p>
            
            {/* Verification Stack */}
            <div className="flex items-center gap-2 mb-3">
              {userVerifications.id && (
                <VerificationBadge type="id" verified={true} size="sm" />
              )}
              {userVerifications.student && (
                <VerificationBadge type="student" verified={true} size="sm" />
              )}
              {userVerifications.phone && (
                <VerificationBadge type="phone" verified={true} size="sm" />
              )}
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {mockUser.rating}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({mockUser.reviewCount} değerlendirme)
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {mockUserProfile.bio}
          </p>
        </div>

        {/* Preferences */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Sessiz Saatler</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {mockUserProfile.preferences.quietHours}
            </span>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Evcil Hayvan</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {mockUserProfile.preferences.pets ? 'Sever' : 'Sevmez'}
            </span>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Bütçe</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ₺{mockUserProfile.preferences.budget.min.toLocaleString()}-{mockUserProfile.preferences.budget.max.toLocaleString()}
            </span>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Konum</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {mockUserProfile.preferences.location}
            </span>
          </div>
        </div>

        {/* Trust Score Meter */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Güven Puanı
            </h3>
            <span className={`text-lg font-bold ${getTrustScoreColor(mockUserProfile.trustScore)}`}>
              {mockUserProfile.trustScore}/100
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                mockUserProfile.trustScore >= 80 ? 'bg-green-500' :
                mockUserProfile.trustScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${mockUserProfile.trustScore}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Düşük</span>
            <span>Orta</span>
            <span>Yüksek</span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {getTrustScoreLabel(mockUserProfile.trustScore)} seviyesi
          </p>
        </div>

        {/* Trust Badges */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Güven Rozetleri
          </h3>
          <div className="flex flex-wrap gap-2">
            {mockUserProfile.badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2"
                >
                  <Icon className={`h-4 w-4 ${badge.color}`} />
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="p-4 space-y-3">
        <Button 
          className="w-full"
          disabled={getVerificationProgress() === 100}
        >
          <Shield className="h-4 w-4 mr-2" />
          {getVerificationProgress() === 100 ? 'Doğrulama Tamamlandı' : 'Doğrulamayı Tamamla'}
        </Button>
        
        <Button variant="outline" className="w-full">
          <TrendingUp className="h-4 w-4 mr-2" />
          Güven Puanını Artır
        </Button>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <SegmentedTabs
          tabs={profileTabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* Tab Content */}
      <div className="px-4">
        {/* İlanlar Tab */}
        {activeTab === 'listings' && (
          <div>
            {mockListings.length > 0 ? (
              <div className="space-y-4">
                {mockListings.map(listing => (
                  <Card
                    key={listing.id}
                    listing={listing}
                    onFavorite={handleFavorite}
                    isFavorited={favoriteIds.has(listing.id)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Package className="h-8 w-8" />}
                title="Henüz ilan yok"
                description="İlk ilanını vererek başla"
                action={
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    İlan Ver
                  </Button>
                }
              />
            )}
          </div>
        )}

        {/* Yorumlar Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {mockReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    {review.avatar ? (
                      <img src={review.avatar} alt={review.reviewer} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                        {review.reviewer.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {review.reviewer}
                      </h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating 
                                ? 'fill-amber-400 text-amber-400' 
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {review.comment}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(review.date).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hakkımda Tab */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            {/* Join Date */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Üyelik Bilgileri
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(mockUserProfile.joinDate).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long'
                  })} tarihinde katıldı
                </span>
              </div>
            </div>

            {/* Verification Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Doğrulama İlerlemesi
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className={`h-4 w-4 ${userVerifications.id ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-sm">Kimlik Doğrulama</span>
                  </div>
                  {userVerifications.id ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setShowIdModal(true)}>
                      Doğrula
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className={`h-4 w-4 ${userVerifications.student ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-sm">Öğrenci Doğrulama</span>
                  </div>
                  {userVerifications.student ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setShowStudentModal(true)}>
                      Doğrula
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className={`h-4 w-4 ${userVerifications.phone ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-sm">Telefon Doğrulama</span>
                  </div>
                  {userVerifications.phone ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setShowPhoneModal(true)}>
                      Doğrula
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getVerificationProgress()}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  %{getVerificationProgress().toFixed(0)} tamamlandı
                </p>
              </div>
            </div>

            {/* Trust Score Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                💡 Güven Puanını Artırma İpuçları
              </h3>
              <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Profil fotoğrafı ekle</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Bio bölümünü detaylandır</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Tüm doğrulamaları tamamla</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Aktif olarak mesajlara yanıt ver</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Verification Modals */}
      <VerificationModals
        isIdModalOpen={showIdModal}
        isStudentModalOpen={showStudentModal}
        isPhoneModalOpen={showPhoneModal}
        onCloseIdModal={() => setShowIdModal(false)}
        onCloseStudentModal={() => setShowStudentModal(false)}
        onClosePhoneModal={() => setShowPhoneModal(false)}
        onVerificationComplete={handleVerificationComplete}
      />
    </div>
  );
}; 