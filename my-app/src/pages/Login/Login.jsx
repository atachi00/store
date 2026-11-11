import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/_axios'
import { getErrorMessage } from '../../utils/getErrorMessage'
import '../../shared/Auth/Auth.css'

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
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-title">Вход</h1>

        <input
          className="input"
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={text.email}
          onChange={(e) => setText({ ...text, email: e.target.value })}
        />
        <input
          className="input"
          type="password"
          placeholder="Пароль"
          autoComplete="current-password"
          value={text.password}
          onChange={(e) => setText({ ...text, password: e.target.value })}
        />

        {error && <p className="form-error" role="alert">{error}</p>}

        <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
          {loading ? '...' : 'Войти'}
        </button>

        <Link className="auth-link" to="/register">Нет аккаунта? Регистрация</Link>
      </form>
    </main>
  )
}

export default Login
