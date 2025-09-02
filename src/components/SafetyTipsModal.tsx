import React from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Shield, AlertTriangle, CheckCircle, Phone } from 'lucide-react';

interface SafetyTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const safetyTips = [
  {
    icon: Shield,
    title: 'Kimlik Doğrulama',
    description: 'Sadece doğrulanmış kullanıcılarla iletişime geçin.',
    type: 'success' as const,
  },
  {
    icon: AlertTriangle,
    title: 'Buluşma Güvenliği',
    description: 'İlk buluşmaları kalabalık ve güvenli yerlerde yapın.',
    type: 'warning' as const,
  },
  {
    icon: CheckCircle,
    title: 'Güvenli Ödeme',
    description: 'Escrow korumalı ödemeleri tercih edin.',
    type: 'success' as const,
  },
  {
    icon: Phone,
    title: 'Acil Durum',
    description: 'Şüpheli durumları hemen bildirin: 155',
    type: 'error' as const,
  },
];

export const SafetyTipsModal: React.FC<SafetyTipsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Güvenlik İpuçları" size="lg">
      <div className="space-y-4">
        {safetyTips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <div
              key={index}
              className="flex gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div
                className={`p-2 rounded-lg flex-shrink-0 ${
                  tip.type === 'success'
                    ? 'bg-green-100 dark:bg-green-900/20'
                    : tip.type === 'warning'
                    ? 'bg-amber-100 dark:bg-amber-900/20'
                    : 'bg-red-100 dark:bg-red-900/20'
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    tip.type === 'success'
                      ? 'text-green-600 dark:text-green-400'
                      : tip.type === 'warning'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tip.description}
                </p>
              </div>
            </div>
          );
        })}
        
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={onClose} className="w-full">
            Anladım
          </Button>
        </div>
      </div>
    </Modal>
  );
};