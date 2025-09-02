import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { 
  ArrowLeft,
  ArrowRight,
  Check,
  Home,
  Clock,
  Heart,
  Calendar,
  FileText,
  CheckCircle,
  Sparkles,
  X,
  User,
  MapPin,
  Briefcase,
  Users
} from 'lucide-react';

interface ApplicationFormData {
  // Step 1: Living Conditions
  homeType: string;
  hasYard: boolean;
  workingHours: string;
  familyMembers: number;
  livingArrangement: string;
  
  // Step 2: Experience & Current Pets
  petExperience: string;
  currentPets: string;
  vetReference: string;
  previousPets: string;
  
  // Step 3: Visit Appointment
  preferredDate: string;
  preferredTime: string;
  visitNotes: string;
  
  // Step 4: Contract & Agreement
  agreements: string[];
  emergencyContact: string;
  emergencyPhone: string;
}

const initialFormData: ApplicationFormData = {
  homeType: '',
  hasYard: false,
  workingHours: '',
  familyMembers: 1,
  livingArrangement: '',
  petExperience: '',
  currentPets: '',
  vetReference: '',
  previousPets: '',
  preferredDate: '',
  preferredTime: '',
  visitNotes: '',
  agreements: [],
  emergencyContact: '',
  emergencyPhone: ''
};

const steps = [
  { id: 1, title: 'Yaşam Koşulları', icon: Home },
  { id: 2, title: 'Deneyim', icon: Heart },
  { id: 3, title: 'Ziyaret', icon: Calendar },
  { id: 4, title: 'Sözleşme', icon: FileText }
];

const homeTypeOptions = [
  { value: 'apartment', label: 'Apartman Dairesi' },
  { value: 'house', label: 'Müstakil Ev' },
  { value: 'villa', label: 'Villa' },
  { value: 'studio', label: 'Stüdyo' }
];

const workingHoursOptions = [
  { value: 'full-time', label: 'Tam Zamanlı (8+ saat)' },
  { value: 'part-time', label: 'Yarı Zamanlı (4-8 saat)' },
  { value: 'flexible', label: 'Esnek Çalışma' },
  { value: 'remote', label: 'Evden Çalışma' },
  { value: 'retired', label: 'Emekli' },
  { value: 'student', label: 'Öğrenci' }
];

const experienceOptions = [
  { value: 'expert', label: 'Çok Deneyimli (10+ yıl)' },
  { value: 'experienced', label: 'Deneyimli (5-10 yıl)' },
  { value: 'some', label: 'Biraz Deneyim (1-5 yıl)' },
  { value: 'beginner', label: 'Yeni Başlayan' }
];

const timeSlots = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
];

const contractItems = [
  {
    id: 'medical-care',
    text: 'Hayvanın tüm sağlık masraflarını karşılamayı kabul ediyorum'
  },
  {
    id: 'return-policy',
    text: 'Hayvanı geri vermem gerekirse önce barınakla iletişime geçeceğim'
  },
  {
    id: 'spay-neuter',
    text: 'Hayvanın kısırlaştırma işlemini veteriner önerisi doğrultusunda yaptıracağım'
  },
  {
    id: 'no-abandonment',
    text: 'Hayvanı asla terk etmeyeceğim veya sokağa bırakmayacağım'
  },
  {
    id: 'updates',
    text: 'İlk 6 ay boyunca aylık fotoğraf/video güncellemesi göndereceğim'
  }
];

interface AdoptionApplicationPageProps {
  petName: string;
  onBack: () => void;
}

export const AdoptionApplicationPage: React.FC<AdoptionApplicationPageProps> = ({ 
  petName = "Luna", 
  onBack 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (updates: Partial<ApplicationFormData>) => {
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

  const toggleAgreement = (agreementId: string) => {
    const newAgreements = formData.agreements.includes(agreementId)
      ? formData.agreements.filter(id => id !== agreementId)
      : [...formData.agreements, agreementId];
    updateFormData({ agreements: newAgreements });
  };

  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Confetti Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute animate-bounce ${
                ['text-yellow-400', 'text-pink-400', 'text-blue-400', 'text-green-400', 'text-purple-400'][i % 5]
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Sparkles className="h-4 w-4" />
            </div>
          ))}
        </div>

        <div className="max-w-md w-full text-center z-10">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Başvurun İletildi! 🎉
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {petName} için sahiplenme başvurunuz başarıyla gönderildi. Barınak/ilan sahibi 24 saat içinde dönüş yapacak.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Sırada Ne Var?
            </h3>
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Başvuru değerlendirmesi (24 saat)</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Ön ziyaret randevusu</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Eğer uygunsa, sahiplenme!</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Button onClick={onBack} className="w-full">
              Ana Sayfaya Dön
            </Button>
            <Button variant="outline" className="w-full">
              Başvuru Durumunu Takip Et
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
              {petName} için Başvuru
            </h1>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {currentStep}/4 Adım
            </div>
          </div>
          
          <div className="w-10" />
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
        {/* Step 1: Living Conditions */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Yaşam Koşullarınız
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {petName}'nın yaşayacağı ortam hakkında bilgi verin.
              </p>
            </div>

            <div className="space-y-4">
                             <Select
                 label="Ev Tipi"
                 value={formData.homeType}
                 onChange={(e) => updateFormData({ homeType: e.target.value })}
                 options={homeTypeOptions}
                 placeholder="Ev tipinizi seçin"
               />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                  Bahçeniz var mı?
                </label>
                <div className="flex gap-3">
                                     <Button
                     variant={formData.hasYard ? 'primary' : 'outline'}
                     onClick={() => updateFormData({ hasYard: true })}
                     className="flex-1"
                   >
                     Evet, Bahçeli
                   </Button>
                   <Button
                     variant={!formData.hasYard ? 'primary' : 'outline'}
                     onClick={() => updateFormData({ hasYard: false })}
                     className="flex-1"
                   >
                     Hayır, Bahçesiz
                   </Button>
                </div>
              </div>

                             <Select
                 label="Çalışma Saatleriniz"
                 value={formData.workingHours}
                 onChange={(e) => updateFormData({ workingHours: e.target.value })}
                 options={workingHoursOptions}
                 placeholder="Çalışma düzeninizi seçin"
               />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Evde Yaşayan Kişi Sayısı
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateFormData({ familyMembers: Math.max(1, formData.familyMembers - 1) })}
                    disabled={formData.familyMembers <= 1}
                  >
                    -
                  </Button>
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100 min-w-[3rem] text-center">
                    {formData.familyMembers}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateFormData({ familyMembers: Math.min(10, formData.familyMembers + 1) })}
                    disabled={formData.familyMembers >= 10}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Input
                label="Yaşam Düzeni Açıklaması"
                value={formData.livingArrangement}
                onChange={(e) => updateFormData({ livingArrangement: e.target.value })}
                placeholder="Örn: Eşim ve 2 çocuğumla yaşıyoruz..."
                icon={<Users className="h-4 w-4" />}
              />
            </div>
          </div>
        )}

        {/* Step 2: Experience & Current Pets */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Deneyim ve Mevcut Evcil Hayvanlar
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Hayvan bakımı deneyiminizi ve mevcut durumunuzu paylaşın.
              </p>
            </div>

            <div className="space-y-4">
                             <Select
                 label="Hayvan Bakımı Deneyiminiz"
                 value={formData.petExperience}
                 onChange={(e) => updateFormData({ petExperience: e.target.value })}
                 options={experienceOptions}
                 placeholder="Deneyim seviyenizi seçin"
               />

              <Input
                label="Şu An Evcil Hayvanınız Var mı?"
                value={formData.currentPets}
                onChange={(e) => updateFormData({ currentPets: e.target.value })}
                placeholder="Örn: 1 kedi, 2 yaşında / Yok"
                icon={<Heart className="h-4 w-4" />}
              />

              <Input
                label="Veteriner Referansı"
                value={formData.vetReference}
                onChange={(e) => updateFormData({ vetReference: e.target.value })}
                placeholder="Veteriner klinik adı ve telefonu (opsiyonel)"
                icon={<User className="h-4 w-4" />}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Daha Önce Hayvan Sahiplendirdiniz mi?
                </label>
                <textarea
                  value={formData.previousPets}
                  onChange={(e) => updateFormData({ previousPets: e.target.value })}
                  placeholder="Daha önce sahiplendiğiniz hayvanlar hakkında bilgi verin..."
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors duration-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Visit Appointment */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Ziyaret Randevusu
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {petName} ile tanışmak için uygun bir tarih ve saat seçin.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                  Tercih Ettiğiniz Tarih
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {generateCalendarDates().slice(0, 6).map((date) => {
                    const dateStr = formatDate(date);
                    const isSelected = formData.preferredDate === dateStr;
                    
                    return (
                                             <Button
                         key={dateStr}
                         variant={isSelected ? 'primary' : 'outline'}
                         onClick={() => updateFormData({ preferredDate: dateStr })}
                         className="p-3 h-auto flex flex-col"
                       >
                        <span className="text-xs opacity-75">
                          {formatDisplayDate(date).split(' ')[0]}
                        </span>
                        <span className="font-medium">
                          {formatDisplayDate(date).split(' ').slice(1).join(' ')}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                  Tercih Ettiğiniz Saat
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                                         <Button
                       key={time}
                       variant={formData.preferredTime === time ? 'primary' : 'outline'}
                       onClick={() => updateFormData({ preferredTime: time })}
                       size="sm"
                     >
                      <Clock className="h-3 w-3 mr-1" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Ziyaret Notları (Opsiyonel)
                </label>
                <textarea
                  value={formData.visitNotes}
                  onChange={(e) => updateFormData({ visitNotes: e.target.value })}
                  placeholder="Ziyaret sırasında özellikle merak ettiğiniz konular..."
                  rows={3}
                  className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors duration-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Contract & Agreement */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Sözleşme ve Onaylar
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Sahiplenme koşullarını okuyun ve onaylayın.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Sahiplenme Koşulları
                </h3>
                <div className="space-y-3">
                  {contractItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => toggleAgreement(item.id)}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                        formData.agreements.includes(item.id)
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {formData.agreements.includes(item.id) && (
                          <Check className="h-3 w-3" />
                        )}
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  Acil Durum İletişim
                </h3>
                <Input
                  label="Acil Durum İletişim Kişisi"
                  value={formData.emergencyContact}
                  onChange={(e) => updateFormData({ emergencyContact: e.target.value })}
                  placeholder="Ad Soyad"
                  icon={<User className="h-4 w-4" />}
                />
                <Input
                  label="Acil Durum Telefon"
                  value={formData.emergencyPhone}
                  onChange={(e) => updateFormData({ emergencyPhone: e.target.value })}
                  placeholder="0555 123 45 67"
                  type="tel"
                  icon={<User className="h-4 w-4" />}
                />
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
              (currentStep === 1 && (!formData.homeType || !formData.workingHours)) ||
              (currentStep === 2 && !formData.petExperience) ||
              (currentStep === 3 && (!formData.preferredDate || !formData.preferredTime)) ||
              (currentStep === 4 && (formData.agreements.length < 5 || !formData.emergencyContact || !formData.emergencyPhone))
            }
          >
            {currentStep === 4 ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Başvuruyu Gönder
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