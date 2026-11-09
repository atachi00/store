import { Navigate } from 'react-router-dom'
import { getRole, isAuthed } from '../../utils/auth'

// role не указана - достаточно быть авторизованным
// role указана - ещё и роль должна совпасть
function ProtectedRoute({ children, role }) {
  if (!isAuthed()) return <Navigate to="/" replace />
  if (role && getRole() !== role) return <Navigate to="/dashboard" replace />
  return children
}

export default ProtectedRoute
