import { Outlet } from 'react-router-dom'
import Topbar from '../components/Topbar'

const USER_LINKS = [
  { to: '/dashboard', label: 'Dashboard', end: true },
  { to: '/join-queue', label: 'Join Queue' },
  { to: '/queue-status', label: 'Queue Status' },
  { to: '/history', label: 'History' },
]

export default function UserLayout() {
  return (
    <>
      <Topbar brand="QueueSmart" links={USER_LINKS} email="user@test.com" />
      <Outlet />
    </>
  )
}
