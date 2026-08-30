function UnauthorizedPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#19171B',
      color: '#F3F3F3',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '24px'
    }}>
      <h1 style={{ marginBottom: '12px', color: '#D29F22' }}>Войдите в аккаунт</h1>
      <p style={{ margin: 0, maxWidth: '520px', lineHeight: 1.5 }}>
        Для доступа к этой странице нужно войти в систему.
      </p>
    </div>
  )
}

export default UnauthorizedPage
