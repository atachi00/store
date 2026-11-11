import StatusPage from '../../shared/StatusPage/StatusPage'

export default function UnauthorizedPage() {
  return (
    <StatusPage
      title="Войдите в аккаунт"
      text="Для доступа к этой странице нужно войти в систему."
      buttonLabel="Войти"
      to="/"
    />
  )
}
