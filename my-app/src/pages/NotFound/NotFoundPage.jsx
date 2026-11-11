import StatusPage from '../../shared/StatusPage/StatusPage'

export default function NotFoundPage() {
  return (
    <StatusPage
      title="404"
      text="Страница не найдена."
      buttonLabel="В каталог"
      to="/dashboard"
    />
  )
}
