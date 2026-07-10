import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// TEMPORARY — this is a stand-in so the team can test the app end-to-end
// while the real login form is still being built. Replace this entire file
// with a proper email/password form + validation before final submission.
export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  function quickLogin(email: string, password: string) {
    const user = login(email, password)
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/dashboard')
    }
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Login</h1>
        <p>Temporary quick-login for testing — real form coming soon.</p>
      </div>

      <div className="card" style={{ maxWidth: 420 }}>
        <p style={{ marginBottom: 16, color: 'var(--text-muted)', fontSize: 14 }}>
          This is a placeholder so the team can test the rest of the app. It will
          be replaced with a real email/password form + validation.
        </p>

        <div className="btn-row" style={{ flexDirection: 'column', gap: 10 }}>
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => quickLogin('user@test.com', 'password')}
          >
            Log in as test user
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-block"
            onClick={() => quickLogin('admin@test.com', 'password')}
          >
            Log in as test admin
          </button>
        </div>
      </div>
    </div>
  )
}
