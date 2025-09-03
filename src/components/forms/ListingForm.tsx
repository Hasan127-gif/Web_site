import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Card } from '../ui/Card';

const listingSchema = z.object({
  category: z.enum(['roommate', 'pet', 'furniture']),
  title: z.string().min(5, 'Başlık en az 5 karakter olmalı'),
  description: z.string().min(20, 'Açıklama en az 20 karakter olmalı'),
  price: z.number().min(0, 'Fiyat 0\'dan büyük olmalı'),
  location: z.string().min(3, 'Konum en az 3 karakter olmalı'),
  images: z.array(z.string()).min(1, 'En az 1 fotoğraf gerekli'),
});

type ListingFormData = z.infer<typeof listingSchema>;

export const ListingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      category: 'roommate',
      title: '',
      description: '',
      price: 0,
      location: '',
      images: [],
    },
  });

  const selectedCategory = watch('category');

  const onSubmit = async (data: ListingFormData) => {
    try {
      console.log('Form data:', data);
      // API call would go here
      alert('İlan başarıyla oluşturuldu!');
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  const categoryOptions = [
    { value: 'roommate', label: 'Ev Arkadaşı' },
    { value: 'pet', label: 'Hayvan Sahiplendirme' },
    { value: 'furniture', label: 'Ev Eşyası' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Category Selection */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Kategori Seçimi</h2>
        <Select
          placeholder="Kategori seçin"
          options={categoryOptions}
          value={selectedCategory}
          onChange={(value) => setValue('category', value as any)}
        />
        {errors.category && (
          <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
        )}
      </Card>

      {/* Basic Information */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Temel Bilgiler</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Başlık *
            </label>
            <Input
              {...register('title')}
              placeholder="İlan başlığını girin"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Açıklama *
            </label>
            <textarea
              {...register('description')}
              placeholder="Detaylı açıklama yazın"
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.description ? 'border-red-500' : 'border-input'
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Fiyat *
              </label>
              <Input
                type="number"
                {...register('price', { valueAsNumber: true })}
                placeholder="0"
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && (
                <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Konum *
              </label>
              <Input
                {...register('location')}
                placeholder="Şehir, ilçe"
                className={errors.location ? 'border-red-500' : ''}
              />
              {errors.location && (
                <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Category-specific fields */}
      {selectedCategory === 'roommate' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Oda Bilgileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              placeholder="Oda Türü"
              options={[
                { value: 'single', label: 'Tek Kişilik' },
                { value: 'shared', label: 'Paylaşımlı' },
                { value: 'studio', label: 'Stüdyo' },
              ]}
            />
            <Select
              placeholder="Eşyalı Durumu"
              options={[
                { value: 'furnished', label: 'Eşyalı' },
                { value: 'unfurnished', label: 'Eşyasız' },
              ]}
            />
          </div>
        </Card>
      )}

      {selectedCategory === 'pet' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Pet Bilgileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              placeholder="Tür"
              options={[
                { value: 'dog', label: 'Köpek' },
                { value: 'cat', label: 'Kedi' },
                { value: 'bird', label: 'Kuş' },
                { value: 'rabbit', label: 'Tavşan' },
              ]}
            />
            <Input placeholder="Cins" />
            <Input placeholder="Yaş" />
            <Select
              placeholder="Cinsiyet"
              options={[
                { value: 'male', label: 'Erkek' },
                { value: 'female', label: 'Dişi' },
              ]}
            />
          </div>
        </Card>
      )}

      {selectedCategory === 'furniture' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Eşya Bilgileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              placeholder="Kategori"
              options={[
                { value: 'sofa', label: 'Koltuk' },
                { value: 'table', label: 'Masa' },
                { value: 'chair', label: 'Sandalye' },
                { value: 'bed', label: 'Yatak' },
              ]}
            />
            <Select
              placeholder="Durum"
              options={[
                { value: 'new', label: 'Yeni' },
                { value: 'excellent', label: 'Çok İyi' },
                { value: 'good', label: 'İyi' },
                { value: 'fair', label: 'Orta' },
              ]}
            />
            <Input placeholder="Boyutlar (cm)" />
            <Select
              placeholder="Teslimat"
              options={[
                { value: 'pickup', label: 'Elden' },
                { value: 'shipping', label: 'Kargo' },
                { value: 'delivery', label: 'Nakliye' },
              ]}
            />
          </div>
        </Card>
      )}

      {/* Photo Upload */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Fotoğraflar</h2>
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <p className="text-muted-foreground mb-4">
            Fotoğrafları buraya sürükleyin veya tıklayın
          </p>
          <Button variant="outline" type="button">
            Fotoğraf Seç
          </Button>
        </div>
        {errors.images && (
          <p className="text-sm text-red-500 mt-1">{errors.images.message}</p>
        )}
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Taslak Kaydet
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Kaydediliyor...' : 'İlanı Yayınla'}
        </Button>
      </div>
    </form>
  );
};
