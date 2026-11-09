import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/_axios'
import { getErrorMessage } from '../../utils/getErrorMessage'
import './Register.css'

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
    <form className="reg-cont" onSubmit={handleSubmit}>
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
        placeholder="Password (от 6 символов)"
        value={text.password}
        onChange={(e) => setText({ ...text, password: e.target.value })}
      />
      <div>
        <label>
          <input
            className="radio-role"
            type="radio"
            name="role"
            value="seller"
            checked={text.role === 'seller'}
            onChange={(e) => setText({ ...text, role: e.target.value })}
          />
          Seller
        </label>
        <label>
          <input
            className="radio-role"
            type="radio"
            name="role"
            value="buyer"
            checked={text.role === 'buyer'}
            onChange={(e) => setText({ ...text, role: e.target.value })}
          />
          Buyer
        </label>
      </div>
      <button className="btn-reg" type="submit" disabled={loading}>
        {loading ? '...' : 'Register'}
      </button>

      <Link to="/">Already have an account? Log in</Link>
      {error && <h1 className="error-msg">{error}</h1>}
    </form>
  )
}

export default Register