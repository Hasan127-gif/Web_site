import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { 
  ArrowLeft,
  FileText,
  Download,
  Share,
  Edit,
  CheckCircle,
  Home,
  Heart,
  Package,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Clock,
  Shield,
  Eye,
  Copy
} from 'lucide-react';

interface ContractData {
  template: 'roommate' | 'adoption' | 'sale';
  
  // Common fields
  party1Name: string;
  party1Address: string;
  party1Phone: string;
  party2Name: string;
  party2Address: string;
  party2Phone: string;
  
  // Roommate specific
  roomAddress?: string;
  monthlyRent?: number;
  deposit?: number;
  startDate?: string;
  endDate?: string;
  houseRules?: string[];
  
  // Adoption specific
  petName?: string;
  petType?: string;
  petAge?: string;
  adoptionFee?: number;
  
  // Sale specific
  itemName?: string;
  itemDescription?: string;
  salePrice?: number;
  deliveryMethod?: string;
  warrantyPeriod?: string;
}

const initialContractData: ContractData = {
  template: 'roommate',
  party1Name: '',
  party1Address: '',
  party1Phone: '',
  party2Name: '',
  party2Address: '',
  party2Phone: '',
  roomAddress: '',
  monthlyRent: 0,
  deposit: 0,
  startDate: '',
  endDate: '',
  houseRules: [],
  petName: '',
  petType: '',
  petAge: '',
  adoptionFee: 0,
  itemName: '',
  itemDescription: '',
  salePrice: 0,
  deliveryMethod: '',
  warrantyPeriod: ''
};

const contractTemplates = [
  {
    id: 'roommate',
    title: 'Oda Arkadaşı Sözleşmesi',
    description: 'Ev paylaşımı için detaylı sözleşme',
    icon: Home,
    color: 'text-blue-600'
  },
  {
    id: 'adoption',
    title: 'Sahiplendirme Sözleşmesi',
    description: 'Hayvan sahiplendirme anlaşması',
    icon: Heart,
    color: 'text-pink-600'
  },
  {
    id: 'sale',
    title: 'Satış Teslim Sözleşmesi',
    description: 'Mobilya ve eşya satış sözleşmesi',
    icon: Package,
    color: 'text-green-600'
  }
];

const defaultHouseRules = [
  'Ortak alanlar temiz tutulacak',
  'Sessiz saatler 23:00-07:00',
  'Misafir kabulü önceden haber verilecek',
  'Elektrik, su, internet faturaları eşit bölünecek',
  'Sigara içilmeyecek'
];

interface ContractWizardPageProps {
  onBack: () => void;
}

export const ContractWizardPage: React.FC<ContractWizardPageProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [contractData, setContractData] = useState<ContractData>(initialContractData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const updateContractData = (updates: Partial<ContractData>) => {
    setContractData(prev => ({ ...prev, ...updates }));
  };

  const handleTemplateSelect = (template: 'roommate' | 'adoption' | 'sale') => {
    updateContractData({ 
      template,
      houseRules: template === 'roommate' ? defaultHouseRules : []
    });
    setStep(2);
  };

  const handleRuleToggle = (rule: string) => {
    const currentRules = contractData.houseRules || [];
    const newRules = currentRules.includes(rule)
      ? currentRules.filter(r => r !== rule)
      : [...currentRules, rule];
    updateContractData({ houseRules: newRules });
  };

  const generateContract = () => {
    setIsGenerating(true);
    
    // Simulate contract generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsComplete(true);
      setShareLink(`https://trustapp.com/contract/${Math.random().toString(36).substr(2, 9)}`);
    }, 3000);
  };

  const downloadPDF = () => {
    // In real app, would generate and download PDF
    alert('PDF indirildi! (Gerçek uygulamada PDF oluşturulacak)');
  };

  const shareInChat = () => {
    // In real app, would share link in chat
    navigator.clipboard.writeText(shareLink);
    alert('Sözleşme linki panoya kopyalandı!');
  };

  const getSelectedTemplate = () => {
    return contractTemplates.find(t => t.id === contractData.template);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Sözleşme Hazır! 📄
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {getSelectedTemplate()?.title} başarıyla oluşturuldu.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Paylaşım Linki:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(shareLink);
                  alert('Link kopyalandı!');
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs font-mono bg-white dark:bg-gray-900 p-2 rounded border break-all">
              {shareLink}
            </div>
          </div>
          
          <div className="space-y-3">
            <Button onClick={downloadPDF} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              PDF İndir
            </Button>
            <Button onClick={shareInChat} variant="outline" className="w-full">
              <Share className="h-4 w-4 mr-2" />
              Sohbette Paylaş
            </Button>
            <Button onClick={onBack} variant="ghost" className="w-full">
              Ana Sayfaya Dön
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Sözleşme Oluşturuluyor...
          </h2>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <span>Yasal maddeler ekleniyor</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <span>Türkçe format düzenleniyor</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              <span>PDF hazırlanıyor</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={step === 1 ? onBack : () => setStep(step - 1)}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Sözleşme Sihirbazı
            </h1>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {step}/3 Adım
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Step 1: Template Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Sözleşme Türü Seçin
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Hangi tür sözleşme oluşturmak istiyorsunuz?
              </p>
            </div>

            <div className="space-y-4">
              {contractTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <div
                    key={template.id}
                    className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all"
                    onClick={() => handleTemplateSelect(template.id as any)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <Icon className={`h-6 w-6 ${template.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {template.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Contract Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Sözleşme Bilgileri
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {getSelectedTemplate()?.title} detaylarını doldurun
              </p>
            </div>

            {/* Common Fields */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Taraflar
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    1. Taraf (Siz)
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    <Input
                      label="Ad Soyad"
                      value={contractData.party1Name}
                      onChange={(e) => updateContractData({ party1Name: e.target.value })}
                      placeholder="Ayşe Yılmaz"
                    />
                    <Input
                      label="Adres"
                      value={contractData.party1Address}
                      onChange={(e) => updateContractData({ party1Address: e.target.value })}
                      placeholder="Tam adres..."
                    />
                    <Input
                      label="Telefon"
                      value={contractData.party1Phone}
                      onChange={(e) => updateContractData({ party1Phone: e.target.value })}
                      placeholder="0555 123 45 67"
                      type="tel"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    2. Taraf
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    <Input
                      label="Ad Soyad"
                      value={contractData.party2Name}
                      onChange={(e) => updateContractData({ party2Name: e.target.value })}
                      placeholder="Mehmet Demir"
                    />
                    <Input
                      label="Adres"
                      value={contractData.party2Address}
                      onChange={(e) => updateContractData({ party2Address: e.target.value })}
                      placeholder="Tam adres..."
                    />
                    <Input
                      label="Telefon"
                      value={contractData.party2Phone}
                      onChange={(e) => updateContractData({ party2Phone: e.target.value })}
                      placeholder="0555 987 65 43"
                      type="tel"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Template Specific Fields */}
            {contractData.template === 'roommate' && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Oda Arkadaşı Detayları
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Oda/Ev Adresi"
                    value={contractData.roomAddress}
                    onChange={(e) => updateContractData({ roomAddress: e.target.value })}
                    placeholder="Paylaşılacak ev adresi"
                    icon={<MapPin className="h-4 w-4" />}
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Aylık Kira (₺)"
                      type="number"
                      value={contractData.monthlyRent}
                      onChange={(e) => updateContractData({ monthlyRent: Number(e.target.value) })}
                      icon={<DollarSign className="h-4 w-4" />}
                    />
                    <Input
                      label="Depozito (₺)"
                      type="number"
                      value={contractData.deposit}
                      onChange={(e) => updateContractData({ deposit: Number(e.target.value) })}
                      icon={<DollarSign className="h-4 w-4" />}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Başlangıç Tarihi"
                      type="date"
                      value={contractData.startDate}
                      onChange={(e) => updateContractData({ startDate: e.target.value })}
                      icon={<Calendar className="h-4 w-4" />}
                    />
                    <Input
                      label="Bitiş Tarihi"
                      type="date"
                      value={contractData.endDate}
                      onChange={(e) => updateContractData({ endDate: e.target.value })}
                      icon={<Calendar className="h-4 w-4" />}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                      Ev Kuralları
                    </label>
                    <div className="space-y-2">
                      {defaultHouseRules.map((rule, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => handleRuleToggle(rule)}
                        >
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            contractData.houseRules?.includes(rule)
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {contractData.houseRules?.includes(rule) && (
                              <CheckCircle className="h-3 w-3" />
                            )}
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {rule}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {contractData.template === 'adoption' && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Sahiplendirme Detayları
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Hayvan Adı"
                    value={contractData.petName}
                    onChange={(e) => updateContractData({ petName: e.target.value })}
                    placeholder="Luna"
                    icon={<Heart className="h-4 w-4" />}
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      label="Hayvan Türü"
                      value={contractData.petType}
                      onChange={(e) => updateContractData({ petType: e.target.value })}
                      options={[
                        { value: 'dog', label: 'Köpek' },
                        { value: 'cat', label: 'Kedi' },
                        { value: 'bird', label: 'Kuş' },
                        { value: 'rabbit', label: 'Tavşan' }
                      ]}
                      placeholder="Tür seçin"
                    />
                    <Input
                      label="Yaş"
                      value={contractData.petAge}
                      onChange={(e) => updateContractData({ petAge: e.target.value })}
                      placeholder="3 aylık"
                    />
                  </div>
                  
                  <Input
                    label="Sahiplendirme Ücreti (₺)"
                    type="number"
                    value={contractData.adoptionFee}
                    onChange={(e) => updateContractData({ adoptionFee: Number(e.target.value) })}
                    placeholder="0 (Ücretsiz sahiplendirme önerilir)"
                    icon={<DollarSign className="h-4 w-4" />}
                  />
                </div>
              </div>
            )}

            {contractData.template === 'sale' && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Satış Detayları
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Ürün Adı"
                    value={contractData.itemName}
                    onChange={(e) => updateContractData({ itemName: e.target.value })}
                    placeholder="Modern L Koltuk Takımı"
                    icon={<Package className="h-4 w-4" />}
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Ürün Açıklaması
                    </label>
                    <textarea
                      value={contractData.itemDescription}
                      onChange={(e) => updateContractData({ itemDescription: e.target.value })}
                      placeholder="Ürünün detaylı açıklaması, durumu, özellikleri..."
                      rows={3}
                      className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors duration-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-400"
                    />
                  </div>
                  
                  <Input
                    label="Satış Fiyatı (₺)"
                    type="number"
                    value={contractData.salePrice}
                    onChange={(e) => updateContractData({ salePrice: Number(e.target.value) })}
                    icon={<DollarSign className="h-4 w-4" />}
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      label="Teslim Yöntemi"
                      value={contractData.deliveryMethod}
                      onChange={(e) => updateContractData({ deliveryMethod: e.target.value })}
                      options={[
                        { value: 'pickup', label: 'Elden Teslim' },
                        { value: 'cargo', label: 'Kargo' },
                        { value: 'transport', label: 'Nakliye' }
                      ]}
                      placeholder="Teslim yöntemi"
                    />
                    <Input
                      label="Garanti Süresi"
                      value={contractData.warrantyPeriod}
                      onChange={(e) => updateContractData({ warrantyPeriod: e.target.value })}
                      placeholder="7 gün, 1 ay..."
                    />
                  </div>
                </div>
              </div>
            )}

            <Button onClick={() => setStep(3)} className="w-full">
              Önizlemeye Geç
            </Button>
          </div>
        )}

        {/* Step 3: Preview */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Sözleşme Önizlemesi
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Bilgileri kontrol edin ve sözleşmeyi oluşturun
              </p>
            </div>

            {/* Contract Preview */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {getSelectedTemplate()?.title?.toUpperCase()}
                </h3>
                <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-600 mx-auto"></div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">1. TARAF:</strong>
                    <div className="text-gray-700 dark:text-gray-300">
                      <div>{contractData.party1Name}</div>
                      <div>{contractData.party1Address}</div>
                      <div>{contractData.party1Phone}</div>
                    </div>
                  </div>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">2. TARAF:</strong>
                    <div className="text-gray-700 dark:text-gray-300">
                      <div>{contractData.party2Name}</div>
                      <div>{contractData.party2Address}</div>
                      <div>{contractData.party2Phone}</div>
                    </div>
                  </div>
                </div>

                {contractData.template === 'roommate' && (
                  <div className="space-y-2">
                    <div><strong>Oda/Ev Adresi:</strong> {contractData.roomAddress}</div>
                    <div><strong>Aylık Kira:</strong> ₺{contractData.monthlyRent?.toLocaleString()}</div>
                    <div><strong>Depozito:</strong> ₺{contractData.deposit?.toLocaleString()}</div>
                    <div><strong>Süre:</strong> {contractData.startDate} - {contractData.endDate}</div>
                    {contractData.houseRules && contractData.houseRules.length > 0 && (
                      <div>
                        <strong>Ev Kuralları:</strong>
                        <ul className="list-disc list-inside ml-4 mt-1">
                          {contractData.houseRules.map((rule, index) => (
                            <li key={index} className="text-gray-600 dark:text-gray-400">{rule}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {contractData.template === 'adoption' && (
                  <div className="space-y-2">
                    <div><strong>Hayvan Adı:</strong> {contractData.petName}</div>
                    <div><strong>Tür:</strong> {contractData.petType}</div>
                    <div><strong>Yaş:</strong> {contractData.petAge}</div>
                    <div><strong>Sahiplendirme Ücreti:</strong> ₺{contractData.adoptionFee?.toLocaleString()}</div>
                  </div>
                )}

                {contractData.template === 'sale' && (
                  <div className="space-y-2">
                    <div><strong>Ürün:</strong> {contractData.itemName}</div>
                    <div><strong>Açıklama:</strong> {contractData.itemDescription}</div>
                    <div><strong>Fiyat:</strong> ₺{contractData.salePrice?.toLocaleString()}</div>
                    <div><strong>Teslim:</strong> {contractData.deliveryMethod}</div>
                    <div><strong>Garanti:</strong> {contractData.warrantyPeriod}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    Yasal Uyarı
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Bu sözleşme Türk Medeni Kanunu ve İBK'ya uygun olarak hazırlanmıştır. 
                    İmzalanmadan önce hukuki danışmanlık almanız önerilir.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Düzenle
              </Button>
              <Button onClick={generateContract} className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                Sözleşme Oluştur
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 