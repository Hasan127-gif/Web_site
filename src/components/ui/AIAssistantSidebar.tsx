import React, { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { 
  Bot,
  Camera,
  Edit,
  Tag,
  CheckCircle,
  X,
  Lightbulb,
  Sparkles,
  RefreshCw,
  Eye,
  Wand2,
  ArrowRight,
  Sun,
  Grid3x3,
  Target,
  Crop,
  Zap
} from 'lucide-react';

interface AIAssistantSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentTitle?: string;
  currentDescription?: string;
  currentTags?: string[];
  onApplyTitle?: (newTitle: string) => void;
  onApplyDescription?: (newDescription: string) => void;
  onApplyTags?: (newTags: string[]) => void;
}

interface PhotoTip {
  id: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  checked: boolean;
  color: string;
}

const photoTips: PhotoTip[] = [
  {
    id: 'natural-light',
    text: 'Doğal ışık kullan (pencere yanı)',
    icon: Sun,
    checked: false,
    color: 'text-yellow-600'
  },
  {
    id: 'ratio',
    text: '4:3 oranında çek',
    icon: Grid3x3,
    checked: false,
    color: 'text-blue-600'
  },
  {
    id: 'center',
    text: 'Ürünü merkeze al',
    icon: Target,
    checked: false,
    color: 'text-green-600'
  },
  {
    id: 'angles',
    text: 'Farklı açılardan çek',
    icon: Crop,
    checked: false,
    color: 'text-purple-600'
  },
  {
    id: 'background',
    text: 'Temiz arka plan seç',
    icon: Zap,
    checked: false,
    color: 'text-orange-600'
  }
];

const titleSuggestions = [
  "Modern ve Temiz L Koltuk Takımı - Az Kullanılmış",
  "Şık L Koltuk - Mükemmel Durumda, Hemen Teslim",
  "Konforlu L Koltuk Takımı - Ev Değişimi Nedeniyle"
];

const descriptionSuggestions = [
  "Az kullanılmış, temiz durumda modern L koltuk takımı. Gri renk, çok rahat. Oturma grubu olarak mükemmel. Pet hair yok, sigara içilmeyen evde kullanılmış. Acil satılık.",
  "Mükemmel durumda L şeklinde koltuk takımı. Modern tasarım, rahat oturum. Temiz ev ortamından, bakımlı kullanım. Hızlı satış için uygun fiyat.",
  "Ev değişimi nedeniyle satılık L koltuk takımı. Az kullanılmış, leke ve yıpranma yok. Kaliteli kumaş, sağlam yapı. Görenlerin beğendiği model."
];

const tagSuggestions = [
  { category: 'Durum', tags: ['Mükemmel', 'Az Kullanılmış', 'Temiz'] },
  { category: 'Özellik', tags: ['Modern', 'Rahat', 'Şık'] },
  { category: 'Aciliyet', tags: ['Acil', 'Hızlı Satış', 'Pazarlık Olur'] }
];

export const AIAssistantSidebar: React.FC<AIAssistantSidebarProps> = ({
  isOpen,
  onClose,
  currentTitle = "Modern L Koltuk Takımı",
  currentDescription = "Az kullanılmış, temiz durumda modern L koltuk takımı.",
  currentTags = [],
  onApplyTitle,
  onApplyDescription,
  onApplyTags
}) => {
  const [activeSection, setActiveSection] = useState<'photos' | 'title' | 'description' | 'tags'>('photos');
  const [photoTipChecks, setPhotoTipChecks] = useState(photoTips);
  const [selectedTitleIndex, setSelectedTitleIndex] = useState(0);
  const [selectedDescIndex, setSelectedDescIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const togglePhotoTip = (tipId: string) => {
    setPhotoTipChecks(prev => 
      prev.map(tip => 
        tip.id === tipId ? { ...tip, checked: !tip.checked } : tip
      )
    );
  };

  const getCompletedTips = () => {
    return photoTipChecks.filter(tip => tip.checked).length;
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const generateNewSuggestions = () => {
    // In real app, would call AI API
    console.log('Generating new AI suggestions...');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 shadow-2xl border-l border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">
            AI Asistan
          </h2>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Section Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {[
          { id: 'photos', label: 'Fotoğraf', icon: Camera },
          { id: 'title', label: 'Başlık', icon: Edit },
          { id: 'description', label: 'Açıklama', icon: Edit },
          { id: 'tags', label: 'Etiketler', icon: Tag }
        ].map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`flex-1 p-3 text-xs font-medium transition-colors ${
                isActive 
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-b-2 border-purple-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Icon className="h-4 w-4 mx-auto mb-1" />
              {section.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Photo Tips Section */}
        {activeSection === 'photos' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                📸 Fotoğraf İpuçları
              </h3>
              <Badge variant="primary" size="sm">
                {getCompletedTips()}/5
              </Badge>
            </div>
            
            <div className="space-y-3">
              {photoTipChecks.map((tip) => {
                const Icon = tip.icon;
                return (
                  <div
                    key={tip.id}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      tip.checked 
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                        : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => togglePhotoTip(tip.id)}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                      tip.checked
                        ? 'bg-green-600 border-green-600 text-white'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {tip.checked && <CheckCircle className="h-3 w-3" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`h-4 w-4 ${tip.color}`} />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {tip.text}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {getCompletedTips() === 5 && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  🎉 Tüm ipuçları tamamlandı!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Title Section */}
        {activeSection === 'title' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                ✏️ Başlık Önerileri
              </h3>
              <Button variant="ghost" size="sm" onClick={generateNewSuggestions}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {/* Current Title */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                Mevcut Başlık
              </label>
              <p className="text-sm text-gray-900 dark:text-gray-100">
                {currentTitle}
              </p>
            </div>

            {/* AI Suggestions */}
            <div className="space-y-2">
              {titleSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedTitleIndex === index
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTitleIndex(index)}
                >
                  <div className="flex items-start gap-2">
                    <Wand2 className="h-4 w-4 text-purple-600 dark:text-purple-400 mt-0.5" />
                    <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed">
                      {suggestion}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-1" />
                {showPreview ? 'Önizlemeyi Gizle' : 'Önizleme'}
              </Button>
              <Button
                size="sm"
                onClick={() => onApplyTitle?.(titleSuggestions[selectedTitleIndex])}
                className="flex-1"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Uygula
              </Button>
            </div>

            {showPreview && (
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                      Önce
                    </label>
                    <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded border">
                      {currentTitle}
                    </div>
                  </div>
                  <div>
                    <label className="font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                      Sonra
                    </label>
                    <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded border">
                      {titleSuggestions[selectedTitleIndex]}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Description Section */}
        {activeSection === 'description' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                📝 Açıklama Önerileri
              </h3>
              <Button variant="ghost" size="sm" onClick={generateNewSuggestions}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {/* Current Description */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                Mevcut Açıklama
              </label>
              <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed">
                {currentDescription}
              </p>
            </div>

            {/* AI Suggestions */}
            <div className="space-y-3">
              {descriptionSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedDescIndex === index
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedDescIndex(index)}
                >
                  <div className="flex items-start gap-2">
                    <Wand2 className="h-4 w-4 text-purple-600 dark:text-purple-400 mt-0.5" />
                    <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed">
                      {suggestion}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              size="sm"
              onClick={() => onApplyDescription?.(descriptionSuggestions[selectedDescIndex])}
              className="w-full"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Açıklamayı Uygula
            </Button>
          </div>
        )}

        {/* Tags Section */}
        {activeSection === 'tags' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                🏷️ Etiket Önerileri
              </h3>
              <Button variant="ghost" size="sm" onClick={generateNewSuggestions}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {/* Current Tags */}
            {currentTags.length > 0 && (
              <div>
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                  Mevcut Etiketler
                </label>
                <div className="flex flex-wrap gap-1">
                  {currentTags.map((tag, index) => (
                    <Badge key={index} variant="secondary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* AI Tag Suggestions */}
            <div className="space-y-4">
              {tagSuggestions.map((category) => (
                <div key={category.category}>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                    {category.category}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {category.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 text-sm rounded-full border transition-all ${
                          selectedTags.includes(tag)
                            ? 'bg-purple-500 text-white border-purple-500'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-purple-500'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {selectedTags.length > 0 && (
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                <label className="text-xs font-medium text-purple-800 dark:text-purple-200 mb-2 block">
                  Seçilen Etiketler ({selectedTags.length})
                </label>
                <div className="flex flex-wrap gap-1 mb-3">
                  {selectedTags.map((tag, index) => (
                    <Badge key={index} variant="primary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  size="sm"
                  onClick={() => onApplyTags?.(selectedTags)}
                  className="w-full"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  Etiketleri Uygula
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-3 text-white text-center">
          <Lightbulb className="h-5 w-5 mx-auto mb-2" />
          <p className="text-sm font-medium mb-2">
            AI ile İlanını Güçlendir
          </p>
          <p className="text-xs text-purple-100 mb-3">
            Daha etkili başlık ve açıklama ile %40 daha fazla görüntülenme
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="bg-white text-purple-600 hover:bg-purple-50 w-full"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Tüm Önerileri Uygula
          </Button>
        </div>
      </div>
    </div>
  );
};
 