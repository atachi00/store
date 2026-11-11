import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/_axios'
import { getErrorMessage } from '../../utils/getErrorMessage'
import '../../shared/Auth/Auth.css'

function Register() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState({ email: '', password: '', role: 'seller' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await api.post('/register', text)
      navigate('/')
    } catch (err) {
      setError(getErrorMessage(err, 'Не удалось зарегистрироваться'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-title">Регистрация</h1>

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
          placeholder="Пароль (от 6 символов)"
          autoComplete="new-password"
          value={text.password}
          onChange={(e) => setText({ ...text, password: e.target.value })}
        />

        <div className="role-group">
          <label className="role-option">
            <input
              type="radio"
              name="role"
              value="seller"
              checked={text.role === 'seller'}
              onChange={(e) => setText({ ...text, role: e.target.value })}
            />
            Продавец
          </label>
          <label className="role-option">
            <input
              type="radio"
              name="role"
              value="buyer"
              checked={text.role === 'buyer'}
              onChange={(e) => setText({ ...text, role: e.target.value })}
            />
            Покупатель
          </label>
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}

        <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
          {loading ? '...' : 'Зарегистрироваться'}
        </button>

        <Link className="auth-link" to="/">Уже есть аккаунт? Войти</Link>
      </form>
    </main>
  )
}

export default Register
