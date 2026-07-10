import { NavLink } from 'react-router-dom'

export interface TopbarLink {
  to: string
  label: string
  end?: boolean
}

interface TopbarProps {
  brand: string
  links: TopbarLink[]
  email: string
  onLogout?: () => void
}

export default function Topbar({ brand, links, email, onLogout }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="logo">{brand}</div>
      <nav>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="user-menu">
        <span className="email">{email}</span>
        <button className="logout-btn" type="button" onClick={onLogout}>Log out</button>
      </div>
    </header>
  )
}
