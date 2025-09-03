import { Nav } from './Nav'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-dvh bg-neutral-50 text-neutral-900">
      <Nav />
      <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
      <footer className="border-t py-8 text-sm text-neutral-500">
        <div className="mx-auto max-w-6xl px-4">
          © {new Date().getFullYear()} — Güven Rozeti • Emanet Ödeme • Doğrulanmış Kullanıcılar
        </div>
      </footer>
    </div>
  )
}
