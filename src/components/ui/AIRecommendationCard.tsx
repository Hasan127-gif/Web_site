import React from 'react';
import { clsx } from 'clsx';
import { Button } from './Button';
import { Badge } from './Badge';
import { 
  Sparkles,
  Bot,
  TrendingUp,
  Heart,
  Volume2,
  Clock,
  Users,
  MapPin,
  DollarSign,
  RefreshCw,
  Zap
} from 'lucide-react';

interface AIMatch {
  id: string;
  title: string;
  matchPercentage: number;
  compatibilityReasons: string[];
  category: 'roommate' | 'pet' | 'furniture';
  image?: string;
  price?: number;
  location?: string;
}

interface AIRecommendationCardProps {
  matches?: AIMatch[];
  isLoading?: boolean;
  isEmpty?: boolean;
  onViewRecommendations?: () => void;
  onRefresh?: () => void;
  className?: string;
}

const mockMatches: AIMatch[] = [
  {
    id: '1',
    title: 'Sessiz ve Düzenli Oda',
    matchPercentage: 87,
    compatibilityReasons: ['Sessiz saat uyumu', 'Evcil dostu', 'Bütçe uyumlu'],
    category: 'roommate',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=200',
    price: 3200,
    location: 'Kadıköy'
  },
  {
    id: '2',
    title: 'Luna - Golden Retriever',
    matchPercentage: 92,
    compatibilityReasons: ['Yaşam tarzı uyumu', 'Deneyim seviyesi', 'Çocuk dostu'],
    category: 'pet',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '3',
    title: 'Modern Koltuk Takımı',
    matchPercentage: 78,
    compatibilityReasons: ['Stil tercihi', 'Boyut uyumu', 'Bütçe aralığı'],
    category: 'furniture',
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200',
    price: 4200,
    location: 'Şişli'
  }
];

const getMatchColor = (percentage: number) => {
  if (percentage >= 85) return 'text-green-600';
  if (percentage >= 70) return 'text-blue-600';
  if (percentage >= 50) return 'text-yellow-600';
  return 'text-gray-600';
};

const getMatchLabel = (percentage: number) => {
  if (percentage >= 85) return 'Mükemmel Eşleşme';
  if (percentage >= 70) return 'İyi Eşleşme';
  if (percentage >= 50) return 'Orta Eşleşme';
  return 'Düşük Eşleşme';
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'roommate':
      return '🏠';
    case 'pet':
      return '🐾';
    case 'furniture':
      return '🛋️';
    default:
      return '📋';
  }
};

const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="flex gap-3 mb-3">
      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
    </div>
    <div className="flex gap-2 mb-3">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
    </div>
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
);

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  matches = mockMatches,
  isLoading = false,
  isEmpty = false,
  onViewRecommendations,
  onRefresh,
  className
}) => {
  const topMatch = matches[0];
  const averageMatch = Math.round(matches.reduce((acc, match) => acc + match.matchPercentage, 0) / matches.length);

  return (
    <div
      className={clsx(
        'bg-gradient-to-br from-purple-500 via-blue-600 to-indigo-700 rounded-xl p-4 text-white',
        'shadow-lg hover:shadow-xl transition-all duration-300',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
          <Bot className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">AI Eşleştirme</h3>
          <p className="text-purple-100 text-sm">Sana uygun 3 öneri</p>
        </div>
        {onRefresh && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            className="text-white hover:bg-white/10 p-2"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <SkeletonCard />
      ) : isEmpty ? (
        /* Empty State */
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-white/70" />
          </div>
          <h4 className="font-semibold text-white mb-2">
            Henüz Öneri Yok
          </h4>
          <p className="text-purple-100 text-sm mb-4">
            Profilini tamamla, daha iyi eşleşmeler alalım
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            <Users className="h-4 w-4 mr-2" />
            Profili Tamamla
          </Button>
        </div>
      ) : (
        /* Recommendations */
        <div>
          {/* Top Match Preview */}
          {topMatch && (
            <div className="flex gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/20">
                {topMatch.image ? (
                  <img
                    src={topMatch.image}
                    alt={topMatch.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl">
                    {getCategoryIcon(topMatch.category)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white truncate mb-1">
                  {topMatch.title}
                </h4>
                <div className="flex items-center gap-2">
                  <TrendingUp className={`h-4 w-4 ${getMatchColor(topMatch.matchPercentage)}`} />
                  <span className="text-sm text-purple-100">
                    Eşleşme %{topMatch.matchPercentage}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Compatibility Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="secondary"
              size="sm"
              className="bg-white/20 text-white border-white/30"
            >
              <Zap className="h-3 w-3 mr-1" />
              Eşleşme %{averageMatch}
            </Badge>
            
            {topMatch?.compatibilityReasons.slice(0, 2).map((reason, index) => (
              <Badge
                key={index}
                variant="secondary"
                size="sm"
                className="bg-white/15 text-purple-100 border-white/20"
              >
                {reason}
              </Badge>
            ))}
            
            {topMatch && topMatch.compatibilityReasons.length > 2 && (
              <Badge
                variant="secondary"
                size="sm"
                className="bg-white/10 text-purple-200 border-white/20"
              >
                +{topMatch.compatibilityReasons.length - 2} daha
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-white">
                {matches.length}
              </div>
              <div className="text-xs text-purple-100">
                Öneri
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">
                %{averageMatch}
              </div>
              <div className="text-xs text-purple-100">
                Ort. Eşleşme
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">
                {matches.filter(m => m.matchPercentage >= 80).length}
              </div>
              <div className="text-xs text-purple-100">
                Yüksek Uyum
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button 
            variant="secondary" 
            size="sm"
            onClick={onViewRecommendations}
            className="w-full bg-white text-purple-600 hover:bg-purple-50 font-medium"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Önerileri Gör
          </Button>
        </div>
      )}

      {/* AI Badge */}
      <div className="absolute -top-2 -right-2">
        <Badge
          variant="accent"
          size="sm"
          className="bg-yellow-400 text-yellow-900 shadow-lg animate-pulse"
        >
          🤖 AI
        </Badge>
      </div>
    </div>
  );
}; 