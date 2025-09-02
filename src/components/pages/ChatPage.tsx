import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Badge, VerificationBadge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { 
  ArrowLeft,
  Send,
  Paperclip,
  MapPin,
  Shield,
  FileText,
  Flag,
  Clock,
  Check,
  CheckCheck,
  Camera,
  AlertTriangle,
  Info,
  MoreVertical,
  X
} from 'lucide-react';
import { tr } from '../../locales/tr';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  isDelivered: boolean;
  imageUrl?: string;
  type: 'text' | 'image' | 'location' | 'listing';
  listingId?: string;
}

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  lastSeen: string;
  isOnline: boolean;
  verifications: {
    id: boolean;
    student: boolean;
    phone: boolean;
  };
  rating: number;
}

interface ChatPageProps {
  onBack: () => void;
}

const mockChatUser: ChatUser = {
  id: '2',
  name: 'Mehmet Demir',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
  lastSeen: '2 dakika önce',
  isOnline: true,
  verifications: {
    id: true,
    student: false,
    phone: true
  },
  rating: 4.6
};

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    text: 'Merhaba! Kadıköy\'deki oda ilanınızla ilgili bilgi alabilir miyim?',
    timestamp: '14:30',
    isRead: true,
    isDelivered: true,
    type: 'text'
  },
  {
    id: '2',
    senderId: 'me',
    text: 'Merhaba! Tabii ki, hangi konularda bilgi almak istiyorsunuz?',
    timestamp: '14:32',
    isRead: true,
    isDelivered: true,
    type: 'text'
  },
  {
    id: '3',
    senderId: '2',
    text: 'Oda ne zaman müsait olacak? Ve evcil hayvan konusunda nasıl bir politikanız var?',
    timestamp: '14:33',
    isRead: true,
    isDelivered: true,
    type: 'text'
  },
  {
    id: '4',
    senderId: 'me',
    text: 'Oda 1 Şubat\'tan itibaren müsait. Evcil hayvan konusunda esnek yaklaşımımız var.',
    timestamp: '14:35',
    isRead: false,
    isDelivered: true,
    type: 'text'
  },
  {
    id: '5',
    senderId: 'me',
    text: '',
    timestamp: '14:36',
    isRead: false,
    isDelivered: true,
    type: 'listing',
    listingId: '1'
  }
];

const mockListing = {
  id: '1',
  title: 'Kadıköy\'de Öğrenci Evi - Tek Kişilik Oda',
  price: 3500,
  image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=200'
};

export const ChatPage: React.FC<ChatPageProps> = ({ onBack }) => {
  const [messageText, setMessageText] = useState('');
  const [showActions, setShowActions] = useState(false);
  const [showSafetyTip, setShowSafetyTip] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In real app, would send message via API
      setMessageText('');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      // In real app, would upload image and send message
      console.log('Image selected:', event.target.files[0]);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return timestamp;
  };

  const renderMessage = (message: Message) => {
    const isMyMessage = message.senderId === 'me';
    
    return (
      <div
        key={message.id}
        className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-[80%] ${isMyMessage ? 'order-2' : 'order-1'}`}>
          {/* Message Bubble */}
          <div
            className={`rounded-2xl px-4 py-2 ${
              isMyMessage
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
            } ${
              message.type === 'listing' ? 'p-0 overflow-hidden' : ''
            }`}
          >
            {message.type === 'text' && (
              <p className="text-sm leading-relaxed">{message.text}</p>
            )}
            
            {message.type === 'image' && message.imageUrl && (
              <div>
                <img
                  src={message.imageUrl}
                  alt="Shared image"
                  className="rounded-lg max-w-full h-auto"
                />
                {message.text && (
                  <p className="text-sm mt-2">{message.text}</p>
                )}
              </div>
            )}
            
            {message.type === 'listing' && (
              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <div className="flex gap-3 p-3">
                  <img
                    src={mockListing.image}
                    alt={mockListing.title}
                    className="w-16 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm line-clamp-2 mb-1">
                      {mockListing.title}
                    </h4>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                      ₺{mockListing.price.toLocaleString('tr-TR')}/ay
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Timestamp and Read Status */}
          <div className={`flex items-center gap-1 mt-1 ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTime(message.timestamp)}
            </span>
            {isMyMessage && (
              <div className="flex items-center">
                {message.isDelivered && (
                  <Check className={`h-3 w-3 ${message.isRead ? 'text-blue-500' : 'text-gray-400'}`} />
                )}
                {message.isRead && (
                  <Check className="h-3 w-3 text-blue-500 -ml-1" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          {/* User Info */}
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                {mockChatUser.avatar ? (
                  <img 
                    src={mockChatUser.avatar} 
                    alt={mockChatUser.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                    {mockChatUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              {mockChatUser.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {mockChatUser.name}
                </h2>
                <div className="flex gap-1">
                  {mockChatUser.verifications.id && (
                    <VerificationBadge type="id" verified={true} size="sm" />
                  )}
                  {mockChatUser.verifications.phone && (
                    <VerificationBadge type="phone" verified={true} size="sm" />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                <Clock className="h-3 w-3" />
                <span>{mockChatUser.isOnline ? 'Çevrimiçi' : mockChatUser.lastSeen}</span>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowActions(!showActions)}
            className="p-2"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        {/* Quick Actions */}
        {showActions && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <MapPin className="h-4 w-4 mr-1" />
                Konum Paylaş
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Shield className="h-4 w-4 mr-1" />
                Escrow Başlat
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <FileText className="h-4 w-4 mr-1" />
                Sözleşme İndir
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Safety Tip */}
      {showSafetyTip && (
        <div className="mx-4 mt-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Güvenlik İpucu:</strong> Kişisel bilgilerinizi koruyun. Görüşmeleri güvenli yerlerde yapın.
              </p>
            </div>
            <button
              onClick={() => setShowSafetyTip(false)}
              className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {mockMessages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <div className="flex items-end gap-3">
          {/* Attachment Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 flex-shrink-0"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          
          {/* Message Input */}
          <div className="flex-1">
            <Input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Mesaj yazın..."
              className="border-gray-300 dark:border-gray-600"
            />
          </div>
          
          {/* Send Button */}
          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className="p-2 flex-shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Report Button - Floating */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-20 right-4 z-20 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
        onClick={() => {/* Handle report */}}
      >
        <Flag className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  );
}; 