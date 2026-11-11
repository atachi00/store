import StatusPage from '../../shared/StatusPage/StatusPage'

export default function ForbiddenPage() {
  return (
    <StatusPage
      title="Ошибка сессии"
      text="Похоже, вы не авторизованы. Войдите в аккаунт."
      buttonLabel="Войти"
      to="/"
    />
  )
}
