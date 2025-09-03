import React from 'react'
import TargetCursor from './TargetCursor'
import PillNav from './PillNav'
import logoSvg from '/assets/logo-bievim.svg'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = false
  return (
    <div className="min-h-dvh bg-neutral-50 text-neutral-900">
      <TargetCursor targetSelector=".pill, .auth-action, .pill-logo" spinDuration={1.6} hideDefaultCursor={true} />
      <PillNav
        logo={logoSvg}
        logoAlt="BiEvim"
        activeHref={typeof window !== 'undefined' ? window.location.pathname : '/'}
        baseColor="#FFFFFF"
        pillColor="#000000"
        hoveredPillTextColor="#000000"
        pillTextColor="#FFFFFF"
        ease="power2.easeOut"
        className="custom-nav"
        items={[
          { label: 'Ev Arkadaşı', href: '/roommates' },
          { label: 'Evcil Hayvan', href: '/pets' },
          { label: 'Ev Eşyaları', href: '/furniture' },
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
