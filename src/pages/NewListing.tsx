import { useState } from 'react'
import ListingForm from '../components/forms/ListingForm'

export default function NewListing() {
  const [step, setStep] = useState(1)
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">İlan Ver</h2>
      <ListingForm step={step} onNext={() => setStep(s => Math.min(s + 1, 4))} onBack={() => setStep(s => Math.max(s - 1, 1))} />
    </section>
  )
}
