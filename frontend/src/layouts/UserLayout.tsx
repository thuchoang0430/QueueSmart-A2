import { Navigate, Outlet } from 'react-router-dom'
import Topbar from '../components/Topbar'
import { useAuth } from '../context/AuthContext'

const USER_LINKS = [
  { to: '/dashboard', label: 'Dashboard', end: true },
  { to: '/join-queue', label: 'Join Queue' },
  { to: '/queue-status', label: 'Queue Status' },
  { to: '/history', label: 'History' },
]

export default function UserLayout() {
  const { currentUser, logout } = useAuth()

  if (!currentUser) return <Navigate to="/" replace />
  if (currentUser.role !== 'user') return <Navigate to="/admin" replace />

  return (
    <>
      <Topbar brand="QueueSmart" links={USER_LINKS} email={currentUser.email} onLogout={logout} />
      <Outlet />
    </>
  )
}
