import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ListingForm } from '../components/forms/ListingForm';

export const NewListing: React.FC = () => {
  const navigate = useNavigate();
  const [showAIAssistant, setShowAIAssistant] = React.useState(false);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
          <h1 className="text-2xl font-bold">Yeni İlan</h1>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAIAssistant(!showAIAssistant)}
        >
          <Bot className="w-4 h-4 mr-2" />
          AI Asistan
        </Button>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <ListingForm />
      </div>
    </div>
  );
};
