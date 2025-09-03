interface ListingFormProps {
  step: number
  onNext: () => void
  onBack: () => void
}

export default function ListingForm({ step, onNext, onBack }: ListingFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 w-8 rounded ${
                s <= step ? 'bg-emerald-600' : 'bg-neutral-200'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-neutral-600">Adım {step}/4</span>
      </div>
      
      <div className="rounded-lg border bg-white p-6">
        <h3 className="mb-4 text-lg font-medium">
          {step === 1 && 'Konum ve Fiyat'}
          {step === 2 && 'Özellikler'}
          {step === 3 && 'Fotoğraflar'}
          {step === 4 && 'Önizleme'}
        </h3>
        
        <p className="text-neutral-600">
          {step === 1 && 'İlan konumu, fiyat ve tarih bilgileri.'}
          {step === 2 && 'Oda/ev özellikleri, eşyalar ve kurallar.'}
          {step === 3 && 'Fotoğraf yükleme ve AI önerileri.'}
          {step === 4 && 'İlan önizlemesi ve yayınlama.'}
        </p>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={step === 1}
          className="rounded-lg border px-4 py-2 text-sm disabled:opacity-50"
        >
          Geri
        </button>
        <button
          onClick={onNext}
          disabled={step === 4}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {step === 4 ? 'Yayınla' : 'İleri'}
        </button>
      </div>
    </div>
  )
}
