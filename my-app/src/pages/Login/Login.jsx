import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/_axios'
import { getErrorMessage } from '../../utils/getErrorMessage'
import './Login.css'

function Login() {
  const [text, setText] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault() // чтобы Enter тоже работал и страница не перезагружалась
    setError('')
    setLoading(true)

    try {
      const { data } = await api.post('/login', text)
      localStorage.setItem('token', data.token)
      navigate('/dashboard') // один каталог для всех, кнопки продавца покажет Header
    } catch (err) {
      setError(getErrorMessage(err, 'Не удалось войти'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="login-cont" onSubmit={handleSubmit}>
      <input
        className="inp-raw"
        type="email"
        placeholder="Email"
        value={text.email}
        onChange={(e) => setText({ ...text, email: e.target.value })}
      />
      <input
        className="inp-raw"
        type="password"
        placeholder="Password"
        value={text.password}
        onChange={(e) => setText({ ...text, password: e.target.value })}
      />
      <button className="btn-login" type="submit" disabled={loading}>
        {loading ? '...' : 'Login'}
      </button>

      <Link className="redirect-link" to="/register">Don't have an account? Register</Link>
      {error && <h1 className="error-msg">{error}</h1>}
    </form>
  )
}

export default Login
