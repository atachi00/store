import { useNavigate } from 'react-router-dom'
import './StatusPage.css'

function StatusPage({ title, text, buttonLabel, to }) {
  const navigate = useNavigate()

  return (
    <main className="status-page">
      <h1 className="status-title">{title}</h1>
      <p className="status-text">{text}</p>
      <button className="btn btn-primary" onClick={() => navigate(to)}>
        {buttonLabel}
      </button>
    </main>
  )
}

export default StatusPage
