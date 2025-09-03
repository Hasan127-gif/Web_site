import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { apiClient } from '../../config/api'

const schema = z.object({
  category: z.enum(['room', 'pet', 'furniture']),
  city: z.string().min(2, 'Şehir zorunlu'),
  price: z.coerce.number().nonnegative('Geçerli bir fiyat girin').optional(),
  title: z.string().min(6, 'Başlık en az 6 karakter'),
  description: z.string().min(20, 'Açıklama en az 20 karakter'),
  rules: z.array(z.string()).optional(),
})

type FormData = z.infer<typeof schema>

export default function ListingForm({
  step,
  onNext,
  onBack,
}: { step: number; onNext: () => void; onBack: () => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { category: 'room', rules: [] },
  })

  const submit = async (data: FormData) => {
    try {
      // API'ye POST et
      const response = await apiClient.post('/listings', data)
      console.log('İlan oluşturuldu:', response.data)
      onNext()
    } catch (error) {
      console.error('İlan oluşturma hatası:', error)
      // TODO: Toast notification göster
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-4 max-w-2xl">
      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="rounded-lg border px-3 py-2">Geri</button>
        <div className="ml-auto text-sm text-neutral-500">Adım {step}/4</div>
      </div>

      <label className="grid gap-1">
        <span>Kategori</span>
        <select {...register('category')} className="rounded-lg border px-3 py-2">
          <option value="room">Ev Arkadaşı</option>
          <option value="pet">Sahiplendirme</option>
          <option value="furniture">Ev Eşyası</option>
        </select>
      </label>

      <label className="grid gap-1">
        <span>Şehir</span>
        <input {...register('city')} className="rounded-lg border px-3 py-2" placeholder="İstanbul" />
        {errors.city && <small className="text-red-600">{errors.city.message}</small>}
      </label>

      <label className="grid gap-1">
        <span>Fiyat (TL)</span>
        <input type="number" {...register('price')} className="rounded-lg border px-3 py-2" placeholder="Örn. 5500" />
        {errors.price && <small className="text-red-600">{errors.price.message}</small>}
      </label>

      <label className="grid gap-1">
        <span>Başlık</span>
        <input {...register('title')} className="rounded-lg border px-3 py-2" placeholder="Kadıköy'de eşyalı oda" />
        {errors.title && <small className="text-red-600">{errors.title.message}</small>}
      </label>

      <label className="grid gap-1">
        <span>Açıklama</span>
        <textarea rows={5} {...register('description')} className="rounded-lg border px-3 py-2" placeholder="Ev kuralları, ulaşım, depozito, vb." />
        {errors.description && <small className="text-red-600">{errors.description.message}</small>}
      </label>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Kaydediliyor...' : 'Kaydet ve Devam Et'}
      </button>
    </form>
  )
}
