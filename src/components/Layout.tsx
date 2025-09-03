import React from 'react'
import TargetCursor from './TargetCursor'
import PillNav from './PillNav'

// Senin attığın ev fotoğrafı - data URL olarak
const logoDataUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRkY2QjAwIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGOEUzQyIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTYiIGZpbGw9InVybCgjYmcpIi8+CiAgPCEtLSBFdiAtLT4KICA8cGF0aCBkPSJNMTIgNDBWMjhMMzIgMTZMNTIgMjhWNDBINDRWMzJIMjBWNDBIMTJaIiBmaWxsPSJ3aGl0ZSIvPgogIDwhLS0gS2FwxLEgLS0+CiAgPHJlY3QgeD0iMjgiIHk9IjM2IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjRkY2QjAwIi8+CiAgPCEtLSDDh2F0xLEgLS0+CiAgPHBhdGggZD0iTTE2IDI4TDMyIDIwTDQ4IDI4IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gQmFjYSAtLT4KICA8cGF0aCBkPSJNMzAgMTZWOEgzOFYxNloiIGZpbGw9IndoaXRlIi8+CiAgPHBhdGggZD0iTTMwIDhIMzhWNEgzMFY4WiIgZmlsbD0iI0ZGNkIwMCIvPgo8L3N2Zz4K"

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = false
  return (
    <div className="min-h-dvh bg-neutral-50 text-neutral-900">
      <TargetCursor targetSelector=".pill, .auth-action, .pill-logo" spinDuration={1.6} hideDefaultCursor={true} />
      <PillNav
        logo={logoDataUrl}
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
