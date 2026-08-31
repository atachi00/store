import { useNavigate } from 'react-router-dom'

function ForbiddenPage() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#F3F3F3',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '24px'
    }}>
      <h1 style={{ marginBottom: '12px', color: '#D29F22' }}>Ошибка сессии</h1>
      <p style={{ margin: 0, maxWidth: '520px', lineHeight: 1.5 }}>
        Похоже вы не авторизованы, войдите в аккаунт.
      </p>

      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '20px',
          padding: '12px 20px',
          background: '#D29F22',
          color: '#19171B',
          border: 'none',
          borderRadius: '10px',
          fontWeight: 700,
          cursor: 'pointer'
        }}
      >
        LOGO
      </button>
    </div>
  )
}

export default ForbiddenPage
