import { createContext, useContext, useState, type ReactNode } from 'react'

export type Role = 'user' | 'admin'

export interface CurrentUser {
  name: string
  email: string
  role: Role
}

interface StoredAccount extends CurrentUser {
  password: string
}

interface AuthContextValue {
  currentUser: CurrentUser | null
  login: (email: string, password: string) => CurrentUser | null
  register: (name: string, email: string, password: string) => CurrentUser | null
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

// Seed accounts so the demo works out of the box \u2014 same credentials the
// rest of the team has already been using to test the admin pages.
const seedAccounts: StoredAccount[] = [
  { name: 'Student User', email: 'user@test.com', password: 'password', role: 'user' },
  { name: 'Admin User', email: 'admin@test.com', password: 'password', role: 'admin' },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<StoredAccount[]>(seedAccounts)
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

  function login(email: string, password: string): CurrentUser | null {
    const account = accounts.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
    )
    if (!account) return null
    const user: CurrentUser = { name: account.name, email: account.email, role: account.role }
    setCurrentUser(user)
    return user
  }

  function register(name: string, email: string, password: string): CurrentUser | null {
    const exists = accounts.some((a) => a.email.toLowerCase() === email.trim().toLowerCase())
    if (exists) return null
    const account: StoredAccount = { name, email: email.trim(), password, role: 'user' }
    setAccounts((prev) => [...prev, account])
    const user: CurrentUser = { name, email: account.email, role: 'user' }
    setCurrentUser(user)
    return user
  }

  function logout() {
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
