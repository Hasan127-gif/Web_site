import { Link, NavLink } from 'react-router-dom'

export const Nav = () => {
  const active = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg ${isActive ? 'bg-neutral-200' : 'hover:bg-neutral-100'}`
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-semibold">TrustApp</Link>
        <nav className="flex gap-2">
          <NavLink to="/roommates" className={active}>Ev Arkadaşı</NavLink>
          <NavLink to="/pets" className={active}>Sahiplendirme</NavLink>
          <NavLink to="/furniture" className={active}>Ev Eşyaları</NavLink>
          <NavLink to="/listing/new" className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">
            İlan Ver
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
