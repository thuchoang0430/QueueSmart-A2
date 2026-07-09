import { Outlet } from 'react-router-dom'
import Topbar from '../components/Topbar'

const ADMIN_LINKS = [
  { to: '/admin', label: 'Admin Dashboard', end: true },
  { to: '/admin/services', label: 'Service Management' },
  { to: '/admin/queue-management', label: 'Queue Management' },
]

export default function AdminLayout() {
  return (
    <>
      <Topbar brand="QueueSmart · Admin" links={ADMIN_LINKS} email="admin@test.com" />
      <Outlet />
    </>
  )
}
