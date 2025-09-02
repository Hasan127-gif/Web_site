import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { RangeSlider } from '../ui/RangeSlider';
import { Badge } from '../ui/Badge';
import { AIAssistantSidebar } from '../ui/AIAssistantSidebar';
import { 
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  DollarSign,
  Calendar,
  Home,
  Maximize,
  Package,
  Users,
  Cigarette,
  Volume2,
  Camera,
  Upload,
  Lightbulb,
  Eye,
  Shield,
  Star,
  Sparkles,
  CheckCircle,
  X,
  Plus
} from 'lucide-react';

interface ListingFormData {
  // Step 1: Location & Price
  city: string;
  district: string;
  address: string;
  monthlyRent: number;
  deposit: number;
  availableFrom: string;
  
  // Step 2: Room/House Features
  roomSize: number;
  roomType: 'single' | 'shared' | 'studio';
  furnished: boolean;
  amenities: string[];
  houseRules: {
    smoking: boolean;
    pets: boolean;
    guests: boolean;
    quietHours: string;
  };
  
  // Step 3: Photos
  photos: File[];
  
  // Step 4: Visibility & Verification
  visibility: 'public' | 'verified-only';
  verifications: string[];
  featured: boolean;
}

const initialFormData: ListingFormData = {
  city: '',
  district: '',
  address: '',
  monthlyRent: 3000,
  deposit: 4500,
  availableFrom: '',
  roomSize: 15,
  roomType: 'single',
  furnished: true,
  amenities: [],
  houseRules: {
    smoking: false,
    pets: false,
    guests: true,
    quietHours: '23:00-07:00'
  },
  photos: [],
  visibility: 'public',
  verifications: [],
  featured: false
};

const steps = [
  { id: 1, title: 'Konum & Fiyat', icon: MapPin },
  { id: 2, title: 'Özellikler', icon: Home },
  { id: 3, title: 'Fotoğraflar', icon: Camera },
  { id: 4, title: 'Doğrulama', icon: Shield }
];

const cityOptions = [
  { value: 'istanbul', label: 'İstanbul' },
  { value: 'ankara', label: 'Ankara' },
  { value: 'izmir', label: 'İzmir' }
];

const districtOptions = [
  { value: 'kadikoy', label: 'Kadıköy' },
  { value: 'beyoglu', label: 'Beyoğlu' },
  { value: 'besiktas', label: 'Beşiktaş' },
  { value: 'sisli', label: 'Şişli' }
];

const amenitiesList = [
  { id: 'wifi', label: 'Wi-Fi', icon: '📶' },
  { id: 'parking', label: 'Otopark', icon: '🚗' },
  { id: 'kitchen', label: 'Mutfak', icon: '🍳' },
  { id: 'tv', label: 'TV', icon: '📺' },
  { id: 'washing', label: 'Çamaşır Makinesi', icon: '👕' },
  { id: 'ac', label: 'Klima', icon: '❄️' }
];

const photoTips = [
  { icon: Lightbulb, text: 'Doğal ışık kullanın (gündüz çekimi)' },
  { icon: Camera, text: 'Odanın köşelerinden çekin' },
  { icon: Eye, text: 'Temiz ve düzenli görünüm' },
  { icon: Maximize, text: 'Geniş açı kullanın' }
];

interface CreateListingPageProps {
  onBack: () => void;
}

export const CreateListingPage: React.FC<CreateListingPageProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ListingFormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (updates: Partial<ListingFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const toggleAmenity = (amenityId: string) => {
    const newAmenities = formData.amenities.includes(amenityId)
      ? formData.amenities.filter(id => id !== amenityId)
      : [...formData.amenities, amenityId];
    updateFormData({ amenities: newAmenities });
  };

  const toggleVerification = (verificationId: string) => {
    const newVerifications = formData.verifications.includes(verificationId)
      ? formData.verifications.filter(id => id !== verificationId)
      : [...formData.verifications, verificationId];
    updateFormData({ verifications: newVerifications });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      updateFormData({ photos: [...formData.photos, ...newFiles] });
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    updateFormData({ photos: newPhotos });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            İlanın yayında!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            İlanın başarıyla oluşturuldu ve yayınlandı.
          </p>
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-4 text-white mb-6">
            <Sparkles className="h-6 w-6 mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Öne Çıkararak Daha Hızlı Eşleş</h3>
            <p className="text-sm text-purple-100 mb-3">
              İlanın 3 gün boyunca öne çıkarılsın ve daha fazla görüntülensin.
            </p>
            <Button variant="secondary" size="sm" className="bg-white text-purple-600">
              Öne Çıkar (₺25)
            </Button>
          </div>
          <div className="space-y-3">
            <Button onClick={onBack} className="w-full">
              Ana Sayfaya Dön
            </Button>
            <Button variant="outline" className="w-full">
              İlanımı Görüntüle
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={currentStep === 1 ? onBack : prevStep}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {currentStep}/4
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${
                    isActive ? 'text-blue-600 dark:text-blue-400' :
                    isCompleted ? 'text-green-600 dark:text-green-400' :
                    'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    isActive ? 'bg-blue-100 dark:bg-blue-900/30' :
                    isCompleted ? 'bg-green-100 dark:bg-green-900/30' :
                    'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <span className="text-xs font-medium">{step.title}</span>
                </div>
              );
            })}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <div 
              className="bg-blue-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="p-4 pb-24">
        {/* Step 1: Location & Price */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Konum ve Fiyat Bilgileri
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                İlanınızın konumu ve fiyat detaylarını belirleyin.
              </p>
            </div>

            <div className="space-y-4">
              <Select
                label="Şehir"
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
                options={cityOptions}
                placeholder="Şehir seçin"
              />
              
              <Select
                label="İlçe"
                value={formData.district}
                onChange={(e) => updateFormData({ district: e.target.value })}
                options={districtOptions}
                placeholder="İlçe seçin"
              />
              
              <Input
                label="Adres"
                value={formData.address}
                onChange={(e) => updateFormData({ address: e.target.value })}
                placeholder="Sokak, mahalle bilgileri"
                icon={<MapPin className="h-4 w-4" />}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Aylık Kira (₺)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={formData.monthlyRent}
                    onChange={(e) => updateFormData({ monthlyRent: Number(e.target.value) })}
                    icon={<DollarSign className="h-4 w-4" />}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Depozito (₺)
                </label>
                <Input
                  type="number"
                  value={formData.deposit}
                  onChange={(e) => updateFormData({ deposit: Number(e.target.value) })}
                  icon={<DollarSign className="h-4 w-4" />}
                />
              </div>
              
              <Input
                label="Müsaitlik Tarihi"
                type="date"
                value={formData.availableFrom}
                onChange={(e) => updateFormData({ availableFrom: e.target.value })}
                icon={<Calendar className="h-4 w-4" />}
              />
            </div>
          </div>
        )}

        {/* Step 2: Features */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Oda ve Ev Özellikleri
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Odanızın özelliklerini ve ev kurallarını belirleyin.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Oda Boyutu (m²)
                </label>
                <RangeSlider
                  min={10}
                  max={50}
                  value={[formData.roomSize, formData.roomSize]}
                  onChange={([value]) => updateFormData({ roomSize: value })}
                  formatValue={(value) => `${value} m²`}
                />
              </div>

              <Select
                label="Oda Türü"
                value={formData.roomType}
                onChange={(e) => updateFormData({ roomType: e.target.value as any })}
                options={[
                  { value: 'single', label: 'Tek Kişilik' },
                  { value: 'shared', label: 'Paylaşımlı' },
                  { value: 'studio', label: 'Stüdyo' }
                ]}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                  Eşyalı mı?
                </label>
                <div className="flex gap-3">
                  <Button
                    variant={formData.furnished ? 'default' : 'outline'}
                    onClick={() => updateFormData({ furnished: true })}
                    className="flex-1"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Eşyalı
                  </Button>
                  <Button
                    variant={!formData.furnished ? 'default' : 'outline'}
                    onClick={() => updateFormData({ furnished: false })}
                    className="flex-1"
                  >
                    Eşyasız
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                  Olanaklar
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {amenitiesList.map((amenity) => (
                    <Button
                      key={amenity.id}
                      variant={formData.amenities.includes(amenity.id) ? 'default' : 'outline'}
                      onClick={() => toggleAmenity(amenity.id)}
                      className="justify-start"
                      size="sm"
                    >
                      <span className="mr-2">{amenity.icon}</span>
                      {amenity.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                  Ev Kuralları
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Cigarette className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm">Sigara içilir mi?</span>
                    </div>
                    <Button
                      variant={formData.houseRules.smoking ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateFormData({
                        houseRules: { ...formData.houseRules, smoking: !formData.houseRules.smoking }
                      })}
                    >
                      {formData.houseRules.smoking ? 'İzinli' : 'Yasak'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm">Evcil hayvan</span>
                    </div>
                    <Button
                      variant={formData.houseRules.pets ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateFormData({
                        houseRules: { ...formData.houseRules, pets: !formData.houseRules.pets }
                      })}
                    >
                      {formData.houseRules.pets ? 'İzinli' : 'Yasak'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm">Misafir</span>
                    </div>
                    <Button
                      variant={formData.houseRules.guests ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateFormData({
                        houseRules: { ...formData.houseRules, guests: !formData.houseRules.guests }
                      })}
                    >
                      {formData.houseRules.guests ? 'İzinli' : 'Yasak'}
                    </Button>
                  </div>

                  <Input
                    label="Sessiz saatler"
                    value={formData.houseRules.quietHours}
                    onChange={(e) => updateFormData({
                      houseRules: { ...formData.houseRules, quietHours: e.target.value }
                    })}
                    placeholder="23:00-07:00"
                    icon={<Volume2 className="h-4 w-4" />}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Photos */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Fotoğraflar
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Odanızın en iyi fotoğraflarını ekleyin.
              </p>
            </div>

            {/* Photo Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                📸 Fotoğraf İpuçları
              </h3>
              <div className="space-y-2">
                {photoTips.map((tip, index) => {
                  const Icon = tip.icon;
                  return (
                    <div key={index} className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
                      <Icon className="h-4 w-4" />
                      <span>{tip.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                Fotoğraflar (En az 3, en fazla 8)
              </label>
              
              {formData.photos.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Fotoğraflarınızı sürükleyip bırakın veya seçin
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload">
                    <Button variant="outline" className="cursor-pointer">
                      <Camera className="h-4 w-4 mr-2" />
                      Fotoğraf Seç
                    </Button>
                  </label>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        {index === 0 && (
                          <Badge
                            variant="accent"
                            size="sm"
                            className="absolute bottom-2 left-2"
                          >
                            Ana Fotoğraf
                          </Badge>
                        )}
                      </div>
                    ))}
                    
                    {formData.photos.length < 8 && (
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-32 flex items-center justify-center">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="add-photo"
                        />
                        <label htmlFor="add-photo" className="cursor-pointer">
                          <Plus className="h-8 w-8 text-gray-400" />
                        </label>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {formData.photos.length}/8 fotoğraf yüklendi
                  </div>
                </div>
              )}
            </div>

            {/* Photo Checklist */}
            {formData.photos.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">
                  ✅ Kontrol Listesi
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-800 dark:text-green-200">
                      En az 3 fotoğraf yüklendi
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-800 dark:text-green-200">
                      Ana fotoğraf belirlendi
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Visibility & Verification */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Görünürlük ve Doğrulama
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                İlanınızın görünürlüğünü ve doğrulama tercihlerinizi ayarlayın.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                İlan Görünürlüğü
              </label>
              <div className="space-y-3">
                <Button
                  variant={formData.visibility === 'public' ? 'default' : 'outline'}
                  onClick={() => updateFormData({ visibility: 'public' })}
                  className="w-full justify-start p-4 h-auto"
                >
                  <div className="text-left">
                    <div className="font-medium">Herkese Açık</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      İlanınızı herkes görebilir ve iletişime geçebilir
                    </div>
                  </div>
                </Button>
                
                <Button
                  variant={formData.visibility === 'verified-only' ? 'default' : 'outline'}
                  onClick={() => updateFormData({ visibility: 'verified-only' })}
                  className="w-full justify-start p-4 h-auto"
                >
                  <div className="text-left">
                    <div className="font-medium">Sadece Doğrulanmış Kullanıcılar</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Sadece kimliği doğrulanmış kullanıcılar görebilir
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                Doğrulama Tercihleri
              </label>
              <div className="space-y-2">
                <Button
                  variant={formData.verifications.includes('id') ? 'default' : 'outline'}
                  onClick={() => toggleVerification('id')}
                  className="w-full justify-start"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Kimlik Doğrulama Zorunlu
                </Button>
                
                <Button
                  variant={formData.verifications.includes('student') ? 'default' : 'outline'}
                  onClick={() => toggleVerification('student')}
                  className="w-full justify-start"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Öğrenci Doğrulama Zorunlu
                </Button>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                📋 İlan Önizlemesi
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Konum:</span>
                  <span className="font-medium">{formData.district}, {formData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Kira:</span>
                  <span className="font-medium text-blue-600">₺{formData.monthlyRent.toLocaleString()}/ay</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Oda Tipi:</span>
                  <span className="font-medium">
                    {formData.roomType === 'single' ? 'Tek Kişilik' :
                     formData.roomType === 'shared' ? 'Paylaşımlı' : 'Stüdyo'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Boyut:</span>
                  <span className="font-medium">{formData.roomSize} m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Fotoğraf:</span>
                  <span className="font-medium">{formData.photos.length} adet</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex-1"
            >
              Geri
            </Button>
          )}
          
          <Button
            onClick={currentStep === 4 ? handleSubmit : nextStep}
            className="flex-1"
            disabled={
              (currentStep === 1 && (!formData.city || !formData.district || !formData.monthlyRent)) ||
              (currentStep === 2 && !formData.roomType) ||
              (currentStep === 3 && formData.photos.length < 3)
            }
          >
            {currentStep === 4 ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                İlanı Yayınla
              </>
            ) : (
              <>
                İleri
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}; 