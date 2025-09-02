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
  Package,
  DollarSign,
  Maximize,
  Camera,
  Upload,
  Lightbulb,
  Eye,
  Truck,
  CheckCircle,
  Sparkles,
  X,
  Plus,
  Crop,
  Zap,
  Target,
  Sun,
  Grid3x3,
  Bot
} from 'lucide-react';

interface FurnitureFormData {
  // Step 1: Category/Title/Price
  category: string;
  title: string;
  description: string;
  price: number;
  
  // Step 2: Dimensions/Condition
  width: number;
  depth: number;
  height: number;
  condition: string;
  brand: string;
  color: string;
  material: string;
  
  // Step 3: Photos/Videos
  photos: File[];
  videos: File[];
  
  // Step 4: Delivery Options
  deliveryOptions: string[];
  pickupLocation: string;
  
  // Step 5: Preview
  featured: boolean;
}

const initialFormData: FurnitureFormData = {
  category: '',
  title: '',
  description: '',
  price: 1000,
  width: 100,
  depth: 50,
  height: 75,
  condition: '',
  brand: '',
  color: '',
  material: '',
  photos: [],
  videos: [],
  deliveryOptions: ['pickup'],
  pickupLocation: '',
  featured: false
};

const steps = [
  { id: 1, title: 'Kategori', icon: Package },
  { id: 2, title: 'Ölçüler', icon: Maximize },
  { id: 3, title: 'Foto/Video', icon: Camera },
  { id: 4, title: 'Teslim', icon: Truck },
  { id: 5, title: 'Önizleme', icon: Eye }
];

const categoryOptions = [
  { value: 'sofa', label: 'Koltuk' },
  { value: 'table', label: 'Masa' },
  { value: 'chair', label: 'Sandalye' },
  { value: 'bed', label: 'Yatak' },
  { value: 'storage', label: 'Dolap' },
  { value: 'decoration', label: 'Dekorasyon' },
  { value: 'other', label: 'Diğer' }
];

const conditionOptions = [
  { value: 'new', label: 'Sıfır' },
  { value: 'excellent', label: 'Mükemmel' },
  { value: 'good', label: 'İyi' },
  { value: 'fair', label: 'Orta' }
];

const deliveryOptionsList = [
  { id: 'pickup', label: 'Elden Teslim', icon: '📦', description: 'Alıcı gelip alır' },
  { id: 'cargo', label: 'Kargo', icon: '📮', description: 'Kargo ile gönderim' },
  { id: 'transport', label: 'Nakliye', icon: '🚛', description: 'Profesyonel nakliye' }
];

const photoTips = [
  { icon: Sun, text: 'Doğal ışık kullanın (pencere yanı ideal)', color: 'text-yellow-600' },
  { icon: Grid3x3, text: '4:3 oranında çekin (otomatik kırpılır)', color: 'text-blue-600' },
  { icon: Target, text: 'Ürünü merkeze alın', color: 'text-green-600' },
  { icon: Crop, text: 'Farklı açılardan en az 3 fotoğraf', color: 'text-purple-600' },
  { icon: Zap, text: 'Temiz arka plan seçin', color: 'text-orange-600' }
];

interface CreateFurnitureListingPageProps {
  onBack: () => void;
}

export const CreateFurnitureListingPage: React.FC<CreateFurnitureListingPageProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FurnitureFormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const updateFormData = (updates: Partial<FurnitureFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
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

  const toggleDeliveryOption = (optionId: string) => {
    const newOptions = formData.deliveryOptions.includes(optionId)
      ? formData.deliveryOptions.filter(id => id !== optionId)
      : [...formData.deliveryOptions, optionId];
    updateFormData({ deliveryOptions: newOptions });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'photos' | 'videos') => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      if (type === 'photos') {
        updateFormData({ photos: [...formData.photos, ...newFiles] });
      } else {
        updateFormData({ videos: [...formData.videos, ...newFiles] });
      }
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    updateFormData({ photos: newPhotos });
  };

  const removeVideo = (index: number) => {
    const newVideos = formData.videos.filter((_, i) => i !== index);
    updateFormData({ videos: newVideos });
  };

  // Auto-crop to 4:3 simulation (in real app, this would use canvas)
  const cropTo43Ratio = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      resolve(url); // In real app, would crop and return new blob URL
    });
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
            Mobilya ilanın başarıyla oluşturuldu ve yayınlandı.
          </p>
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-4 text-white mb-6">
            <Sparkles className="h-6 w-6 mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Öne Çıkararak Daha Hızlı Sat</h3>
            <p className="text-sm text-purple-100 mb-3">
              İlanın 7 gün boyunca öne çıkarılsın ve %300 daha fazla görüntülensin.
            </p>
            <Button variant="secondary" size="sm" className="bg-white text-purple-600">
              Öne Çıkar (₺35)
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
          
          <div className="text-center">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Mobilya İlanı Ver
            </h1>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {currentStep}/5 Adım
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAIAssistant(true)}
            className="p-2"
          >
            <Bot className="h-5 w-5 text-purple-600" />
          </Button>
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
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="p-4 pb-24">
        {/* Step 1: Category/Title/Price */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Kategori ve Temel Bilgiler
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Mobilyanızın kategori ve fiyat bilgilerini girin.
              </p>
            </div>

            <div className="space-y-4">
              <Select
                label="Kategori"
                value={formData.category}
                onChange={(e) => updateFormData({ category: e.target.value })}
                options={categoryOptions}
                placeholder="Mobilya kategorisi seçin"
              />
              
              <Input
                label="İlan Başlığı"
                value={formData.title}
                onChange={(e) => updateFormData({ title: e.target.value })}
                placeholder="Örn: Modern L Koltuk Takımı"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Açıklama
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData({ description: e.target.value })}
                  placeholder="Mobilyanızı detaylı olarak açıklayın..."
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors duration-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-400"
                />
              </div>
              
              <Input
                label="Fiyat (₺)"
                type="number"
                value={formData.price}
                onChange={(e) => updateFormData({ price: Number(e.target.value) })}
                icon={<DollarSign className="h-4 w-4" />}
              />
            </div>
          </div>
        )}

        {/* Step 2: Dimensions/Condition */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Ölçüler ve Durum
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Mobilyanızın boyutları ve durumu hakkında bilgi verin.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Ölçüler (cm)
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Genişlik
                    </label>
                    <Input
                      type="number"
                      value={formData.width}
                      onChange={(e) => updateFormData({ width: Number(e.target.value) })}
                      placeholder="240"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Derinlik
                    </label>
                    <Input
                      type="number"
                      value={formData.depth}
                      onChange={(e) => updateFormData({ depth: Number(e.target.value) })}
                      placeholder="160"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Yükseklik
                    </label>
                    <Input
                      type="number"
                      value={formData.height}
                      onChange={(e) => updateFormData({ height: Number(e.target.value) })}
                      placeholder="85"
                    />
                  </div>
                </div>
                <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                  Toplam: {formData.width}×{formData.depth}×{formData.height} cm
                </div>
              </div>

              <Select
                label="Durum"
                value={formData.condition}
                onChange={(e) => updateFormData({ condition: e.target.value })}
                options={conditionOptions}
                placeholder="Mobilya durumunu seçin"
              />

              <Input
                label="Marka (Opsiyonel)"
                value={formData.brand}
                onChange={(e) => updateFormData({ brand: e.target.value })}
                placeholder="Örn: IKEA, Bellona..."
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Renk"
                  value={formData.color}
                  onChange={(e) => updateFormData({ color: e.target.value })}
                  placeholder="Gri, Beyaz..."
                />
                <Input
                  label="Malzeme"
                  value={formData.material}
                  onChange={(e) => updateFormData({ material: e.target.value })}
                  placeholder="Ahşap, Metal..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Photos/Videos */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Fotoğraf ve Video
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                AI ipuçları ile mükemmel fotoğraflar çekin.
              </p>
            </div>

            {/* AI Photo Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  🤖 AI Fotoğraf İpuçları
                </h3>
              </div>
              <div className="space-y-2">
                {photoTips.map((tip, index) => {
                  const Icon = tip.icon;
                  return (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Icon className={`h-4 w-4 ${tip.color}`} />
                      <span className="text-gray-800 dark:text-gray-200">{tip.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                Fotoğraflar (En az 3, en fazla 10) - Otomatik 4:3 kırpma
              </label>
              
              {formData.photos.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Fotoğraflarınızı sürükleyip bırakın
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Crop className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      Otomatik 4:3 oranında kırpılacak
                    </span>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'photos')}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload">
                    <Button variant="outline" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Fotoğraf Seç
                    </Button>
                  </label>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-600">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover"
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
                        <div className="absolute bottom-2 right-2">
                          <Badge variant="success" size="sm" className="text-xs">
                            4:3 ✓
                          </Badge>
                        </div>
                      </div>
                    ))}
                    
                    {formData.photos.length < 10 && (
                      <div className="aspect-[4/3] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'photos')}
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
                    {formData.photos.length}/10 fotoğraf • Tümü 4:3 oranında kırpıldı
                  </div>
                </div>
              )}
            </div>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                Video (Opsiyonel, en fazla 2)
              </label>
              
              {formData.videos.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
                  <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Mobilyanızın video tanıtımını ekleyin
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e, 'videos')}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload">
                    <Button variant="outline" size="sm" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Video Seç
                    </Button>
                  </label>
                </div>
              ) : (
                <div className="space-y-2">
                  {formData.videos.map((video, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Camera className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="flex-1 text-sm text-gray-900 dark:text-gray-100">
                        Video {index + 1} ({(video.size / 1024 / 1024).toFixed(1)} MB)
                      </span>
                      <button
                        onClick={() => removeVideo(index)}
                        className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Delivery Options */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Teslim Seçenekleri
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Mobilyanızı nasıl teslim edeceğinizi belirleyin.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                  Teslim Yöntemleri (Birden fazla seçebilirsiniz)
                </label>
                <div className="space-y-3">
                  {deliveryOptionsList.map((option) => (
                    <div
                      key={option.id}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.deliveryOptions.includes(option.id)
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                      }`}
                      onClick={() => toggleDeliveryOption(option.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{option.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {option.label}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {option.description}
                          </p>
                        </div>
                        {formData.deliveryOptions.includes(option.id) && (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {formData.deliveryOptions.includes('pickup') && (
                <Input
                  label="Elden Teslim Adresi"
                  value={formData.pickupLocation}
                  onChange={(e) => updateFormData({ pickupLocation: e.target.value })}
                  placeholder="Teslim alınabilecek adres..."
                />
              )}
            </div>
          </div>
        )}

        {/* Step 5: Preview */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                İlan Önizlemesi
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                İlanınızın son halini kontrol edin.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                📋 İlan Özeti
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Kategori:</span>
                  <span className="font-medium">
                    {categoryOptions.find(cat => cat.value === formData.category)?.label || formData.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Başlık:</span>
                  <span className="font-medium">{formData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Fiyat:</span>
                  <span className="font-medium text-blue-600">₺{formData.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Ölçüler:</span>
                  <span className="font-medium">{formData.width}×{formData.depth}×{formData.height} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Durum:</span>
                  <span className="font-medium">
                    {conditionOptions.find(cond => cond.value === formData.condition)?.label || formData.condition}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Fotoğraf:</span>
                  <span className="font-medium">{formData.photos.length} adet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Teslim:</span>
                  <span className="font-medium">
                    {formData.deliveryOptions.map(opt => 
                      deliveryOptionsList.find(d => d.id === opt)?.label
                    ).join(', ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Option */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">🌟 Öne Çıkar</h3>
                  <p className="text-sm text-purple-100">
                    %300 daha fazla görüntüleme
                  </p>
                </div>
                <Button
                  variant={formData.featured ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => updateFormData({ featured: !formData.featured })}
                  className={formData.featured ? 'bg-white text-purple-600' : 'border-white text-white'}
                >
                  {formData.featured ? 'Seçildi (₺35)' : 'Seç (₺35)'}
                </Button>
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
            onClick={currentStep === 5 ? handleSubmit : nextStep}
            className="flex-1"
            disabled={
              (currentStep === 1 && (!formData.category || !formData.title || !formData.price)) ||
              (currentStep === 2 && (!formData.condition || !formData.width || !formData.depth || !formData.height)) ||
              (currentStep === 3 && formData.photos.length < 3) ||
              (currentStep === 4 && formData.deliveryOptions.length === 0)
            }
          >
            {currentStep === 5 ? (
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

      {/* AI Assistant Sidebar */}
      <AIAssistantSidebar
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        currentTitle={formData.title}
        currentDescription={formData.description}
        currentTags={[]}
        onApplyTitle={(newTitle) => updateFormData({ title: newTitle })}
        onApplyDescription={(newDescription) => updateFormData({ description: newDescription })}
        onApplyTags={(newTags) => {
          // In real app, would apply tags to listing
          console.log('Apply tags:', newTags);
        }}
      />
    </div>
  );
}; 