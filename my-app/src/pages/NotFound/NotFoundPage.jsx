function NotFoundPage() {
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
      <h1 style={{ marginBottom: '12px', color: '#D29F22' }}>404</h1>
      <p style={{ margin: 0, maxWidth: '520px', lineHeight: 1.5 }}>
        Страница не найдена.
      </p>
    </div>
  )
}

export default NotFoundPage
