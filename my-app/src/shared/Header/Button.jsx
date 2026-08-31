import {useNavigate} from 'react-router-dom'

export default function Button() {
    const navigate = useNavigate()
    return <button className="nav-btn" onClick={() => navigate('/create')}>Создать товар</button>
}