export default function Home() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">
        Ev arkadaşı, sahiplendirme ve ev eşyası — tek yerde.
      </h1>
      <p className="text-neutral-600">Güven odaklı eşleştirme ve emanet ödeme.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        <a href="/roommates" className="rounded-xl border bg-white p-4 hover:shadow">Ev Arkadaşı Bul</a>
        <a href="/pets" className="rounded-xl border bg-white p-4 hover:shadow">Hayvan Sahiplendir</a>
        <a href="/furniture" className="rounded-xl border bg-white p-4 hover:shadow">Ev Eşyası Al/Sat</a>
      </div>
    </section>
  )
}
