import React from 'react'
import TargetCursor from './TargetCursor'
import PillNav from './PillNav'
import logoJpg from '/assets/logo-bievim.jpg'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = false
  return (
    <div className="min-h-dvh bg-neutral-50 text-neutral-900">
      <TargetCursor targetSelector=".pill, .auth-action, .pill-logo" spinDuration={1.6} hideDefaultCursor={true} />
      <PillNav
        logo={logoJpg}
        logoAlt="BiEvim"
        activeHref={typeof window !== 'undefined' ? window.location.pathname : '/'}
        baseColor="#1F1F1F"
        pillColor="#FFFFFF"
        hoveredPillTextColor="#FFFFFF"
        pillTextColor="#1F1F1F"
        ease="power2.easeOut"
        className="custom-nav"
        items={[
          { label: 'Ev Arkadaşı İlanı', href: '/roommates' },
          { label: 'Evcil Hayvan İlanları', href: '/pets' },
          { label: 'İkinci El Eşya İlanları', href: '/furniture' },
        ]}
        isAuthenticated={isAuthenticated}
      />
      <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
      <footer className="border-t py-8 text-sm text-neutral-500">
        <div className="mx-auto max-w-6xl px-4">
          © {new Date().getFullYear()} — Güven Rozeti • Emanet Ödeme • Doğrulanmış Kullanıcılar
        </div>
      </footer>
    </div>
  )
}
